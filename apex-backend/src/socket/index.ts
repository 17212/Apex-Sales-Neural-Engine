import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/constants.js';
import { JwtPayload } from '../types/api.types.js';

interface AuthenticatedSocket extends Socket {
  user?: JwtPayload;
  tenantId?: string;
}

export function initializeSocket(httpServer: HttpServer): SocketServer {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Authentication middleware
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, JWT_CONFIG.secret) as JwtPayload;
      socket.user = decoded;
      socket.tenantId = decoded.tenantId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    const tenantId = socket.tenantId;
    
    console.log(`Socket connected: ${socket.id} (Tenant: ${tenantId})`);

    // Join tenant room for broadcasts
    if (tenantId) {
      socket.join(`tenant:${tenantId}`);
    }

    // Handle joining conversation rooms
    socket.on('join:conversation', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`Socket ${socket.id} joined conversation:${conversationId}`);
    });

    // Handle leaving conversation rooms
    socket.on('leave:conversation', (conversationId: string) => {
      socket.leave(`conversation:${conversationId}`);
    });

    // Handle typing indicators
    socket.on('typing:start', (data: { conversationId: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit('typing:start', {
        userId: socket.user?.userId,
        conversationId: data.conversationId,
      });
    });

    socket.on('typing:stop', (data: { conversationId: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit('typing:stop', {
        userId: socket.user?.userId,
        conversationId: data.conversationId,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

// Helper to emit events to specific tenant
export function emitToTenant(io: SocketServer, tenantId: string, event: string, data: unknown): void {
  io.to(`tenant:${tenantId}`).emit(event, data);
}

// Helper to emit events to conversation
export function emitToConversation(io: SocketServer, conversationId: string, event: string, data: unknown): void {
  io.to(`conversation:${conversationId}`).emit(event, data);
}
