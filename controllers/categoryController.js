import slugify from "slugify";
import { Category } from "../models/categoryModel.js";

export const createCategoryController = async(req,res) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.send("name is req!!");
        }

        const existingCategory = await Category.findOne({name});
        if(existingCategory) {
            return res.status(200).send({
                success : false,
                message : "Category Already Exist"
            })
        }
        const category = await Category.create({
            name,
            slug : slugify(name)
        })
        return res.status(201).send({
            success : true,
            message : "Category created Successfully",
            category
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Something Went Wrong",
            error
        })
    }
}

export const updateCategoryController = async(req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        const category = await Category.findByIdAndUpdate(id, 
        {
            name,
            slug  : slugify(name)
        },  
        {
            new : true
        })
        return res.status(200).send({
            status : true,
            message : "Category updated Successfully",
            category
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Something Went Wrong",
            error
        })
    }
}

export const getAllCategoryController = async (req,res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).send({
            status : true,
            message : "All Category",
            categories
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Something Went Wrong",
            error

        })
    }
}

export const getCatgoryBySlugController = async(req,res) => {
    try {
        const category = await Category.findOne({slug : req.params.slug});
        return res.status(200).send({
            success : true,
            message : "category",
            category
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Something Went Wrong",
            error

        })
    }
}

export const deleteCategoryController = async(req,res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        return res.status(200).send({
            status : true,
            message : "Category deleted Successfully",
            category
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Something Went Wrong",
            error
        })
    }
}