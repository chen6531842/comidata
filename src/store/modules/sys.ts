// import router from "../../router/index";
import { objAny } from "../../common/common-interface";
const state = {
  isLogin: false,
  winOnresize: false, // 窗口变化
};

const getters = {};

const mutations = {
  /**
   * 是否登录
   * @param state
   * @param status 状态
   */
  SET_ISLOGIN(state: objAny, status: boolean): void {
    state.isLogin = status;
  },

  /**
   * 窗口变化是改变
   * @param state
   */
  SET_WINONRESIZE(state: objAny): void {
    state.winOnresize = !state.winOnresize;
  },
};

const actions = {
  /**
   * 路由初始化
   * @param {*} { commit, state }
   * @param {objAny} obj
   */
  //async getRouter({ commit }: objAny, obj: objAny) {
  // const loginData: objAny = common.get("sys_loginData");
  // const win: objAny = window;
  // if (loginData) {
  //   commit("SET_ISLOGIN", true);
  //   commit("SET_USERINFO", loginData);
  //   let toUrl = obj.to.fullPath;
  //   const ret = await getPermission({ roleId: loginData.rolePkId });
  //   if (ret.status === configData.apiStatus) {
  //     const data: objAny[] = [];
  //     ret.data.map((item: objAny) => {
  //       if (item.modulePkId == configData.sysModulePkId) {
  //         data.push(item);
  //       }
  //     });
  //     // 登录进来，首页还没有做的时候
  //     if (toUrl == "/") {
  //       toUrl = forMenuChild(data);
  //     }
  //     commit("SET_MENULIST", data);
  //     commit("SET_ROUTERLIST", data);
  //   }
  //   obj.next &&
  //     obj.next({
  //       path: toUrl
  //     });
  // } else {
  //   commit("SET_ISGETROUTER", false);
  //   commit("SET_ISLOGIN", false);
  //   if (configData.loginUrl && configData.loginUrl != "") {
  //     win.location.href = configData.loginUrl;
  //   } else {
  //     obj.next({
  //       path: "/login"
  //     });
  //   }
  // }
  // win.onresize = common.debounce(() => {
  //   commit("SET_WINONRESIZE", true);
  // }, 200);
  //},
};

export default {
  state,
  mutations,
  actions,
  getters,
};
