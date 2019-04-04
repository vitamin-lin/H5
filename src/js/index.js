 (function(){
  var chat = {
    init: function(){
      FastClick.attach(document.body);
      var _this = this;
      this.bind();
    },

    bind: function(){
      this.initPage();
    },
    initPage:function() {
      // 判断初始进场页面
      // axios.post('http://39.106.32.247:6701/api/auth_userInfo', {
      //   projectIds: '5c7f2b317f495a067126d034',
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      let is_fans = true;
      is_fans ? $('.is_fans').show() : $('.no_fans').show();
    }
  }

  chat.init();
})();
