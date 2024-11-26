import { Command } from 'commander'
import dotenv from 'dotenv'

import { CommandInterface } from '@/commands/command.interface'
import { CredixNFCreateCommand } from '@/commands/credix-tax-receipt-create/credix-tax-receipt-create.command'

dotenv.config()

class CommandRunner {
  private program: Command
  constructor() {
    this.program = new Command()
    this.setupCommands()
  }

  private registerCommand<T extends CommandInterface>(
    alias: string,
    description: string,
    CommandClass: new (csvFile: string) => T,
  ): void {
    this.program
      .command(alias)
      .description(description)
      .action(async (csvFile: string) => {
        const commandInstance = new CommandClass(csvFile)
        await commandInstance.handlePrompts()
        await commandInstance.execute()
      })
  }

  private setupCommands = () => {
    this.registerCommand(
      CredixNFCreateCommand.commandName,
      CredixNFCreateCommand.commandDescription,
      class extends CredixNFCreateCommand {
        constructor(csvFile: string) {
          super({ csvFile })
        }
      },
    )
  }

  public parse = (argv: string[]): void => {
    this.program.parse(argv)
  }
}

const commandRunner = new CommandRunner()

commandRunner.parse(process.argv)
