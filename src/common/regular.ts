/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-28 09:52:05
 * @LastEditors: 陈钊贤
 * @Description:
 * @LastEditTime: 2021-10-27 22:48:13
 */
// import i18n from "@/config/i18n";
import { objAny } from "@/common/common-interface";
const regular: objAny = {
  towNumber: /^(\d+|\d+\.\d{1,2})$/, // 数值最多保留两位小数
  phone: /^1[3456789]\d{9}$/, // 手机
  userName: /^[a-zA-Z0-9][a-zA-Z0-9_]*$/,
  name: /^[a-zA-Z0-9_()\u4e00-\u9fa5]+$/, // // 名称
  email: /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, // 邮箱
  tel: /[^0-9-]+/, // 座机或者手机
  numAB: /^[0-9a-zA-Z]+$/, // 数字和字母
  numABArrStr: /^[0-9a-zA-Z,]+$/, // 数字和字母
  number: /^[0-9]+$/, // 数字
};
const validate: objAny = {
  regularData: regular,
  towNumber: /^(\d+|\d+\.\d{1,4})$/, // 数值最多保留两位小数
  // name(rule: objAny, value: string, callback: regCallback) {
  //   const name = rule.name || '名称';//i18n.t("regular.name");
  //   const max = rule.max || 20;
  //   const min = rule.min || 1;
  //   if (value === "") {
  //     callback(new Error(i18n.t("regular.please") + name));
  //   } else if (value.length > max) {
  //     callback(
  //       new Error(
  //         name + i18n.t("regular.max") + max + i18n.t("regular.maxText")
  //       )
  //     );
  //   } else if (value.length < min) {
  //     callback(
  //       new Error(
  //         name + i18n.t("regular.min") + min + i18n.t("regular.maxText")
  //       )
  //     );
  //   } else {
  //     callback();
  //   }
  // },
  // abcNumber(rule: objAny, value: string, callback: regCallback) {
  //   const name = rule.name || i18n.t("regular.name");
  //   const max = rule.max || 20;
  //   const min = rule.min || 1;
  //   const reg = regular.numAB;
  //   if (value === "") {
  //     callback(new Error(i18n.t("regular.please") + name));
  //   } else if (value.length > max) {
  //     callback(
  //       new Error(
  //         name + i18n.t("regular.max") + max + i18n.t("regular.maxText")
  //       )
  //     );
  //   } else if (value.length < min) {
  //     callback(
  //       new Error(
  //         name + i18n.t("regular.min") + min + i18n.t("regular.maxText")
  //       )
  //     );
  //   } else if (rule.len && value.length != rule.len) {
  //     callback(new Error(name + rule.len + i18n.t("regular.maxText")));
  //   } else if (!reg.test(value)) {
  //     callback(new Error(name + i18n.t("regular.numberABC")));
  //   } else {
  //     callback();
  //   }
  // },
  // userName(rule: objAny, value: string, callback: regCallback) {
  //   const name = rule.name || i18n.t("regular.name");
  //   const max = rule.max || 20;
  //   const min = rule.min || 1;
  //   const reg = regular.userName;
  //   if (value === "") {
  //     callback(new Error(i18n.t("regular.please") + name));
  //   } else if (value.length > max) {
  //     callback(
  //       new Error(
  //         name + i18n.t("regular.max") + max + i18n.t("regular.maxText")
  //       )
  //     );
  //   } else if (value.length < min) {
  //     callback(
  //       new Error(
  //         name + i18n.t("regular.min") + min + i18n.t("regular.maxText")
  //       )
  //     );
  //   } else if (!reg.test(value)) {
  //     callback(new Error(name + i18n.t("regular.number_ABC")));
  //   } else {
  //     callback();
  //   }
  // },
  // tel(rule: objAny, value: string, callback: regCallback) {
  //   const reg = regular.tel;

  //   if (rule.type === "valueNull") {
  //     if (value === "" || !value) {
  //       callback();
  //     } else if (reg.test(value) || value.length < 7 || value.length > 15) {
  //       callback(new Error(i18n.t("regular.tel") + ""));
  //     } else {
  //       callback();
  //     }
  //   } else {
  //     if (value === "") {
  //       callback(new Error(i18n.t("regular.phone") + ""));
  //     } else if (reg.test(value) || value.length < 7 || value.length > 15) {
  //       callback(new Error(i18n.t("regular.tel") + ""));
  //     } else {
  //       callback();
  //     }
  //   }
  // },
  phone(rule: objAny, value: string, callback: regCallback) {
    const reg = regular.phone;
    if (
      (rule.type === "valueNull" && value === "") ||
      (rule.type === "valueNull" && !value)
    ) {
      callback();
    } else if (value === "") {
      callback(new Error("请输入手机号码"));
    } else if (value.length != 11) {
      callback(new Error("请输入11位的手机号码"));
    } else if (!reg.test(value)) {
      callback(new Error("手机号码的格式不正确，请重新输入"));
    } else {
      callback();
    }
  },
  // int(rule: objAny, value: string, callback: regCallback) {
  //   const name = rule.name || "";
  //   const reg = regular.number;
  //   if (
  //     (rule.type === "valueNull" && value === "") ||
  //     (rule.type === "valueNull" && !value)
  //   ) {
  //     callback();
  //   } else if (value === "") {
  //     callback(new Error(i18n.t("regular.please") + name));
  //   } else if (!reg.test(value)) {
  //     callback(new Error(name + i18n.t("regular.int")));
  //   } else if (rule.maxlength && value.length > rule.maxlength) {
  //     callback(
  //       new Error(
  //         name +
  //           i18n.t("regular.maxInput") +
  //           rule.maxlength +
  //           i18n.t("regular.unit")
  //       )
  //     );
  //   } else if (rule.max && value > rule.max) {
  //     callback(new Error(name + i18n.t("regular.maxNum") + rule.max));
  //   } else if (rule.min != undefined && value < rule.min) {
  //     callback(new Error(name + i18n.t("regular.minNum") + rule.min));
  //   } else {
  //     callback();
  //   }
  // },
  // money(rule: objAny, value: string, callback: regCallback) {
  //   const reg = regular.towNumber;
  //   const name = rule.name || i18n.t("regular.money");
  //   if (value === "") {
  //     callback(new Error(i18n.t("regular.please") + name));
  //   } else if (!reg.test(value)) {
  //     callback(new Error(name + i18n.t("regular.towDecimal" + "")));
  //   } else if (rule.max && value > rule.max) {
  //     callback(new Error(name + i18n.t("regular.maxNum") + rule.max));
  //   } else {
  //     callback();
  //   }
  // },
  // emailRegular(rule: objAny, value: string, callback: regCallback) {
  //   const max = rule.max || 50;
  //   const reg = regular.email;
  //   if (value === "") {
  //     callback(new Error(i18n.t("regular.email") + ""));
  //   } else if (value.length > max) {
  //     callback(
  //       new Error(i18n.t("regular.emailPl") + max + i18n.t("regular.maxText"))
  //     );
  //   } else if (!reg.test(value)) {
  //     callback(new Error(i18n.t("regular.emailError") + ""));
  //   } else {
  //     callback();
  //   }
  // }
};

export default validate;
