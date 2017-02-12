Page({
    data:{
        goodsList:[]
    },
    onLoad:function(){
        var that = this;
        wx.request({
          url: 'http://218.244.138.191/index.php/openapi/b2c_goods/get_second_page',
          data: {
              "last_modify":0,
              "id":13,
              "version":"1.0"
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
          success: function(res){
            // success
            var items = res.data.result.items;
            if (items !== null || items !== undefined 
                    || items !== ''){
                  that.setData({
                     goodsList:items
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
    clickItem:function(event){
        wx.navigateTo({
          url: '../selectimg/selectimg',
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