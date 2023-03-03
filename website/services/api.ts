import http from "./http";

export const status = () => {
  return http.get("/");
};
