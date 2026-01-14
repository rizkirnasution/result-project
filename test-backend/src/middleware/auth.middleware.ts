import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

let secretKey = "mysecretkey123";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({
      status: 401,
      message: "Token not found",
      data: null,
    });
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Token not found",
      data: null,
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({
      status: 403,
      message: "Token not valid",
      data: null,
    });
  }
};
