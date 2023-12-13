import mariadb from "mariadb";
import * as dotenv from "dotenv"
dotenv.config()

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
});

const conn = await pool.getConnection();
console.log("Basis data telah terhubung.");

export default conn;