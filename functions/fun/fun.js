var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
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
    }
}