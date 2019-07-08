module.exports = {
    reaction: function (message) {
        var reacted = false
        var me = 593821541934825493
        message.channel.send("Auf die Plätze").then(function(message){
            setTimeout(function () {message.edit("Fertig ?")  }, 5000)
            setTimeout(function () {message.edit("LOS!")  }, 10000)
            setTimeout(function () {message.react("🔴")  }, 10000)
            setTimeout(function () {message.edit("STOP ")  }, 11000)
            //setTimeout(function () {MessageReaction.remove(593821541934825493)}, 11000)
             }) 
             //if(message.author.id == MessageReaction.users ){
              //   message.channel.send("Good Job")
            // }
}, 
    diceroll: function (message) {
        let dice = Math.floor(Math.random() * 6) + 1  
        switch (dice) {
            case 1:
                message.channel.send("Sie Haben eine 1 gewürfelt", {
                    file: "https://i.ibb.co/V0ykKRN/dice1.png"
                })
                break;
            case 2:
                message.channel.send("Sie Haben eine 2 gewürfelt", {
                    file: "https://i.ibb.co/ZGPvsXL/dice2.png"
                })
                break;
            case 3:
                message.channel.send("Sie Haben eine 3 gewürfelt", {
                    file: "https://i.ibb.co/Z891FGq/dice3.png"
                })
                break;
            case 4:
                message.channel.send("Sie Haben eine 4 gewürfelt", {
                    file: "https://i.ibb.co/qNYLRMt/dice4.png"
                })
                break;
            case 5:
                message.channel.send("Sie Haben eine 5 gewürfelt", {
                    file: "https://i.ibb.co/LP9mZ4V/dice5.png"
                })
                break;
            case 6:
                message.channel.send("Sie Haben eine 6 gewürfelt", {
                    file: "https://i.ibb.co/93SZs7J/dice6.png"
                })
                break;
            default:
                message.channel.send("Wow wie hast du das geschafft, du hast eine " + dice + ". gewürfelt, schreibe deinen erfolg Bitte ScarVite#6606 auf Discord")
                break;
        }
    }
}

