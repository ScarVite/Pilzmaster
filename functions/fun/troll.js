var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
module.exports = {
    rickroll: function (message) {
        if (message.mentions.users.first() !== message.author) {
            if (message.mentions.users.first() !== undefined) {
                message.mentions.users.first().send("https://www.latlmes.com/breaking/dieser-trick-bringt-waifus-in-die-echte-welt-1")
            }
            else {
                message.reply(locales.mention)
            }
        }
        else {
            message.reply(locales.self-mention)
        }
    }
}