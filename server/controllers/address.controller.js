import AdressModel from "../models/address.model.js"
import UserModel from "../models/user.model.js"

export const addAddresscontroller = async (req, res) => {
    try {
        const userId = req.userId
        const { address_line, city, state, pincode, country, mobile} = req.body

        const createAddress = new AdressModel({
            address_line,
            city,
            state, 
            pincode,
            country,
            mobile,
            userId : userId
        })

        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push : {
                address_details : saveAddress._id
            }
        })

        return res.json({
            message : "Address Created Successfully",
            error : false ,
            success: true,
            data : saveAddress 
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true, 
            success : false
        })
    }
}

export const getAddresscontroller = async (req, res) => {
    try {
        const userId = req.userId

        const data = await AdressModel.find({userId : userId}).sort({createdAt:-1})

        return res.json({
            message : "List of address",
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId
        const {_id, address_line, city, state, country, pincode, mobile } = req.body

        const updateAddress = await AdressModel.updateOne({_id : _id, userId : userId}, {
            address_line, 
            city, 
            state, 
            country, 
            pincode, 
            mobile
        })
        return (
            res.json({
                message : "Address Updated",
                error : false,
                success: true,
                data : updateAddress
            })
        )
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteAddressController = async(req, res) => {
    try {
        const userId = req.userId
        const {_id} = req.body

        const deleteAddress = await AdressModel.updateOne({_id : _id, userId : userId},{
            status : false
        })

        return (
            res.json({
                message: "Address Deleted",
                error : false,
                success : true,
                data : deleteAddress
            })
        )
    } catch (error) {
        return (
            res.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
        )
    }
}

