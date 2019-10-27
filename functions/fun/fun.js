var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
const fetch = require("node-fetch");



async function getimg(message,memeembed) {
    var dankjson = await getjson()
    if(dankjson["0"]["data"]["children"]["0"]["data"]["score"] <1000){
        dankjson = ''
        dankjson = await getjson()
        getimg(message,memeembed)
    }
    else{
        memeembed
        .setTitle(dankjson["0"]["data"]["children"]["0"]["data"]["title"])
        .setURL('https://reddit.com' + dankjson["0"]["data"]["children"]["0"]["data"]["permalink"])
        .setImage(dankjson["0"]["data"]["children"]["0"]["data"]["url"])
        .setFooter('👍 ' + dankjson["0"]["data"]["children"]["0"]["data"]["score"]  )
    message.channel.send(memeembed)
    }
}


async function getjson() {
    var url = 'https://reddit.com/r/dankmemes/random.json'
    const response = await fetch(url);
    return response.json()
}

module.exports = {
    getavatar: function (message, Discord) {
        const avatarembed = new Discord.RichEmbed();
        if (message.mentions.users.first() !== undefined) {
            avatarembed.setImage(message.mentions.users.first().avatarURL)
            avatarembed.setFooter(locales.fun.profilepic + message.mentions.users.first().tag)
            message.channel.send(avatarembed)
        }
        else {
            avatarembed.setImage(message.author.avatarURL)
            avatarembed.setFooter(locales.fun.profilepic + message.author.tag)
            message.channel.send(avatarembed)
        }
    },
    memes:function(message, memeembed){
        getimg(message,memeembed)
    }
}