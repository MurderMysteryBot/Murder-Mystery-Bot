const ShardingManager = require('discord.js');
const Manager = new ShardingManager('./bot.js', {
    maxShards: 'auto',
    token: 'YOUR BOT TOKEN'
});

Manager.spawn();

Manager.on('launch', (s) => console.log(`${s.id} started.`));
