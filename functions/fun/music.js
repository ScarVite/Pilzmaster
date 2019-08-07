const ytdl = require('ytdl-core');
const auth = require('../../auth/auth.json')
var search = require('youtube-search');
var opts = {
    maxResults: 5,
    key: auth.apikey
};
var queue = []
var length_cache = 0
var looplength = 0
var link_cache
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

function vlength(message, streamOptions, loop, link) {
    if (loop == false) {
        if (length === length_cache) {
            setTimeout(function () { vlength(message, streamOptions, false) }, 200);
        }
        else {
            length_cache = length
            disconnect(message, streamOptions)
        }
    }
    else {
        if (looplength === length_cache) {
            setTimeout(function () { vlength(message, streamOptions, true) }, 200);
            console.log('i')
        }
        else {
            console.log('vlength')
            setTimeout(() => {
                playloop(message, streamOptions,link)
            }, looplength);
        }
    }
}

function play(message, streamOptions) {
    console.log(queue)
    length = (queue[0].duration * 1000)
    message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + queue[0].title + '" Länge: ' + sectomin(queue[0].duration))
    stream = ytdl(queue[0].url, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
    message.member.voiceChannel.join().then(connection => {
        player = connection.playStream(stream, streamOptions)
        queue.shift()
    }).catch(console.error);
    vlength(message, streamOptions, false)
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
        sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + sec;
    return sec_min + " min";
}

function playloop(message,  streamOptions,link,stream) {
    stream = ytdl(link, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
    message.member.voiceChannel.join().then(connection => {
        player = connection.playStream(stream, streamOptions)
        console.log('playing')
    }).catch(console.error);
        setTimeout(() => {
            playloop(message,  streamOptions,link<stream)
        }, looplength);
}

module.exports = {
    streamyt: function (message, streamOptions, link) {
        if (message.member.voiceChannelID === '592389413296668722') {
            if (message.channel.id === '593398959427289108') {
                if (link !== link_cache) {
                    if (validateYouTubeUrl(link) === true) {
                        link_cache = link
                        var obj = { url: link, title: '', duration: '', gathered: false }
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
                            vlength(message, streamOptions, false)
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
                                })
                            }
                        }
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
    },
    printqueue: function (message, Discord) {
        console.log(queue)
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
        message.guild.voiceConnection.disconnect();
        message.channel.setTopic("Starte einen song mit -play <youtube link>")
        joined = false
        length = 0
        length_cache = 0
        looprunning = false
        player.end()
    },
    loopsong: function (message, link, streamOptions, looptrue) {
        if (joined === false) {
            if (looptrue !== false) {
                if (message.member.voiceChannelID === '592389413296668722') {
                    if (message.channel.id === '593398959427289108') {
                        if (link !== link_cache) {
                            if (validateYouTubeUrl(link) === true) {
                                const stream = //ytdl(link, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
                                ytdl.getInfo(link).then(info => {
                                    console.log('info')
                                    looplength = (info.length_seconds * 1000)
                                    message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" als dauerschleife. Länge: ' + sectomin(info.length_seconds))
                                }).then(
                                )
                                if (streamOptions === undefined) {
                                    streamOptions = { seek: 0, volume: 1 };
                                }
                                vlength(message, streamOptions, true, link)
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
        }
        else {
            message.reply('Warte zuerst bis die derzeitige warteschlange durchgeloffen ist oder nutze -leave')
        }
    },
    pause: function () {
        player.pause()
    },
    resume: function () {
        player.resume()
    },
    endloop: function () {
        looptrue = false
    }
}