const Perms = require("./perms.js");
module.exports = {
    recommendations: function (message) {
        if(Perms.checkperms(message) === false) return;
        message.channel.fetchMessages().then(messages => {
            messages.tap(message => {
                message.react("✅")
                message.react("❌")
            })
        })
    },
    remove: function (message) {
        if (Perms.checkperms(message) === true) {
            message.channel.fetchMessages(message.channel).then(message => {
                message.reaction.forEach(reaction => {
                    reaction.remove(message.member)
                })
            })
        }
    }
}