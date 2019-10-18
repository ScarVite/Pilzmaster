var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
module.exports = {
    rickroll: function (message) {
        if (message.mentions.users.first() !== message.author) {
            if (message.mentions.users.first() !== undefined) {
                message.mentions.users.first().send(locales.troll.rrlink)
            }
            else {
                message.reply(locales.troll.mention)
            }
        }
        else {
            message.reply(locales.troll.self-mention)
        }
    }
}