// src/types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}
