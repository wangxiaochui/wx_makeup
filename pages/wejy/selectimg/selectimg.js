Page({
    data:{
        imgs:[],//[width,height,url]
        countImg:0,
        isFirst:0
    },
    onHide:function(){

    },
    onShow:function(){
      if(this.data.isFirst == 0) this.clickSelect();//只在进入此界面时加载
      this.setData({
        isFirst:1
      })
    },
    //点击选择照片
    clickSelect:function(){
        var that = this;
        wx.chooseImage({
          count: 9, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res){
            // success
            var paths = that.data.imgs;
            var p = res.tempFilePaths;
            for(let i=0;i<p.length;i++){
              wx.getImageInfo({
                src: p[i],
                success: function (res) {
                  var itemImg = new Object();
                  itemImg.width = res.width;
                  itemImg.height = res.height;
                  itemImg.url = p[i];
                  console.log(res.width)
                  console.log(res.height)
                  paths.push(itemImg); 
                   if(i == p.length-1){
                     that.setData({
                        imgs:paths,
                        countImg:that.data.imgs.length
                    })
                    that.saveCacheSelectImg();
                  }
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
    //点击预览照片
    ylPhoto:function(event){
        var that = this;
        var url = event.target.id;
        for(let i=0;i<event.target.length;i++){
            console.log(i);
        }
        console.log("url= "+url);
        var preImgs = [];
        for(let i=0;i<that.data.imgs.length;i++){
            preImgs[i] = that.data.imgs[i].url; 
        } 
        wx.previewImage({
          current: url, // 当前显示图片的链接，不填则默认为 urls 的第一张
          urls: preImgs,
          success: function(res){
            // success
            console.log("success"+res);
          },
          fail: function() {
            // fail
            console.log("fail");
          },
          complete: function() {
            // complete
            console.log("fail");
          }
        })
    },
    saveCacheSelectImg:function(){//临时保存已选图片数组
      var jsonStrSele = JSON.stringify(this.data.imgs);
      wx.setStorage({
        key: 'csImg',
        data: jsonStrSele,
        success: function(res){
          // success
          console.log(res);
        },
        fail: function() {
          // fail
          console.log('saveCacheSelectImg');
        },
        complete: function() {
          // complete
        }
      })
    },
    toPaiban:function(){
      if(this.data.countImg == 0){
          wx.showToast({
            title:'请选择照片'
          });
          // return;
      } 
      wx.navigateTo({
        url: '../paiban/paiban?from=select',
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