import Vue from "vue";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import common from "../common/common";
import myConfig from "../config/config";
import store from "../store/index";
import { objAny } from "../common/common-interface";
// import i18n from "@/config/i18n";
// declare type Methods =
//   | "GET"
//   | "OPTIONS"
//   | "HEAD"
//   | "POST"
//   | "PUT"
//   | "DELETE"
//   | "TRACE"
//   | "CONNECT";
// declare interface Datas {
//   method?: Methods;
//   [key: string]: any;
// }
axios.defaults.timeout = 2 * 60 * 1000;
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: objAny) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: objAny) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.msg = "请求错误(400)";
          break;
        case 401:
          err.msg = "未授权，请重新登录(401)";
          break;
        case 403:
          err.msg = "拒绝访问(403)";
          break;
        case 404:
          err.msg = "请求出错(404)";
          break;
        case 408:
          err.msg = "请求超时(408)";
          break;
        case 500:
          err.msg = "服务器错误(500)";
          break;
        case 501:
          err.msg = "服务未实现(501)";
          break;
        case 502:
          err.msg = "网络错误(502)";
          break;
        case 503:
          err.msg = "上传文件过大";
          break;
        case 504:
          err.msg = "请求服务超时";
          break;
        case 505:
          err.msg = "HTTP版本不受支持(505)";
          break;
        default:
          err.msg = `连接出错(${err.response.status})!`;
      }
      return Promise.reject(err.response.data);
    } else {
      err.message = "连接服务器失败!";
      return Promise.reject(err);
    }
  }
);

export const postHeaders = function (data: objAny): objAny {
  const state: any = store.state; // eslint-disable-line
  const loginData: objAny = state.sys.userInfo;
  let headers: objAny = {
    "Content-Type": "application/json;charset=UTF-8",
  };
  if (loginData && loginData.accessToken) {
    headers["Authorization"] = loginData.token;
  }
  if (data) {
    headers = Object.assign(headers, data);
  }

  return headers;
};

export const request = function (
  url: string,
  params: objAny,
  configData?: objAny
): Promise<objAny> {
  if (url.indexOf("http") === -1 && url.indexOf(myConfig.ajaxHost) === -1) {
    const ajaxHost: string = myConfig.ajaxHost;
    url = ajaxHost + url;
  }

  // let config: objAny | number | string;
  let header: objAny = {};
  let method: AxiosRequestConfig["method"] = "POST";
  if (configData) {
    // if (configData.config) {
    //   config = configData.config;
    // }
    if (configData.method === "get") {
      url = url + "?" + common.parseParam(params);
      params = {};
      method = "GET";
    } else if (configData.method === "getStr") {
      let srt = "";
      for (const i in params) {
        srt = srt + "/" + params[i];
      }
      url = url + srt;
      params = {};
      method = "GET";
    } else if (configData.method === "postStr") {
      url = url + "?" + common.parseParam(params);
      params = {};
      method = "POST";
    } else if (configData.method === "getDel") {
      url = url + "?" + common.parseParam(params);
      params = {};
      method = "DELETE";
    } else if (configData.method === "delStr") {
      let srt = "";
      for (const i in params) {
        srt = srt + "/" + params[i];
      }
      url = url + srt;
      params = {};
      method = "DELETE";
    } else if (configData.method === "del") {
      method = "DELETE";
    } else if (configData.method === "formData") {
      // 这个是后面加的,所以看起来有点怪怪
      const paramsForm = new FormData(); // 创建表单
      for (const i in params) {
        paramsForm.append(i, params[i]);// eslint-disable-line
      }
      params = paramsForm;
      method = "POST";
      const formHeaders: objAny = configData.headers || {};
      formHeaders["Content-Type"] = "multipart/form-data";
      configData.headers = formHeaders;
    }
    if (configData.headers) {
      // headers 合并到请求头里面
      header = configData.headers;
    }
  }
  const headers = postHeaders(header);
  // if (!headers) {
  //   return;
  // }

  return new Promise<any>((resolve, reject) => {// eslint-disable-line
    const options: AxiosRequestConfig = {
      method: method,
      url: url,
      data: params,
      headers: headers,
    };
    if (configData && configData.timeout) {
      options.timeout = configData.timeout;
    }
    axios(options)
      .then(async (result) => {
        // TODO 逻辑处理

        const successData = result.data;
        if (configData && configData.noTips) {
          // 不弹出错误
          resolve(successData);
        } else {
          if (successData.code === myConfig.apiStatus) {
            resolve(successData);
          } else {
            // if (config === "download") {
            //   if (result.status === 200) {
            //     resolve(successData);
            //   } else {
            //     Vue.prototype.$Notice.error({
            //       title: "提示",
            //       desc: successData.msg,
            //     });
            //   }
            // } else {
            Vue.prototype.$Notice.error({
              title: "提示",
              desc: successData.msg,
            });
            resolve(successData);
            // }
          }
        }
      })
      .catch(async (error: objAny) => {
        // resolve({
        //   code: 200,
        //   payload: {
        //     token:
        //       "U8OndzJmTYEXiJQMbLc41kZ2ZsV572D3S7KJjWXBavLHM3agdBdZ80u67h3gA5Sx",
        //   },
        // });
        if (configData && configData.errorCallBack) {
          configData.errorCallBack();
        } else {
          Vue.prototype.$Modal.error({
            title: "提示",
            content: error.msg,
          });
          reject(error);
        }
      });
  });
};
