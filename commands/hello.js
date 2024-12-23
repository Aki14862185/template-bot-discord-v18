const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Répond avec une salutation !'),

  async execute(interaction) {
    await interaction.reply('Salut ! Comment ça va ?');
  },
};
