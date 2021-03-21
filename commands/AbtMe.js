const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class PingCommand extends Command {
    constructor() {
        super('about', {
            aliases: ['about', 'aboutme', 'abt', 'abtme', 'info']
        });
    }

    async exec(message, Any) {
        return message.channel.send(new MessageEmbed()
            .setTitle('About Me')
            .setDescription('__//—————— **Intro** ——————\\\\\\ __\n' +
                'This bot started as a quick way to clean up 500 spam channels created in a private server, ' +
                'and has grown into something slightly useful (I hope)\n' +
                'To run a command, use the prefix `?` or mention me\n' +
                'For more information about commands, use `?help` or `@Haiya help`\n' +
                '__//—————— **About** ——————\\\\\\ __\n' +
                '• Created and maintained by CryptoAlgo Inc. since Mar 2021\n' +
                '• Hosted on Repl.it or Heroku\n' +
                '• Completely open source; Source code available on GitHub here\n' +
                '__//—————— **Support** ——————\\\\\\ __\n' +
                '• Email me at [support@cryptoalgo.cf](mailto:support@cryptoalgo.cf)\n' +
                '• Or open an issue in the GitHub repo'
            )
            .setColor('#0099ff')
            .setAuthor('Haiya',
                'https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
            .setThumbnail('https://cdn.discordapp.com/app-icons/822752007298744340/ccb7c064b68bd7a04ee557b496501e7f.png')
            .setTimestamp()
        );
    }
}

module.exports = PingCommand;