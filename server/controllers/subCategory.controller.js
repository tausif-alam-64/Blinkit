import SubCategoryModel from "../models/subCategory.model.js";

export const addSubCategoryController = async (req, res) => {
    try {
        const {name, image, category} = req.body

        if(!name && !image && !category[0]) {
            return res.status(400).json({
                message: "Provide name, image and Category"
            })
        }

        const payload = {
            name,
            image, 
            category
        }

        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save();

        return res.json({
            message: "Sub Category Created",
            error: false, 
            success: true,
            data: save,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export const getSubCategoryController = async (req, res) => {
    try {
        const data = await SubCategoryModel.find().sort({createdAt : -1}).populate("category")
        return res.json({
            message: "Sub Category Data",
            data: data,
            error: false, 
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateSubCategoryController = async (req, res) => {
    try {
        const {_id, name, image, category} = req.body

        const checkSub = await SubCategoryModel.findById(_id)

        if(!checkSub){
            return res.status(400).json({
                message: "Check your _id",
                error: true,
                success: false,
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name, 
            image,
            category
        })

        return res.json({
            message: "Updated Successfully",
            data: updateSubCategory,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false, 
            error: true
        })
    }
}