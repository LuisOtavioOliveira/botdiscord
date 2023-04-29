// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()
const { TOKEN, CLIENT_ID } = process.env


const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands" )
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com data ou execute vazios.`)
    }
 }
// Create a new client instance

console.log(client.commands)

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
}); 

// Log in to Discord with your client's token
client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction=>{
   if (!interaction.isChatInputCommand) {
       return
   } else {
    console.log(interaction)
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    }
    catch (err) {
         console.error(err)
         await interaction.reply("Houve um erro ao executar esse comando")
    }
   }
})
    
