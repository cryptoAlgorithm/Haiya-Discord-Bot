const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class HelpMe extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'helpme']
        });
    }

    async exec(message, Any) {
        return message.channel.send(new MessageEmbed()
            .setTitle('Command List')
            .setDescription(`Values marked with a **\\*** are owner-only commands.
            My current owner is <@${this.client.ownerID}>`)
            .setColor('#282828')
            .addFields(
                { name: 'đ **I\'m Alive!**', value: '`?ping`\nSay hi!', inline: true },
                { name: 'đ **Memes**', value: '`?meme`\nHot memes from reddit', inline: true },
                { name: 'âšī¸ **About Me**', value: '`?abt`\nLearn more about me', inline: true },
                { name: 'đĸ **Spam\\***', value: '`?spam`\nSpam-pings a user', inline: true },
                { name: 'đ ī¸ **UnFarker\\***', value: '`?unfark`\nBatch-remove channels', inline: true },
                { name: 'đ ī¸ **Create Channels\\***', value: '`?createchs`\nBatch-create channels', inline: true },
            )
            .setAuthor('Haiya',
                'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
            .setFooter('More features coming soon!')
            .setTimestamp()
        );
    }
}

module.exports = HelpMe;