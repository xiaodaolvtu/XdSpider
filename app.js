var cheerio = require("cheerio");
var request = require('request');
var getItem = require("./spider")
var filters = require("./filters")

const filter = filters.NatCH_filter

let datas =[];



function insert (obj){
    datas.push(obj)
}
const url = filter.url,
items = filter.items;

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body, {
     ignoreWhitespace: true,
     xmlMode: true
    });
     const filtersLength = items.length-1;
     items.forEach((ff,i)=>{
         
        return getItem(ff,(ret)=>{
                insert(ret);
                if(i ==filtersLength){
                    //sava datas
                    console.log(JSON.stringify(datas))
                }
            })
    })
  }
})