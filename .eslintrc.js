/*
 * @Autor: 陈钊贤
 * @Version: 1.0
 * @Date: 2020-05-20 14:39:10
 * @LastEditors: 陈钊贤
 * @Description: 
 * @LastEditTime: 2020-05-22 10:06:04
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }]
  },
  overrides: [{
    files: ["**/__tests__/*.{j,t}s?(x)"],
    env: {
      mocha: true
    }
  }]
};