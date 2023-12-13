import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import {
    login
} from '../controller/login.js';
import {
    getCategory
} from '../controller/category.js';


import {
    getProduct,
    getProductByCategory,
    getProductById,
    postProducts,
    editProdcutById,
    deleteProductById

} from '../controller/product.js';

import {
    getTransaction,
    getTransactionById,
    postTransaction
} from '../controller/transaction.js';

import {
    getTranactionDetail,
    getTranactionDetailByTransaction
} from '../controller/transaction_detail.js';
import {
    postUsers,
    getUser,
    getUsersById,
    putUserById,
    deleteUserById
} from '../controller/user.js';


const router = express();
const upload = multer({
    dest: "public/images"
})
router.use(cookieParser());
router.use(express.json());

//login
router.post("/api/v1/login", login);

router.use((req, res, next) => {
    if (req.path.startsWith("/api/v1/login") || req.path.startsWith("/css/stylelogin") || req.path.startsWith("/poto") || req.path.startsWith("/css/style-admin")) {
        next();
    } else {
        let authorized = false;
        if (req.cookies.token) {
            try {
                req.me = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
                authorized = true;
            } catch (error) {
                res.clearCookie("token");
                res.clearCookie("role");
                res.status(401).send({
                    message: "unauthorized"
                });
            }
        }
        if (authorized) {
            if (req.path.startsWith("/login")) {
                if (req.cookies.role === "SUPPER_ADMIN") {
                    res.redirect("/admin");
                } else {
                    res.redirect("/kasir");
                }
            } else {
                next();
            }
        } else {
            if (req.path.startsWith("/login") || req.path.startsWith("/register")) {
                next();
            } else {
                if (req.path.startsWith("/api")) {
                    res.status(401).send({
                        message: "unauthorized"
                    });

                } else {
                    res.redirect("/login");
                }
            }
        }
    }
})

//category
router.get("/api/v1/catogiry", getCategory);

//product
router.get("/api/v1/product", getProduct);
router.get("/api/v1/product/:id", getProductById);
router.get("/api/v1/product/category/:id", getProductByCategory);
router.post("/api/v1/product", upload.single("image"), postProducts);
router.put("/api/v1/product/:id", upload.single("image"), editProdcutById);
router.delete("/api/v1/product/:id", deleteProductById);



//transaction
router.get("/api/v1/transaction", getTransaction);
router.get("/api/v1/transaction/:id", getTransactionById);
router.post("/api/v1/transaction", postTransaction)

//transactio Detail
router.get("/api/v1/transaction/detail", getTranactionDetail);
router.get("/api/v1/transaction/detail/transaction/:id", getTranactionDetailByTransaction);

//data kasir
router.post("/api/v1/kasir", postUsers);
router.get("/api/v1/kasir", getUser);
router.get("/api/v1/kasir/:id", getUsersById);
router.put("/api/v1/kasir/:id", putUserById)
router.delete("/api/v1/kasir/:id", deleteUserById);

//logout
router.get("/api/v1/logout", (req, res) => {
    res.clearCookie("token");
    res.clearCookie("role");
    res.send("logout berhasil ");
})

//beli
router.get("api/v1/beli", getTransaction);




export default router