import { create } from "apisauce";

const api = create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};
