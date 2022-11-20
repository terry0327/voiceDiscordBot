const ffmpeg = require("ffmpeg-static");

const { Client, Intents, VoiceChannel, Discord, MessageEmbed } = require("discord.js");
const client = new Client({  intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ]});

const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, entersState, StreamType,  AudioPlayerStatus,  VoiceConnectionStatus } = require("@discordjs/voice");

const Player = createAudioPlayer();

client.login("<PUT_YOUR_TOKEN_HERE>");

client.on('ready', () => {
  console.log(`${client.user.tag} is now online！`)
})

client.on("messageCreate", async message => {
  if (message.content.startsWith("反正")) {
    // const file = message.attachments.first();
    const channel = message.member.voice.channel;
    const Embed = new MessageEmbed()
      .setAuthor("Command: play")
      .addFields(
        {
          name: "Usege",
          value: `vfr (file)`,
          inline: true
        },
        {
          name: "Examples",
          value: `vfr ...`,
          inline: true
        })
      .setDescription("command: play voice");

    // if (!channel || !file) return message.channel.send({ embeds: [Embed] });
    if (!channel) return message.channel.send({ embeds: [Embed] });
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    try {
      connection;
      connection.subscribe(Player);

      // const resource = createAudioResource(file.url, {
      //   inputType: StreamType.Arbitrary
      // });
      // const resource = createAudioResource('D:\\Visual Studio Code\\VScode Project\\discordBot\\Audio\\vfr1.mp3')
      const resource = createAudioResource('./Audio/vfr1.mp3')

      Player.play(resource);
      message.channel.send({
        content: "你爽就好，反正也吵不贏你"
        // content: "> playing: `" + file.name + "`, size: `" + file.size + "B`"
      });
      function leave(){
        connection.destroy()
      }
      setTimeout( leave,5000)
     } catch (error) {
      message.channel.send({ content: error.message || "Error" });
    }
  }
});