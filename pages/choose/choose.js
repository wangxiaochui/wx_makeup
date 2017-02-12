var util = require('../../utils/util.js')
Page({
    data:{
        imagePaths:[],
        uploadRes:"to upload all image",
        imgB64:"",
        shibieRes:"结果"
        },
    toChooseImage:function(){//选择照片
        var imgs = this.data.imagePaths;
        var that = this;
        wx.chooseImage({
          count: 9, // 最多可以选择的图片张数，默认9----最多能选九张
          sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res){
            // success
            for(var r in res){
                console.log("r="+r);
            }
            console.log("res.tempFilePaths="+res.tempFilePaths);
            var p = res.tempFilePaths;
            //测试转码basebase64
            // var reader = new FileReader();
            // var fso = new ActiveXObject("Scripting.FileSystemObject");
            // var file = fso.GetFile(p);
            //  var reader = new FileReader();   
            // reader.readAsDataURL(p);   
            // reader.onload = function(e){   
            //     alert(this.result); //就是base64
            //     console.log("imgs1 = "+this.result);  
   
            // }   
            // console.log("imgs1 = "+that.data.imagePaths);

            //选择照片之后存储在集合中
            for(var i=0;i<p.length;i++){
              console.log("imgs[i] = "+p[i]);
              imgs.push(p[i]);
              // wx.saveFile({
              //   tempFilePath: p[i],
              //   success: function(res){
              //     // success
              //     console.log("保存后文件路径="+res.savedFilePath);
              //   },
              //   fail: function() {
              //     // fail
              //   },
              //   complete: function() {
              //     // complete
              //   }
              // })
              // wx.getImageInfo({
              //   src: p[i],
              //   success: function(res){
              //     // success
              //     console.log(res);
              //   },
              //   fail: function() {
              //     // fail
              //   },
              //   complete: function() {
              //     // complete
              //   }
              // })
              // wx.getSavedFileInfo({
              //   filePath: p[i],
              //   success: function(res){
              //     // success
              //     console.log("保存后图片大小="+res.size);
              //   },
              //   fail: function() {
              //     // fail
              //   },
              //   complete: function() {
              //     // complete
              //   }
              // })
            }
            that.setData({
                imagePaths:imgs
            })
            console.log("that.data.imagePaths = "+that.data.imagePaths)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    uploadImage:function(){//上传文件
      var files = this.data.imagePaths;
      var that = this;
      wx.showToast({
        title:"上传中..",
        duration:30000
      })
      //传图片url
      wx.request({
        url: 'http://route.showapi.com/931-1',
        data: {"showapi_appid":"28563","showapi_sign":"a07e5c21971743bfb5497d9aa4e2dc24"
          // ,"showapi_timestamp":"20161208104622","showapi_sign_method":"md5","showapi_res_gzip":"0"
          ,"url":"http://f.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=6c3e5e3f6d061d957d133f3c4ec426e7/dcc451da81cb39db73c24051d3160924ab1830b2.jpg"},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({
              imgB64:res.data.showapi_res_body.image,
              uploadRes:"upload success"
            })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
            wx.hideToast();
            wx.showToast({
              title:"上传完成"
            });
        }
      })

      //传文件流
      // for(var i=0;i<files.length;i++){
      //   wx.uploadFile({
      //     // url: 'http://218.244.138.191/appimg/api.php/upload/save',
      //     url:'https://route.showapi.com/931-1',
      //     filePath:files[i],
      //     name:'img',
      //     header: {'content-type':'application/json'},
      //     formData: {"showapi_appid":"28563","showapi_sign":"a07e5c21971743bfb5497d9aa4e2dc24"
      //     // ,"showapi_timestamp":"20161208104622","showapi_sign_method":"md5","showapi_res_gzip":"0"
      //     }, // HTTP 请求中其他额外的 form data
      //     success: function(res){
      //       // success
      //       console.log("res="+res.data);
      //       console.log("res.data.showapi_res_body="+res.data.showapi_res_body);
      //       var jsbody = eval('(' + res.data + ')');
      //       console.log("jsbody="+jsbody);
      //       that.setData({
      //         imgB64:jsbody.showapi_res_body.image,
      //         uploadRes:"upload success"
      //       })
      //     },
      //     fail: function() {
      //       // fail
      //       that.setData({
      //         uploadRes:"upload fail"
      //       })
      //     },
      //     complete: function() {
      //       // complete
      //       that.setData({
      //         uploadRes:"upload complete"
      //       })
      //       wx.hideToast();
      //       wx.showToast({
      //         title:"上传完成"
      //       });
      //     }
      //   })
      // }
     
    },
    testReq:function(){
      wx.request({
        url: 'http://218.244.138.191/index.php/openapi/b2c_services/getversion',
        data: {'version':'1.3.0','app_type':'android'},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "content-type": "application/x-www-form-urlencoded"},// 设置请求的 header
        success: function(res){
          for(var v in res){
            console.log("res."+v+"="+res.v);
          }
          for(var r in res.data){
            console.log("res.data."+r+"="+res.data);
          }
            console.log("res.data.errorMSg="+res.data.msg);
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    },
    //图像识别请求
    faceshibie:function(event){
      var requestUrl="https://dm-24.data.aliyun.com/rest/160601/face/feature_detection.json";
      //https://dm-23.data.aliyun.com/rest/160601/face/age_detection.json 年龄
      //https://dm-22.data.aliyun.com/rest/160601/face/gender_detection.json 性别
      console.log("event.target.id = " + event.target.id);
      if(event.target.id == "age"){
        requestUrl = "https://dm-23.data.aliyun.com/rest/160601/face/age_detection.json";
      }else if(event.target.id == "sex"){
        requestUrl = "https://dm-22.data.aliyun.com/rest/160601/face/gender_detection.json";
      }
      console.log("requestUrl = " + requestUrl);
      var that = this;
      var files = this.data.imagePaths;
      var ib64 = this.data.imgB64;
      var a = ib64.substring(22,ib64.length);
      var res64 = "{\"inputs\": [{\"image\": {\"dataType\": 50,\"dataValue\":\""+a+"\"}}]}";
      // console.log("res64 = " + res64);
      wx.request({
        url: requestUrl,
       data:res64,
       header:{'Authorization':'APPCODE b0666d4840f14ec586c54cfec7310439'},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function(res){
          for(var r in res){
            console.log("r="+r);
          }
          for(var v in res.data.outputs[0].outputValue){
            console.log("v="+v);
          }
          that.setData({
            shibieRes:res.data.outputs[0].outputValue.dataValue
          })
          
         
          // success
        },
        fail: function() {
          console.log("fail=");
          // fail
        },
        complete: function() {
          console.log("complete=");
          // complete
        }
      })
    }

})