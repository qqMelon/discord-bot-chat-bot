module.exports = {
    name: 'interactionCreate',
    execute (inter) {
        console.log(`${inter.user.tag} in #${inter.channel.name} triggered an interaction: ${inter}`);
    }
}