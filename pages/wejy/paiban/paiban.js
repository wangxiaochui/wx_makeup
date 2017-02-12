Page({
    data:{
        twotemp:"0",//两图模板
        threetemp:"0",//三图模板
        contents:[],
        currentPage:1//当前页数
    },
    onLoad:function(option){
        var that = this;
        var from = option.from;
        if(from == "select"){
            wx.getStorage({
              key: 'csImg',
              success: function(res){
                // success
                var jsonfl = res.data;
                var fl = JSON.parse(jsonfl);
                var affl = that.randImg(fl);
                that.setData({
                    contents:affl
                });
              },
              fail: function() {
                // fail
                console.log("fail");
              },
              complete: function() {
                // complete
              }
            })
        }else{
           wx.getStorage({
             key: 'product',
             success: function(res){
                // success
                var jsonContent = res.data;
                var contents1 = JSON.parse(jsonContent);
                that.setData({
                    contents:contents1
                });
             },
             fail: function() {
               // fail
             },
             complete: function() {
               // complete
             }
           })
        }
       

    },

    bindtap:function(event){//切换模板
        for(var ob in event.target){
            console.log("ob="+ob+":"+event.target[ob]);
        }
        
        var arrayContents=this.data.contents;
        var shouldChangeIndex=0;
        if(event.target.id == "two") shouldChangeIndex = 2;
        else if(event.target.id == "three") shouldChangeIndex = 3;
        for(var i=0;i<arrayContents.length;i++){
            var content = arrayContents[i];
            var count = content.countImg;
            if(count == shouldChangeIndex){
                if(content.temptype == 1) content.temptype = 0;
                else content.temptype = 1;
                arrayContents[i] = content;
            }
        }
        console.log("arrayContents = "+ arrayContents.length);
        this.setData({
            contents:arrayContents
        })
    },

    //随机排列图片 ，按每页最多四张排
    randImg:function(imgs){
        var r = Math.round(Math.random()*3+1) ;
        var content = new Array();//待返回内容数组
        var indexurl = ["a","b","c","d"];
        var indexMode = ["a1","b1","c1","d1"];
        var sImgs;
        var countIcontent = 0;
        var that = this;
        var length = imgs.length;
        for(let i=0;i<length;i++){//遍历图片
            var contentItem = new Object();//数组内容子项
            var imgurlItem = new Object();//{'a':'','a1':'aspectFill'
                                            // ,'b':'','b1':'aspectFit'}
            if(i+r>length) r = length - i;
            contentItem.countImg=r;
            for(let j=0;j<r;j++){//循环每页照片数
                var img = imgs[i+j].url;
                imgurlItem[indexurl[j]] = img;
            }
            contentItem.imgUrls=imgurlItem;
            contentItem.temptype=0;
            content.push(contentItem);

            i = i+r-1;//增加索引值
            countIcontent++;
            r = Math.round(Math.random() * 3 + 1);
        }
        
        return content;
    },
    change:function(e){
        console.log("e.detail="+e.detail);
        var current = e.detail.current+1;
        this.setData({
            currentPage:current
        })
    },
    //替换照片
    changeImg:function(event){
        var keyUrls = event.target.id;//值：a,b,c,d
        var that = this;
        var index = this.data.currentPage - 1;
        var arrays = this.data.contents;
        var item = arrays[index];
        var imgItem = item.imgUrls;

        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res){
            // success
            var p = res.tempFilePaths;
            var url = '';
            for(let i in p){
                url = p[0]; 
                imgItem[keyUrls] = url;
                item.imgUrls = imgItem;
                arrays.splice(index,1,item);
                that.setData({
                    contents:arrays
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
    //保存作品
    clickSave:function(){
        var jsonContent = JSON.stringify(this.data.contents);
        wx.setStorage({
            key: 'product',
            data: jsonContent,
            success: function(res){
                // success
             wx.showToast({
                    title:"保存成功"
                })
              
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