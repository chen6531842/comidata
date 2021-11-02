window.subscribers = {
  list: {},
  // 订阅
  subscribe: function (key, fn) {
    if (!this.list[key]) this.list[key] = [];

    this.list[key].push(fn);
  },
  //取消订阅
  unsubscribe: function (key, fn) {
    let fnList = this.list[key];

    if (!fnList) return false;

    if (!fn) {
      // 不传入指定的方法，清空所用 key 下的订阅
      fnList && (fnList.length = 0);
    } else {
      fnList.forEach((item, index) => {
        item === fn && fnList.splice(index, 1);
      });
    }
  },

  // 发布
  publish: function (key, ...args) {
    for (let fn of this.list[key]) fn.call(this, ...args);
  },
};

window.autoCallBack = function (str) {
  // this.console.log(str);
  window.subscribers.publish("autoBack", str); // 执行定阅回调
};
//subscribers.subscribe('autoBack', function(data){});   定阅
// subscribers.unsubscribe('getError');  // 取消定阅
