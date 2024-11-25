import { CommandInterface } from '@/commands/command.interface'
import { NfCreateSchema } from '@/commands/credix-tax-receipt-create/credix-tax-receipt-create.schema'
import { CredixTaxReceiptTransformer } from '@/commands/credix-tax-receipt-create/credix-tax-receipt-create.transformer'
import { CsvFileProcessor } from '@/core/csv-file-processor'
import { PromptHandler } from '@/core/prompt-handler'
import { closeLionDatabase } from '@/database/database'
import LionRepository from '@/repositories/lion/lion.repository'
import ClientTaxReceiptWriter from '@/repositories/lion/utils/client-tax-receipt-writer'
import { ProductionMode } from '@/types/commands'
import { ClientTaxReceiptEntity, OutgoingTaxReceiptEntity } from '@/types/lion'

export class CredixNFCreateCommand implements CommandInterface {
  private readonly promptHandler = new PromptHandler()
  private readonly csvFile: string
  private readonly csvProcessor = new CsvFileProcessor(NfCreateSchema)
  private readonly credixTaxReceiptTransformer = new CredixTaxReceiptTransformer()
  private readonly lionRepository = new LionRepository()
  private readonly clientTaxReceiptWriter = new ClientTaxReceiptWriter()
  private productionMode: ProductionMode = false

  static commandName = 'credix:tax-receipt:create <csv-file>'
  static commandDescription = 'Hellow.'

  async handlePrompts(): Promise<void> {
    this.productionMode = await this.promptHandler.confirmProductionMode()
  }

  constructor({ csvFile }) {
    this.csvFile = csvFile
  }

  async execute(): Promise<void> {
    const records = await this.csvProcessor.parseFile(this.csvFile)

    const transformedRecords = records.map(this.credixTaxReceiptTransformer.toEntity)

    const mecaniIds = transformedRecords.map(record => record.mecaniId)

    const existingClientTaxReceipts: ClientTaxReceiptEntity[] =
      await this.lionRepository.getClientTaxReceiptsByMecaniId(mecaniIds)

    const mecaniIdSet = new Set(existingClientTaxReceipts.map(receipt => receipt.mecaniId))

    const recordsToCreate = transformedRecords.filter(record => !mecaniIdSet.has(record.mecaniId))
    const recordsToUpdate = transformedRecords.filter(record => mecaniIdSet.has(record.mecaniId))

    console.log(
      {
        recordsToCreate: recordsToCreate.length,
        recordsToUpdate: recordsToUpdate.length,
      },
      recordsToCreate,
    )
    // 1. Tem que criar a NF primeiro, porque a nota do cliente depende dela

    // TODO: CRIAR NF PRIMEIRO
    for (const toCreate of recordsToCreate) {
      const { mecaniId, clientAccountUid, outgoingTaxReceiptId } = toCreate
      const clientTaxReceiptToCreate = this.clientTaxReceiptWriter.writeInsertData({
        clientAccountUid,
        mecaniId,
        outgoingTaxReceiptId,
      })

      await this.lionRepository.createClientTaxReceipt(clientTaxReceiptToCreate)
    }

    await closeLionDatabase()
  }
}
