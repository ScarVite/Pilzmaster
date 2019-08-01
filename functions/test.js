module.exports = {
    test: function (message, cmd) {
        message.channel.send(message.content)
        message.reply(cmd)
    }
}