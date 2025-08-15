import ProductModel from "../models/product.model.js";

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    if (!name || !image[0] || !category[0] || !unit || !price || !description) {
      return res.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }

    const product = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });

    const saveProduct = await product.save()
    
    return res.json({
        message: "Prouduct Created Successfully",
        data: saveProduct,
        error: false,
        success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    let {page, limit, search} = req.body

    if(!page){
      page = 2
    }
    if(!limit){
      limit = 10
    }

    const query = search ? {
      $text : {
        $search : search
      }
    } : {}
    
    const skip = (page - 1) * limit
    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({createdAt : -1}).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ])

    return res.json({
      message : "Product data",
      error : false,
      success: true,
      totalCount: totalCount,
      totalNoPage : Math.ceil(totalCount / limit),
      data : data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}

export const getProductByCategory = async (req, res) => {
  try {
    const {id} = req.body

    if(!id){
      return res.status(400).json({
        message: "provide category id",
        error: true, 
        success : false
      })
    }

    const product = await ProductModel.find({
      category : {$in : id}
    }).limit(15)

    return res.json({
      message: "Category Product List",
      data: product,
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