import * as schema from '@/lib/db/schema';
import 'dotenv/config';
import {drizzle} from 'drizzle-orm/libsql';

export const db = drizzle({ connection: { url: process.env.DB_FILE_NAME! }, schema });