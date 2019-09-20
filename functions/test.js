var url
const fetch = require("node-fetch");

async function json(url) {
    var url = 'https://reddit.com/r/dankmemes/random.json'
    const response = await fetch(url);
    return response.json()
}
async function main(message) {
    const dankjson = await json(URL)
    message.channel.send('Hier ein meme',{
        file: dankjson["0"]["data"]["children"]["0"]["data"]["url"]
    })
}
main();

module.exports = {
    meme: function (message, memeembed) {
        main(message)
    }
}