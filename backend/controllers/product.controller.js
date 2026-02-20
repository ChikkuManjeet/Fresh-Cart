import Product from "../models/product.model.js";

//add product :/api/product/add-product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, offerPrice, category, quantity } = req.body;
        const image = req.files?.map((file) => file.filename)
        if(
            !name||
            !price||
            !offerPrice||
            !description||
            !category||
            !image||
            image.length == 0
        ){
            return res.status(400).json({
                success:false,
                message:"All fields including images are required",
            })
        }
        await Product.create({
            name,
            description,
            price,
            offerPrice,
            category,
            image,
        });
        res.status(201).json({ message: "Product Added Successfully" , success: true});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//get products : api/products/get
export const getProducts = async (req, res) => {
    try {
       const products = await Product.find({}).sort({ createdAt: -1 });
         res.status(200).json({products,success:true}); 
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//get single product : api/products/:id
export const getProductbyId = async (req, res) => {
    try {
        const{id} = req.body;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found", success:false});
        }
        res.status(200).json({product, success:true});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//change stock : api/products/stock

export const changeStock = async (req, res) => {
    try {
        const {id, inStock} = req.body;
        const product = await Product.findByIdAndUpdate(id,{inStock},{new:true});
        if(!product){
            return res.status(404).json({message:"Product not found", success:false});
        }
        res.status(200).json({message:"Stock updated successfully", success:true});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}