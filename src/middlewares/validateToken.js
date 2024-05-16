import jwt from "jsonwebtoken";
import { TOKEN_SECRET_JWT } from "../config.js";

export const authRequired = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    jwt.verify(token, TOKEN_SECRET_JWT, (err, user) => {
      if (err) return res.status(403).send("Invalid token.");
      req.user = user;
    });
  }
  catch (error) {
    return res.status(403).send("Invalid token.");
  }
  
  next();
}