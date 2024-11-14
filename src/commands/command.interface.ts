export interface CommandInterface {
  handlePrompts(): Promise<void>
  execute(): Promise<void>
}
