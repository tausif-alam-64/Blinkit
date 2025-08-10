import uploadImageCloudinary from "../utils/uploadImagecloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images provided",
        error: true,
        success: false
      });
    }

    // Upload each file to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadImageCloudinary(file))
    );

    return res.json({
      message: "Upload done",
      data: uploadResults, // array of Cloudinary results
      success: true,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export default uploadImageController;
