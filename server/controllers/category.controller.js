import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (req, res) => {
    try {
        const { name, image} = req.body;
        if(!name || !image){
            return res.json({
                message: "Enter required field",
                success: false,
                error: true
            })
        }

        const addCatagory = new CategoryModel({
            name, image
        })

        const saveCategory = await addCatagory.save();

        if(!saveCategory){
            return res.json({
                message: "Failed to save Category",
                success: false,
                error: true
            })
        }

        return res.json({
            message: "Add Category",
            data: saveCategory,
            success: true,
            error: false
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCategoryController = async (req, res) => {
    try {
        const data = await CategoryModel.find();

        return res.json({
            data: data,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const {_id, name, image } = req.body

        const update = await CategoryModel.updateOne({
            _id: _id
        }, {
            name, 
            image
        })

        return res.json({
            message: "Updated Category",
            success: true,
            error: false,
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}