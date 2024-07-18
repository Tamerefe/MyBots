require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online •`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hello') {
        message.reply("hello");
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }

    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }

    if (interaction.commandName === 'math') {
        const num1 = interaction.options.getNumber('first-number');
        const num2 = interaction.options.getNumber('second-number');
        const operator = interaction.options.getString('operator');

        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
                break;
            default:
                result = 'Unknown operator';
        }

        interaction.reply(`${num1} ${operator} ${num2} = ${result}`);
    }
});

client.login(process.env.TOKEN);
