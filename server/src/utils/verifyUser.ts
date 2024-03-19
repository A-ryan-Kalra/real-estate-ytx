import express from "express";
import errorHandler from "./errorHandler";
import jwt from "jsonwebtoken";

export interface UserProps extends express.Request {
  user?: any;
}
export const verifyUser = (
  req: UserProps,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(
    token,
    process.env.JWT_TOKEN as string,
    (err: Error | any, user: any) => {
      if (err) {
        return next(errorHandler(401, "Unauthorized"));
      }
      req.user = user;
      next();
    }
  );
};
