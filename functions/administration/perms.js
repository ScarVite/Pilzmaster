module.exports = {
    checkperms: function (message) {
        const Moderator = "592405040052830208"
        const Head_Mod = "592447609231245342"
        const Admin = "589473098307338240"
        const Dev = "141218912934166528"
        if (message.member.roles.has(Moderator || Head_Mod || Dev || Admin)) {
            return(true)
        }
        else {
            message.reply('I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:')
        }
    }
}