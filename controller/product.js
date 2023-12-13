import connection from "../config/database.js";

export async function getProduct(_req, res) {
    const query = `SELECT a.*, b.name AS category_name FROM product a INNER JOIN category b ON a.id_category=b.id`;
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

export async function getProductById(req, res) {
    const query = `SELECT a.*,b.name AS category_name FROM product a INNER JOIN category b ON a.id_category=b.id WHERE a.id = ${req.params.id}`;
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
//----------
export async function getProductByCategory(req, res) {
    const query = `SELECT a.* ,b.name AS category_name FROM product a INNER JOIN category b ON a.id_category=b.id WHERE b.id = ${req.params.id}`;
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
//.............

export async function postProducts(req, res) {
    const request = req.body
    const check = await connection.query(`SELECT * FROM product WHERE name='${request.name}'`);
    if (check.length > 0) {
        res.status(400).json({
            message: "makanan sudah ada"
        });
    } else {
        if (request.stok < 1 || request.stok > 100) {
            return res.status(400).json({
                message: "stok tidak valid"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "image must be filled",
            });
        }

        await connection.query(
            `INSERT INTO product VALUES (NULL, '${request.name}', '${req.file.filename}', '${request.price}','${request.stok}', '${request.id_category}')`
        );

        res.status(201).json({
            status: "success",
            message: "berhasil manambahkan data",
            data: req.body
        })
    }
}



export async function editProdcutById(req, res) {
    const request = req.body

    // Validasi input
    if (!request.name || !request.price || !request.stok || !request.id_category || !req.file) {
        return res.status(400).json({
            status: "error",
            message: "Semua data wajib diisi.",
        });
    }

    await connection.query(
        `UPDATE product SET name = '${request.name}', price = '${request.price}', stok = '${request.stok}', image = '${req.file.filename}', id_category = '${request.id_category}'
        WHERE id = '${req.params.id}'
    `);

    res.status(200).json({
        status: "success",
        message: `berhasil update produk`,
        data: request
    })

}
export async function deleteProductById(req, res) {
    await connection.query(`DELETE FROM product WHERE id = '${req.params.id}'`);
    res.status(200).json({
        status: "success",
        message: "berhasil menghapus product"
    });
}