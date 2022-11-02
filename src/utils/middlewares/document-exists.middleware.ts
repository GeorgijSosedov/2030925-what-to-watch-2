import { Request, Response, NextFunction  } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export default class DocumentExistsMiddleware implements MiddlewareInterface{
  constructor(
        private readonly serivce: DocumentExistsInterface,
        private readonly entityName: string,
        private readonly paramName: string
  ) {}

  public async execute({params}: Request, _res: Response , next: NextFunction) {
    const documentId = params[this.paramName];
    if (!await this.serivce.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} с ${documentId} не найден.`,
        'DocumentExistsMiddleware'
      );
    }
    next();
  }
}
