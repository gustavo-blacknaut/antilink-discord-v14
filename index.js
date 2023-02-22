const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js')
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const SimplDB = require('simpl.db');
client.db = new SimplDB();

client.login('')

client.on("ready", async() => {
    console.log(`Conectei em: ${client.user.tag}`)
})
client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return

    if(message.content.startswith('!antilink off')) {
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            message.reply({ content: `❌ **|** Olá ${message.member}, você acabou de **desativar** o antilink!` })
            client.db.set(`antilink.${message.guild.id}`, false)
        } else {
            message.reply({ content: `⚠ **|** Olá ${message.member}, Você não possue permissões para usar este comando!` })
        }
    }
    if(message.content.startswith('!antilink on')) {
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
            message.reply({ content: `✅ **|** Olá ${message.member}, você acabou de **ativar** o antilink!` })
            client.db.set(`antilink.${message.guild.id}`, true)
        } else {
            message.reply({ content: `⚠ **|** Olá ${message.member}, Você não possue permissões para usar este comando!` })
        }
    }
})
client.on("messageCreate", async (message) => {
        if (!message.guild) return
        if(message.member.permissions.has(PermissionFlagsBits.Administrator)) return
	let link = /(((discord.gg?)))/;

	if(client.db.get(`antilink.${message.guild.id}`) === true ) {
		if(link.test(message) === true) {
		   	await message.delete().catch(saturndev => {})
        	        await return message.channel.send(`🚫 **|** Olá ${message.member}, você não pode enviar convites de outros servidores aqui!`).then(async(x) => setTimeout(async() => { await x.delete() }, 10000)).catch(saturndev => {})
                }
        }
})
