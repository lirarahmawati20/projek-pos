import connection from "../config/database.js";

export async function getCategory(_req, res) {
    const query = `SELECT * FROM category`;
    const data = await connection.query(query);
    if (data.length > 0) {
        res.status(200).json({
            status: "success",
            message: "berhasil menampilkan data",
            data: data
        });
    } else {
        res.status(200).json({
            message: "data kosong",
            data: data
        });
    }
}