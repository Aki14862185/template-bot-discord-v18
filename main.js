// main.js
const { Client, Intents } = require('discord.js');
const { token, clientId, guildId } = require('./config');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');

// Création du client Discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

// Charger les commandes
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Enregistrer les commandes slash
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Début de l\'enregistrement des commandes slash...');

    if (guildId) {
      // Enregistrer les commandes pour un serveur spécifique
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );
    } else {
      // Enregistrer les commandes globales
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
      );
    }

    console.log('Commandes enregistrées avec succès.');
  } catch (error) {
    console.error(error);
  }
})();

// Charger les événements
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Connexion du bot
client.once('ready', () => {
  console.log('Le bot est prêt !');

  // Définir le statut de streaming (diffuse un message personnalisé)
  client.user.setActivity('Streaming UEFI', { type: 'STREAMING', url: 'https://www.twitch.tv/oni145' });

});

// Se connecter avec le token
client.login(token);
