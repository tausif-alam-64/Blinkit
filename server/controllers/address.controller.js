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

        const data = await AdressModel.find({userId : userId})

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