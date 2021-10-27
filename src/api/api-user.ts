import { request } from "./api-require";
import { objAny } from "../common/common-interface";

//  发送注册短信验证码
export const getRegisterCode = (data = {}, config: objAny = {}) => {
  config.method = "get";
  return request("/register/sendRegiterCode", data, config);
};

//  提交注册
export const submitRegister = (data = {}, config: objAny = {}) => {
  return request("/register", data, config);
};

//  登录
export const submitLogin = (data = {}, config: objAny = {}) => {
  return request("/login/signIn", data, config);
};

//  发送找回密码短信验证码
export const getSendFindPwdCodeCode = (data = {}, config: objAny = {}) => {
  return request("/login/sendFindPwdCode", data, config);
};

//  重设密码
export const resetPwd = (data = {}, config: objAny = {}) => {
  return request("/login/resetPwd", data, config);
};
