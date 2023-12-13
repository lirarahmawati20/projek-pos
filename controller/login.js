import conn from "../config/database.js";
import jwt from "jsonwebtoken";

export async function login(req, res) {
    const result = await conn.query(
        `SELECT * FROM users  WHERE  email = '${req.body.email}'`
    )
    if (result.length > 0) {
        if (req.body.password === result[0].password) {
            const token = jwt.sign(result[0], process.env.SECRET_KEY,{expiresIn: process.env.JWT_EXPIRES_IN});
            res.cookie("token",token);
            res.cookie("role",result[0].role);
            res.status(200).json({status : "success",  message:"Login Berhasil",data:result[0],token:token});
          } else {
            res.status(401).json({ message: "Kata Sandi Salah."});
          }
    } else {
        res.status(401).json({ message: "Email Tidak Ditemukan."});
    }
}
