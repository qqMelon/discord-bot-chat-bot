require('dotenv').config()
const { Client, Collection, Intents } = require('discord.js')
// const { token } = require('./config.json')
const token = process.env.BOT_TOKEN
const path = require('node:path')
const fs = require('node:fs')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
// const client = new Client({ intents: 513 })


client.commands = new Collection()

// Commands section
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    client.commands.set(command.data.name, command)
}

// Events section
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.on('interactionCreate', async interaction => {

    // Checkout command is available
    if (!interaction.isCommand()) return
    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log('Error in interaction: ', error)
        await interaction.reply({ content: 'There was an error while executing this command ..', ephemeral: true })
    }
})

// Login Discord app token
client.login(token)
