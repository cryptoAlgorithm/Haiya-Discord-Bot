const { Listener } = require('discord-akairo');
const logger = require('../logger');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec(Any) {
        logger.info('Bot ready');
    }
}

module.exports = ReadyListener;