//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
   goFaces: function() {
    wx.navigateTo({
      url: '../choose/choose'
    })
  },
   goVideo: function() {
    wx.navigateTo({
      url: '../demo/demo'
    })
  },
  goLayout: function() {
    wx.navigateTo({
      url: '../layout/layout'
    })
  },
  goMain: function() {
    wx.switchTab({
      url: '../wejy/main/main'
    })
    // wx.navigateTo({
    //   url: '../wejy/selectimg/selectimg'
    // })
    
  },
  goLearn:function(){
    console.log('hahah');
    wx.navigateTo({
      url: '../learn/main/main',
    })
  },
  clear:function(){
   wx.getSavedFileList({
     success: function(res){
       // success
       var fl = res.fileList;
       for(let i=0;i<fl.length;i++){
          wx.removeSavedFile({
            filePath: fl[i].filePath,
            success: function(res){
              // success
              console.log("删除成功");
            },
            fail: function() {
              // fail
              console.log("删除失败");
            },
            complete: function() {
              // complete
            }
          })
       }
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
