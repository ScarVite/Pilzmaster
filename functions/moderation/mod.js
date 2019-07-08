

module.exports = {
    help: function (message,helpembed) {
        if (CheckPerms(message) === true) {
            helpembed
            .setColor('#0099ff')
            .setTitle('Staff-Help')
            .addField('Moderation', 'Folgt Noch', true)
            .addBlankField() 
            .addField('Administartion', 'Folgt Noch', true)
            .setAuthor('ScarVIte#6606', 'https://cdn.discordapp.com/avatars/141218912934166528/a_d468c94008ad98ef522e1c9f1ffc4bbd.gif','https://scarvite.6te.net')
            message.channel.send(modembed)
        }
        else {
            message.reply(" sry aber bei dir kommt jede hilfe zuspät")

        }
    }
}

function CheckPerms(message) {
    const Moderator = "592405040052830208"
    const Head_Mod = "592447609231245342"
    const Admin = "589473098307338240"
    const Dev = "141218912934166528"
    if (message.member.roles.has(Moderator) || message.member.roles.has(Head_Mod) || message.member.roles.has(Dev) || message.member.roles.has(Admin)) {
        return (true)
    }
    else {
        return (false)
    }

}