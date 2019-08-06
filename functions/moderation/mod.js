const perms = require("../administration/perms.js")
module.exports = {
    kick: function (message) {
            if(perms.checkperms(message) === true){
                if(message.mentions.members.first() !== undefined){
                    message.mentions.members.first().kick().then((member) => {
                        message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
                    })
                }
                else{
                    message.reply('You need to provide an user to kick')
                }
        }
        else{
            message.reply('I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:')
        }
    },
}