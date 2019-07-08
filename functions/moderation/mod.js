

module.exports = {
    help: function (message,Discord) {
        if (CheckPerms(message) === true) {
            const helpembed = new Discord.RichEmbed();
            helpembed
            .setColor('#0099ff')
            .setTitle('Staff-Help')
            .addField('Moderation', 'Folgt Noch', true)
            .addBlankField() 
            .addField('Administartion', 'Folgt Noch', true)
            .setAuthor('ScarVite#6606', 'https://cdn.discordapp.com/avatars/141218912934166528/a_d468c94008ad98ef522e1c9f1ffc4bbd.gif','https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
        else {
            const helpembed = new Discord.RichEmbed();
            helpembed
            .setColor('#0099ff')
            .setTitle('User-Help')
            .addField('Fun', '`-dice` - Throws 1 Dice randomly               `-react` - This will start an Game where you have to react to an message', true)
            .addBlankField() 
            .addField('Informations', 'Folgt Noch', true)
            .setAuthor('ScarVIte#6606', 'https://cdn.discordapp.com/avatars/141218912934166528/a_d468c94008ad98ef522e1c9f1ffc4bbd.gif','https://scarvite.6te.net')
            message.channel.send(helpembed)
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