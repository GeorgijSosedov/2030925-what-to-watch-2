import { Request, Response, NextFunction } from "express";
import { MiddlewareInterface } from "./middleware.interface";
import * as jose from 'jose'
import { createSecretKey } from "crypto";
import HttpError from "../errors/http-error";
import { StatusCodes } from "http-status-codes";

export class AuthenticateMiddleware implements MiddlewareInterface {
    constructor(private readonly jwtSecret: string) {}

    public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
        const authorizationHeader = req.headers?.authorization?.split(' ')
        
        if (!authorizationHeader) {
            return next()
        }

        const [, token] = authorizationHeader;

        try {
            const {payload} = await jose.jwtVerify(token,createSecretKey(this.jwtSecret, 'utf-8'));
            req.user = { mail: payload.mail as string, id: payload.id as string};

            return next();
        } catch {
            return next(new HttpError(
                StatusCodes.UNAUTHORIZED,
                'Невалидный токен',
                'AuthenticateMiddleware'
            ))
        }
    }
}