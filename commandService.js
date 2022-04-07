require("dotenv").config();
const axios = require("axios").default;

const SERVER_URL = process.env.SERVER_URL;

const giphys = [
	"https://c.tenor.com/q2lP9vEriZUAAAAC/party-plants.gif",
	"https://c.tenor.com/7LV6SkvqbG0AAAAC/yay-happy.gif",
	"https://c.tenor.com/XgCIfLJu_e8AAAAC/im-rooting-for-you-believe-in-you.gif",
];

async function listPlants() {
	let response = "";
	try {
		const { data } = await axios.get(`${SERVER_URL}/listplants`);
		response = "Here you go :smiley: \n\n>>> __**Rack**__ \t __**Name**__";
		for (const plant of data) {
			response += `\n${plant.rackId} \t\t\t${plant.name}`;
		}
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function plantInfo(options) {
	let response = "";
	try {
		const rackId = options.getInteger("rack");
		const { data } = await axios.get(`${SERVER_URL}/plantinfo/${rackId}`);
		response = {
			color: 0x12e385,
			fields: [
				{
					name: "Rack",
					value: data.rackId.toString(),
					inline: true,
				},
				{
					name: "Name",
					value: data.name,
					inline: true,
				},
				{
					name: "Temperature",
					value: data.temperature.toString(),
					inline: true,
				},
				{
					name: "Humidity",
					value: data.humidity.toString(),
					inline: true,
				},
				{
					name: "Water",
					value: data.water.toString(),
					inline: true,
				},
				{
					name: "Light",
					value: data.light,
					inline: true,
				},
			],
			image: {
				url: "https://www.thespruce.com/thmb/_6OfTexQcyd-3aW8Z1O2y78sc-Q=/2048x1545/filters:fill(auto,1)/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg",
			},
			timestamp: new Date(),
		};
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

async function setPlant(options) {
	let response = "";
	try {
		const plantDetails = {
			rackId: options.getInteger("rack"),
			name: options.getString("name"),
			temperature: options.getNumber("temperature"),
			humidity: options.getNumber("humidity"),
			water: options.getInteger("water"),
			light: options.getString("light"),
		};
		const { data } = await axios.post(
			`${SERVER_URL}/setplant`,
			plantDetails
		);
		response = {
			content: "Plant set successfully! :smile::potted_plant::thumbsup:",
			embeds: [
				{
					color: 0x12e385,
					fields: [
						{
							name: "Rack",
							value: data.rackId.toString(),
							inline: true,
						},
						{
							name: "Name",
							value: data.name,
							inline: true,
						},
						{
							name: "Temperature",
							value: data.temperature.toString(),
							inline: true,
						},
						{
							name: "Humidity",
							value: data.humidity.toString(),
							inline: true,
						},
						{
							name: "Water",
							value: data.water.toString(),
							inline: true,
						},
						{
							name: "Light",
							value: data.light,
							inline: true,
						},
					],
					image: {
						url: giphys[Math.floor(Math.random() * giphys.length)],
					},
					timestamp: new Date(),
				},
			],
		};
	} catch (error) {
		const errorMsg = error.response.data;
		console.error(errorMsg);
		response = errorMsg;
	}
	return response;
}

exports.listPlants = listPlants;
exports.plantInfo = plantInfo;
exports.setPlant = setPlant;
// exports.editPlant = editPlant;