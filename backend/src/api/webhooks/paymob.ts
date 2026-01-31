// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Paymob Payment Webhook
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

import { db, schema } from '../../database/index.js';
import { broadcast } from '../../core/realtime/pusher.js';
import { env } from '../../core/config/index.js';

export const paymobWebhook = new Hono();

// Transaction Processed Webhook
paymobWebhook.post('/transaction', async (c) => {
  try {
    const body = await c.req.json();
    
    // Verify HMAC
    const hmac = c.req.query('hmac');
    if (env.PAYMOB_HMAC_SECRET && hmac) {
      const data = [
        body.obj.amount_cents,
        body.obj.created_at,
        body.obj.currency,
        body.obj.error_occured,
        body.obj.has_parent_transaction,
        body.obj.id,
        body.obj.integration_id,
        body.obj.is_3d_secure,
        body.obj.is_auth,
        body.obj.is_capture,
        body.obj.is_refunded,
        body.obj.is_standalone_payment,
        body.obj.is_voided,
        body.obj.order.id,
        body.obj.owner,
        body.obj.pending,
        body.obj.source_data.pan,
        body.obj.source_data.sub_type,
        body.obj.source_data.type,
        body.obj.success,
      ].join('');
      
      const expectedHmac = crypto
        .createHmac('sha512', env.PAYMOB_HMAC_SECRET)
        .update(data)
        .digest('hex');
      
      if (hmac !== expectedHmac) {
        console.warn('Invalid Paymob HMAC');
        return c.json({ error: 'Invalid HMAC' }, 401);
      }
    }
    
    const transactionId = body.obj.id;
    const orderId = body.obj.order?.merchant_order_id;
    const success = body.obj.success;
    // const amountCents = body.obj.amount_cents;
    
    if (!orderId) {
      return c.json({ status: 'no_order_id' });
    }
    
    // Find order
    const order = await db.query.orders.findFirst({
      where: eq(schema.orders.id, orderId),
    });
    
    if (!order) {
      console.warn('Order not found:', orderId);
      return c.json({ status: 'order_not_found' });
    }
    
    // Update order
    if (success) {
      await db.update(schema.orders)
        .set({
          paymentStatus: 'paid',
          paymentId: String(transactionId),
          paidAt: new Date(),
          status: 'confirmed',
          updatedAt: new Date(),
        })
        .where(eq(schema.orders.id, orderId));
      
      // Update customer stats
      if (order.customerId) {
        const customer = await db.query.customers.findFirst({
          where: eq(schema.customers.id, order.customerId),
        });
        
        if (customer) {
          await db.update(schema.customers)
            .set({
              totalSpend: (customer.totalSpend || 0) + order.total,
              loyaltyPoints: (customer.loyaltyPoints || 0) + Math.floor(order.total / 10),
              updatedAt: new Date(),
            })
            .where(eq(schema.customers.id, order.customerId));
        }
      }
      
      // Broadcast
      await broadcast.orderUpdated({
        id: order.id,
        status: 'confirmed',
        updatedAt: new Date(),
      });
      
      await broadcast.alert({
        type: 'payment',
        title: `تم استلام دفعة 💰`,
        message: `الطلب #${order.orderNumber}: ${order.total} جنيه`,
        severity: 'info',
      });
    } else {
      await db.update(schema.orders)
        .set({
          paymentStatus: 'failed',
          adminNotes: `فشل الدفع: ${body.obj.data?.txn_response_code || 'Unknown'}`,
          updatedAt: new Date(),
        })
        .where(eq(schema.orders.id, orderId));
    }
    
    return c.json({ status: 'ok' });
  } catch (error) {
    console.error('Paymob webhook error:', error);
    return c.json({ status: 'error' }, 500);
  }
});

// Token Webhook (for saved cards)
paymobWebhook.post('/token', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Paymob token event:', body);
    return c.json({ status: 'ok' });
  } catch (error) {
    return c.json({ status: 'error' }, 500);
  }
});
