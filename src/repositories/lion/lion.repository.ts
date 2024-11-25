import { red } from 'colorette'
import { inArray } from 'drizzle-orm'

import { closeLionDatabase, getLionDatabase } from '@/database/database'
import { clientsTaxReceiptTable } from '@/repositories/lion/tables/client-tax-receipts.ts/table'

export default class LionRepository {
  async getClientTaxReceiptsByMecaniId(oderReferenceIds: number[]): Promise<any> {
    try {
      const lionDatabase = await getLionDatabase()
      const response = await lionDatabase
        .select()
        .from(clientsTaxReceiptTable)
        .where(inArray(clientsTaxReceiptTable.mecaniId, oderReferenceIds))
        .execute()

      return response
    } catch (error) {
      const errorMessage = (error as Error).message
      console.error(red(`✖ [LionRepository] Error while fetching orders without tax receipt: ${errorMessage}`))
      process.exit(1)
    }
  }

  async createClientTaxReceipt(data: any) {
    console.log({ data })
    const lionDatabase = await getLionDatabase()
    const response = await lionDatabase.insert(clientsTaxReceiptTable).values(data).onConflictDoNothing().returning()

    return response
  }
}
