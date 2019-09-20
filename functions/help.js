const Perms = require("./administration/perms.js");
var config = require('../config.json')
var locales = require('../locales/' + config.lang + '.json')
module.exports = {
    help: function (message, Discord) {
        if (Perms.checkperms(message) === true) {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle(locales.help.user1)
                .addField(locales.help.staff1, locales.help.kick +
                    locales.help.notdone, true)
                .addBlankField()
                .addField(locales.help.staff2, locales.help.notdone, true)
                .setFooter(locales.request + message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
        else {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle(locales.help.user2)
                .addField(locales.help.userkat1,
                    locales.help.dice +
                    locales.help.dice +
                    locales.help.coin +
                    locales.help.rickroll +
                    locales.help.avatar +
                    locales.help.rps + 
                    locales.help.notdone
                    , true)
                .addBlankField()
                .addField(locales.help.userkat2, locales.help.play +
                    locales.help.search +
                    locales.help.loop +
                    locales.help.queue +
                    locales.help.leave +
                    locales.help.notdone
                    , true)
                .addBlankField()
                .addField(locales.help.userkat3,
                    locales.bot.meme +
                    locales.help.notdone, true)
                .setFooter(locales.request + message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
    }
}