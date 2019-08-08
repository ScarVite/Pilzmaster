const Perms = require("./administration/perms.js");
var config = require('../config.json')
var locales = require('../locales/' + config.lang + '.json')
module.exports = {
    help: function (message, Discord) {
        if (Perms.checkperms(message) === true) {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle('Staff-Help')
                .addField('Moderation', '-kick <user>` - Kickt den Erwähnten User\n' +
                    'Folgt noch', true)
                .addBlankField()
                .addField('Administration', 'Folgt Noch', true)
                .setAuthor(locales.request + message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
        else {
            const helpembed = new Discord.RichEmbed();
            helpembed
                .setColor('#0099ff')
                .setTitle('User-Help')
                .addField('Fun', '`-dice` - Wirft einen Würfel \n' +
                    '`-react` - Das Startet ein Spiel bei welchem ihr Reagieren müsst **WIP**\n' +
                    '`-coin` - Wirft eine Münze \n' +
                    '`-rr <user>` - rickrollt eure Freunde/Feinde\n' +
                    '`-avatar (<user>)` - Sendet euer Profilbild in dem channel'
                    , true)
                .addBlankField()
                .addField('Musik', '`-play <youtube Url>` - Spielt einen Youtube Song ab \n' +
                    '`-loop <youtube link>` - Um das gewählte lied in dauerschleife spielen zu lassen\n' +
                    '`-queue` - um die Warteschlange anzuzeigen\n' +
                    '`-leave` - Beendet Die Wiedergabe und Verlässt den Channel \n' +
                    '`-Folgt Noch`'
                    , true)
                .addBlankField()
                .addField('Informations', 'Folgt Noch', true)
                .setAuthor('Angefordert von: ' + message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(helpembed)
        }
    }
}