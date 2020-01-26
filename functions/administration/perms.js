const Moderator = "592405040052830208"
const Head_Mod = "592447609231245342"
const Admin = "589473098307338240"
const Dev = "141218912934166528"
const TestVite = "594221956115726336"
module.exports = {
    checkperms: function (message) {
        if (message.member.roles.has(Moderator || Head_Mod || Dev || Admin || TestVite)) {
            return true;
        }
        else {
            if (arguments.callee.caller.name !== 'help' && arguments.callee.caller.name !== 'volume') {
                message.reply('I´m sorry,:no_entry_sign: you don´t have the permssion to run this command :no_entry_sign:');
            }
        }
    }
}