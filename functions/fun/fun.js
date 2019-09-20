var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
var url
const fetch = require("node-fetch");



async function getimg(message) {
    const dankjson = await getjson(URL)
    message.channel.send(locales.bot.meme,{
        file: dankjson["0"]["data"]["children"]["0"]["data"]["url"]
    })
}

async function getjson(url) {
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
        getimg(message)
    }
}