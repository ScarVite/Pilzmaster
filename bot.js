module.exports= {
    changerestarted: function() {
            restarted = true
    }
}
const Discord = require('discord.js');
var rank = require('./functions/moderation/check_rank.js')
var minigames = require('./functions/fun/minigames.js')
var mod = require("./functions/moderation/mod.js")
var reactions = require("./functions/administration/reactions.js")
var core = require("./functions/administration/core.js")
var auth = require('./auth/auth.json');
var test = require("./functions/test.js")
var round = require('math-round');
const prefix = "-";
var restarted = false;
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

bot.on('message', function (message, reaction) {
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
        var precmd = args[0];
        var cmd = precmd.toLowerCase()
        args = args.splice(1);
        switch (cmd) {
            case 'author':
                message.channel.send(" hey you, yeah you, i Was Made By ScarVite#6606")
                break;
            case 'recomm-react':
                reactions.recommendations(message)
                break;
                //   case 'remove':
                reactions.remove(message)
                break;
            case 'problem':
                message.reply(" https://i.ibb.co/gvTzN2S/vu409zuiqhg21.jpg")
                break;
            case 'time':
                const time = new Date();
                message.reply(" Es ist:  " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())
                break;
            case 'rickroll':
                //message.react
                break;
            case 'react':
                minigames.reaction(message)
                break;
            case 'dice':
                minigames.diceroll(message);
                break;
            case 'meme':
                message.channel.send("Ich Bin noch nicht fertig, ich brauche mehr Zeit, danke ")
                break;
            case 'help':
                mod.help(message, Discord)
                break;
            case 'anipilz':
                message.channel.send("What Else?")
                break;
                 case 'test':
                     test.test(message,cmd)
                break;
            case 'gefahr':
                message.channel.send("Miau")
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
                core.restart(message, bot)
                break;
            case 'stop':
                core.stop(message, bot)
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