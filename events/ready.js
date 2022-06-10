module.exports = {
    name: 'ready',
    once: true,
    execute (client) {
        console.log(`Bot Ready ! Logged as ${client.user.tag}`)
    }
}
