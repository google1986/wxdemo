//index.js
Page({
     data: {
          username: '',
          password: ''
     },
     // 获取输入账号
     phoneInput: function(e) {
          this.setData({
               username: e.detail.value
          })
     },

     // 获取输入密码
     passwordInput: function(e) {
          this.setData({
               password: e.detail.value
          })
     },

     // 登录
     login: function() {
          var that = this;
          if (this.data.username.length == 0 || this.data.password.length == 0) {
               wx.showToast({
                    title: '用户名和密码不能为空',
                    icon: 'loading',
                    duration: 2000
               })
          } else {
               wx.request({
                    url: 'http://192.168.0.100:8001/greek/user/login',
                    method: "POST",
                    header: {
                         "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                         "userName": that.data.username,
                         "password": that.data.password
                    },
                    //接收后台回调函数
                    success: function(res) {
                         var resData = res.data.success;
                         if (resData == true) {
                              //调用弹窗组件提示成功
                              wx.showToast({
                                   title: '登录成功',
                                   icon: 'success',
                                   size: 40,
                                   color: 'green',
                                   duration: 2000
                              })
                              // 这里修改成跳转的页面
                              wx.redirectTo({
                                   url: '../list/list'
                              })
                         } else {
                              wx.showToast({
                                   title: '登录失败',
                                   icon: 'warn',
                                   size: 40,
                                   duration: 2000
                              })
                         }
                    }
               })

          }
     }
})