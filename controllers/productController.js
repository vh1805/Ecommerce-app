import fs from 'fs';
import slugify from 'slugify';
import Product from '../models/productModel.js'
export const createProductController = async(req,res) => {
    try {
        const {name, slug,description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        switch(true)  {
            case !name:
                return res.status(499).send({error : "name is req!!"});   
            case  !description:
                return res.status(499).send({error : "description is req!!"}) ;
            case !price:
                return res.status(499).send({error : "price is req!!"});
            case !category:
                return res.status(499).send({error : "category is req!!"});
            case !quantity:
                return res.status(499).send({error : "quantity is req!!"});
            case photo &&  photo.size > 1000000:
                return res.status(499).send({error : "photo is req & size should less than 1MB"});        
                            
        } 

        const products = new Product({...req.fields,slug : slugify(name)});
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        return res.status(201).send({
            success : true,
            message : "product created successfully",
            products
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Error in creating product",
            error 
        })
    }
}

export const updateProductController = async(req,res) =>  {
    try {
        const {name, slug,description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files;
        switch(true)  {
            case !name:
                return res.status(499).send({error : "name is req!!"});   
            case  !description:
                return res.status(499).send({error : "description is req!!"}) ;
            case !price:
                return res.status(499).send({error : "price is req!!"});
            case !category:
                return res.status(499).send({error : "category is req!!"});
            case !quantity:
                return res.status(499).send({error : "quantity is req!!"});
            case photo &&  photo.size > 1000000:
                return res.status(499).send({error : "photo is req & size should less than 1MB"});        
                            
        } 

        const products = await Product.findByIdAndUpdate(req.params.pid, {
            ...req.fields,
            slug : slugify(name)
        }, {new : true 
        })
        if(photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        return res.status(201).send({
            success : true,
            message : "product updated successfully",
            products
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Error in updating product",
            error 
        })
    }
}

export const getProductController = async(req,res) => {
    try{
        const products = await Product.find({}).populate('category').select("-photo").limit(12).sort({createdAt : -1});
        return res.status(200).send({
            status : true,
            message : "products",
            products
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Error in getting product",
            error 
        })
    }
}

export const getSingleProductController =  async(req,res) => {
    try {
        const product = await Product.findOne({slug : req.params.slug}).select("-photo").populate("category");
        return res.status(200).send({
            success : true,
            message : "product",
            product
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Error in getting product",
            error 
        })
    }
}

export const getProductPhotoController = async(req,res) => {
    try {
        const productPhoto = await Product.findById(req.params.pid).select("photo");
        if(productPhoto.photo.data) {
            res.set("Content-type", productPhoto.photo.contentType);
            return res.status(200).send(productPhoto.photo.data);
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Error in getting product Photo",
            error 
        })
    }
}

export const deleteProductController = async(req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.pid).select("-photo");
        return res.status(200).send({
            success : true,
            message : "Delete product successfully",
            product
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Error in getting product Photo",
            error 
        })
    }
}