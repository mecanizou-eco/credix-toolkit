import { red } from 'colorette'
import { inArray } from 'drizzle-orm'

import { closeLionDatabase, getLionDatabase } from '@/database/database'
import { clientsTaxReceiptTable } from '@/repositories/lion/tables/client-tax-receipts.ts/table'
import { outgoingTaxReceiptTable } from '@/repositories/lion/tables/outgoing-tax-receipt.ts/table'

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

  async createOutgoingTaxReceipt(data: any) {
    const lionDatabase = await getLionDatabase()

    const formattedData = {
      ...data,
      createdAt: this.formatDate(data.createdAt),
      updatedAt: this.formatDate(data.updatedAt),
      issuedAt: this.formatDate(data.issuedAt),
    }

    const response = await lionDatabase
      .insert(outgoingTaxReceiptTable)
      .values(formattedData)
      .onConflictDoNothing()
      .returning()

    return response
  }

  async createClientTaxReceipt(data: any) {
    const lionDatabase = await getLionDatabase()
    const response = await lionDatabase.insert(clientsTaxReceiptTable).values(data).onConflictDoNothing().returning()

    return response
  }

  private formatDate(dateString: string): Date {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${dateString}`)
    }

    return date
  }
}
