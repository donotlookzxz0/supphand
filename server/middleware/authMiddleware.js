import jwt from "jsonwebtoken";
import pool from '../config/db.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await pool.query("SELECT * FROM users WHERE id = $1",[decoded.id]);

    if (user.rows.length === 0) {
        return res.status(400).json({ message: "User not found" });
    }
        req.user = user.rows[0];
        next();
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message:"Unauthorized, token failed"})
    }
};
