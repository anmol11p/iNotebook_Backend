export const ValidationMiddleware = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    if (err?.errors) {
      return res.status(400).json({
        message: "Error in filling inputs",
        extraDetails: err.errors.map((e) => e.message),
      });
    }

    return res.status(500).json({
      message: "Validation middleware failed",
      extraDetails: err.message || err,
    });
  }
};
