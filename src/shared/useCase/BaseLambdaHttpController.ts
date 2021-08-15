import { APIGatewayEventRequestContext, APIGatewayProxyStructuredResultV2, APIGatewayProxyEventV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { BaseLambdaHandler } from './BaseLambdaHandler';

export declare type HttpControllerRequestEvent = APIGatewayProxyEventV2;

export declare type HttpControllerRequestContext = APIGatewayEventRequestContext;

export declare type HttpControllerResult = APIGatewayProxyStructuredResultV2;

export abstract class BaseLambdaHttpController extends BaseLambdaHandler<
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

  public jsonResponse(statusCode: StatusCodes, body?: any): HttpControllerResult {
    return { statusCode, body, headers: { 'Content-Type': 'application/json' } };
  }

  public ok<T>(dto?: T): HttpControllerResult {
    if (dto) {
      return this.jsonResponse(StatusCodes.OK, dto);
    }
    return this.jsonResponse(StatusCodes.NO_CONTENT);
  }

  public fail(error: string): HttpControllerResult {
    console.error(`Internal server error: ${error}`);
    return this.jsonResponse(StatusCodes.INTERNAL_SERVER_ERROR, { error: 'Internal server error' });
  }
}
