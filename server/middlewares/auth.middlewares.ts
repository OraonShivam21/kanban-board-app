import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

interface DecodedToken {
  userID: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
    res.status(401).json({ error: "Access token missing or invalid!" });

  const token = authorizationHeader?.split(" ")[1];
  try {
    if (!token) throw "Access token missing or invalid!";
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken;
    if (!decoded.userID) throw "Unauthorized - You're not authorized!";
    req.body.userID = decoded.userID;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default auth;
