import { boolean, integer, numeric, pgSchema, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'

const schema = pgSchema('mecanizou_lion')

export const clientsTaxReceiptTable = schema.table('clients_tax_receipts', {
  id: serial('id').notNull(),
  uid: text('uid').notNull(),
  outgoingTaxReceiptId: integer('outgoing_tax_receipt_id'),
  clientAccountUid: text('client_account_uid').notNull(),
  mecaniId: integer('mecani_id').notNull(),
})
