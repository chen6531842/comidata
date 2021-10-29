import { objAny } from "../common/common-interface";
let configData = {
  loginUrl: null,
  ajaxHost: "/api", // 接口公用的一段
  apiStatus: 200,
  host: "",
  footText: "",
  formSize: "small", // 全局按钮表单的大小
  pickerOptions: {
    disabledDate(time: objAny): boolean {
      return (
        time.getTime() > new Date(new Date().toLocaleDateString()).getTime()
      );
    },
  },
  pickerOptionsMin: {
    disabledDate(time: objAny): boolean {
      return (
        time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
      );
    },
  },
  draggable: false, // 弹出框是否可以拖动
  languageList: [
    { name: "简体中文", value: "zh" },
    { name: "英文", value: "en" },
  ],
  languageKey: "zh",
};
//为了防止哪天在域名中间加了东西 或者接口域名变了 ，然后外面连接一个js 文件 js 文件里放这几个参数就可以了
// 其它打包路径已设置为相对路径 ,只和 static  和 index.html 文件 在同一层级就可以了
const win: objAny = window;
if (win.appConfig && typeof win.appConfig == "object") {
  configData = Object.assign(configData, win.appConfig);
}
export default configData;
