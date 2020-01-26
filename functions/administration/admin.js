var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')

module.exports = {
    ban: async function (message) {
        message.guild.ban(message.mentions.users.first(), { reason: message.content} )
        message.channel.send(message.mentions.users.first() + ' has been sucesfully banned by ' + message.author)
    }
}