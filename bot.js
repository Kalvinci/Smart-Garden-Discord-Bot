require("dotenv").config();
const { Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
	console.log("Bot Ready!");
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = interaction.commandName;

	if (command === "list-plants") {
		await interaction.reply("1. Basil\n2. Snake Plant");
	}
});

client.login(process.env.TOKEN);
