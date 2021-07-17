interface UseCaseErrorProps {
  message: string;
}

export abstract class UseCaseError implements UseCaseErrorProps {
  public readonly message: string;

  protected constructor(message: string) {
    this.message = message;
  }
}
