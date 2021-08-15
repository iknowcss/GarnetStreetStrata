export abstract class BaseLambdaHandler<EventType = void, ContextType = void, ResponseType = void> {
  protected constructor() {
    this.execute = this.execute.bind(this);
  }

  protected abstract executeImpl(event: EventType, context: ContextType): Promise<ResponseType>;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected async handleError(event: EventType, context: ContextType, error: any): Promise<ResponseType> {
    console.error(`There was an unhandled error: ${error}`);
    throw error;
  }

  public async execute(event: EventType, context: ContextType): Promise<ResponseType> {
    try {
      return this.executeImpl(event, context);
    } catch (error) {
      return this.handleError(event, context, error);
    }
  }
}
