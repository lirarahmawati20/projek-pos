import connection from "../config/database.js";

export async function getUser(_req, res) {
    const query = `SELECT * FROM users where role != 'SUPPER_ADMIN'`;
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

export async function getUsersById(req, res) {
    const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
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

export async function postUsers(req, res) {
    const request = req.body
    const check = await connection.query(`SELECT * FROM users WHERE email='${request.email}'`);
    if (check.length > 0) {
        res.status(400).json({
            message: "email sudah digunakan"
        });
    } else {
        await connection.query(
            `INSERT INTO users VALUES (NULL, '${request.name}', '${request.email}','${request.password}','ROLE_USER')`
        );

        res.status(201).json({
            status: "success",
            message: "berhasil manambahkan data",
            data: req.body
        })
    }
}



export async function putUserById(req, res) {
    const request = req.body

    await connection.query(
        `UPDATE users SET name = '${request.name}', email = '${request.email}', password = '${request.password}' WHERE id = '${req.params.id}'`
    );

    res.status(200).json({
        status: "success",
        message: `berhasil update kasir`,
        data: request
    })

}

export async function deleteUserById(req, res) {
    await connection.query(`DELETE FROM users WHERE id = '${req.params.id}'`);
    res.status(200).json({
        status: "success",
        message: "berhasil menghapus kasir"
    });
}