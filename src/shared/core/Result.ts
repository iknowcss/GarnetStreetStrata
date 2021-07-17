export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: T | string;
  private readonly _value?: T;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
    }

    return this._value as any;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Sad<L, A> | Happy<L, A>;

export class Sad<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isSad(): this is Sad<L, A> {
    return true;
  }

  isHappy(): this is Happy<L, A> {
    return false;
  }
}

export class Happy<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isSad(): this is Sad<L, A> {
    return false;
  }

  isHappy(): this is Happy<L, A> {
    return true;
  }
}

export const sad = <L, A>(l: L): Either<L, A> => {
  return new Sad(l);
};

export const happy = <L, A>(a: A): Either<L, A> => {
  return new Happy<L, A>(a);
};
