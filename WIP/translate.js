const { SlashCommandBuilder } = require('@discordjs/builders')
const translate = require('translate-api')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Traduit une phrase en entree, utilisez les codes de langue pour traduire: hello (to) eu_FR')
        .addStringOption(option => option.setName('input').setDescription('Message a traduire').setRequired(true)),
        async execute(interaction) {
            const input = interaction.options.getString('input')
            let strArr = input.split(' ')
            const local = strArr[strArr.length - 1]
            strArr.pop()
            let transText = strArr.join(' ')

            translate.getText(transText,{to: local}).then(function(text){
                console.log(text)
            })

            await interaction.reply('translatedText')
        }
}