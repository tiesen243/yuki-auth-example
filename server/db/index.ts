import { drizzle } from 'drizzle-orm/neon-serverless'

import { env } from '@/env'
import * as schema from './schema'

const createDrizzleClient = () =>
  drizzle(env.DATABASE_URL, {
    schema,
    casing: 'snake_case',
  })
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (env.NODE_ENV !== 'production') globalForDrizzle.db = db
