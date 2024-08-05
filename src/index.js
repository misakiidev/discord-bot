require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActivityType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");

const fs = require("fs");
const data = fs.readFileSync("package.json", "utf8");
const jsonObject = JSON.parse(data);
const version = jsonObject.version;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
  presence: {
    status: "dnd",
    activities: [
      {
        name: "ELDEN RING",
        type: ActivityType.Playing,
      },
    ],
  },
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "info") {
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const guildCount = client.guilds.cache.size;
    const channelCount = client.channels.cache.size;
    const userCount = client.guilds.cache.reduce(
      (a, g) => a + g.memberCount,
      0
    );
    const embed = new EmbedBuilder()
      .setColor("DarkOrange")
      .setAuthor({
        name: "Malenia",
        iconURL: interaction.client.user.avatarURL(),
      })
      .setThumbnail(interaction.user.avatarURL())
      .setTimestamp()
      .addFields(
        {
          name: "Creator",
          value: "misakiidev",
          inline: true,
        },
        {
          name: "Version",
          value: `${version}`,
          inline: true,
        },
        {
          name: "Servers",
          value: `${guildCount}`,
          inline: true,
        },
        {
          name: "Users",
          value: `${userCount}`,
          inline: true,
        },
        {
          name: "Channels",
          value: `${channelCount}`,
          inline: true,
        },
        {
          name: "Uptime",
          value: `${uptime}`,
          inline: true,
        },
        {
          name: "Library",
          value: "[discord.js](https://discord.js.org/)",
          inline: true,
        },
        {
          name: "Website",
          value: `[misakii.dev](https://misakii.dev/)`,
          inline: false,
        }
      );

    const row = new ActionRowBuilder();

    row.components.push(
      new ButtonBuilder()
        .setURL(
          "https://discord.com/oauth2/authorize?client_id=1269034892046635089&permissions=8&integration_type=0&scope=bot"
        )
        .setLabel("🔗 Invite link")
        .setStyle("Link")
    );

    interaction.reply({ embeds: [embed], components: [row] });
  }
});

client.login(process.env["TOKEN"]);
