import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { config } from '@/database/config'

interface DatabaseInstance {
  client: postgres.Sql<any>
  db: ReturnType<typeof drizzle>
}

function getDatabaseInstance(connectionString: string): () => Promise<DatabaseInstance> {
  let instance: DatabaseInstance | null = null

  return async function () {
    if (!instance) {
      const client = postgres(connectionString)
      instance = {
        client,
        db: drizzle(client),
      }
    }

    return instance
  }
}

async function closeConnections(instance: DatabaseInstance): Promise<void> {
  await instance.client.end()
}

const lionFactory = getDatabaseInstance(config.DATABASE_LION)
const ordersFactory = getDatabaseInstance(config.DATABASE_ORDERS)

export async function getLionDatabase(): Promise<DatabaseInstance['db']> {
  const instance = await lionFactory()

  return instance.db
}

export async function getOrdersDatabase(): Promise<DatabaseInstance['db']> {
  const instance = await ordersFactory()

  return instance.db
}

export async function closeLionDatabase(): Promise<void> {
  const instance = await lionFactory()
  await closeConnections(instance)
}

export async function closeOrdersDatabase(): Promise<void> {
  const instance = await ordersFactory()
  await closeConnections(instance)
}
