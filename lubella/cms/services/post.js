import API from './_api';
import { prepareData } from "./_lib";


const savePostEdit = async (params) => {
  const result = await API.post(`/cms/api-post-edit`, prepareData(params)).catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    };
  })
  const { data } = result;
  return data;
};

const pagination = async (page) => {
  const result = await API.post(`/cms/api-post-pagination`, prepareData({ page }));
  const { data } = result;
  return data;
};

const toggleStatus = async (id, type) => {
  const result = await API.get(`/cms/api-post-toggle-status/${id}-${type}`);
  const { data } = result;
  console.log('toggle', data);
  return data;
};

const postServices = {
  savePostEdit,
  pagination,
  toggleStatus
};
export default postServices;