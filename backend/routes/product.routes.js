import express from 'express';

import {authSeller} from '../middlewares/authSeller.js';
import { upload } from '../config/multer.js';
import { addProduct, changeStock, getProductbyId, getProducts, } from '../controllers/product.controller.js';

const router = express.Router();
router.post("/add-product",authSeller,upload.array("image"),addProduct)
router.get("/list",getProducts)
router.get("/:id",getProductbyId)
router.post("/stock",authSeller,changeStock);


export default router;