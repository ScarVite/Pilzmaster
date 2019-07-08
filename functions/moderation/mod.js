const Perms = require("../administration/perms.js")
module.exports = {
    help: function (message, Discord) {
        if (Perms.checkperms(message) === true) {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle('Staff-Help')
                .addField('Moderation', 'Folgt Noch', true)
                .addBlankField()
                .addField('Administartion', 'Folgt Noch', true)
                .setAuthor('ScarVite#6606', 'https://cdn.discordapp.com/avatars/141218912934166528/a_d468c94008ad98ef522e1c9f1ffc4bbd.gif', 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
        else {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle('User-Help')
                .addField('Fun', '`-dice` - Throws 1 Dice randomly' +
                    '`-react` - This will start an Game where you have to react to an message', true)
                .addBlankField()
                .addField('Informations', 'Folgt Noch', true)
                .setAuthor('ScarVIte#6606', 'https://cdn.discordapp.com/avatars/141218912934166528/a_d468c94008ad98ef522e1c9f1ffc4bbd.gif', 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
    }
}