const nationalgeofilters = {
    root:"channel",
    url: 'http://www.rssfull.net/rss/nationalgeodayphoto.xml',
    items:[{
        name:"title",
        filter:'channel title',
        index:'0'
    },
    {
        name:"contents",
        filter:"item",
        format:[
            {
                name:'data',
                type:'url',
                filter:'link',
                sub_filter:'.time',
                sub_model:null,
            },
            {
                name:'sub_title',
                filter:'title'
            },
            {
                name:'sub_content',
                filter:'description'
            }
            
        ]
    },
    ]
}

module.exports = nationalgeofilters;