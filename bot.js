const Discord = require('discord.js');
var rank = require('./functions/moderation/check_rank.js')
var auth = require('./auth/auth.json');
var round = require('math-round');
var restarted = false;
const prefix = "-";
const bot = new Discord.Client();
const avatarembed = new Discord.RichEmbed();
bot.login(auth.token);

bot.on('uncaughtException', function (exception) {
    console.log(exception);
});

bot.on('ready', function (evt) {
    bot.user.setPresence({
        game: {
            name: 'Scar code',
            type: 'WATCHING'
        },
        status: 'idle'
    })
    if (restarted === true) {
        console.log("Restart Succesfull")
        bot.channels.get("593824605144088586").send("Restart Sucessfull")
        restarted = false;
    }
    else {
        console.log('Startup Sucessfull');
        bot.channels.get("593824605144088586").send("Startup Sucessfull")
    }
    console.log('Connected as: ' + bot.user.tag);
});

bot.on('message', function (message) {
    if (message.author.id != 593821541934825493) {
        rank.check_role(message);
    }
    if (message.guild === null) {
        if (message.content === '-stop') {
            stop(message);
        }
        else {
            if (message.author.id != 582254580331577353) {

            }
        }
    }
    if (message.content.startsWith(prefix)) {
        var fetchedMessages = message.channel.fetchMessages({ limit: 99 });
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            case 'meme':
                message.channel.send("Ich Bin ncoh nicht fertig, ich brauche mehr Zeit, danke ")
                break;
            case 'help':
                message.reply(" sry aber bei dir kommt jede hilfe zupät")
                break;
            case 'anipilz':
                message.channel.send("What Else?")
                break;
            case 'test':
                message.channel.send("Was hast du erwartet")
                break;
            case 'gefahr':
                message.channel.send("https://veganheaven.de/wp-content/uploads/2018/09/Sushi-selber-machen-26-1.jpg")
                break;
            case 'avatar':
                avatarembed.setImage(message.author.avatarURL)
                avatarembed.setFooter('The profile picture of  ' + message.author.tag)
                message.channel.send(avatarembed)
                break;
                case 'ping':
                message.reply('Pong! :ping_pong: (' + round(bot.ping) + 'ms) :ping_pong:')
                break;
            case 'restart':
                if (message.author.id == 141218912934166528 || message.author.id == 533665091468656650) {
                    console.log(message.author.tag + ' restarted The bot')
                    message.reply('You restarted the bot, wait a few seconds')
                    bot.channels.get("593824605144088586").send(message.author.tag + ' restarted the bot')
                    bot.channels.get("593824605144088586").send('---------------------------------------------------')
                    setTimeout(function () { resetBot() }, 5000);
                }
                else {
                    message.reply('I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:')
                    console.log(message.author.tag + ' tried to use -restart')
                }
                break;
            case 'stop':
                stop(message);
                break;
            default:
                break;
        } 
    }
});

bot.on("disconnect", function (event) {
    console.log(`The Websocket sucessfully disconnected`);
    console.log('-----------------------------------------')
    if (restarted === false) {
        process.exit()
    }
});

function resetBot() {
    restarted = true;
    bot.channels.get("593824605144088586").send('Restarting...')
        .then(msg => bot.destroy())
        .then(() => bot.login(auth.token));
}

function stop(message) {
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
}