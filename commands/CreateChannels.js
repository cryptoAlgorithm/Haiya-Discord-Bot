const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const logger = require('../logger');

class CreateChannels extends Command {
    constructor() {
        super('createchannels', {
            aliases: ['createchannels', 'createchs', 'fark', 'farkup'],
            ownerOnly: true,
            args: [
                {
                    id: 'channelName',
                    type: 'string',
                    prompt: {
                        start: () => {
                            const embed = new MessageEmbed()
                                .setTitle('Name of channel to mass create')
                                .setDescription('You can always undo this with the `unfark` command! 😀')
                                .setColor('#0099ff')
                                .setAuthor('Haiya',
                                    'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
                                .setTimestamp();
                            return { embed };
                        },
                        retry: 'That\'s not a valid channel name! Try again.'
                    }
                },
                {
                    id: 'num',
                    type: 'number',
                    prompt: {
                        start: () => {
                            const embed = new MessageEmbed()
                                .setTitle('Number of channels to create')
                                .setColor('#0099ff')
                                .setAuthor('Haiya',
                                    'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
                                .setTimestamp();
                            return { embed };
                        },
                        retry: 'That\'s not a valid number! Try again.'
                    }
                }
            ],
        });
    }

    async exec(message, args) {
        await message.util.reply('Creating channels...');

        for (let i = 0; i < args.num; i++) {
            await message.guild.channels.create(args.channelName);
            logger.verbose(`Creating channel '${args.channelName}' (#${i + 1}/${args.num})`);
        }

        return message.util.reply(new MessageEmbed()
            .setTitle(`Done creating ${args.num} channels named ${args.channelName}!`)
            .setColor('#06b300')
            .setAuthor('Haiya',
                'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
            .setTimestamp());
    }
}

module.exports = CreateChannels;