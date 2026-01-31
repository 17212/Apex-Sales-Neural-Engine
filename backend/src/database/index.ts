// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Database Connection
// ═══════════════════════════════════════════════════════════════════════════════

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '../core/config/index.js';
import * as schema from './schema/index.js';

// Create Neon client
const sql = neon(env.DATABASE_URL);

// Create Drizzle instance with schema
export const db = drizzle(sql, { schema });

// Export schema for use in other modules
export { schema };

// Type for database instance
export type Database = typeof db;
