import { objAny } from "../../common/common-interface";
const menuList: objAny = [
  { name: "首页", icon: "", id: "1", url: "/home" },
  {
    name: "内容管理",
    icon: "",
    id: "2",
    children: [
      { name: "一键发布", icon: "", id: "2-1", url: "/content/release" },
      { name: "视频列表", icon: "", id: "2-2", url: "/content/video" },
      { name: "发现商机", icon: "", id: "2-3", url: "/content/opportunities" },
      {
        name: "商机关键字",
        icon: "",
        id: "2-4",
        url: "/content/opportunities-keyword",
      },
    ],
  },
  { name: "接入授权", icon: "", id: "3", url: "/auto" },
  {
    name: "商务合作",
    icon: "",
    id: "4",
    url: "/cooperate",
    children: [
      { name: "星图达人", icon: "", id: "4-1", url: "/cooperate/xin-tu" },
    ],
  },
  {
    name: "系统设置",
    icon: "",
    id: "5",
    url: "/system",
    children: [
      { name: "人员设置", icon: "", id: "5-1", url: "/system/xin-tu" },
    ],
  },
  { name: "消息中心", icon: "", id: "6", url: "/message" },
];
export default menuList;
