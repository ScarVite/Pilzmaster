const ytdl = require('ytdl-core');
const auth = require('../../auth/auth.json')
var search = require('youtube-search');
var opts = {
    maxResults: 5,
    key: auth.apikey
};
var queue = []
var length_cache
var distimeout
let player
var length = 0;
var joined = false;
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
function vlength(message, streamOptions) {
    if (length === length_cache) {
        setTimeout(function () { vlength(message, streamOptions) }, 200);
    }
    else {
        length_cache = length
        disconnect(message, streamOptions)
    }
}
function play(message, streamOptions) {
    console.log(queue)
    ytdl.getInfo(queue[0].url).then(info => {
        length = (info.length_seconds * 1000)
        message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" Länge: ' + sectomin(info.length_seconds))
    });
    stream = ytdl(queue[0].url, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
    message.member.voiceChannel.join().then(connection => {
        player = connection.playStream(stream, streamOptions)
        queue.shift()
    }).catch(console.error);
    vlength(message, streamOptions)
}
function disconnect(message, streamOptions) {
    distimeout = setTimeout(function () {
        if (queue[0] !== undefined) {
            play(message, streamOptions)
        }
        else {
            if (message.guild.voiceConnection !== null) {
                message.channel.send('Das Lied ist Vorbei')
                message.guild.voiceConnection.disconnect();
                message.channel.setTopic("Starte einen song mit -play <youtube link>")
                joined = false
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
        sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + sec;
    return sec_min + " min";
}
module.exports = {
    streamyt: function (message, streamOptions, link) {
        if (message.member.voiceChannelID === '592389413296668722') {
            if (message.channel.id === '593398959427289108') {
                if (validateYouTubeUrl(link) === true) {
                    var obj = { url: link, title: '', duration: '' }
                    queue.push(obj)
                    if (joined === false) {
                        joined = true
                        length_cache = length;
                        ytdl.getInfo(queue[0].url).then(info => {
                            length = (info.length_seconds * 1000)
                            message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" Länge: ' + sectomin(info.length_seconds))
                        });
                        if (streamOptions === undefined) {
                            streamOptions = { seek: 0, volume: 1 };
                        }
                        const stream = ytdl(queue[0].url, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
                        vlength(message, streamOptions)
                        message.member.voiceChannel.join().then(connection => {
                            player = connection.playStream(stream, streamOptions)
                        }).catch(console.error);
                        queue.shift()
                    }
                    for (var i = 0; i < queue.length; i++) {
                        ytdl.getInfo(queue[i].url).then(info => {
                            i= i-1
                            queue[i].title = info.title
                            queue[i].duration = sectomin(info.length_seconds)
                        })
                    }
                }
                else {
                    message.reply('Du Musst einen gültigen Youtube link angeben')
                }
            }
            else {
                message.reply('Du musst in <#593398959427289108> schreiben ')
            }
        }
        else {
            message.reply('Ich kann das nicht, du musst zuerst in "🎵Musik" sein')
        }
    },
    printqueue: function (message, Discord) {
        console.log(queue)
        console.log('printqueue')
        if (queue[0] !== undefined) {
            const queueembed = new Discord.RichEmbed();
            queueembed
                .setColor('#0099ff')
                .setTitle('Derzeitige Warteschlange')
            queueembed
                .addBlankField()
                .addField('Musik', '`-play <youtube Url>` - Spielt einen Youtube Song ab \n' +
                    '`-leave` -Beendet Die Wiedergabe und Verlässt den Channel \n' +
                    '`-Folgt Noch`'
                    , true)
                .addBlankField()
                .addField('Informations', 'Folgt Noch', true)
                .setAuthor(message.author.tag, message.author.avatarURL, 'https://scarvite.6te.net')
            console.log('embed gesendet')
            message.channel.send(queueembed)
        }
        else {
            message.channel.send('Die Warteschlange ist derzeit leer,\n starte ein lied mit -play <youtube url>')
        }
    },
    killstream: function (message) {
        message.member.voiceChannel.join().then(connection => {
            connection.disconnect()
        }).catch(console.error);
        queue = []
        clearTimeout(distimeout)
        console.log("Cleared timeout")
        message.guild.voiceConnection.disconnect();
        message.channel.setTopic("Starte einen song mit -play <youtube link>")
        joined = false
        length = 0
    },
    loopsong:function(message,link){
        ytdl.getInfo(link).then(info => {
            length = (info.length_seconds * 1000)
            message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" als dauerschleife. Länge: ' + sectomin(info.length_seconds))
        });
        if (streamOptions === undefined) {
            streamOptions = { seek: 0, volume: 1 };
        }
        const stream = ytdl(link, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
        message.member.voiceChannel.join().then(connection => {
            let player = connection.playStream(stream, streamOptions)
        }).catch(console.error);
    },
    pause:function(message){
        player.pause()
    },
    resume:function(message){
        player.resume()
    }
}