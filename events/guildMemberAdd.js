module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member) {
      console.log(`${member.user.tag} a rejoint le serveur !`);
      const channel = member.guild.channels.cache.find(ch => ch.name === 'général'); // Modifier si nécessaire
      if (channel) {
        channel.send(`Bienvenue sur le serveur, ${member.user.tag} !`);
      }
    },
  };
  