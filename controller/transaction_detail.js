import connection from "../config/database.js";

export async function getTranactionDetail(_req, res) {
    const query = `SELECT * FROM transaction_detail`;
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

export async function getTranactionDetailByTransaction(_req, res) {
    const query = `SELECT * FROM transaction_detail WHERE id_transaction = ${_req.params.id} `;
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