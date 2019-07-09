const Perms = require("./perms.js");
module.exports = {
    recommendations: function (message){
        if(Perms.checkperms(message)===true){
            message.channel.fetchMessages().then(messages =>{
                messages.tap(message =>{
                    message.react("✖")
                    message.react("✅")
                })
            })
        }
        else{
            message.channel.send("I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:")
        }
    },
    remove : function(message){
        if(Perms.checkperms(message)===true){
            message.channel.fetchMessages(message.channel).then(message =>{
                message.reaction.forEach(reaction =>{
                    reaction.remove(message.member)
                })
            })
        }
    }
}