require('dotenv').config();
const { Client, IntentsBitField, InteractionCollector } = require('discord.js');

const client = new Client({

    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]

})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online •`);
})

client.on('messageCreate', (message) => {

    if(message.author.bot){
        return;
    }

    if(message.content == 'hello'){
        message.reply("hello");
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return; 

    if(interaction.commandName === 'hey'){
        interaction.reply('hey!');
    }

    if(interaction.commandName === 'ping'){
        interaction.reply('pong!');
    }

    // FIX IT
    if(interaction.commandName === 'add'){
        const num1 = interaction.option.get('first-number');
        const num2 = interaction.option.get('second-number');  

        console.log(num1,num2);
    }
})

client.login(process.env.TOKEN);