const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const logger = require('./logger');

const { serve } = require('./server');

class MainClient extends AkairoClient {
    constructor() {
        super({
            ownerID: '717245560234573895', // or ['123992700587343872', '86890631690977280']
        }, {
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '?',
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            argumentDefaults: {
                prompt: {
                    timeout: 'Time ran out, command has been cancelled.',
                    ended: 'Too many retries, command has been cancelled.',
                    cancel: 'Command has been cancelled.',
                    retries: 3,
                    time: 15000
                }
            },
            defaultCooldown: 2000,
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();
    }
}

// Start server
serve();

const client = new MainClient();

client.login(process.env.DISCORD_KEY).then(() => {
    logger.info('Logged In');

    // Change activity every 3 secs
    const activities = ['with ?help', 'with ?ping', 'with ?meme'];
    let i = 0;
    setInterval(async () => {
        await client.user.setActivity(activities[i]);
        i++;
        if (i >= activities.length) i = 0;
    }, 3000);
});