// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {  

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
    let that = this;
    wx.request({
      url: 'http://192.168.0.100:8001/greek/project/list',
      method: 'GET',
      data: {},
      success: function (res) {
        let projectList = res.data.projectList;
        if (projectList == null) {
          const toastText = "获取数据失败";
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            list: projectList
          });
        }
      }
    })
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
  addProject : function(){
    wx.navigateTo({
      url: '../project/add/add',
    })
  },
  deleteProject : function(e){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除[' + e.target.dataset.projectname+']吗？',
      success : function(sm){
        if(sm.confirm){ 
         wx.request({
              url: 'http://192.168.0.100:8001/greek/project/delete',
           data:{
             "projectId": e.target.dataset.projectid
           },
           method:'POST',
           header:{
             "Content-Type": "application/x-www-form-urlencoded"
           },
           success: function(res){
             let result = res.data.success;
             let toastText = "删除成功";
             if(result != true){
               toastText = "删除失败";
             }else{
               that.data.list.splice(e.target.dataset.index,1);
               that.setData({
                 list:that.data.list
               });
             }
             wx.showToast({
               title: toastText,
               icon:'',
               duration:2000
             });
           }
         })
        }
      }
    })
  }
})