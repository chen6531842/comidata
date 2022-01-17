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
//   更换超级管理员
export const changeSuperUser = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/user/changeSuperUser", data, config);
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
//  分片上传--  准备上传
export const startUpload = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/video/startUpload", data, config);
};
//  片上传--  上传文件
export const shardUploadFile = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "formData";
  return request("/video/multipartUpload", data, config);
};
//  分片上传--  完成上传
export const multipartComplete = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/video/multipartComplete", data, config);
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
//  删除视频
export const delVideo = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "delStr";
  return request("/video", data, config);
};
//  删除多个视频
export const delAllVideo = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "del";
  return request("/video/batchDestroy", data, config);
};
//   快手授权
export const getKsAuth = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/ks/auth/connectFullUrl", data, config);
};
//   抖音授权
export const getDyAuth = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/dy/auth/connectFullUrl", data, config);
};
//   授权列表 -- 同步数据
export const getAuthListSync = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/platformAccount/sync", data, config);
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
//   发现商机列表
export const getCommentList = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/comment", data, config);
};
//   删除商机
export const delComment = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "delStr";
  return request("/comment", data, config);
};
//   商机 -- 发私信
export const sendCommentMessage = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/comment/sendMessage", data, config);
};
//   消息 -- 列表
export const getUserMessageList = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/userMessage", data, config);
};

//   消息 -- 设置消息已读
export const setUserMessageRead = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/userCenter/isReaded", data, config);
};
//   消息 -- 详情
export const getUserMessageDetails = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "getStr";
  return request("/userCenter", data, config);
};
//   消息 -- 是否读取状态
export const getUserMessageIsReadStatuses = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/userMessage/isReadStatuses", data, config);
};

//   商机关键字 -- 所有行业类别
export const getIndustryCategories = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/businessKeyword/industryCategories", data, config);
};
//   商机关键字 -- 所有平台
export const getPlatformAccounts = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/businessKeyword/platformAccounts", data, config);
};
//   商机关键字 -- 新增/编辑
export const addBusinessKeyword = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/businessKeyword", data, config);
};
//   商机关键字 -- 复制
export const copyBusinessKeyword = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  return request("/businessKeyword/copy", data, config);
};
//   商机关键字 -- 列表
export const getBusinessKeyword = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/businessKeyword", data, config);
};
//   商机关键字 -- 详情
export const getBusinessKeywordDetails = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "getStr";
  return request("/businessKeyword", data, config);
};
//   商机关键字 -- 删除
export const delBusinessKeyword = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "delStr";
  return request("/businessKeyword", data, config);
};
//   星图达人 -- 列表
export const getHotStar = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/hotStar", data, config);
};

//   商机关键字 -- 删除
export const delHotStar = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "delStr";
  return request("/hotStar", data, config);
};
//   首页数据
export const getHomeData = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/home", data, config);
};
//   西瓜授权
export const getDyXiguaAuth = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/dy/auth/connectXiguaFullUrl", data, config);
};
//   bilibili 所有的分区
export const getBilibiliTypes = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/video/bilibiliTypes", data, config);
};
//  bilibili授权
export const getBilibiliAuto = (
  data: objAny = {},
  config: objAny = {}
): Promise<objAny> => {
  config.method = "get";
  return request("/bilibili/auth/connectFullUrl", data, config);
};
