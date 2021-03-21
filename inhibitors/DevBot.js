const { Inhibitor } = require('discord-akairo');

class DevBot extends Inhibitor {
    constructor() {
        super('devBot', {
            reason: 'Development Bot'
        })
    }

    exec(message, cmd) {
        // Only speak in a channel called funni-bot-dev
        if (typeof process.env.DEV_MODE !== 'undefined') return message.channel.name !== 'funni-bot-dev';
        else return true;
    }
}

module.exports = DevBot;