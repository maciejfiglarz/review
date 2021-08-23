import API from './_api';
import { prepareData } from "./_lib";

const saveCategoryEdit= async (params) => {
    const result = await API.post(`/cms/api-category-edit`, prepareData(params)).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        };
      });
    const { data } = result;
    return data;
};
const saveCategoryNew= async (params) => {
    const result = await API.post(`/cms/api-category-new`, prepareData(params));
    const { data } = result;
    return data;
};
const fetchAll = async () => {
    const result = await API.get(`/cms/api-category-list`);
    const { data } = result;
    return data;
};
const fetchAllActive = async () => {
    const result = await API.get(`/cms/api-category-active`);
    const { data } = result;
    return data;
};
const findOneById = async (id) => {
    const result = await API.get(`cms/api-category-find-by-id/${id}`);
    const { data } = result;
    return data;
};

const pagination = async (page) => {
    const result = await API.post(`/cms/api-category-pagination`, prepareData({ page }));
    const { data } = result;
    return data;
  };

const categoryServices = {
    fetchAll,
    findOneById,
    pagination ,
    saveCategoryEdit,
    saveCategoryNew,
    fetchAllActive
};
export default categoryServices;