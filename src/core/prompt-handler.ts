import { yellow } from 'colorette'
import prompts, { PromptObject } from 'prompts'

export class PromptHandler {
  private handleAbort(): void {
    console.log('✖ Operation aborted by the user.')
    process.exit(1)
  }

  private async promptForProductionMode(): Promise<boolean> {
    const promptQuestion: PromptObject = {
      type: 'confirm',
      name: 'productionMode',
      message: 'Do you want to run in production mode?',
      initial: false,
    }
    const promptOptions = {
      onCancel: this.handleAbort,
    }
    const response = await prompts(promptQuestion, promptOptions)

    return response.productionMode
  }

  private async confirmAction(message: string): Promise<boolean> {
    const promptQuestion: PromptObject = {
      type: 'confirm',
      name: 'confirmed',
      message,
      initial: true,
    }
    const promptOptions = {
      onCancel: this.handleAbort,
    }
    const response = await prompts(promptQuestion, promptOptions)

    return response.confirmed
  }

  private async handleProductionMode(): Promise<void> {
    const confirmed = await this.confirmAction('Are you sure?')
    if (!confirmed) this.handleAbort()
    console.log(yellow('Running in production mode.'))
  }

  private handleDryRunMode(): void {
    console.log(yellow('Running in dry run mode.'))
  }

  public async confirmProductionMode(): Promise<boolean> {
    const productionMode = await this.promptForProductionMode()
    if (productionMode) {
      await this.handleProductionMode()

      return true
    }
    this.handleDryRunMode()

    return false
  }
}
