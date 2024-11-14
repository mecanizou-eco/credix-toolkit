import { CommandInterface } from '@/commands/command.interface'
import { NfCreateSchema } from '@/commands/credix-tax-receipt-create/credix-tax-receipt-create.schema'
import { CsvFileProcessor } from '@/core/csv-file-processor'
import { PromptHandler } from '@/core/prompt-handler'
import { ProductionMode } from '@/types/commands'

export class CredixNFCreateCommand implements CommandInterface {
  private readonly promptHandler = new PromptHandler()
  private readonly csvFile: string
  private readonly csvProcessor = new CsvFileProcessor(NfCreateSchema)
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

    console.log({ records })
  }
}
