const Perms = require("./administration/perms.js");
module.exports = {
    help: function (message, Discord) {
        if (Perms.checkperms(message) === true) {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle('Staff-Help')
                .addField('Moderation', '-kick <user>` - Kickt den Erwähnten User\n'+
                'Folgt noch', true)
                .addBlankField()
                .addField('Administration', 'Folgt Noch', true)
                .setAuthor(message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
        else {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle('User-Help')
                .addField('Fun', '`-dice` - Throws 1 Dice randomly \n' +
                    '`-react` - This will start an Game where you have to react to an message **WIP**\n' +
                    '`-coin` - This Will Flip an Coin \n' +
                    '`-rr <user>` - rickrollt eure Freunde/Feinde\n' +
                    '`-avatar (<user>)` - Sendet euer Profilbild in dem channel'
                    , true)
                .addBlankField()
                .addField('Informations', 'Folgt Noch', true)
                .setAuthor(message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
    }
}