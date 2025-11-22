import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
// import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // If it's an AppError → clean operational error
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  // Otherwise → unexpected bug
  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};

