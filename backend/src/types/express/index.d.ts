import { Request } from "express";
import { PayloadType } from "../jwt";

declare global {
  namespace Express {
    interface Request {
      user?: PayloadType
    }
  }
}