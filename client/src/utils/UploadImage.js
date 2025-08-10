import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const uploadImage = async (formData) => {
  try {
    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default uploadImage;
