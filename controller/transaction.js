import connection from "../config/database.js";

export async function getTransaction(_req, res) {
    const query = `SELECT * FROM transaction`;
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

export async function getTransactionById(req, res) {
    const query = `SELECT * FROM transaction WHERE id = ${req.params.id}`;
    const data = await connection.query(query);
    if (data.length > 0) {
        res.status(200).json({status: "success", message:"berhasil menampilkan data", data:data});
    }else{
        res.status(200).json({message:"data kosong", data:data});
    }
}

export async function postTransaction(req, res) {
     const request = req.body

     if (request.data.length < 1) {
         res.status(400).json({
             status: "failed",
             message: "data tidak boleh kosong !! "
         })
     }else{

    const date = new Date("2023-12-09T20:45:30");

       var dataTransaksi = await connection.query(
            `INSERT INTO transaction VALUES (NULL, '${date}', '${makeid(10)}', '${request.total_price}','${request.amount}')`
        );

        let id_transaksi = parseInt(dataTransaksi.insertId);

        for(let i=0; i < request.data.length; i++){
            let data = request.data[i];

            await connection.query(
                `INSERT INTO transaction_detail VALUES (NULL, '${data.name}', '${data.price}', '${data.quatity}','${data.total_price}','${id_transaksi}')`
            );


        await connection.query(
            `UPDATE product SET stok = stok - ${data.quatity} WHERE id = '${data.id}'`
        )
    
        }

        res.status(201).json({
            status: "success",
            message: "berhasil manambahkan data"
        })
}
}

function makeid(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

