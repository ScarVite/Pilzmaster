var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')

async function rpsvs(message,challanger,challanged){
    message.channel.send(challanger + 'it´s your turn, write me in the dms with either 1 = rock 2 = paper 3 = scissors')
}

function rpsplayer(message) {
    var challanger = message.member
    var challanged = message.mentions.users.first()
    message.channel.send(message.member + ' has challanged you to an game of rock paper scissors, do you accept?' + message.mentions.users.first()).then(message => {
        message.react('✅')
        message.react('❌')
        const searchft = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.mentions.users.first().id;
        };
        message.awaitReactions(searchft, { max: 1, time: 15000 }).then(collected => {
            if (collected.first().emoji.name == '✅') {
                message.channel.send('You accepted')
                rpsvs(message,challanger,challanged)
            }
            else {
                if (collected.first().emoji.name == '❌') {
                    message.channel.send(message.member + ' I´m sorry ' + message.mentions.users.first() + ' didn´t accept your duel')
                }
                else {

                }
            }
        }).catch(collected => {
            message.reply(message.mentions.users.first() + ' didn´t reply in time')
        })
    })
}

module.exports = {
    reaction: function (message) {
        var reacted = false
        var me = 593821541934825493
        message.channel.send(locales.minigames.ready).then(function (message) {
            setTimeout(function () { message.edit(locales.minigames.dice.steady) }, 5000)
            setTimeout(function () { message.edit(locales.minigames.dice.ready) }, 10000)
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
                message.channel.send(locales.minigames.dice.dice1, {
                    file: "https://i.ibb.co/V0ykKRN/dice1.png"
                })
                break;
            case 2:
                message.channel.send(locales.minigames.dice.dice2, {
                    file: "https://i.ibb.co/ZGPvsXL/dice2.png"
                })
                break;
            case 3:
                message.channel.send(locales.minigames.dice.dice3, {
                    file: "https://i.ibb.co/Z891FGq/dice3.png"
                })
                break;
            case 4:
                message.channel.send(locales.minigames.dice.dice4, {
                    file: "https://i.ibb.co/qNYLRMt/dice4.png"
                })
                break;
            case 5:
                message.channel.send(locales.minigames.dice.dice5, {
                    file: "https://i.ibb.co/LP9mZ4V/dice5.png"
                })
                break;
            case 6:
                message.channel.send(locales.minigames.dice.dice6, {
                    file: "https://i.ibb.co/93SZs7J/dice6.png"
                })
                break;
            default:
                message.channel.send(locales.minigames.dice.dice - message1 + dice + locales.minigames.dice.dice - message1)
                break;
        }
    },
    coinflip: function (message) {
        let coin = Math.floor(Math.random() * 2) + 1
        switch (coin) {
            case 1:
                message.channel.send(locales.minigames.coin.front, {
                    file: "https://i.ibb.co/6D10tCt/KM187-2002b.jpg"
                })
                break;
            case 2:
                message.channel.send(locales.minigames.coin.back, {
                    file: "https://i.ibb.co/qpwF24k/Uncirculated-Obverse-small.jpg"
                })
                break;
        }
    },
    rps: function (message, choice) {
        if (message.mentions.users.first() == undefined) {
            let cpu = Math.floor(Math.random() * 3) + 1
            // 1 = rock, 2 = paper, 3 = scissors
            switch (choice) {
                case 'r':
                    if (cpu === 1) {
                        message.channel.send('🥌 - ' + locales.minigames.rps.draw)
                    }
                    if (cpu === 2) {
                        message.channel.send('📰 - ' + locales.minigames.rps.win)
                    }
                    if (cpu === 3) {
                        message.channel.send('✂ - ' + locales.minigames.rps.loose)
                    }
                    break;
                case 'p':
                    if (cpu === 1) {
                        message.channel.send('🥌 - ' + locales.minigames.rps.loose)
                    }
                    if (cpu === 2) {
                        message.channel.send('📰 - ' + locales.minigames.rps.draw)
                    }
                    if (cpu === 3) {
                        message.channel.send('✂ - ' + locales.minigames.rps.win)
                    }
                    break;
                case 's':
                    if (cpu === 1) {
                        message.channel.send('🥌 - ' + locales.minigames.rps.win)
                    }
                    if (cpu === 2) {
                        message.channel.send('📰 - ' + locales.minigames.rps.loose)
                    }
                    if (cpu === 3) {
                        message.channel.send('✂ - ' + locales.minigames.rps.draw)
                    }
                    break;
                default:
                    message.channel.send(locales.minigames.rps.choose)
            }
        }
        else {
            rpsplayer(message)
        }
    }
}

