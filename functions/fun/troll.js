module.exports = {
    rickroll: function (message) {
        if (message.mentions.users.first() !== message.author) {
            if (message.mentions.users.first() !== undefined) {
                message.mentions.users.first().send("https://www.latlmes.com/breaking/dieser-trick-bringt-waifus-in-die-echte-welt-1")
            }
            else {
                message.reply("Du musst einen Benutzer erwähnen, damit dies funktuniert")
            }
        }
        else {
            message.reply("Du hast dich selber,... Warte so funktuniert das nicht")
        }
    }
}