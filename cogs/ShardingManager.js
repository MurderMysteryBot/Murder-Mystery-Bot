/**
  * @file ShardingManager ~> To spawn a shard.
  * @class ShardingManager
  **/
  
class ShardingManager {
  constructor(options = {}) {
    this.token = options.token;
    this.Discord = require('discord.js');
    if (typeof options.token !== 'string') throw new Error();
  }
  
  /**
    * To basically set up the Manager process.
    * @param {String} path ~> Path to main file.
    **/
  manager(path) {
    if (!path) { throw new Error(); }
    this.manager = new this.Discord.ShardingManager(path, { token: this.token });
    console.log('[SHARD]: Sharding Manager has been placed.');
  }
  
  /**
    * Spawn the shards.
    **/
    
   async connect() {
     await this.manager.spawn();
     this.manager.on('launch', (s) => console.log(`[SHARD]: Shard ${s.id} has spawned.`));
   }
}

module.exports = ShardingManager;
