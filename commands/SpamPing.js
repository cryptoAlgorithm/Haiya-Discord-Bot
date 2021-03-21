const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const logger = require('../logger');
const random = require('../random');

class SpamPing extends Command {
    constructor() {
        super('spam', {
            aliases: ['spam', 'spamping', 'pinguser'],
            ownerOnly: true,
            args: [
                {
                    id: 'usr',
                    type: 'user',
                    prompt: {
                        start: () => {
                            const embed = new MessageEmbed()
                                .setTitle('User to spam ping')
                                .setDescription('Mention the user to spam ping')
                                .setColor('#0099ff')
                                .setAuthor('Haiya',
                                    'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
                                .setTimestamp();
                            return { embed };
                        },
                        retry: 'That\'s not a valid user! Try again.'
                    }
                },
                {
                    id: 'numTimes',
                    type: 'number',
                    prompt: {
                        start: () => {
                            const embed = new MessageEmbed()
                                .setTitle('Number of times to ping')
                                .setDescription('Use this with caution; A spam ping operation cannot be stopped once started')
                                .setColor('#d71111')
                                .setAuthor('Haiya',
                                    'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
                                .setTimestamp();
                            return { embed };
                        },
                        retry: 'That\'s not a number! Try again.'
                    }
                }
            ],
        });
    }

    async exec(message, args) {
        const initMsg = await message.util.reply('Starting to spam ping...');

        logger.verbose(`User ${args.usr} is getting spam pinged ${args.numTimes} times!`);

        const cols = ['#d71111', '#d77e11', '#d7c311', '#a2d711',
            '#11d732', '#11d77b', '#1188d7', '#1149d7',
            '#5d11d7', '#8b11d7', '#c311d7', '#d7118e'
        ];

        const sMessages = []

        for (let i = 0; i < args.numTimes; i++) {
            const msg = await message.channel.send(`${args.usr} I'm **Nicholas!** ${args.usr}`, new MessageEmbed()
                .setTitle((i + 1) + '. Are you having a nice day? I\'m Nicholas!')
                .setDescription(args.usr)
                .setColor(random.choice(cols))
                .setTimestamp());
            await msg.react(':okkk:822736764220473374');

            sMessages.push(msg);
        }

        // Listen for wastebasket reaction for 30 secs
        const doneMsg = await message.channel.send(
            new MessageEmbed()
                .setTitle(`I'm done spamming.`)
                .setDescription('React with 🗑️ in the next 30 secs to delete all spam messages (ghost ping)')
                .setColor('#ff9900')
                .setTimestamp()
                .setAuthor('Haiya',
                    'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
        );
        await doneMsg.react('🗑️');

        const filter = (reaction, user) => {
            return ['🗑️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        doneMsg.awaitReactions(filter,
            { max: 1, time: 30000, errors: ['time'] })
            .then(async () => {
                // Delete prompt msg to reduce spam
                await doneMsg.delete();
                await initMsg.delete()

                const msg = await message.reply(new MessageEmbed()
                    .setTitle('Deleting all spam-ping messages...')
                    .setColor('#d71111')
                    .setTimestamp()
                    .setAuthor('Haiya',
                        'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png'));
                for (const message of sMessages) await message.delete();
                msg.edit(new MessageEmbed()
                    .setTitle('Deleted all spam-ping messages...')
                    .setColor('#06b300')
                    .setTimestamp()
                    .setAuthor('Haiya',
                        'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png'))
            })
            .catch();

        return initMsg.edit('Finished spamming.');
    }
}

module.exports = SpamPing;