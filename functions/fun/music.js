const ytdl = require('ytdl-core');
const auth = require('../../auth/auth.json')
var perms = require('../administration/perms.js')
var search = require('youtube-search');
var opts = {
    maxResults: 5,
    key: auth.apikey
};
var streamOptions = { seek: 0, volume: 1 };
var queue = []
var length_cache = 0
var looplength = 0
var link_cache
var paused = false
var distimeout
let player
var length = 0;
var joined = false;

function checkrightchannel(message, link) {
    if (message.member.voiceChannelID === '592389413296668722') {
        if (message.channel.id === '593398959427289108') {
            if (link !== link_cache) {
                if (validateYouTubeUrl(link) === true) {
                    return true
                }
                else {
                    message.reply('Du Musst einen gültigen Youtube link angeben')
                }
            }
            else {
                message.reply(' Wenn du zwei mal das gleiche Lied spielen willst benutze -loop <link>')
            }
        }
        else {
            message.reply('Du musst in <#593398959427289108> schreiben ')
        }
    }
    else {
        message.reply('Ich kann das nicht, du musst zuerst in "🎵Musik" sein')
    }

}

function validateYouTubeUrl(link) {
    if (link !== undefined && link !== '' && link !== null) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = link.match(regExp);
        if (match && match[2].length == 11) {
            return (true)
        }
        else {
            return (false)
        }
    }
    else {
        return (false)
    }
}

function vlength(message, loop, link) {
    if (loop == false) {
        if (length === length_cache) {
            setTimeout(function () { vlength(message, false) }, 200);
        }
        else {
            length_cache = length
            disconnect(message)
        }
    }
    else {
        if (looplength === length_cache) {
            setTimeout(function () { vlength(message, true, link) }, 200);
        }
        else {
            playloop(message, link)
        }
    }
}

function play(message) {
    length = (queue[0].duration * 1000)
    message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + queue[0].title + '" Länge: ' + sectomin(queue[0].duration))
    stream = ytdl(queue[0].url, { audioonly: true, /*highWaterMark: 1024 * 1024 * 50*/ });
    message.member.voiceChannel.join().then(connection => {
        player = connection.playStream(stream, streamOptions)
        queue.shift()
    }).catch(console.error);
    vlength(message, false)
}

function disconnect(message) {
    distimeout = setTimeout(function () {
        if (queue[0] !== undefined) {
            play(message)
        }
        else {
            if (message.guild.voiceConnection !== null) {
                message.channel.send('Das Lied ist Vorbei')
                message.guild.voiceConnection.disconnect();
                message.channel.setTopic("Starte einen song mit -play <youtube link>")
                joined = false
                length = 0
                player.end()
                queue = []
            }
        }
    }, length)
}

function sectomin(time) {
    var hr = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0) {
        sec_min += "" + hr + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + sec;
    return sec_min + " min";
}

function playloop(message, link) {
    const stream = ytdl(link, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
    message.member.voiceChannel.join().then(connection => {
        player = connection.playStream(stream, streamOptions)
    }).catch(console.error);
    setTimeout(() => {
        playloop(message, link)
    }, looplength);
}

module.exports = {
    streamyt: function (message, link) {
        if (checkrightchannel(message, link) == true) {
            link_cache = link
            var obj = { url: link, title: '', duration: '', gathered: false }
            queue.push(obj)
            if (joined === false) {
                joined = true
                length_cache = length;
                ytdl.getInfo(queue[0].url).then(info => {
                    length = (info.length_seconds * 1000)
                    message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" Länge: ' + sectomin(info.length_seconds))
                    message.reply(info.title + ' wird nun gespielt')
                });
                if (streamOptions === undefined) {
                    streamOptions = { seek: 0, volume: 1 };
                }
                const stream = ytdl(queue[0].url, { audioonly: true,  /*highWaterMark: 1024 * 1024 * 50*/ });
                vlength(message, false)
                message.member.voiceChannel.join().then(connection => {
                    player = connection.playStream(stream, streamOptions)
                }).catch(console.error);
                queue.shift()
            }
            for (var i = 0; i < queue.length; i++) {
                if (queue[i].gathered === false) {
                    ytdl.getInfo(queue[i].url).then(info => {
                        i = i - 1
                        queue[i].title = info.title
                        queue[i].duration = info.length_seconds
                        queue[i].gathered = true
                        message.reply(info.title + 'wurde der warteschlang hinzugefügt')
                    })
                }
            }
        }

    },
    printqueue: function (message, Discord) {
        if (queue[0] !== undefined) {
            const queueembed = new Discord.RichEmbed();
            queueembed
                .setColor('#735BC1')
                .setTitle('Derzeitige Warteschlange')
            for (var i = 0; i < queue.length; i++) {
                if (queue[i] !== undefined) {
                    queueembed
                        .addField((i + 1) + '. : ', queue[i].title + '. Länge: ' + sectomin(queue[i].duration))
                }
            }
            queueembed
                .setFooter('Angefordert von: ' + message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            message.channel.send(queueembed)
        }
        else {
            message.channel.send('Die Warteschlange ist derzeit leer,\n starte ein lied mit -play <youtube url>')
        }
    },
    killstream: function (message) {
        player.end()
        queue = []
        clearTimeout(distimeout)
        message.guild.voiceConnection.disconnect();
        message.channel.setTopic("Starte einen song mit -play <youtube link>")
        joined = false
        length = 0
        length_cache = 0
        looprunning = false
        player.end()
    },
    loopsong: function (message, link) {
        link_cache = ' '
        if (checkrightchannel(message, link) === true) {
            if (joined === false) {
                ytdl.getInfo(link).then(info => {
                    looplength = (info.length_seconds * 1000)
                    message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" als dauerschleife. Länge: ' + sectomin(info.length_seconds))
                }).then(
                )
                if (streamOptions === undefined) {
                    streamOptions = { seek: 0, volume: 1 };
                }
                joined = true
                vlength(message, true, link)
            }
            else {
                message.reply('Warte zuerst bis die derzeitige warteschlange/der Loop durchgeloffen ist oder nutze -leave')
            }
        }
    },
    pause: function (message) {
        if (joined === true || loo) {
            player.pause()
            paused = true
        }
        else {
            message.reply('Was Soll ich pausieren? Ich Spiele nix')
        }
    },
    resume: function (message) {
        if (paused === true) {
            player.resume()
            paused = false
        }
        else {
            message.reply('Was Soll ich weiterspielen? Es ist nix pausiert')
        }
    },
    volume: function (vol, message) {
        if (perms.checkperms(message) === true) {
            if (vol <= 5 || vol >= 0) {
                player.setVolume(vol)
                message.reply('Die Lautsärke ist auf: ' + player.volume + ' eingestellt')
            }
            else {
                message.reply('Bitte gib eine Zahl zwischen 0 und 5 ein')
            }
        }
        else {
            message.reply('Dieser Befehel ist aufgrund von Bugs derzeit auf bestimmt user limitiert')
        }
    }
}
