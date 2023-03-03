import { create } from "apisauce";

export const api = create({
  baseURL: process.env.CONSTANT_CONTACT_BASE_URL,
});

api.addAsyncRequestTransform((request) => async () => {
  request.headers["Authorization"] =
    "Bearer " + process.env.CONSTANT_CONTACT_ACCESS_TOKEN;
});
