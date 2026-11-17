import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.path}`,
    },
  });
};

// Express recognises error handlers by their four-argument signature.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status =
    typeof err?.status === "number" && err.status >= 400 && err.status < 500
      ? err.status
      : 500;

  // Full detail stays in the server log, never in the response.
  console.error("Unhandled error:", err);

  res.status(status).json({
    success: false,
    error:
      status === 500
        ? { code: "INTERNAL_ERROR", message: "An unexpected error occurred." }
        : { code: "BAD_REQUEST", message: "The request could not be processed." },
  });
};