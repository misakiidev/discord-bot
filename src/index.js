require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");

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

client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    return;
  }

  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(process.env["TOKEN"]);
