var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')

module.exports = {
    getavatar: function (message, Discord) {
        const avatarembed = new Discord.RichEmbed();
        if (message.mentions.users.first() !== undefined) {
            avatarembed.setImage(message.mentions.users.first().avatarURL)
            avatarembed.setFooter(locales.fun.profilepic + message.mentions.users.first().tag)
            message.channel.send(avatarembed)
        }
        else {
            avatarembed.setImage(message.author.avatarURL)
            avatarembed.setFooter(locales.fun.profilepic + message.author.tag)
            message.channel.send(avatarembed)
        }
    },
    memes:function(message, memeembed){
        console.log('here')
        snekfetch.get('https://www.reddit.com/r/dankmemes/random.json')
        message.channel.send()
        /*exports.run = async (message, args,memeembed) => {
            try {
                console.log('here2')
                const { body } = await snekfetch
                    .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
                    .query({ limit: 800 });
                const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
                if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
                const randomnumber = Math.floor(Math.random() * allowed.length)
                memeembed
                .setColor(0x00A2E8)
                .setTitle(allowed[randomnumber].data.title)
                .setDescription("Posted by: " + allowed[randomnumber].data.author)
                .setImage(allowed[randomnumber].data.url)
                .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
                .setFooter("Memes provided by r/dankmemes")
                message.channel.send(embed)
            } catch (err) {
                return console.log(err);
            }
        }*/
    }
}