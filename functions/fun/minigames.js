var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
module.exports = {
    reaction: function (message) {
        var reacted = false
        var me = 593821541934825493
        message.channel.send(locales.minigames.ready).then(function (message) {
            setTimeout(function () { message.edit(locales.minigames.steady) }, 5000)
            setTimeout(function () { message.edit(locales.minigames.go) }, 10000)
            setTimeout(function () { message.react("🔴") }, 10000)
            setTimeout(function () { message.edit("STOP ") }, 11000)
            //setTimeout(function () {MessageReaction.remove(message.author.id)}, 11000)
        })
        //if(message.author.id == MessageReaction.users ){
        //   message.channel.send("Good Job")
        // }
    },
    diceroll: function (message) {
        let dice = Math.floor(Math.random() * 6) + 1
        switch (dice) {
            case 1:
                message.channel.send(locales.minigames.dice1, {
                    file: "https://i.ibb.co/V0ykKRN/dice1.png"
                })
                break;
            case 2:
                message.channel.send(locales.minigames.dice2, {
                    file: "https://i.ibb.co/ZGPvsXL/dice2.png"
                })
                break;
            case 3:
                message.channel.send(locales.minigames.dice3, {
                    file: "https://i.ibb.co/Z891FGq/dice3.png"
                })
                break;
            case 4:
                message.channel.send(locales.minigames.dice4, {
                    file: "https://i.ibb.co/qNYLRMt/dice4.png"
                })
                break;
            case 5:
                message.channel.send(locales.minigames.dice5, {
                    file: "https://i.ibb.co/LP9mZ4V/dice5.png"
                })
                break;
            case 6:
                message.channel.send(locales.minigames.dice6, {
                    file: "https://i.ibb.co/93SZs7J/dice6.png"
                })
                break;
            default:
                message.channel.send(locales.minigames.dice-message1 + dice + locales.minigames.dice-message2)
                break;
        }
    },
    coinflip: function (message) {
        let coin = Math.floor(Math.random() * 2) + 1
        switch (coin) {
            case 1:
                message.channel.send(locales.minigames.front, {
                    file: "https://i.ibb.co/6D10tCt/KM187-2002b.jpg"
                })
                break;
            case 2:
                message.channel.send(locales.minigames.back, {
                    file: "https://i.ibb.co/qpwF24k/Uncirculated-Obverse-small.jpg"
                })
                break;
        }
    }
}

