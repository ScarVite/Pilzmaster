module.exports = {
    changerestarted: function () {
        restarted = true
    }
}
const Discord = require('discord.js');
var rank = require('./functions/moderation/check_rank.js')
var troll = require('./functions/fun/troll.js')
var minigames = require('./functions/fun/minigames.js')
var fun = require('./functions/fun/fun.js')
var mod = require("./functions/moderation/mod.js")
var reactions = require("./functions/administration/reactions.js")
var core = require("./functions/administration/core.js")
var auth = require('./auth/auth.json');
var music = require('./functions/fun/music.js')
var test = require("./functions/test.js")
var help = require('./functions/help.js')
var round = require('math-round');
const prefix = "-";
var restarted = false;
const bot = new Discord.Client();
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
        var precmd = args[0];
        var cmd = precmd.toLowerCase()
        args = args.splice(1);
        switch (cmd) {
            case 'loop':
                music.loopsong(message, args[0], true)
                break;
            case 'resume':
                music.resume(message)
                break;
            case 'pause':
                music.pause(message)
                break;
            case 'loop':
                music.loopsong(message, args[0])
                break;
            case 'queue':
                music.printqueue(message, Discord)
                break;
            case 'volume':
                music.volume(args[0],message)
                break;
            case 'play':
                music.streamyt(message, args[0]);
                break;
            case 'leave':
                if(message.guild.voiceConnection) {
                    music.killstream(message)
                }
                else {
                    message.reply('Wie soll ich einen Channel verlassen, wenn ich mit keinem verbunden bin')
                }
                break;
            case 'author':
                message.channel.send(" hey you, yeah you, i Was Made By ScarVite#6606")
                break;
            case 'recomm-react':
                message.channel.send("Now Reacting to every message")
                reactions.recommendations(message)
                break;
                //   case 'remove':
                reactions.remove(message)
                break;
            case 'kick':
                mod.kick(message)
                break;
            case 'problem':
                message.reply(" https://i.ibb.co/gvTzN2S/vu409zuiqhg21.jpg")
                break;
            case 'time':
                const time = new Date();
                message.reply(" Es ist:  " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())
                break;
            case 'rr':
                troll.rickroll(message)
                break;
            case 'react':
                minigames.reaction(message)
                break;
            case 'coin':
                minigames.coinflip(message)
                break;
            case 'dice':
                minigames.diceroll(message);
                break;
            case 'meme':
                message.channel.send("Ich Bin noch nicht fertig, ich brauche mehr Zeit, danke ")
                break;
            case 'help':
                help.help(message, Discord)
                break;
            case 'anipilz':
                message.channel.send("What Else?")
                break;
            case 'test':
                if (test.test(message) === true) {
                    message.channel.send('main true')
                }
                break;
            case 'gefahr':
                message.channel.send("Miau")
                break;
            case 'avatar':
                fun.getavatar(message, Discord)
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