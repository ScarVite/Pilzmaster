const ytdl = require('ytdl-core');
var streamOptions = { seek: 0, volume: 0.5 };
var queue = []
var looprunning = false
var length_cache = 0
var looplength = 0
var link_cache
var paused = false
var distimeout
let player
var length = 0;
var joined = false;

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

function checkrightchannel(message, link) {
    if (message.member.voiceChannelID === '592389413296668722') {
        if (message.channel.id === '593398959427289108') {
            if (link !== link_cache) {
                if (validateYouTubeUrl(link) === true) {
                    return true
                }
                else {
                    message.reply(locales.validlink)
                }
            }
            else {
                message.reply(locales.duplicate)
            }
        }
        else {
            message.reply(locales.wrongchannel1 + config.channel + locales.wrongchannel2)
        }
    }
    else {
        message.reply(locales.musicchannel)
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

function playloop(message, link) {
    looprunning = true
    const stream = ytdl(link, { filter: 'audioonly', highWaterMark: 1024 * 1024 * 50 });
    message.member.voiceChannel.join().then(connection => {
        player = connection.playStream(stream, streamOptions)
    }).catch(console.error);
    setTimeout(() => {
        if (looprunning === true) {
            playloop(message, link)
        }
    }, looplength);
}

module.exports = {
    loopsong: function (message, link) {
        link_cache = ' '
        if (checkrightchannel(message, link) === true) {
            if (joined === false) {
                ytdl.getInfo(link).then(info => {
                    looplength = (info.length_seconds * 1000)
                    message.channel.setTopic(locales.nowplaying + info.title + locales.loop + locales.length + sectomin(info.length_seconds))
                }).then(
                )
                if (streamOptions === undefined) {
                    streamOptions = { seek: 0, volume: 1 };
                }
                joined = true
                vlength(message, true, link)
            }
            else {
                message.reply(locales.waitloop)
            }
        }
    },
    mujatest: function(message){
        message.channel.send(mujaca.DiscordTag)
    }
}