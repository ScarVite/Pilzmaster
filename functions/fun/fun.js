module.exports = {
    getavatar: function (message, Discord) {
        const avatarembed = new Discord.RichEmbed();
        if (message.mentions.users.first() !== undefined) {
            avatarembed.setImage(message.mentions.users.first().avatarURL)
            avatarembed.setFooter('Das Profilbild von ' + message.mentions.users.first().tag)
            message.channel.send(avatarembed)
        }
        else {
            avatarembed.setImage(message.author.avatarURL)
            avatarembed.setFooter('Das Profilbild von ' + message.author.tag)
            message.channel.send(avatarembed)
        }
    }
}