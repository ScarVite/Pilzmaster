// This Function is Anipilz Specific and just checks if an user has an rank he shouldn't have
const Pfifferling = "589467467676385284"
const Steinpilz = "589469150334812171"
const Hutpilz = "589469259269144586"
const Fliegenpilz = "589469294665007140"
const Stockschwämmchen = "589469599041323009"
const Rötelritterling = "589469748652277761"
const Mohrenkopf = "589469891845685260"
const Pilzner = "589470019910631444"

module.exports = {
    check_role: function (message) {
        if (message.guild !== null) {
            if (message.member.roles.has(Pfifferling) && message.member.roles.has(Steinpilz)) {
                message.member.removeRole(Pfifferling).catch(console.error);
            }
            if (message.member.roles.has(Steinpilz) && message.member.roles.has(Hutpilz)) {
                message.member.removeRole(Steinpilz).catch(console.error);
            }
            if (message.member.roles.has(Hutpilz) && message.member.roles.has(Fliegenpilz)) {
                message.member.removeRole(Hutpilz).catch(console.error);
            }
            if (message.member.roles.has(Fliegenpilz) && message.member.roles.has(Stockschwämmchen)) {
                message.member.removeRole(Fliegenpilz).catch(console.error);
            }
            if (message.member.roles.has(Stockschwämmchen) && message.member.roles.has(Rötelritterling)) {
                message.member.removeRole(Stockschwämmchen).catch(console.error);
            }
            if (message.member.roles.has(Rötelritterling) && message.member.roles.has(Mohrenkopf)) {
                message.member.removeRole(Pfifferling).catch(console.error);
            }
            if (message.member.roles.has(Mohrenkopf) && message.member.roles.has(Pilzner)) {
                message.member.removeRole(Pfifferling).catch(console.error);
            }
        }
        else {
            return
        }
    }
}