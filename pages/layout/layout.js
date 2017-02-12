Page({
    data:{
        twotemp:"0",//两图模板
        threetemp:"0",//三图模板
        contents:[
            {countImg:1,imgUrls:{a:"../image/b.jpg"}},
            {countImg:2,temptype:0,imgUrls:{a:"../image/b.jpg",b:"../image/a.jpg"}},
            {countImg:1,imgUrls:{a:"../image/a.jpg"}},
            {countImg:3,temptype:0,imgUrls:{a:"../image/b.jpg",b:"../image/a.jpg"
                ,c:"../image/b.jpg"}},
            {countImg:1,imgUrls:{a:"../image/b.jpg"}},
            {countImg:4,imgUrls:{a:"../image/b.jpg",b:"../image/a.jpg"
                        ,c:"../image/b.jpg",d:"../image/a.jpg"}},
            {countImg:1,imgUrls:{a:"../image/b.jpg"}},
            {countImg:1,imgUrls:{a:"../image/b.jpg"}},
        ]
    },
    bindtap:function(event){
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
    
        this.setData({
            contents:arrayContents
        })
    }
})