import mongoose from "mongoose";

 const subCategorySchema = new mongoose.Schema({
    name : {
        type: Stirng,
        default: ""
    },
    image : {
        type: String,
        default: ""
    },
    categoryId : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ]
 },{
    timestamps : true
 })

 const SubCategoryModel = mongoose.model('subCategory', subCategorySchema);

 export default SubCategoryModel;