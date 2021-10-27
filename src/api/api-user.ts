import { request } from "./api-require";
import { objAny } from "../common/common-interface";

export const getRegisterCode = (data = {}, config: objAny = {}) => {
  config.method = "get";
  return request("/register/sendRegiterCode", data, config);
};
