module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
      if (message.author.bot) return; // Ignorer les messages des autres bots
  
      if (message.content.toLowerCase() === 'salut') {
        await message.reply('Salut, comment ça va ?');
      }
    },
  };
  