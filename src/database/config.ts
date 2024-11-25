import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  DATABASE_LION: z.string().url(),
  DATABASE_ORDERS: z.string().url(),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error('Variáveis de ambiente inválidas:', env.error.format())
  process.exit(1)
}

export const config = {
  DATABASE_LION: env.data.DATABASE_LION,
  DATABASE_ORDERS: env.data.DATABASE_ORDERS,
}
