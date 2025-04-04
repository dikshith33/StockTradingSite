export const authenticateUser = async (req, res, next) => {
  const { userId } = req.body || req.query;

  if (!userId) return res.status(401).json({ message: "User ID required" });

  req.userId = userId; // Attach userId to request object
  next();
};
