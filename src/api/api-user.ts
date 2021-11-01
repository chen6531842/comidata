import { request } from "./api-require";
import { objAny } from "../common/common-interface";

//  发送注册短信验证码
export const getRegisterCode = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/register/sendRegiterCode", data, config);
};

//  提交注册
export const submitRegister = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/register", data, config);
};

//  登录
export const submitLogin = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/login/signIn", data, config);
};

//  发送找回密码短信验证码
export const getSendFindPwdCodeCode = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/login/sendFindPwdCode", data, config);
};

//  重设密码
export const resetPwd = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/login/resetPwd", data, config);
};

//  退出系统
export const logOut = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/login/logOut", data, config);
};
//   角色列表
export const getRoleList = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/role", data, config);
};
//   角色详情
export const getRoleDetails = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "getStr";
  return request("/role", data, config);
};
//   新增/编辑角色
export const addRole = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/role", data, config);
};
//   所有的权限信息
export const getRoleRights = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/role/rights", data, config);
};
//   用户新增用的所有角色
export const getAllRole = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/user/roles", data, config);
};
//   用户新增用的所有平台账户
export const getAllAccounts = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/user/accounts", data, config);
};
//   用户列表
export const getUserList = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/user", data, config);
};
//   用户详情
export const getUserDetails = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "getStr";
  return request("/user", data, config);
};
