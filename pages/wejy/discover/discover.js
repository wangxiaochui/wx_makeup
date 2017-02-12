Page({
    data:{
        covImg:''
    },
    onShow:function(){
      var that = this;
        wx.getStorage({
          key: 'product',
          success: function(res){
            // success
            var jsonContent = res.data;
            var contents = JSON.parse(jsonContent);
            var url = contents[0].imgUrls.a;
            that.setData({
                covImg:url
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    onLoad:function(){
        
    },
    toEdit:function(){
        wx.navigateTo({
          url: '../paiban/paiban',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})