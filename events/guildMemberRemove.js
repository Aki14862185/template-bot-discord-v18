module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(member) {
      console.log(`${member.user.tag} a quitté le serveur.`);
      const channel = member.guild.channels.cache.find(ch => ch.name === 'général'); // Modifier si nécessaire
      if (channel) {
        channel.send(`${member.user.tag} a quitté le serveur. À bientôt !`);
      }
    },
  };
  