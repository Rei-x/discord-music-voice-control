const { Client, GatewayIntentBits } = require("discord.js");
const { addSpeechEvent } = require("discord-speech-recognition");
const { Player } = require("discord-music-player");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

addSpeechEvent(client);

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
});

client.on("messageCreate", async (message) => {
  const voiceChannel = message.member?.voice.channel;

  if (voiceChannel && message.content === "?join") {
    message.channel.send("Joining voice channel 🎤");
    const queue = player.createQueue(message.guild.id);
    await queue.join(voiceChannel);
  }
});

client.on("speech", async (message) => {
  console.log(`🎤 ${message.author.username}: ${message.content}`);

  if (!message.content) return;
  if (!message.content.toLowerCase().startsWith("alexa")) return;

  const args = message.content
    .toLowerCase()
    .slice("alexa".length)
    .trim()
    .split(" ");
  const command = args.shift();

  const guildQueue = player.getQueue(message.guild.id);

  if (command === "play") {
    const musicTitle = args.join(" ");
    console.log("📻 Playing music: ", musicTitle);

    await guildQueue.play(musicTitle).catch((_) => {
      if (!guildQueue) queue.stop();
    });
  }

  if (command === "skip") {
    console.log("Skipping track ->");
    guildQueue.skip();
  }
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(config.TOKEN);
