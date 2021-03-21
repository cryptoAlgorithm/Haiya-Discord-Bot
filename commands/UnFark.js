const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')
const logger = require('../logger');

class UnFark extends Command {
    constructor() {
        super('unfark', {
            aliases: ['unfark', 'unfarker'],
            ownerOnly: true,
            args: [
                {
                    id: 'channelName',
                    type: 'string',
                    prompt: {
                        start: () => {
                            const embed = new MessageEmbed()
                                .setTitle('Name of the channel you\'d like to mass delete:')
                                .setDescription('Are you 100% sure about this? This action cannot be undone')
                                .setColor('#0099ff')
                                .setAuthor('Haiya',
                                    'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
                                .setTimestamp();
                            return { embed };
                        },
                        retry: 'That\'s not a valid channel name! Try again.'
                    }
                }
            ],
        });
    }

    async exec(message, args) {
        await message.util.reply('Searching and deleting channels...');

        /*client.channels.cache.array().forEach(channel => {
            if(channel.name === 'fark-this') {
                console.log('Deleting channel', channel.id);
                channel.delete()
            }
        })*/

        const chs = [];
        for (const channel of message.guild.channels.cache.array()) {
            if (channel.name === args.channelName) {
                await channel.delete();

                chs.push({
                    name: channel.name.toString(), id: channel.id
                });

                logger.verbose('Unfarker: Deleted channel', channel.id);
            }
        }

        const reply = new MessageEmbed()
            .setTitle(`Successfully UnFarked Channels`)
            .setDescription('Deleted Channels:')
            .setColor('#06b300')
            .setAuthor('Haiya',
                'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
            .setTimestamp()

        let i = 0;
        chs.some(ch => {
            if (i >= 23 && chs.length !== 25) {
                reply.addField( `+ ${chs.length - 24} more`, '\u200b', true)
                return true;
            }
            reply.addField(ch.name, `\`${ch.id}\``, true);
            i++;
        });

        return message.util.reply(reply);
    }
}

module.exports = UnFark;