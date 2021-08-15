import { APIGatewayEventRequestContext, APIGatewayProxyStructuredResultV2, APIGatewayProxyEventV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { BaseLambdaHandler } from './BaseLambdaHandler';
import { Result } from '../core/Result';

export declare type HttpControllerRequestEvent = Omit<APIGatewayProxyEventV2, 'body'> & { body: any };

export declare type HttpControllerRequestContext = APIGatewayEventRequestContext;

export declare type HttpControllerResult = APIGatewayProxyStructuredResultV2;

export abstract class BaseLambdaHttpController<RequestDTO = void> extends BaseLambdaHandler<
  HttpControllerRequestEvent,
  HttpControllerRequestContext,
  HttpControllerResult
> {
  protected async handleError(
    event: HttpControllerRequestEvent,
    context: HttpControllerRequestContext,
    error: any,
  ): Promise<HttpControllerResult> {
    return this.fail(`There was an unhandled error: ${error}`);
  }

  protected abstract parseRequest(
    event: HttpControllerRequestEvent,
    context: HttpControllerRequestContext,
  ): Result<RequestDTO>;

  protected abstract executeRequest(request: RequestDTO): Promise<HttpControllerResult>;

  protected async executeImpl(
    event: HttpControllerRequestEvent,
    context: HttpControllerRequestContext,
  ): Promise<HttpControllerResult> {
    let jsonParsedEvent;
    try {
      jsonParsedEvent = typeof event.body === 'string' ? { ...event, body: JSON.parse(event.body) } : event;
    } catch (error) {
      return this.badRequest('Invalid JSON body');
    }
    let parseResult;
    try {
      parseResult = this.parseRequest(jsonParsedEvent, context);
    } catch (error) {
      return this.fail(error);
    }
    if (parseResult.isFailure) {
      return this.badRequest(parseResult.error as string);
    }
    return this.executeRequest(parseResult.getValue());
  }

  public jsonResponse(statusCode: StatusCodes, body?: any): HttpControllerResult {
    return {
      statusCode,
      body: body !== undefined ? JSON.stringify(body) : body,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  public ok<T>(dto?: T): HttpControllerResult {
    if (dto) {
      return this.jsonResponse(StatusCodes.OK, dto);
    }
    return this.jsonResponse(StatusCodes.NO_CONTENT);
  }

  public badRequest(error?: string): HttpControllerResult {
    return this.jsonResponse(StatusCodes.BAD_REQUEST, { error: error || 'Bad request' });
  }

  public fail(error: string): HttpControllerResult {
    console.error(`Internal server error: ${error}`);
    return this.jsonResponse(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
  }
}
