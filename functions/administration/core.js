const main = require("../../bot.js");
const auth = require("../../auth/auth.json");
module.exports = { 
    restart: function (message, bot) {
        if (message.author.id == 141218912934166528 || message.author.id == 533665091468656650) {
            console.log(message.author.tag + ' restarted The bot')
            message.reply('You restarted the bot, wait a few seconds')
            bot.channels.get("593824605144088586").send(message.author.tag + ' restarted the bot')
            bot.channels.get("593824605144088586").send('---------------------------------------------------')
            main.changerestarted()
            bot.channels.get("593824605144088586").send('Restarting...')
                .then(msg => bot.destroy())
                .then(() => bot.login(auth.token));
        }
        else {
            message.reply('I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:')
            console.log(message.author.tag + ' tried to use -restart')
        }

    },
    stop: function (message, bot) {
        if (message.author.id == 141218912934166528) {
            console.log(message.author.tag + ' Stopped The bot')
            // message.author.send('You stopped the bot , See you soon')
            bot.channels.get("593824605144088586").send(message.author.tag + ' stopped the bot')
            bot.channels.get("593824605144088586").send('---------------------------------------------------')
            setTimeout(function () { bot.destroy() }, 5000);
        }
        else {
            message.reply('I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:')
            console.log(message.author.tag + ' tried to use -stop')
        } 
    }, 
}