const { Command } = require('discord-akairo');
const logger = require('../logger');
const { MessageEmbed } = require("discord.js");
const { parseTime } = require('../ParseTime');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'pong', 'hello', 'hi']
        });
    }

    async exec(message, Any) {
        const sent = await message.util.reply('Pong!');
        logger.verbose('Responded to ping command: ' + message.util.parsed.alias);

        const t = parseTime(this.client.uptime);

        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        const dict = {
            ping: 'Pong',
            pong: 'Ping',
            hello: 'Ello',
            hi: 'Hello'
        }
        return message.util.reply(new MessageEmbed()
            .setTitle(`${dict[message.util.parsed.alias]}! I'm Alive!`)
            .setDescription('Here are some stats:')
            .setColor('#0099ff')
            .addFields(
                { name: '🔂 **RTT**', value: `${timeDiff} ms`, inline: true },
                { name: '🏓 **Ping**', value: `${Math.round(this.client.ws.ping)} ms`, inline: true },
                { name: '🕒 **Uptime**', value: `${t.h.toString().padStart(2, '0')}:${t.m.toString().padStart(2, '0')}:${t.s.toString().padStart(2, '0')} (h\\:m\\:s)`, inline: true },
            )
            .setAuthor('Haiya',
                'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
            .setTimestamp()
        );
    }
}

module.exports = PingCommand;