import { Request } from "express";

export interface Env {
    DATABASE_URL: string;
}

export interface RequestWithHeader extends Request {
    authorId?: string;
}