// pages/project/add/operation.js
Page({

     /**
      * 页面的初始数据
      */
     data: {
          projectId: undefined,
          projectName: '',
          projectType: '',
          addUrl: 'http://192.168.0.100:8001/greek/project/add',
          modifyUrl: 'http://192.168.0.100:8001/greek/project/modify'

     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function(options) {
          var that = this;
          //页面初始化，options为页面跳转所带来的参数
          this.setData({
               projectId: options.projectId
          });
          if (options.projectId == undefined) {
               return;
          }
          wx.request({
               url: 'http://192.168.0.100:8001/greek/project/getProjectById',
               data: {
                    "projectId": options.projectId
               },
               method: 'GET',
               success: function(res) {
                    var project = res.data.project;
                    if (project == undefined) {
                         var toastText = "获取数据失败" + res.data.errmsg;
                         wx.showToast({
                              title: toastText,
                              icon: '',
                              duration: 2000
                         });
                    } else {
                         that.setData({
                              projectName: project.projectName,
                              projectType: project.projectType
                         });                         
                    }
               }
          })
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function() {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function() {

     },

     /**
      * 生命周期函数--监听页面隐藏
      */
     onHide: function() {

     },

     /**
      * 生命周期函数--监听页面卸载
      */
     onUnload: function() {

     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function() {

     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function() {

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function() {

     },
     formSubmit: function(e) {
          var that = this;
          var formData = e.detail.value;
          var url = that.data.addUrl;
          if (that.data.projectId != undefined) {
               formData.projectId = that.data.projectId;
               url = that.data.modifyUrl;
          }
          wx.request({
               url: url,
               data: JSON.stringify(formData),
               method: "POST",
               header: {
                    'Content-Type': 'application/json'
               },
               success: function(res) {
                    var result = res.data.success;
                    var toastText = "操作成功";
                    if (result != true) {
                         toastText = "操作失败";
                    }
                    wx.showToast({
                         title: toastText,
                         icon: '',
                         duration: 2000
                    });
                    wx.redirectTo({
                         url: '../../list/list'
                    })
               }
          })
     }
})