import API from './_api';
import { prepareData } from "./_lib";

const uploadTemponaryImage = async (params) => {
  const result = await API.post(`/cms/api-upload-temponary-image`, prepareData(params));
  const { data } = result;
  return data;
};
const fileServices = {
  uploadTemponaryImage
};
export default fileServices;