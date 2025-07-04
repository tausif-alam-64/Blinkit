import Axios from '../utils/Axios'
import SummaryApi  from '../common/SummaryApi'

const uploadImage = async ( image ) => {
    try {
        const formData = new formData();
        formData.append('image',image)

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData
        })
    } catch (error) {
        return error;
    }
}

export default uploadImage;