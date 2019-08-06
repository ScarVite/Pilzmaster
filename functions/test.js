module.exports = {
    test: function (message, cmd) {
        setTimeout(function(){message.channel.send('test 10000')}, 10000)
        message.channel.send('hi')
        return(true)
    }
}