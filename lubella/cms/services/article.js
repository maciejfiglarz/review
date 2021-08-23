import API from './api';
import { prepareData } from "./lib";

const saveArticleNew = async (params) => {
  const result = await API.post(`/cms/api-article-save`, prepareData(params));
  const { data } = result;
  return data;
};
const saveArticleEdit = async (params) => {
  const result = await API.post(`/cms/api-article-edit`, prepareData(params));
  const { data } = result;
  return data;
};
const fetchAll = async () => {
  const result = await API.get(`/cms/article-fetch-all`);
  const { data } = result;
  return data;
};

const pagination = async (page) => {
  const result = await API.post(`/cms/api-article-pagination`, prepareData({ page }));
  const { data } = result;
  return data;
};
const findOneById = async (id) => {
  const result = await API.get(`cms/api-article-find-by-id/${id}`);
  const { data } = result;
  return data;
};
const toggleStatus = async (id) => {
  const result = await API.get(`cms/api-article-toggle-status/${id}`);
  const { data } = result;
  return data;
};

const articleServices = {
  saveArticleEdit,
  saveArticleNew, 
  fetchAll,
  findOneById,
  pagination,
  toggleStatus
};
export default articleServices;