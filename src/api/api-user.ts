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
  return request("/user/platformAccounts", data, config);
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
//   用户删除
export const delUser = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "delStr";
  return request("/user", data, config);
};
//   用户添加、修改
export const addUser = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/user", data, config);
};

//  用户一键发布所有的平台
export const platformAccounts = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/video/platformAccounts", data, config);
};

//  上传图片或者视频
export const uploadFile = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "formData";
  return request("/video/upload", data, config);
};
//  一键发布视频
export const subPlatformVideo = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/video", data, config);
};
//  获取视频列表
export const getVideoList = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/video", data, config);
};
//   快手授权
export const getKsAuth = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/ks/auth/connectFullUrl", data, config);
};
//   授权列表
export const getAuthList = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/platformAccount", data, config);
};
//   授权列表删除
export const delAuth = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "delStr";
  return request("/platformAccount", data, config);
};
