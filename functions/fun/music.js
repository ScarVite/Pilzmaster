const ytdl = require('ytdl-core');
var queue = []
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
    streamyt: function (message, link, streamOptions) {
        if (message.member.voiceChannelID === '592389413296668722') {
            if (message.channel.id === '593398959427289108') {
                if (validateYouTubeUrl(link) === true) {
                    queue.push(link)
                    ytdl.getInfo(queue[0]).then(info => {
                        length = (info.length_seconds * 1000)
                        message.channel.setTopic(':musical_note: **Derzeit Läuft**: "' + info.title + '" Länge: ' + sectomin(info.length_seconds))
                        console.log(length)
                    });
                    const stream = ytdl(queue[0], { filter: 'audioonly', highWaterMark: 1024 * 1024 * 10 });
                    console.log(queue)
                    if (queue.length === 1) {
                        if (joined === false) {
                            message.member.voiceChannel.join().then(connection => {
                                console.log(streamOptions)
                                let player = connection.playStream(stream, streamOptions)
                            }).catch(console.error);
                            joined = true
                        }
                        else {
                            return;
                        }
                    }
                    queue.shift()
                    console.log(queue)
                    console.log(length)
                    if (queue[0] !== undefined) {
                        setTimeout(function(){
                            if (message.guild.voiceConnection !== null) {
                                console.log('Here')
                                message.guild.voiceConnection.disconnect();
                            }
                    }, length)
                    setTimeout(this.streamyt, length, message)
                }
                else {
                    setTimeout(function () {
                        message.channel.send('Das Lied ist Vorbei')
                        if (message.guild.voiceConnection !== null) {
                            message.guild.voiceConnection.disconnect();
                            message.channel.setTopic("Starte einen song mit -play <youtube link>")
                        }
                    }, length)
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
}   