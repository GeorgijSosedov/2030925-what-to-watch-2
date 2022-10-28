import { NextFunction } from "express"
import { Request, Response } from "got"
import { HttpMethod } from "./http-method.enum"

export interface RouteInterface {
    path: string;
    method: HttpMethod;
    handler: (req: Request, res: Response, next: NextFunction) => void;
  }