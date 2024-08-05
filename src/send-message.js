require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1049345076188422226");
    if (!channel) return;

    const row = new ActionRowBuilder();

    row.components.push(
      new ButtonBuilder()
        .setURL(
          "https://discord.com/oauth2/authorize?client_id=1269034892046635089&permissions=8&integration_type=0&scope=bot"
        )
        .setLabel("🔗 Invite link")
        .setStyle("LINK")
    );

    await channel.send({
      content: "Claim or remove a role below.",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
