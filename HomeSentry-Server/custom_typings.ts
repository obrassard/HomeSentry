// custom_typings/express/index.d.ts
declare namespace Express {
    interface Request {
        customProperties: string[];
    }
}