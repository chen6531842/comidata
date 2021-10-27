// import router from "../../router/index";
import { objAny } from "../../common/common-interface";
import common from "../../common/common";
const state = {
  isLogin: false,
  winOnresize: false, // 窗口变化
  isGetRouter: false,
  loginData: null,
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
  /*
   * 是否经过路由初始化
   * @param {*} state
   * @param {boolean} status
   */
  SET_ISGETROUTER(state: objAny, status: boolean): void {
    state.isGetRouter = status;
  },
  /**
   * 登录信息
   * @param {*} state
   * @param {objAny} data
   */
  SET_LOGINDATA(state: objAny, data: objAny): void {
    state.loginData = data;
  },
};

const actions = {
  /**
   * 路由初始化
   * @param {*} { commit, state }
   * @param {objAny} obj
   */
  async getRouter({ commit }: objAny, obj: objAny) {
    const loginData: objAny = common.get("loginData");
    const win: objAny = window;
    if (loginData) {
      commit("SET_ISGETROUTER", true);
      commit("SET_ISLOGIN", true);
      commit("SET_LOGINDATA", loginData);
      const toUrl = obj.to.fullPath;
      // const ret = await getPermission({ roleId: loginData.rolePkId });
      // if (ret.status === configData.apiStatus) {
      //   const data: objAny[] = [];
      //   ret.data.map((item: objAny) => {
      //     if (item.modulePkId == configData.sysModulePkId) {
      //       data.push(item);
      //     }
      //   });
      //   // 登录进来，首页还没有做的时候
      //   if (toUrl == "/") {
      //     toUrl = forMenuChild(data);
      //   }
      //   commit("SET_MENULIST", data);
      //   commit("SET_ROUTERLIST", data);
      // }
      obj.next &&
        obj.next({
          path: toUrl,
        });
    } else {
      commit("SET_ISGETROUTER", false);
      commit("SET_ISLOGIN", false);

      obj.next({
        path: "/login",
      });
    }
    win.onresize = common.debounce(() => {
      commit("SET_WINONRESIZE", true);
    }, 200);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
