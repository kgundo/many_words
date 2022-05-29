import { Request, Response, NextFunction } from "express";

export function testsValidate(req: Request, res: Response, next: NextFunction) {
    console.log('tests validate');
    next();
}