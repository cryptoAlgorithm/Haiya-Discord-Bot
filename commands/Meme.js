const sw = require('snoowrap');

const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");
const logger = require('../logger');

const { parseTime } = require('../ParseTime');
const random = require('../random');

// I shall not commit these tokens
const r = new sw({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN
});


class MemeCmd extends Command {
    constructor() {
        super('meme', {
            aliases: ['meme', 'memes', 'getmeme'],
        });
    }

    async exec(message, Any) {
        const msg = await message.channel.send('⌛ Loading posts from reddit... ⏳');
        logger.verbose('Requesting memes from reddit')

        const memeSubs = ['memes', 'dankmemes', 'wholesomememes', 'ComedyCemetery'];

        const sub = random.choice(memeSubs)
        const posts = await (await r.getSubreddit(sub).getHot())
        const selPost = random.choice(posts);

        // Get time since creation
        const diff = new Date() - new Date(selPost.created_utc * 1000);
        const t = parseTime(diff);

        return msg.edit('Here\'s your meme!', new MessageEmbed()
            .setTitle(selPost.title)
            .setURL('https://www.reddit.com' + selPost.permalink)
            .setColor('#0099ff')
            .setAuthor(`u/${selPost.author.name} • Posted ${t.h}h ${t.m}m ago`,
                'https://www.redditstatic.com/desktop2x/img/favicon/badged-favicon-32x32.png',
                'https://www.reddit.com/u/' + selPost.author.name)
            .setImage(selPost.url)
            .setFooter(`👍 ${selPost.ups} | 💬 ${selPost.num_comments} | r/${sub}`)
        );
    }
}

module.exports = MemeCmd;