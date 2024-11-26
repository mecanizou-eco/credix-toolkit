import { boolean, integer, numeric, pgSchema, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'

const schema = pgSchema('mecanizou_lion')

export const outgoingTaxReceiptTable = schema.table('outgoing_tax_receipts', {
  id: integer('id').notNull(),
  uid: text('uid').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  isActive: boolean('is_active').notNull(),
  totalValue: numeric('total_value').notNull(),
  operationsNatureId: integer('operations_nature_id').notNull(),
  status: text('status').notNull(),
  issuedAt: timestamp('issued_at').notNull(),
  integrationProviderId: text('integration_provider_id'),
  serialNumber: integer('serial_number').notNull(),
  number: integer('number').notNull(),
  accessKey: text('access_key').notNull(),
  pdfUrl: text('pdf_url').notNull(),
  xmlUrl: text('xml_url').notNull(),
})
