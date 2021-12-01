/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-29 11:27:25
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2021-12-01 16:27:12
 */

import config from "../config/config";
import { objAny } from "../common/common-interface";

export const addJS = (url: string, id: string): Promise<objAny> => {
  return new Promise((resolve) => {
    const scriptObj = document.getElementById(id);
    if (scriptObj != null) {
      resolve({});
    } else {
      const scriptDom = document.createElement("script");
      scriptDom.id = id;
      scriptDom.type = "text/javascript";
      scriptDom.src = url;
      document.head.appendChild(scriptDom);
      scriptDom.onload = function () {
        resolve({});
      };
    }
  });
};
export const addCss = (url: string, id: string): Promise<objAny> => {
  return new Promise((resolve) => {
    const scriptObj = document.getElementById(id);
    if (scriptObj != null) {
      resolve({});
    } else {
      const scriptDom = document.createElement("link");
      scriptDom.id = id;
      scriptDom.rel = "stylesheet";
      scriptDom.href = url;
      document.head.appendChild(scriptDom);
      scriptDom.onload = function () {
        resolve({});
      };
    }
  });
};
export const videoJS = () => {
  const url = config.host + "/js/video.min.js";
  return addJS(url, "videoJS");
};
export const videoCss = () => {
  const url = config.host + "/js/video-js-cdn.css";
  return addCss(url, "videoCss");
};
