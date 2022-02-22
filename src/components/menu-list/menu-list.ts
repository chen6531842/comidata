import { objAny } from "../../common/common-interface";
const menuList: objAny[] = [
  { name: "首页", icon: "", id: "1", url: "/home" },
  {
    name: "内容管理",
    icon: "",
    id: "2",
    children: [
      { name: "一键发布", icon: "", id: "2-0", url: "/content/release" },
      { name: "视频列表", icon: "", id: "2-1", url: "/content/video" },
      {
        name: "粉丝评论(支持群发)",
        icon: "",
        id: "2-2",
        url: "/content/fan-comments",
      },
      { name: "粉丝热评", icon: "", id: "2-3", url: "/content/fan-reviews" },
      { name: "发现商机", icon: "", id: "2-4", url: "/content/opportunities" },
      {
        name: "商机关键字",
        icon: "",
        id: "2-5",
        url: "/content/opportunities-key",
      },
    ],
  },
  { name: "接入授权", icon: "", id: "3", url: "/auto" },
  {
    name: "效果优化工具",
    icon: "",
    id: "3",
    url: "/optimize",
    children: [
      { name: "数据洞察", icon: "", id: "3-0", url: "/optimize/data-insight" },
      {
        name: "投放诊断",
        icon: "",
        id: "3-1",
        url: "/optimize/launch-diagnosis",
      },
    ],
  },
  {
    name: "数据中心",
    icon: "",
    id: "6",
    url: "/data",
    children: [
      { name: "粉丝统计", icon: "", id: "6-0", url: "/data/fans" },
      { name: "内容统计", icon: "", id: "6-1", url: "/data/content" },
      { name: "评论统计", icon: "", id: "6-2", url: "/data/comment" },
    ],
  },
  {
    name: "商务合作",
    icon: "",
    id: "4",
    url: "/cooperate",
    children: [
      { name: "群发私信", icon: "", id: "4-0", url: "/cooperate/mass" },
      { name: "星图达人", icon: "", id: "4-1", url: "/cooperate/xin-tu" },
    ],
  },
  {
    name: "系统设置",
    icon: "",
    id: "5",
    url: "/system",
    children: [
      { name: "人员设置", icon: "", id: "5-0", url: "/system/user" },
      { name: "角色管理", icon: "", id: "5-1", url: "/system/role" },
    ],
  },
  { name: "消息中心", icon: "", id: "6", url: "/message" },
];
export default menuList;
