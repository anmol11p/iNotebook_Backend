export const ErrorMiddleware = (err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || "Unexpected error";
  const extraDetails = err?.extraDetails || "Error details missing";

  return res.status(status).json({ message, extraDetails });
};
