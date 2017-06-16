var cheerio = require("cheerio");
var async = require("async")

var request = require('request');
var rp = require('request-promise');


function isArray(obj) {   
  return Object.prototype.toString.call(obj) === '[object Array]';    
}  

getItem = function (f,callback){
    const r = $(f.filter);
    let myPromise = new Promise((resolve,reject)=>{return 'start'})
    let ret,obj={},datas;
    if(f.index) {
        ret = r.eq(f.index).text()
            obj[f.name]=ret;
             callback(obj)
    }
    else if(f.format){
        ret=[]
        flength = f.format.length-1
        async.waterfall([(cb)=>{
            r.each((i,ri)=>{
                const rlength = r.length-1
                let lastRQ = i !==rlength?request:rp;
                let lastPromise;
            f.format.forEach((item,j)=>{
                ret[i] = {}
                const rr = r.eq(i).children(item.filter)
                
                if(item.type == "url"){
                    try{
                         let tPromise =   lastRQ(rr.text(),  (error, response, body)=> {
                                if (!error && response.statusCode == 200) {
                                    Q = cheerio.load(body,item.sub_mode=="xml"&&{
                                    ignoreWhitespace: true,
                                    xmlMode: true
                                    });
                                    ret[i][item.name]=Q(item.sub_filter).eq(0).text();
                                    
                                    if(i==rlength&& j==flength) {
                                        obj[f.name]=ret;
                                        cb(null,obj)
                                    }
                                }
                            })
                            if(i ==rlength) {
                                lastPromise = tPromise
                            }
                    //req()
                    }catch(e){
                        cb('url',"err")
                    }
                }else{
                        ret[i][item.name] = rr.text();
                        // callback(obj)
                        
                        if(i==rlength&& j==flength) {
                            lastPromise.then(ret=>{
                                obj[f.name]=ret;
                                cb(null,obj)
                            })
                            
                        }
            }})})
        },(obj,cb)=>{
            
            obj[f.name]=ret;
            callback(obj)
            cb(null,"ok")
        }],(err,ret)=>{
            console.log(err+ret)
        }) 

    }
    else{
        ret = r.text()
        obj[f.name]=ret;
        callback(obj)
    }
 
}
module.exports = getItem;
// http.createServer(function (req, res){
//     https.get("https://www.baidu.com",function(res){
//         console.warn(res)
//     })
// }).listen(3000);

