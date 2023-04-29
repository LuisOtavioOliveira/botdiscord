const { SlashCommandBuilder } = require('discord.js')
const  fetch  = require('node-fetch')

const getItem = () => {
  const items = ['gun','sword','bow','shield','missil','magic']
  const getRandom = items[Math.round(Math.random() * (items.length - 1))]
  return getRandom.toString()
}

module.exports = {
   data: new SlashCommandBuilder()
    .setName("testecomando")
    .setDescription("Responde com 'Tá testando.'"),

    async execute(interaction) {
    await interaction.reply(getItem())
  }
}

