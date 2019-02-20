/**
 *    Murder Mystery Bot
 *        V1.2.1b
 *      By FireMario211
 */

// debugging stuff
/**
 * 123717 =  === true)
 * 321827 =  === false)
 * 
 * Mode Ids:
 * 1 - Regular
 * 2 - Murder Party
 * 3 - 1v1
 * 4 - Humans VS Bots
 * 5 - Unlimited Mode
 * 6 - N/A (wat how did i skip that)
 * 7 - Bot 1v1
 * 8 - Short roles
 * 9 - Time Mode
 * 10 - Insane Mode
 * 11 - Sandbox Mode
 * 12 - Zombie Mode
 * 
 * Role Ids:
 * 1 - Murderer
 * 2 - Detective
 * 3 - Healer
 * 4 - Radio Person
 * 5 - Assassin
 * 6 - Jailor
 * 7 - Zombie
 */
const {
  Client,
  RichEmbed,
  Collection
} = require('discord.js') // Discord.JS Module
const blapi = require("blapi");
blapi.setLogging(true);
const bot = new Client({
  disableEveryone: true,
  disabledEvents: ["RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "VOICE_SERVER_UPDATE", "VOICE_STATE_UPDATE", "TYPING_START", "GUILD_UPDATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEl_CREATE", "MESSAGE_DELETE_BULK"] // Reduce RAM with this.
}) // Discord Client Constructor (Class)
const snekfetch = require('snekfetch')
const translate = require('./translations.json')
const fs = require('fs')
// GITHUB UPDATE CHECKER
var checkUpdate = require('check-update-github');
var pkg = require('./package.json');
const cooldowns = new Collection();
updatedata()
let langarray;
let blacklituser;
let blacklitguild;
var appealsa;
checkUpdate({
  name: pkg.name,
  currentVersion: pkg.version,
  user: 'FireMario211',
  branch: 'master'
}, function (err, latestVersion, defaultMessage) {
  if (!err) {
    console.log(defaultMessage);
  }
});
// GITHUB UPDATE CHECKER
//const random = require('random-number-generator')
var gameid = 0
//var gamesession = []
var enablechat = 0
var debugmode = 1
let rolerandomizer = {
  1: [1, 2, 3, 4, 5, 6],
  2: [-1, -2],
  3: [1, 2],
  4: [-1, -2],
  5: [1, 2, 3, 4, 5, 6],
  6: [-1, -2],
  7: [1, 2],
  8: [1, 2, 3, 4],
  11: [1, 2, 3, 4, 5, 6],
  12: [1, 2, 3, 5, 6, 7]
}
/*
"detective": "Detective",
            "healer": "Healer",
            "radioperson": "Radio Person",
            "assassin": "Assassin",
            "jailor": "Jailor",
            "innocent": "Innocent"
*/
function getRoleId(roleId, lang) {
  switch (roleId) {
    default:
      return translate[lang].roles.innocent;
      break;
    case 1:
      return translate[lang].roles.murderer;
      break;
    case 2:
      return translate[lang].roles.detective;
      break;
    case 3:
      return translate[lang].roles.healer;
      break;
    case 4:
      return translate[lang].roles.radioperson;
      break;
    case 5:
      return translate[lang].roles.assassin;
      break;
    case 6:
      return translate[lang].roles.jailor;
      break;
  }
}
bot.gameid = 0
const sql = require('sqlite')
const config = require('./config.json')
let gamesss = config.playing
//gamesss = gamesss.replace("%guild.size%", bot.guilds.size)
if (config.sharding === 1) {
  bot.shard.broadcastEval('this.guilds.size').then(results => {
    let guildcount = 0
    results.forEach(function (a) {
      guildcount = guildcount + a
    })
    //let guildcount = results.reduce((prev, val) => prev + val, 0)
    gamesss = gamesss.replace("%shard.id%", bot.shard.id)
    gamesss = gamesss.replace("%shard.count%", bot.shard.count)
    gamesss = gamesss.replace("%prefix%", config.prefix)
    gamesss = gamesss.replace("%guild.size%", guildcount)
    setTimeout(function () {
      gamesss = gamesss.replace("0", guildcount)
    }, 1000)
  })
}
sql.open('./murdermystery.sqlite')
var version = "1.2.1b"
var botnames = ["Jake", "Jeff", "OhMan", "Noah", "William", "John", "Bob", "Ryan", "Logan", "Aiden", "Ross", "Mark", "Steve", "Landon", "Daniel", "Dan", "Charley", "Charles", "Mario", "Luigi", "Michael", "Yukko", "Luca", "Lucas", "Alfred", "Alex", "Mike", "Henry", "Jacob", "Emily", "Mio-chan", "Yumi", "Joshua", "Matthew", "Christopher", "Andrew", "Ethan", "Joseph", "Anthony", "David", "Alexander", "Madison", "Emma", "Olivia", "Hannah", "Abigail", "Isabella", "Samantha", "Elizabeth", "Ashley", "Alexis", "Sarah", "Sophia", "Amy", "Sora", "Alan", "Parker", "August", "Jason", "Aaron", "Jayden", "Kyle", "Alex", "Carlos", "Steven", "Cody", "Seth", "Blade", "Blake", "Wessel", "Nadeko", "An Unknown Person", "Mikan", "NobleShyGuy", "Etzer", "HtD", "FireMario211", "Krazyman50", "KyleMC1912", "JJking_1", "Sov", "Phase", "FaZe", "Anonymous", "FaZe_Banks", "oklookitsAugust", "Phineas", "AugustBoat", "KEEL"]
var botquotes = ["Hi guys", "Uh..", "LMAO", "Oh no...", "Rip", "Lol", "LOL", "Hmmm <:Thinkhung:320597771310727169>", "Its him!", "Its her!", "Im scared...", "Whos gonna die...?", "Im the Healer!", "Im the Detective!", "Im the Broadcaster!", "Ur ded", "first, oh wait... am i?", "when is time to scream?", "EVERYONE VOTEHANG HIM/HER!!!", "hey guys!", "how yer doin?", "Im the murderer! pls dont kill me ;(", "hi ;)", "hi....", "hello...?", "lol", "rip you all", "where is andrew?", "where did i come from?", "im definetly not gonna die", "Your gonna die tonight :)", "Maybe I will die? xD", "Is it September or August?"]
var rarequotes = ["Hehehehehehhehehhehehe", "You know i have one spooky part in THIS movie ;)", "you cant find me", "wessel was here... >:)", "i bet fire is in this game he made us xdxdxdxdx", "i i KILL HUMANZ", "~~im on meth~~", "You better watch out ;)", "i know your secrets... ;) ;D", "OhMan on meth", "Noble hacked this bot ;) (not rly)", "I will find you and kill you ;)", "IM GOING TO KEEL YOU (define KEEL in DMS and you will be in the bot names. DM me FireMario211#2948) I'll tell you if you are right or wrong. You can only DM me once for that then thats it, so be wise... *use alts*)"]

function updatedata() {
  langarr()
  blacklistedguilddata()
  blacklisteduserdata()
  appealthing()
}

function appealthing() {
  appealsa = JSON.parse(fs.readFileSync("./appeals.json", "utf8"));
}

function langarr() {
  let arr;
  snekfetch.get(`https://raw.githubusercontent.com/FireMario211/Murder-Mystery-Bot/master/locales/langarray.json`).then(r => {
    fs.writeFileSync("./langarray.json", JSON.stringify(JSON.parse(r.text)));
    langarray = JSON.parse(fs.readFileSync("./langarray.json", "utf8"));
  })
}

function blacklistedguilddata() {
  snekfetch.get(`https://raw.githubusercontent.com/FireMario211/mmbblacklist/master/blacklistedguilds.json`)
    .then(r => {
      //let assssaaaa = new Buffer.from(JSON.stringify(r.body).data);
      //let bufferOriginal = JSON.parse(assssaaaa.toString('utf8'))
      blacklitguild = JSON.parse(fs.readFileSync("./blacklistguilds.json", "utf8"));
      fs.writeFileSync("./blacklistguilds.json", JSON.stringify(JSON.parse(r.text)));
    }).catch(e => {
      throw new Error(e)
    });
}

function blacklisteduserdata() {
  snekfetch.get(`https://raw.githubusercontent.com/FireMario211/mmbblacklist/master/blacklistedusers.json`)
    .then(r => {
      //let assssaaaa = new Buffer.from(JSON.stringify(r.body).data);
      //let bufferOriginal = JSON.parse(assssaaaa.toString('utf8'))
      fs.writeFileSync("./blacklistusers.json", JSON.stringify(JSON.parse(r.text)));
      blacklituser = JSON.parse(fs.readFileSync("./blacklistusers.json", "utf8"));
    }).catch(e => {
      throw new Error(e)
    });
}
//var arr = [];
//var targetassassin = []
//let mmgame = JSON.parse(fs.readFileSync('./mmgame.json', 'utf8'));
//let mmplayers = JSON.parse(fs.readFileSync('./mmplayers.json', 'utf8'))
//let preventjoin = JSON.parse(fs.readFileSync('./preventjoin.json', 'utf8'))
//let verifyt = JSON.parse(fs.readFileSync('./verificationids.json', 'utf8'));
let aaa = JSON.parse(fs.readFileSync('./aaa.json', 'utf8'));
//var isAdmin = user_id => bot.guilds.get(config.guildid).roles.get(config.adminroleid).members.map(member => member.id).indexOf(user_id) > -1;
if (config.sharding === 1) {
  if (bot.shard.id === 0) {
    var isAdmin = user_id => bot.guilds.get(config.guildid).roles.get(config.adminroleid).members.map(member => member.id).indexOf(user_id) > -1;
    var isBugTrackers = user_id => bot.guilds.get(config.guildid).roles.get(config.bugroleid).members.map(member => member.id).indexOf(user_id) > -1;
  }
}

/*
if (config.sharding === 1) {
bot.shard.broadcastEval("this.guilds").then(result => {
  let guildobj = result
  for (let i = 0; i < shards.length; i++) {
    if (shards[i].get(config.guildid)) {
      guildobj = shards[i].get(config.guildid);
      break;
    }
  }
  isAdmin = user_id => guildobj.roles.get(config.adminroleid).members.map(member => member.id).indexOf(user_id) > -1;
  isBugTrackers = user_id => guildobj.roles.get(config.guildid).roles.get(config.bugroleid).members.map(member => member.id).indexOf(user_id) > -1;
})
}
*/
var blacklisteduser = user_id => blacklituser.indexOf(user_id) > -1;
var blacklistedguild = user_id => blacklitguild.indexOf(user_id) > -1;
/*
let verifyid = Math.random().toString(36).substr(2, 5)
if (!verifyt[verifyid]) verifyt[verifyid] = {
  userid: "",
  verifycode: ""
};
let verifyData = verifyt[verifyid]
*/
bot.login(config.tokens.bot)

function postapi() {
  console.log(`[SHARD ${bot.shard.id}] POST API FUNCTION`)
  if (config.enabledblpost === 1) {
    if (config.sharding === 1) {
      function dblpost() {
        snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
          .set('Authorization', config.tokens.dbl)
          .send({
            server_count: bot.guilds.size,
            shard_count: bot.shard.count,
            shard_id: bot.shard.id
          })
          .then(console.log('Updated dboats.org status.'))
          .catch(e => console.warn('dboats.org is daown spammmmm @olay'))
      }

      function dbbpost() {
        const {
          post
        } = require("superagent");
        const postBody = {
          shards: bot.shard.id,
          guilds: bot.guilds.size
        };
        post(`https://discordsbestbots.xyz/api/bots/${client.user.id}`)
          .send(postBody)
          .set("Authorization", "Your token")
          .then(r => console.log(r.body))
          .catch(console.error)
      }
    } else {
      snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
        .set('Authorization', config.tokens.dbl)
        .send({
          server_count: bot.guilds.size
        })
        .then(console.log('Updated dboats.org status.'))
        .catch(e => console.warn('dboats.org is daown spammmmm @olay'))
    }
  }
}
if (config.enabledblpost === 1) {
  blapi.handle(bot, config.tokens.apiKeys, 5);
}
/*
setInterval(() => {

  if (config.enabledblpost === 0) return;
  postapi()

}, 100000)
*/

function defgame() {
  /* 
  %guild.size% = bot.guilds.size
  %shard.id% = bot.shard.id
  %prefix% = config.prefix
  %shard.count% = bot.shard.count
  
  */

  bot.user.setPresence({
    game: {
      //name: `${config.playing}${bot.guilds.size} servers\n - Shard ID [${bot.shard.id}]\n - Shard Count [${bot.shard.count}]`,
      name: gamesss,
      type: 0
    }
  });
  /*
    bot.user.setPresence({
      game: {
        name: `Murder Mystery Bot Alpha!`,
        type: 0
      }
    });
    */
}
// The END
let ownerids = ["126119057232625664", "280158289667555328", "281397352177074177"]
bot.on('error', (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
//bot.on('debug', (e) => console.info(e));
bot.on('ready', () => {
  console.log('Logged in as ' + bot.user.username + ' and I am on ' + bot.guilds.size + ' guilds! (' + bot.user.id + ')')
  //console.log(bot.guilds)
});
// defgame fix \/\/\/
bot.on('guildCreate', guild => {
  defgame()
})
bot.on('guildDelete', guild => {
  defgame()
})
// defgame fix ^^^
function insertGuild(guildId) {
  sql.run(`INSERT INTO murderMystery (guildId, hostRoleID, rank, murderWins, innocentWins, murderchannelid, healchannelid, sheriffchannelid, murdergamechannelid, radiochannelid, host, gameStarted, spectatorchannelid, isDay, isNight, isStopcycle, murdermysteryRoleID, jailorchannelid, jailchannelid, shopchannelid, zombiechannelid, players, modeId, startcmd, gameid, lang, playerInsert, defaultChannel, randomizer, day, daytimelen, nighttimelen, categoryChannelId, gameData) VALUES ("${guildId}", "0", "0", 0, 0, "0", "0", "0", "0", "0", "0", 0, "0", "0", "0", "0", 0, 0, 0, 0, 0, 0, 0, 0, 0, "English", 0, "0", "0", 0, 55, 60, '0', '')`);
}
bot.on("guildCreate", guild => {
  bot.shard.broadcastEval(`let discord = require('discord.js')
  this.channels.has('350984977371889664') && this.channels.get('350984977371889664').send({
    embed: new discord.RichEmbed().setTitle(':inbox_tray: New Server added!').setAuthor('Server Name: ${guild.name} (${guild.id})', '${guild.iconURL}').addField('Server Owner ID:', '${guild.ownerID}', true).addField('Member Count:', '${guild.memberCount}', true).setThumbnail('${guild.iconURL}').setColor(0xFFDF00).setDescription('I am now in ${bot.guilds.size} Servers!').setTimestamp()
  });`)
    .catch(err => console.log(`GUILDHANDLER.DELETE ERR: ${err.stack}`))
  insertGuild(guild.id)
  console.log(`SHARD [${bot.shard.id}] ` + 'Server Name: ' + guild.name + ' (' + guild.id + ')' + ' New Server added! ' + 'I am now in ' + bot.guilds.size + ' Servers!')
  defgame()
  //bot.user.setGame(config.playing + bot.guilds.size + " servers")
});
bot.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  if (guild.id === '264445053596991498') return;
  if (guild.id === '110373943822540800') return;
  if (bot.guilds.has('319583713262436354')) {
    if (isAdmin === undefined) return;
    if (!isAdmin(member.id) || !ownerids.includes(member.id)) return;
  }
  if (bot.guilds.has('319583713262436354')) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${guild.id}'`).then(row => {
      if (!row) {
        if (ownerids.includes(member.id)) {
          guild.defaultChannel.send({
            embed: new RichEmbed().setDescription("👑 The Bot Owner `" + member.user + "` has joined your server! 👑")
          })
          return;
        }
        if (isAdmin(member.id)) {
          guild.defaultChannel.send({
            embed: new RichEmbed().setDescription(":gear: A Bot Administrator `" + member.user + "` has joined your server! :gear:")
          })
          return;
        }
      } else {
        if (ownerids.includes(member.id)) {
          guild.defaultChannel.send({
            embed: new RichEmbed().setDescription(translate[row.lang].botownerjoin + member.user + translate[row.lang].botownerjointwo)
          })
          return;
        }
        if (isAdmin(member.id)) {
          guild.defaultChannel.send({
            embed: new RichEmbed().setDescription(translate[row.lang].botadminjoin + member.user + translate[row.lang].botadminjointwo)
          })
          return;
        }
      }
    })
  }
})
bot.on('guildDelete', guild => {

  //bot.
  bot.shard.broadcastEval(`let discord = require('discord.js')
  this.channels.has('350984977371889664') && this.channels.get('350984977371889664').send({
    embed: new discord.RichEmbed().setTitle(':outbox_tray: Bot was removed from a server :(').setAuthor('Server Name: ${guild.name} (${guild.id})', '${guild.iconURL}').setThumbnail('${guild.iconURL}').setColor(0xFFDF00).setDescription('I am now in ${bot.guilds.size} Servers!').setTimestamp()
  })`)
    .catch(err => console.log(`GUILDHANDLER.DELETE ERR: ${err.stack}`))
  console.log(`SHARD [${bot.shard.id}] ` + 'Server Name: ' + guild.name + ' (' + guild.id + ')' + ' Bot was removed from a server :( ' + 'I am now in ' + bot.guilds.size + ' Servers!')
  sql.run(`DELETE FROM murderMystery WHERE guildId ='${guild.id}'`)
  defgame()
})
/*
bot.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (guild.id !== '319583713262436354') return;
  bot.channels.get('319590345052520448').send("<@" + member.user.id + "> Please check your DMS for a Verification code!")
  verifyData.userid = member.user.id
  verifyData.verifycode = verifyid
  member.user.send('Please follow these steps\nIn <#319589323894816789>, you will have to type this command:\nmm!verify `' + verifyid + "`\nThen you will be verified!")
  //member.guild.defaultChannel.sendEmbed(new RichEmbed().setTitle('Welcome to ' + guild.name + '!').setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL).setThumbnail(guild.iconURL).setColor(0x00FF3C).setDescription('Hope you have a great time here!').setTimestamp());
  fs.writeFile('./verificationids.json', JSON.stringify(verifyt), (err) => {
    if (err) console.error(err)
  });
});
*/
/*
bot.on("guildMemberRemove", (member) => {
  const guild = member.guild;
	member.guild.defaultChannel.sendEmbed(new RichEmbed().setTitle('Has left ' + guild.name + '!').setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL).setThumbnail(guild.iconURL).setColor(0xFF0000).setDescription('Rest in pieces :(').setTimestamp());
});
*/
function randomizearrayroles() {
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    //While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  // Used like so
  rolerandomizer[1] = shuffle(rolerandomizer[1]);
  rolerandomizer[2] = shuffle(rolerandomizer[2]);
  rolerandomizer[3] = shuffle(rolerandomizer[3]);
  rolerandomizer[4] = shuffle(rolerandomizer[4]);
  rolerandomizer[5] = shuffle(rolerandomizer[5]);
  rolerandomizer[6] = shuffle(rolerandomizer[6]);
  rolerandomizer[7] = shuffle(rolerandomizer[7]);
  rolerandomizer[8] = shuffle(rolerandomizer[8]);
  rolerandomizer[11] = shuffle(rolerandomizer[11]);
  rolerandomizer[12] = shuffle(rolerandomizer[12]);
}

randomizearrayroles()
console.log(rolerandomizer)
//console.log(rolerandomizer[1])
bot.on('message', message => {
  function createGameChannel(name, data) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) throw new Error("I cannot find Guild Data!")
      switch (name) {
        case "murderer":
          if (row.modeId === 4) {
            playeridz++;
            playeridz++;
            if (debugmode === 1) {
              console.log("[DEBUG] ADD PLAYERIDZ")
            }
          }
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId =1 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply("Error at create murder channel :thonk:")
            } else {
              message.guild.createChannel('murderer', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                if (data.isMurderParty === 0) {
                  c.overwritePermissions(row1.userId, {
                    READ_MESSAGES: true
                  })
                }
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (data.isMurderParty === 1) {
                  c.overwritePermissions(row.murdermysteryRoleID, {
                    READ_MESSAGES: true
                  })
                }
                if (row.categoryChannelId !== "0") {
                  c.setParent(row.categoryChannelId)
                }
                sql.run(`UPDATE murderMystery SET murderchannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
                if (data.isMurderParty === 1) {
                  c.send(translate[row.lang].jobchannelmsgs.murderer.channel)
                  c.send("@everyone" + translate[row.lang].jobchannelmsgs.murderer.channel4)
                } else {
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 5 AND guildId ='${message.guild.id}'`).then(row6 => {
                    if (!row6) {
                      if (![3, 8, 7].includes(row.modeId)) {
                        return message.channel.send("`ERROR` Assassin not found!")
                      }
                    }
                    c.send(translate[row.lang].jobchannelmsgs.murderer.channel)
                    let itemz = ""
                    //let itemz2 = translate[row.lang].shopitemdesc
                    let thingsss = translate[row.lang].darkshop
                    for (let i = 0; i < translate[row.lang].darkshopitems.length; i++) {
                      itemz += `Name: ${translate[row.lang].darkshopitems[i].name}\nDescription: ${translate[row.lang].darkshopitems[i].description}\nPrice: ${translate[row.lang].darkshopitems[i].price}<:darkgold:385205541955174401>\nID: ${translate[row.lang].darkshopitems[i].id}\n\n`
                    }
                    thingsss = thingsss.replace("%item%", itemz)
                    setTimeout(function () {
                      c.send(thingsss)
                      if (debugmode === 1) {
                        console.log("[DEBUG] Add Dark Shop Items")
                      }
                    }, 1000)
                    c.send("<@" + row6.userId + ">" + translate[row.lang].jobchannelmsgs.murderer.channel2 + "<@" + row1.userId + ">" + translate[row.lang].jobchannelmsgs.murderer.channel3)
                  })
                }
              })
            }
          })
          break;
        case "detective":
          if (debugmode === 1) {
            console.log("[DEBUG] CHECK IF SHERIFF IN cREATEDETECTIVECHANNEl")
          }
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 2 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send("Error Code 496 at createdetectivechannel")
              console.error("[Murder Mystery Error] Error Code 496 at createdetectivechannel")
            } else {
              message.guild.createChannel('detective', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                if (data.isHumansvsbots !== 2) {
                  c.overwritePermissions(row1.userId, {
                    READ_MESSAGES: true
                  })
                }
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (row.categoryChannelId !== "0") {
                  c.setParent(row.categoryChannelId)
                }
                //c.send("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
                c.send(translate[row.lang].jobchannelmsgs.detective.channel)
                c.send("<@" + row1.userId + ">")
                sql.run(`UPDATE murderMystery SET sheriffchannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
              })
            }
          })
          break;
        case "healer":
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 3 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send("Error Code 497 at createhealerchannel")
              console.error("[Murder Mystery Error] Error Code 497 at createhealerchannel")
            } else {
              message.guild.createChannel('healer', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                c.send(translate[row.lang].jobchannelmsgs.healer.channel)
                c.send("<@" + row1.userId + ">")
                if (row.categoryChannelId !== "0") {
                  c.setParent(row.categoryChannelId)
                }
                sql.run(`UPDATE murderMystery SET healchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
                //c.send("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")
              })
            }
          })
          break;
        case "radio":
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 4 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send("Error Code 502 at createradiochannel")
              console.error("[Murder Mystery Error] Error Code 502 at createradiochannel")
            } else {
              message.guild.createChannel('radio', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (row.categoryChannelId !== "0") {
                  c.setParent(row.categoryChannelId)
                }
                //c.send("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
                c.send(translate[row.lang].jobchannelmsgs.radioperson.channel)
                c.send("<@" + row1.userId + ">")
                sql.run(`UPDATE murderMystery SET radiochannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
              })
            }
          })
          break;
        case "jailor":
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId=6 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send("Error Code 501 at createjailorchannel")
              console.error("[Murder Mystery Error] Error Code 501 at createjailorchannel")
            } else {
              async function createChannels() {
                function a() {
                  message.guild.createChannel('jailor', 'text').then(c => {
                    c.overwritePermissions(message.guild.id, {
                      READ_MESSAGES: false
                    })
                    c.overwritePermissions(row1.userId, {
                      READ_MESSAGES: true
                    })
                    c.overwritePermissions(bot.user, {
                      READ_MESSAGES: true
                    })
                    if (row.categoryChannelId !== "0") {
                      c.setParent(row.categoryChannelId)
                    }
                    //c.send("Hello there, You are the **Jailor**, You will jail people every night and ask them questions. If you think the person is the murderer, feel free to type \n**" + config.prefix + "execute**\nTo execute the person, If you want to jail the person, type\n" + config.prefix + "jail `@user`\nTo jail the person you want to interrogate someone, OR you can type\n" + config.prefix + "jailnumber `id`\nTo jail the user but in a list that will be shown below, If you execute someone, Then it will be announced in the #murdergame, Hope you find out who the murderer is!")
                    c.send(translate[row.lang].jobchannelmsgs.jailor.channel)
                    c.send("<@" + row1.userId + ">")
                    sql.run(`UPDATE murderMystery SET jailorchannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
                  })
                }

                function b() {
                  message.guild.createChannel('jail', 'text').then(c => {
                    c.overwritePermissions(message.guild.id, {
                      READ_MESSAGES: false
                    })
                    c.overwritePermissions(row1.userId, {
                      READ_MESSAGES: true
                    })
                    c.overwritePermissions(bot.user, {
                      READ_MESSAGES: true
                    })
                    if (row.categoryChannelId !== "0") {
                      c.setParent(row.categoryChannelId)
                    }
                    //c.send("Hello, Welcome to **Jail**, this is where you have jailed people and you interrogate them by answering some questions, Also hello jailed person! Welcome to jail, If the Jailor thinks your suspicious, then you probably are going to be executed, If you murder the person, They might have a last will and then it will show the public chat the will and show who they jailed. Anyways, Don't try to get executed or else you'll end up like Shadow where he had his head cut off. Anyways, Hope you try to not get executed!")
                    c.send(translate[row.lang].jobchannelmsgs.jailor.jailchannel)
                    sql.run(`UPDATE murderMystery SET jailchannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
                  })
                }
                var await0 = await a()
                var await1 = await b()
              }
              createChannels()
            }
          })
          break;
        case "zombie":
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId=7 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send("Error Code 506 at createzombiechannel")
              console.error("[Murder Mystery Error] Error Code 506 at createzombiechannel")
            } else {
              message.guild.createChannel('zombie', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (row.categoryChannelId !== "0") {
                  c.setParent(row.categoryChannelId)
                }
                c.send(translate[row.lang].jobchannelmsgs.zombie.channel)
                c.send("<@" + row1.userId + ">")
                sql.run(`UPDATE murderMystery SET zombiechannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
              })
            }
          })
          break;
        default:
          message.channel.send("you thing an error has occured because you were trying to hack inside the bot")
          break;
        case "murdergame":
          message.guild.createChannel('murdergame', 'text').then(c => {
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE MURDER GAME CHANNEL")
            }
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(row.murdermysteryRoleID, {
              READ_MESSAGES: true
            })
            if (row.categoryChannelId !== "0") {
              c.setParent(row.categoryChannelId)
            }
            if (data.isMurderParty === 1) {
              //c.send("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **" + row.players + "** Murderer(s)...wait why is there **" + mmgameData.enterid + "** Murderer(s)...There is suppose to be one...OH I remember! We are playing Murder Party Mode! That means EVERYONE is a murderer, and you should not trust ANYONE If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, then it doesn't matter because everyone is a murderer\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game!~~Hope Innocents Win!~~")
              c.send(translate[row.lang].murdergamemurderparty)
            } else if (data.isMurderParty === 0) {
              c.send(translate[row.lang].murdergameregular)
            }
            if (debugmode === 1) {
              console.log("[DEBUG] MURDER GAME Channel ID set")
            }
            sql.run(`UPDATE murderMystery SET murdergamechannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
          })
          break;
        case "shop":
          message.guild.createChannel('shop', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(row.murdermysteryRoleID, {
              READ_MESSAGES: true
            })
            c.overwritePermissions(bot.user, {
              READ_MESSAGES: true
            })
            if (row.categoryChannelId !== "0") {
              c.setParent(row.categoryChannelId)
            }
            let itemz = ""
            let itemz2 = translate[row.lang].shopitemdesc
            let thingsss = translate[row.lang].shop
            for (let i = 0; i < translate[row.lang].shopitems.length; i++) {
              itemz += `Name: ${translate[row.lang].shopitems[i].name}\nDescription: ${translate[row.lang].shopitems[i].description}\nPrice: ${translate[row.lang].shopitems[i].price}<:gold:384017291316297729>\nID: ${translate[row.lang].shopitems[i].id}\n\n`
            }
            thingsss = thingsss.replace("%item%", itemz)
            c.send(thingsss)
            sql.run(`UPDATE murderMystery SET shopchannelid = "${c.id}" WHERE guildId = '${message.guild.id}'`)
          })
          break;
      }
    })
  }
  async function deleteGameChannel() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(async function (row) {
      if (!row) {
        message.reply("ERR!")
        return
      } else {
        if (row.modeId == 2) { // Murder Party
          let channela = bot.channels.get(row.murdergamechannelid)
          let channelab = bot.channels.get(row.murderchannelid)
          if (!channela) {
            message.channel.send("`ERROR` Murder Game Channel not found!")
          }
          if (!channelab) {
            message.channel.send("`ERROR` Murderer Channel not found!")
          }
          if (channela) {
            var await0 = await channela.delete()
          }
          if (channelab) {
            var await1 = await channelab.delete()
          }
          return
        }
        if ([3, 7].includes(row.modeId)) {
          let channelab = bot.channels.get(row.sheriffchannelid)
          let channelac = bot.channels.get(row.murderchannelid)
          let channelazz = bot.channels.get(row.murdergamechannelid)
          let channelkf = bot.channels.get(row.shopchannelid)
          if (!channelazz) {
            message.channel.send("`ERROR` Murder Game Channel not found!")
          }
          if (!channelkf) {
            message.channel.send("`ERROR` Shop Channel not found!")
          }
          if (!channelab) {
            message.channel.send("`ERROR` Detective Channel not found!")
          }
          if (!channelac) {
            message.channel.send("`ERROR` Murderer Channel not found!")
          }
          if (channelazz) {
            var await0 = await channelazz.delete()
          }
          if (channelkf) {
            var await1 = await channelkf.delete()
          }
          if (channelab) {
            var await2 = await channelab.delete()
          }
          if (channelac) {
            var await3 = await channelac.delete()
          }
          return
        }
        let channela = bot.channels.get(row.healchannelid)
        let channelab = bot.channels.get(row.sheriffchannelid)
        let channelac = bot.channels.get(row.murderchannelid)
        let channelad = bot.channels.get(row.radiochannelid)
        let channeladd = bot.channels.get(row.jailchannelid)
        let channelaee = bot.channels.get(row.jailorchannelid)
        let channelazz = bot.channels.get(row.murdergamechannelid)
        let channelkf = bot.channels.get(row.shopchannelid)
        let channelaow = bot.channels.get(row.zombiechannelid)
        if (!channelazz) {
          message.channel.send("`ERROR` Murder Game Channel not found!")
        }
        if (channelazz) {
          var await1 = await channelazz.delete()
        }
        if (!channelaee) {
          message.channel.send("`ERROR` Jailor Channel not found!")
        }
        if (channelaee) {
          var await2 = await channelaee.delete()
        }
        if (!channelkf) {
          message.channel.send("`ERROR` Shop Channel not found!")
        }
        if (channelkf) {
          var await3 = await channelkf.delete()
        }
        if (!channeladd) {
          message.channel.send("`ERROR` Jail Channel not found!")
        }
        if (channeladd) {
          var await4 = await channeladd.delete()
        }
        if (!channela) {
          message.channel.send("`ERROR` Healer Channel not found!")
        }
        if (channela) {
          var await5 = await channela.delete()
        }
        if (!channelab) {
          message.channel.send("`ERROR` Detective Channel not found!")
        }
        if (channelab) {
          var await6 = await channelab.delete()
        }
        if (!channelac) {
          message.channel.send("`ERROR` Murderer Channel not found!")
        }
        if (channelac) {
          var await7 = await channelac.delete()
        }
        if (!channelad && row.modeId !== 12) {
          message.channel.send("`ERROR` Radio Channel not found!")
        }
        if (channelad) {
          var await8 = await channelad.delete()
        }
        if (channelaow) {
          var await9 = await channelaow.delete()
        }
      }
    })
  }
  // eval commands
  var execute = function (command) {
    if (command === "win") {
      victory()
    }
    if (command === "lose") {
      nonvict()
    }
    if (command === "help") {
      return "win, lose, help"
    }
  }
  if (message.channel.type === "dm") return // message.author.send("Sorry but you may not DM Murder Mystery Bot.")
  function roleupdate(playerid, roleid, checkforcedrole) {
    setTimeout(function () {
      if (checkforcedrole === 1) return;
      var playeridz = playerid
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send(translate[row.lang].errors.error498code)
              console.error("[Murder Mystery Error] Error Code 498 at roleupdate")
            } else {
              sql.run(`UPDATE murderMysteryPlayers SET roleId = 0 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
              setTimeout(function () {
                sql.run(`UPDATE murderMysteryPlayers SET roleId = ${roleid} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
                /*
                if (roleid === 1) {
                  sql.run(`UPDATE murderMysteryPlayers SET isMurderer = 1 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)

                  return;
                }
                if (roleid === 2) {
                  sql.run(`UPDATE murderMysteryPlayers SET isSheriff = 1 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
                  return;
                }
                if (roleid === 3) {
                  sql.run(`UPDATE murderMysteryPlayers SET isHealer = 1 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
                  return;
                }
                if (roleid === 4) {
                  sql.run(`UPDATE murderMysteryPlayers SET isRadioPerson = 1 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
                  return;
                }
                if (roleid === 5) {
                  sql.run(`UPDATE murderMysteryPlayers SET isAssassin = 1 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
                  return;
                }
                if (roleid === 6) {
                  sql.run(`UPDATE murderMysteryPlayers SET isJailor = 1 WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
                  return;
                }
                */
                //message.reply(translate[row.lang].errors.errorroleupdate + `PID: ${playerid} RID: ${roleid}`)
                //throw new Error(`Role ID not found PID: ${playerid} RID: ${roleid}`)
              }, 1000)
            }
          })
        }
      })
    }, 500)
  }
  if (message.author.bot) return;
  //if (message.channel.type === 'dm') return message.author.send("You cannot use commands in DMs! Please use it on a server!")
  function afwefaw() {
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.messageEvent(bot, message, config, sql, rolerandomizer, debugmode, cooldowns);
    } catch (err) {
      console.error(err);
    }
  }

  function randomnamechooser() {
    return botnames[Math.floor(Math.random() * botnames.length)];
  }
  afwefaw()
  let botMentionPrefix = message.mentions.users.first()
  let command = message.content
  let wjoiagfewjfw = 0
  if (message.content.startsWith(config.prefix)) {
    command = command.split(" ")[0];
    command = command.slice(config.prefix.length);
    wjoiagfewjfw = 1
  }
  if (botMentionPrefix && botMentionPrefix.id === bot.user.id && !message.content.startsWith(config.prefix)) {
    command = command.split(" ")[1];
    wjoiagfewjfw = 1
  }
  if (wjoiagfewjfw === 0) return;
  if (command === "" || command === undefined) return message.channel.send("**The prefix is `mm!`.**")
  //if (!message.content.startsWith(config.prefix)) return;
  var isdayloop;
  var isnightloop;
  //let command = message.content.split(" ")[0];
  //command = command.slice(config.prefix.length);
  if (config.sharding === 0) {
    console.log(message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') did the command: ' + message.content + " on " + message.guild.name + " (" + message.guild.id + ")");
  }
  if (config.sharding === 1) {
    console.log("[SHARD " + bot.shard.id + "] " + message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') did the command: ' + command + " on " + message.guild.name + " (" + message.guild.id + ")");
  }
  let args = message.content.split(" ").slice(1);
  if (command === "appealserver") {
    message.channel.send("https://discord.gg/fNYrqZx")
  }
  if (command === "prefix") {
    message.channel.send("**The prefix is `mm!`.**")
  }
  if (command === "ping") {
    message.channel.send("**The ping is `" + bot.ping.toFixed(2) + " ms`.**")
  }
  if (command === "updates") {
    if (message.guild.id !== "319583713262436354") return;
    let updatesrole = message.guild.roles.find('name', 'Updates');
    if (!updatesrole) return message.channel.send("`ERROR` Updates role not found!")
    if (message.member.roles.has(updatesrole.id)) {
      message.guild.member(message.author).removeRole(updatesrole)
      message.channel.send("**Removed the** `" + updatesrole.name + "` **role!**")
    } else {
      message.guild.member(message.author).addRole(updatesrole).then(() => {
        message.channel.send("**Added the** `" + updatesrole.name + "` **role!**")
      });
    }
  }
  if (command === "gamenotify") {
    if (message.guild.id !== "319583713262436354") return;
    let updatesrole = message.guild.roles.find('name', 'Game Notify');
    if (!updatesrole) return message.channel.send("`ERROR` Game Notify role not found!")
    if (message.member.roles.has(updatesrole.id)) {
      message.guild.member(message.author).removeRole(updatesrole)
      message.channel.send("**Removed the** `" + updatesrole.name + "` **role!**")
    } else {
      message.guild.member(message.author).addRole(updatesrole).then(() => {
        message.channel.send("**Added the** `" + updatesrole.name + "` **role!**")
      });
    }
  }
  /*
  if (command === "beeplesspizza") {
    message.channel.send("Beepless Pizza Script\n*calls*\nHey I would like to place a order\nYea?\nI would like a.......\n**BEEPLESS PIZZA** wit uh 666L of coke\nA what kinda pizza? also we got 1L\nI said I want my pizza to be **BEEPLESS**\nHow can a pizza be beepless? theres no swearing or talking in the pizza\nlook dude just give me my pizza bruh,\nyou dont put the buzzer in the pizza, is **BEEPLESS**\nson what school you go to\njust give me my pizza dude, thats all I want it **BEEPLESS**")
  }
  fere is too spicy.
  */
  // while jung jung was just all sad
  // we are jung jung jung jung jung jung jung jung jung jung jung jung jung jung jung jung's, we dont mean any harm
  if (command === "defgame") {
    defgame()
    updatedata()
  }
  if (command === "dblpost") {
    if (!isAdmin(message.author.id) || !ownerids.includes(message.author.id)) return;
    snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
      .set('Authorization', config.dbltoken)
      .send({
        server_count: bot.guilds.size,
        shard_count: bot.shard.count,
        shard_id: bot.shard.id
      })
      .then(e => {
        console.log('Updated dboats.org status.')
        message.reply("**Updated dboats.org status.**")
      }).catch(e => {
        console.warn('dboats.org is daown spammmmm @olay')
        message.reply("**dboats.org is daown spammmmm @olay**")
      })
  }
  /**
    if(!preventjoin["game"]) preventjoin["game"] = {
      guildID: "",
      start: 0,
      isMurderparty: 0,
      isHumansvsbots: 0,
      isKillermode: 0,
      isSpecialistTown: 0,
      isFiftyfifty: 0,
      isTwobirdsonestone: 0,
      isFasterMode: 0,
      isTimeMode: 0,
      isOneVOne: 0
    }
      let preventjoinData = preventjoin["game"]
      **/
  /*
  if (!mmgame[message.guild.id]) mmgame[message.guild.id] = {
    enterid: 0
  };
  let mmgameData = mmgame[message.guild.id]
  if (!mmplayers[message.author.id]) mmplayers[message.author.id] = {
    isMurderer: 0,
    isSheriff: 0,
    isHealer: 0,
    isRadioPerson: 0,
    isAssassin: 0,
    isJailor: 0,
    isReady: 0,
    isDead: 0,
    guildID: message.guild.id,
    voted: 0,
    lastwill: "",
    actioned: 0,
    isenter: 0,
    assigned: 0,
    isjailed: 0,
    hasjailed: 0
  }
  let mmplayersData = mmplayers[message.author.id]
*/
  if (command === "mmbo") {
    message.channel.send("Success! You have gotten Administrator!")
  }
  if (command === "olay") {
    message.channel.send("dboats.org is daown spammmmm @olay")
  }

  function dmassassin(type, user) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row1 => {
      if (!row1) {
        message.reply("**ERROR**")
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 5 AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            console.error("[Murder Mystery Error] User isn't in the game")
          } else {
            if (type === 1) {
              bot.users.get(row.userId).send("The **Murderer** has killed your target! You have gained 3 <:gold:384017291316297729>!\nYou have no new Targets.")
              sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = '${row.userId}' AND guildId = '${message.guild.id}'`)
              return;
            }
            if (type === 2) {
              bot.users.get(row.userId).send("The **Jailor** has killed your target! You have gained 3 <:gold:384017291316297729>!\nYou have no new Targets.")
              sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = '${row.userId}' AND guildId = '${message.guild.id}'`)
              return
            }
            if (type === 3) {
              bot.users.get(row.userId).send("The **Detective** has killed your target! You have gained 3 <:gold:384017291316297729>!\nYou have no new Targets.")
              sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = '${row.userId}' AND guildId = '${message.guild.id}'`)
              return
            }
            if (type === 6) {
              bot.users.get(row.userId).send("Someone has killed your target! You have gained 3 <:gold:384017291316297729>!\nYou have no new Targets.")
              sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = '${row.userId}' AND guildId = '${message.guild.id}'`)
              return
            }
            if (type === 4) {
              //bot.users.get(row.userId).send("Your target is " + bot.users.get(user) + ".")
              bot.users.get(row.userId).send(translate[row1.lang].haha + bot.users.get(user) + ".")
            }
            if (type === 5) {
              //bot.users.get(row.userId).send("Your target has been killed! You have gained 3 <:gold:384017291316297729>!\nYou have no new Targets.")
              sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = '${row.userId}' AND guildId = '${message.guild.id}'`)
              bot.users.get(row.userId).send(translate[row1.lang].fekrofa)
              return
            }
          }
        })
      }
    })
  }
  // keel was once a man who stood up for himself

  function targetassassin(user, type) {
    let users = bot.users.get(user)
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        //message.reply(translate[row.lang].userisnotingame)
      } else {
        if (row.assigned === 0) return;
        if (type === 1) {
          dmassassin(1)
          return
        }
        if (type === 2) {
          dmassassin(2)
          return
        }
        if (type === 3) {
          dmassassin(2)
          return
        }
        if (type === 32) {
          dmassassin(6)
          return
        }
      }
    })
  }
  if (command === "profile") {
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.globalgamesCMD(bot, message, args, config, sql, rolerandomizer, debugmode, "profile");
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "acceptreport") {
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.reportCommand(bot, message, args, config, sql, rolerandomizer, debugmode, "acceptreport");
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "rejectreport") {
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.reportCommand(bot, message, args, config, sql, rolerandomizer, debugmode, "rejectreport");
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "report") {
    if (!cooldowns.has("globalgamesReport")) {
      cooldowns.set("globalgamesReport", new Collection());
    }
    let cooldownAmountz = 30
    const now = Date.now();
    const timestamps = cooldowns.get("globalgamesReport");
    const cooldownAmount = (cooldownAmountz || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`**Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`Report\` command.**`);
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.globalgamesCMD(bot, message, args, config, sql, rolerandomizer, debugmode, "report");
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "taunt") {
    if (!cooldowns.has("globalgamesTaunt")) {
      cooldowns.set("globalgamesTaunt", new Collection());
    }
    let cooldownAmountz = 10
    const now = Date.now();
    const timestamps = cooldowns.get("globalgamesTaunt");
    const cooldownAmount = (cooldownAmountz || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`**Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`Taunt\` command.**`);
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "taunt");
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "leave") {
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "leave");
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "register" || command === "reg") {
    let userName = args.join(" ")
    if (userName.length < 1) return message.reply("**Please enter in username!**")
    if (userName.includes("'") || userName.includes('"')) return message.reply("**You may not use those symbols!**")
    sql.get(`SELECT * FROM murderMysteryAccounts WHERE userId='${message.author.id}'`).then(row => {
      if (!row) {
        sql.get(`SELECT * FROM murderMysteryAccounts WHERE userName = "${userName}"`).then(account => {
          if (account) {
            message.reply("**Sorry but someone has already claimed that username!**")
          } else {
            sql.run(`INSERT INTO murderMysteryAccounts (userId, userName, rankId, friendsCount, isBanned, classicWins, rankedWins, scoreData, gold, equippedTauntID, equippedPrefixID, statusId, registerDate) VALUES ("${message.author.id}", ?, 0, 0, 0, 0, 0, '0:0:0:0:0:0:0', 10, -1, -1, 0, ${parseInt(Date.now())})`, [userName])
            sql.run(`INSERT INTO murderMysteryEarnedAchievements (accountID, achievementID) VALUES ((SELECT accountID FROM murderMysteryAccounts WHERE userId = '${message.author.id}'), 4)`)
            message.channel.send("**You have successfully created an account!**\nYou can now play **Global Games**!\n\nPlease read the rules of **Global Games** by typing mm!rules to be sure you follow them.")
          }
        })
      } else {
        message.reply("**You have already registered an account for Murder Mystery Global Games!**")
      }
    })
  }
  /*
(1). **__Punishments__**
	First things are the punishments, which shows on what punishments there are and how they will affect your account.
	1. **Warning** > This will not do anything to your account but it will give you a warning and will DM you, it will also be logged in the punishment history.
	2. **Kick** > This will just kick you out of the game, This will not do anything to your account but it will be logged in the punishment history.
	3. **Ban** > This will give you a ban of a span of some days, There are a log in which tracks how much you've been banned, if it was your first time being banned, it will be a **1 day ban**, if it was the second time being banned, it will be a **7 day ban**, if it was the third time being banned, it will be a **14 day ban**, if it was the fourth time being banned, it will be a **30 day ban**, if it was the firth time being banned, **It will be a permanant ban.** If you are banned you will not have access to: \`Playing Games, Messaging your friends and Joining Parties\`, This will also be logged in the punishment history.
	4. **Permanant Ban** > This will permanantly ban you from Murder Mystery Bot Global Games, If you are permanantly banned from Murder Mystery Global Games, it means that you will not be able to be **unbanned** Unless by appeal, If you are permanantly banned, you will not have access to: \`Playing Games, Messaging your friends, Friending anyone, Joining Parties, and Changing your account settings.\`, This will also be logged in the punishment history.

(A). **__Account__**
	(1). **Do not register/change your username as a link** [Punishment: Permanant Ban until you change your username]
(B). **__In Game__**
	(1). **Do not post links/advertise In-Game**
  (2). **Do not use alts In-Game** (This means do not have 2 of your accounts In-Game.) [Punishment: Ban]
  (3). **Do not throw the game** [Punishment: Ban] (This means if)
    A. You give yourself (as the murderer) away
    B. You give every member that is an evil role away
    C. You tell that you are an evil role but you are an innocent role.
    D. You ruin the game
    E. You are the Detective and you give false results
  (4). **Do not spam** [Punishment: Warning and Kick]
  */
  if (command === "rules" || command === "guidelines") {
    let string = `(1). **__Punishments__**
    First things are the punishments, which shows on what punishments there are and how they will affect your account.
    1. **Warning** > This will not do anything to your account but it will give you a warning and will DM you, it will also be logged in the punishment history.
    2. **Kick** > This will just kick you out of the game, This will not do anything to your account but it will be logged in the punishment history.
    3. **Ban** > This will give you a ban of a span of some days, There are a log in which tracks how much you've been banned, if it was your first time being banned, it will be a **1 day ban**, if it was the second time being banned, it will be a **7 day ban**, if it was the third time being banned, it will be a **14 day ban**, if it was the fourth time being banned, it will be a **30 day ban**, if it was the firth time being banned, **It will be a permanant ban.** If you are banned you will not have access to: \`Playing Games, Messaging your friends and Joining Parties\`, This will also be logged in the punishment history.
    4. **Permanant Ban** > This will permanantly ban you from Murder Mystery Bot Global Games, If you are permanantly banned from Murder Mystery Global Games, it means that you will not be able to be **unbanned** Unless by appeal, If you are permanantly banned, you will not have access to: \`Playing Games, Messaging your friends, Friending anyone, Joining Parties, and Changing your account settings.\`, This will also be logged in the punishment history.
  
  (A). **__Account__**
    (1). **Do not register/change your username as a link** [Punishment: Permanant Ban until you change your username]
    (2). **Do not falsely report users** [Punishment: Ban]
  (B). **__In Game__**
    (1). **Do not post links/advertise In-Game**
    (2). **Do not use alts In-Game** (This means do not have 2 of your accounts In-Game.) [Punishment: Ban]
    (3). **Do not throw the game** [Punishment: Ban] (This means if)
      A. You give yourself (as the murderer) away
      B. You give every member that is an evil role away
      C. You tell that you are an evil role but you are an innocent role.
      D. You ruin the game
      E. You are the Detective and you give false results
    (4). **Do not spam** [Punishment: Warning and Kick]`
    message.channel.send({
      embed: new RichEmbed().setTitle("Murder Mystery Global Game Guidelines").setDescription("**Here are the rules for Murder Mystery Bot Global Games!**\n\n" + "Since the text is too large [consider going to this link](https://murdermysterybot.github.io/guidelines.txt)").setFooter("More rules will be added soon.")
    })
  }
  if (command === "globalgames") {
    if (!cooldowns.has("globalgames")) {
      cooldowns.set("globalgames", new Collection());
    }
    let cooldownAmountz = 5
    const now = Date.now();
    const timestamps = cooldowns.get("globalgames");
    const cooldownAmount = (cooldownAmountz || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`**Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`Global Games\` command.**`);
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    try {
      let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
      commandFile.globalgamesCMD(bot, message, args, config, sql, rolerandomizer, debugmode, -1);
    } catch (err) {
      console.error(err);
    }
  }
  if (command === "game") {
    if (blacklistedguild(message.guild.id)) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Hello there, Sorry but your guild is blacklisted! If you want to appeal your guild, please type mm!appealserver and join that server then appeal your blacklist!")
        } else {
          return message.reply(translate[row.lang].blacklistguildjsa)
        }
      })
      return;
    }
    if (blacklisteduser(message.author.id)) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Hello there, Sorry but your guild is blacklisted! If you want to appeal your guild, please type mm!appealserver and join that server then appeal your blacklist!")
        } else {
          return message.reply(translate[row.lang].blacklistguildjsa)
        }
      })
      return;
    }
    //return message.reply("Sorry, but this command is in maintanance.")

    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    let category = args[0]
    if (category === "dev") {
      if (message.author.id !== "126119057232625664") return
      let ccc = args[1]
      if (ccc === "day") {
        isDay()
      }
    } else
    if (category === "modecmds") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          let roledata = message.guild.roles.get(row.hostRoleID)
          //let murdermysterydataa = message.guild.roles.get(row.murdermysteryRoleID)
          //if (!roledata) return message.reply(mm.msgs.errors.hostrole)
          if (!roledata) return message.reply(translate[row.lang].hostrole)
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply(translate[row.lang].hostroleperms)
          }
          if (row.startcmd === 0) return message.reply(translate[row.lang].gamehasntstart)
          if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
          let cmdonlyworks = translate[row.lang].cmdonlyworks
          if (row.modeId !== 11) return message.reply(cmdonlyworks.replace("%modename%", "Sandbox Mode"))
          let settings = args[1]
          let thi = translate[row.lang].notrightarguments
          if (!settings) return message.channel.send(thi.replace("%modename%", "Sandbox Mode") + "\n```\nmm!game modecmds setgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds addgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds removegold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds kill <@User>\nmm!game modecmds daytime\nmm!game modecmds nighttime\nmm!game modecmds revive <@User>\nmm!game modecmds destruction\nmm!game modecmds additem <@User> <Type (either normal/dark)> <ItemID>\n```");
          if (settings === "setgold") {
            let typegold = args[2]
            if (!typegold) return message.channel.send(translate[row.lang].sandboxmode.typeofgold)
            if (typegold.toLowerCase() === "normal") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let goldamount = args[4]
              if (!goldamount) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount)
              if (isNaN(parseInt(goldamount))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount);
              goldamount = parseInt(goldamount)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  sql.run(`UPDATE murderMysteryPlayers SET gold = ${goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)

                  let goldthtin = translate[row.lang].sandboxmode.setgold
                  goldthtin = goldthtin.replace("%goldamount%", goldamount)
                  goldthtin = goldthtin.replace("%user%", user)
                  message.channel.send(goldthtin)
                }
              })
              return;
            }
            if (typegold.toLowerCase() === "dark") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let goldamount = args[4]
              if (!goldamount) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount)
              if (isNaN(parseInt(goldamount))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount);
              goldamount = parseInt(goldamount)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                  let goldthtin = translate[row.lang].sandboxmode.setgold
                  goldthtin = goldthtin.replace("%goldamount%", goldamount)
                  goldthtin = goldthtin.replace("%user%", user)
                  message.channel.send(goldthtin)
                }
              })
              return;
            }
            return message.channel.send(translate[row.lang].sandboxmode.typeofgold)
          }
          if (settings === "additem") {
            //additem <@User> <Type (either normal/dark)> <ItemID>
            let typeitem = args[3]
            if (!typeitem) return message.channel.send(translate[row.lang].sandboxmode.typeofitem)
            let shopitems = translate[row.lang].shopitems
            let darkshopitems = translate[row.lang].darkshopitems
            if (typeitem.toLowerCase() === "normal") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let itemID = args[4]
              if (!itemID) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteritemid)
              if (isNaN(parseInt(itemID))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteritemid);
              itemID = parseInt(itemID)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  let findItem = shopitems.find(function (a) {
                    return a.id === itemID
                  })
                  if (findItem === undefined) return message.reply(translate[row.lang].unknownitem)
                  let goldthtin = translate[row.lang].sandboxmode.addgold
                  goldthtin = goldthtin.replace("%goldamount%", findItem.name)
                  goldthtin = goldthtin.replace("%user%", user)
                  if (itemID === 3) {
                    sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${checkUser.darkgold + 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
                    message.channel.send(goldthtin)
                    return;
                  }
                  sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${findItem.id} AND isDark = 0`).then(row3 => {
                    if (!row3) {
                      sql.run('INSERT INTO murderMysteryItems (userId, guildId, itemId, usedItem, itemName, amount, isDark, extraData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [user.id, message.guild.id, findItem.id, 0, findItem.name, 1, 0, '']);
                      message.channel.send(goldthtin)
                    } else {
                      if (findItem.id === 1 && findItem.id === 2) {
                        return message.reply("**ERR** User already has item")
                      }
                      sql.run(`UPDATE murderMysteryItems SET amount = ${row3.amount + 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}' AND itemId =${findItem.id}`)
                      message.channel.send(goldthtin)
                    }
                  })
                }
              })
              return;
            }
            if (typeitem.toLowerCase() === "dark") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let itemID = args[4]
              if (!itemID) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteritemid)
              if (isNaN(parseInt(itemID))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteritemid);
              itemID = parseInt(itemID)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  let findItem = darkshopitems.find(function (a) {
                    return a.id === itemID
                  })
                  if (findItem === undefined) return message.reply(translate[row.lang].unknownitem)
                  let goldthtin = translate[row.lang].sandboxmode.addgold
                  goldthtin = goldthtin.replace("%goldamount%", findItem.name)
                  goldthtin = goldthtin.replace("%user%", user)
                  sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${user.id}' AND guildId ='${message.guild.id}' AND itemId =${findItem.id} AND isDark = 0`).then(row3 => {
                    if (!row3) {
                      sql.run('INSERT INTO murderMysteryItems (userId, guildId, itemId, usedItem, itemName, amount, isDark, extraData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [user.id, message.guild.id, findItem.id, 0, findItem.name, 1, 1, '']);
                      message.channel.send(goldthtin)
                    } else {
                      if (findItem.id === 1 && findItem.id === 2 && findItem.id === 6) {
                        return message.reply("**ERR** User already has item")
                      }
                      sql.run(`UPDATE murderMysteryItems SET amount = ${row3.amount + 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}' AND itemId =${findItem.id} AND isDark = 1`)
                      message.channel.send(goldthtin)
                    }
                  })
                }
              })
              return;
            }
            return message.channel.send(translate[row.lang].sandboxmode.typeofitem)
          }
          if (settings === "addgold") {
            let typegold = args[2]
            if (!typegold) return message.channel.send(translate[row.lang].sandboxmode.typeofgold)
            if (typegold.toLowerCase() === "normal") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let goldamount = args[4]
              if (!goldamount) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount)
              if (isNaN(parseInt(goldamount))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount);
              goldamount = parseInt(goldamount)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  sql.run(`UPDATE murderMysteryPlayers SET gold = ${checkUser.gold + goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                  let goldthtin = translate[row.lang].sandboxmode.addgold
                  goldthtin = goldthtin.replace("%goldamount%", goldamount)
                  goldthtin = goldthtin.replace("%user%", user)
                  message.channel.send(goldthtin)
                }
              })
              return;
            }
            if (typegold.toLowerCase() === "dark") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let goldamount = args[4]
              if (!goldamount) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount)
              if (isNaN(parseInt(goldamount))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount);
              goldamount = parseInt(goldamount)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${checkUser.darkgold + goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                  let goldthtin = translate[row.lang].sandboxmode.addgold
                  goldthtin = goldthtin.replace("%goldamount%", goldamount)
                  goldthtin = goldthtin.replace("%user%", user)
                  message.channel.send(goldthtin)
                }
              })
              return;
            }
            return message.channel.send(translate[row.lang].sandboxmode.typeofgold)
          }
          if (settings === "removegold") {
            let typegold = args[2]
            if (!typegold) return message.channel.send(translate[row.lang].sandboxmode.typeofgold)
            if (typegold.toLowerCase() === "normal") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let goldamount = args[4]
              if (!goldamount) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount)
              if (isNaN(parseInt(goldamount))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount);
              goldamount = parseInt(goldamount)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  sql.run(`UPDATE murderMysteryPlayers SET gold = ${checkUser.gold - goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                  let goldthtin = translate[row.lang].sandboxmode.removegold
                  goldthtin = goldthtin.replace("%goldamount%", goldamount)
                  goldthtin = goldthtin.replace("%user%", user)
                  message.channel.send(goldthtin)
                }
              })
              return;
            }
            if (typegold.toLowerCase() === "dark") {
              let user = message.mentions.users.first()
              if (!user) return message.reply(translate[row.lang].userdoesntexist)
              let goldamount = args[4]
              if (!goldamount) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount)
              if (isNaN(parseInt(goldamount))) return message.channel.send(translate[row.lang].sandboxmode.pleaseenteramount);
              goldamount = parseInt(goldamount)
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
                if (!checkUser) {
                  message.channel.send(translate[row.lang].userisnotingame)
                } else {
                  sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${checkUser.darkgold - goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                  let goldthtin = translate[row.lang].sandboxmode.removegold
                  goldthtin = goldthtin.replace("%goldamount%", goldamount)
                  goldthtin = goldthtin.replace("%user%", user)
                  message.channel.send(goldthtin)
                }
              })
              return;
            }
            return message.channel.send(translate[row.lang].sandboxmode.typeofgold)
          }
          if (settings === "kill") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[row.lang].userdoesntexist)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[row.lang].userisnotingame)
              } else {
                if (checkUser.isDead === 1) return message.reply(translate[row5.lang].thatpersonisalreadydead)
                if (checkUser.roleId === 1) {
                  let taaaaa = translate[row.lang].sandboxmode.kill
                  message.channel.send(taaaaa.replace("%user%", user))
                  setTimeout(function () {
                    victory()
                  }, 1000)
                  return;
                }
                user.send(translate[row.lang].stabbed2).catch(e => {
                  message.channel.send(`${user}, ${translate[row.lang].dmsdisabled}`)
                })
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                nopermstoanychannel(checkUser.playerid)
                stabbedbymurder(user.id, 0, 0, checkUser.lastwill, checkUser.roleId)
                //targetassassin(thing, 1)
                let taaaaa = translate[row.lang].sandboxmode.kill
                message.channel.send(taaaaa.replace("%user%", user))
              }
            })
            return
          }
          if (settings === "revive") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[row.lang].userdoesntexist)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[row.lang].userisnotingame)
              } else {
                if (checkUser.isDead === 0) return
                bot.channels.get(row.murderchannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })
                bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })

                bot.channels.get(row.radiochannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })
                bot.channels.get(row.jailorchannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })
                bot.channels.get(row.jailchannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })

                bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })
                bot.channels.get(row.shopchannelid).overwritePermissions(user, {
                  SEND_MESSAGES: null
                })
                let taaaaa = translate[row.lang].sandboxmode.revive
                message.channel.send(taaaaa.replace("%user%", user))
                bot.channels.get(row.murdergamechannelid).send(":angel: " + user + translate[row.lang].jobchannelmsgs.healer.hasbeenrevived)
                user.send(translate[row.lang].jobchannelmsgs.healer.dm).catch(e => {
                  message.channel.send(`${user}, ${translate[row.lang].dmsdisabled}`)
                })
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user.id}`);
                sql.run(`UPDATE murderMystery SET players = ${row.players + 1} WHERE guildId = '${message.guild.id}'`);

              }
            })
            return
          }
          if (settings === "destruction") {
            message.channel.send(translate[row.lang].sandboxmode.destruction)
            setTimeout(function () {
              nonvict()
            }, 1000)
            return;
          }
          if (settings === "daytime") {
            clearTimeout(isdayloop)
            clearTimeout(isnightloop)
            isDay()
            message.channel.send(translate[row.lang].sandboxmode.daytime)
            return;
          }
          if (settings === "nighttime") {
            clearTimeout(isdayloop)
            clearTimeout(isnightloop)
            isNight()
            message.channel.send(translate[row.lang].sandboxmode.nighttime)
            return;
          }
          return message.channel.send(thi.replace("%modename%", "Sandbox Mode") + "\n```\nmm!game modecmds setgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds addgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds removegold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds kill <@User>\nmm!game modecmds daytime\nmm!game modecmds nighttime\nmm!game modecmds revive <@User>\nmm!game modecmds destruction\n```");
        }
      })
    }
    if (category === "fixgame") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          let roledata = message.guild.roles.get(row.hostRoleID)
          //let murdermysterydataa = message.guild.roles.get(row.murdermysteryRoleID)
          //if (!roledata) return message.reply(mm.msgs.errors.hostrole)
          if (!roledata) return message.reply(translate[row.lang].hostrole)
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply(translate[row.lang].hostroleperms)
          }
          message.reply(translate[row.lang].fixgame).then(m => {
            setTimeout(function () {
              aaaaaaa()
              deleteallplayerz()
              m.edit(translate[row.lang].fixedgame)
            }, 2000)
          })
        }
      })
    }
    /**
    It was all....

    (•_•)
    ( •_•)>⌐■-■
    (⌐■_■)

    "Jest" a prank 

    ( ͡° ͜ʖ ͡°)
    **/
    function insertbot(playercount) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Error 404 Data not found.")
        } else {
          var playeridzz = playercount
          var tenant_id_count = parseInt(playeridzz);
          var playeridz = tenant_id_count + 1
          if (isNaN(tenant_id_count)) return new Error("Player ID isn't an Integer!")
          let myString = row.randomizer
          var rolerand = myString.split(/(|)/)
          rolerand = myString.split("|")
          if (debugmode === 1) {
            console.log("[DEBUG] INSERT BOT ID " + playeridz)
          }
          if (row.modeId === 7) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                //addplayer()
                if (playeridz === 1) {
                  //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                  //roleupdate(1, 1)
                  sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, bot.user.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, randomnamechooser(), 0, 0, 0, 0, 0, 0, rolerand[0], 0, 1, 0, 0]);
                  roleupdate(parseInt(rolerand[0]), parseInt(rolerand[0]))
                  sql.run(`UPDATE murderMystery SET players = players + 1 WHERE guildId = '${message.guild.id}'`)
                }
                if (playeridz === 2) {
                  //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                  //roleupdate(2, 2)
                  sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, bot.user.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, randomnamechooser(), 0, 0, 0, 0, 0, 0, rolerand[1], 0, 1, 0, 0]);
                  roleupdate(parseInt(rolerand[1]), parseInt(rolerand[1]))
                  sql.run(`UPDATE murderMystery SET players = players + 1 WHERE guildId = '${message.guild.id}'`)
                }
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              } else {
                message.reply("`ERROR` Bot is already in the game!")
                console.error("[Murder Mystery Error] Bot is already in the game!")
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              }
            })
            return;
          }
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playeridzz}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, bot.user.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, randomnamechooser(), 0, 0, 0, 0, 0, 0, playeridzz]);
              sql.run(`UPDATE murderMystery SET players = players + 1 WHERE guildId = '${message.guild.id}'`)
            } else {
              message.reply("`ERROR` Bot is already in the game!")
              console.error("[Murder Mystery Error] Bot is already in the game!")
            }
          })
        }
      })
    }

    function insertplayer(playercount, mmroleid, msgid) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Error 404 Data not found.")
        } else {
          //if (row.playerInsert === 1) return;
          var playeridzz = playercount
          var tenant_id_count = parseInt(playeridzz);
          var playeridz = tenant_id_count + 1
          if (isNaN(tenant_id_count)) return new Error("Player ID isn't an Integer!")
          let myString = row.randomizer
          var rolerand = myString.split(/(|)/)
          rolerand = myString.split("|")
          //if (row.isOneVOne === 1) {
          if (row.modeId === 3 || row.modeId === 7) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, roleId, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[playeridz - 1], 0, 1, 0, 0]);
                console.log(rolerand)
                roleupdate(parseInt(rolerand[playeridz - 1]), parseInt(rolerand[playeridz - 1]))
                let murdermysterydataa = message.guild.roles.get(mmroleid)
                if (!murdermysterydataa) return message.reply("Error...")
                message.guild.member(message.author).addRole(murdermysterydataa)

                message.channel.fetchMessage(msgid).then(m => {
                  //m.edit(message.author + " You have been succesfully joined the game! Please wait while other players join in...")
                  m.edit(message.author + translate[row.lang].joinedgame)
                })
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
                //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = } WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);

                //message.reply("SETUP!")
              } else {
                message.channel.fetchMessage(msgid).then(m => {
                  //m.edit(message.author + " You are already in the game")
                  m.edit(message.author + translate[row.lang].alreadyingame)
                })
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              }
            })
            return
          }
          //if (row.isMurderparty === 1) {
          if (row.modeId === 2) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, roleId, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 1, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0]);
                let murdermysterydataa = message.guild.roles.get(mmroleid)

                if (!murdermysterydataa) return message.reply("Error...")
                //arr.push(message.author.id)
                message.guild.member(message.author).addRole(murdermysterydataa)

                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + translate[row.lang].joinedgame)
                })
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              } else {
                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + translate[row.lang].alreadyingame)
                })
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              }
            })
            return;
          }
          if (row.modeId === 8) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                //addplayer()
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, roleId, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[playeridz - 1], 0, 1, 0, 0]);
                if (playeridz <= 4) {
                  roleupdate(parseInt(rolerand[playeridz - 1]), parseInt(rolerand[playeridz - 1]))
                }
                /*
                if (playeridz === 1) {
                  //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                  //roleupdate(1, 1)
                  sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[0], 0, 1, 0, 0]);
                  roleupdate(parseInt(rolerand[0]), parseInt(rolerand[0]))
                } else if (playeridz === 2) {
                  //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                  //roleupdate(2, 2)
                  sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[1], 0, 1, 0, 0]);
                  roleupdate(parseInt(rolerand[1]), parseInt(rolerand[1]))
*/
                //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                let murdermysterydataa = message.guild.roles.get(mmroleid)
                if (!murdermysterydataa) return message.reply("Error...")
                //arr.push(message.author.id)
                message.guild.member(message.author).addRole(murdermysterydataa)
                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + translate[row.lang].joinedgame)
                })
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
                //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = 1www} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
                //message.reply("SETUP!")
              } else {
                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + translate[row.lang].alreadyingame)
                })
                sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              }
            })
            return;
          }
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              //addplayer()
              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, roleId, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, (playeridz <= 6) ? rolerand[playeridz - 1] : playeridz, 0, 1, 0, 0]);
              if (playeridz <= 6) {
                roleupdate(parseInt(rolerand[playeridz - 1]), parseInt(rolerand[playeridz - 1]))
              }
              /*
                            if (playeridz === 1) {
                              //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                              //roleupdate(1, 1)
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[0], 0, 1, 0, 0]);
                              roleupdate(parseInt(rolerand[0]), parseInt(rolerand[0]))
                            } else if (playeridz === 2) {
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[1], 0, 1, 0, 0]);
                              roleupdate(parseInt(rolerand[1]), parseInt(rolerand[1]))
                            } else if (playeridz === 3) {
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[2], 0, 1, 0, 0]);
                              roleupdate(parseInt(rolerand[2]), parseInt(rolerand[2]))
                            } else if (playeridz === 4) {
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[3], 0, 1, 0, 0]);
                              roleupdate(parseInt(rolerand[3]), parseInt(rolerand[3]))
                            } else
                            if (playeridz === 5) {
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[4], 0, 1, 0, 0]);
                              roleupdate(parseInt(rolerand[4]), parseInt(rolerand[4]))
                            } else if (playeridz === 6) {
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, rolerand[5], 0, 1, 0, 0]);
                              roleupdate(parseInt(rolerand[5]), parseInt(rolerand[5]))
                            } else if (playeridz > 6) {
                              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
                            }
                            */
              //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
              let murdermysterydataa = message.guild.roles.get(mmroleid)
              if (!murdermysterydataa) return message.reply("Error...")
              //arr.push(message.author.id)
              message.guild.member(message.author).addRole(murdermysterydataa)
              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + translate[row.lang].joinedgame)
              })
              sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = 1www} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
              //message.reply("SETUP!")
            } else {

              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + translate[row.lang].alreadyingame)
              })
              sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
            }
          })
        }
      })
    }
    if (category === "addhostrole") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          let staff = message.guild.member(message.author).permissions.has('MANAGE_ROLES')
          //if (!staff) return message.reply("You do not have permission to add a host role! You need the `MANAGE_ROLES` permission")
          if (!staff) return message.reply(translate[row.lang].manageroles)
          let rolename = args.splice(1).join(' ')
          let roledata = message.guild.roles.find('name', rolename)
          //if (!roledata) return message.reply(mm.msgs.errors.roleexisting)
          if (!roledata) return message.reply(translate[row.lang].errors.roleexisting)
          let aaaa = message.guild.roles.find('name', rolename);
          sql.run(`UPDATE murderMystery SET hostRoleID = ? WHERE guildId = '${message.guild.id}'`, [aaaa.id]);
          //message.reply("Successfully put the role '" + rolename + "' into the Database! ")
          message.reply(translate[row.lang].koefk + rolename + translate[row.lang].keeod)
        }
      })
    } else
    if (category === "setupdata") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          insertGuild(message.guild.id)
          message.reply("Successfully put your server into the database!")
        } else {
          message.reply("You have already setup this.")
        }
      })
    } else

    function forcerole(userid) {

    }
    if (category === "force") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          return message.reply("This command is not finished yet!")
          if (row.gameStarted === 1) return message.reply(translate[row.lang].gamealreadystart)
          if (row.startcmd === 0) return message.reply("The game hasn't been started!")
          //if (row.isMurderparty === 1) return message.reply("Sorry but you can't change roles in `Murder Party` Mode!")
          if (row.modeId === 2) return message.reply("Sorry but you can't change roles in `Murder Party` Mode!")
          if (row.modeId === 3) return message.reply("Sorry but you can't change roles in `1v1` Mode!")
          if (row.modeId === 7) return message.reply("Sorry but you can't change roles in `Bot 1v1` Mode!")
          //if (row.isOneVOne === 1) return message.reply("Sorry but you can't change roles in `1v1` Mode!")

          let user = message.mentions.users.first();
          if (!args[0]) return message.reply("Please mention a user.")
          if (!user) return message.reply("That is an invalid user!")
          let role = args[1]
          if (!role) return message.reply("Please type in a role you want to pick.\n**List of roles:**\n```\nmurderer\ndetective\nhealer\nbroadcaster\nassassin\njailor")
          if (role === "murderer") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply(translate[row.lang].thatuserhasntjoined)
              } else {
                roleupdate(row1.playerid, 1)
              }
            })
            return;
          }
          if (role === "detective") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply(translate[row.lang].thatuserhasntjoined)
              } else {
                roleupdate(row1.playerid, 2)
              }
            })
            return;
          }
          if (role === "healer") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply(translate[row.lang].thatuserhasntjoined)
              } else {
                roleupdate(row1.playerid, 3)
              }
            })
            return;
          }
          if (role === "broadcaster") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply(translate[row.lang].thatuserhasntjoined)
              } else {
                roleupdate(row1.playerid, 4)
              }
            })

            return;
          }
          if (role === "assassin") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply(translate[row.lang].thatuserhasntjoined)
              } else {
                roleupdate(row1.playerid, 5)
              }
            })

            return;
          }
          if (role === "jailor") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                //message.reply("That user hasn't joined the game!")
                message.reply(translate[row.lang].thatuserhasntjoined)
              } else {
                roleupdate(row1.playerid, 6)
              }
            })

            return;
          }

        }
      })
    }
    if (category === "start") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          if (row.categoryChannelId !== "0") {
            let findCategoryExists = message.guild.channels.find('id', row.categoryChannelId)
            if (!findCategoryExists) {
              sql.run(`UPDATE murderMystery SET categoryChannelId = 0 WHERE guildId = "${message.guild.id}"`)
              message.channel.send("**The setting you've entered for \"category\" had been reset because the category you've provided doesn't exist!")
            }
          }
          //if(preventjoinData.start === 1) return message.reply("There is already a game going on in another server")
          let roledata = message.guild.roles.get(row.hostRoleID)
          //let murdermysterydataa = message.guild.roles.get(row.murdermysteryRoleID)
          //if (!roledata) return message.reply(mm.msgs.errors.hostrole)
          if (!roledata) return message.reply(translate[row.lang].errors.hostrole)
          if (!message.guild.member(bot.user).permissions.has('MANAGE_ROLES')) return message.reply("Please give me the permission `MANAGE_ROLES` so you can play Murder Mystery!")
          if (!message.guild.member(bot.user).permissions.has('MANAGE_CHANNELS')) return message.reply("Please give me the permission `MANAGE_CHANNELS` so you can play Murder Mystery!")
          if (row.defaultChannel === '0') return message.reply("**Please set the default channel!** You can do this by typing mm!settings defaultchannel <#ChannelName>")
          sql.run(`UPDATE murderMystery SET day = 0 WHERE guildId = '${message.guild.id}'`)
          //if (!murdermysterydataa) return message.reply("You have not either put the Murder Mystery role in the database OR you deleted it!")
          let categorya = args[1]
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply(translate[row.lang].hostroleperms)
          }
          //if (row.startcmd === 1) return message.reply("You have already started the game")
          if (row.startcmd === 1) return message.reply(translate[row.lang].startc)
          randomizearrayroles()
          if (categorya === "murderparty") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Murder Party)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = "${role.id}" WHERE guildId = '${message.guild.id}'`))
            //return message.reply("That mode hasn't even been added yet...")
            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = 2, startcmd = 1, randomizer = "0" WHERE guildId = '${message.guild.id}'`);
            //sql.run(`UPDATE murderMystery SET isMurderparty = ${row.isMurderparty = 1} WHERE guildId = '${message.guild.id}'`);
            //message.channel.send(message.author + " has setup a **Murder Party** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.channel.send(message.author + translate[row.lang].kfofee + "**Murder Party**" + translate[row.lang].dkodee)
            return;
          }
          if (categorya === "bot1v1") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Bot 1v1 Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${role.id} WHERE guildId = '${message.guild.id}'`))
            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${row.modeId = 7}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}" WHERE guildId = '${message.guild.id}'`)
            message.channel.send(message.author + translate[row.lang].kfofee + "**Bot 1v1 Mode**" + translate[row.lang].dkodee)
            return;
          }
          if (categorya === "1v1") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (1v1 Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${role.id} WHERE guildId = '${message.guild.id}'`))
            //return message.reply("That mode hasn't even been added yet...")
            //preventjoinData.isOneVOne = 1
            //preventjoinData.guildID = message.guild.id
            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${row.modeId = 3}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
            //preventjoinData.start = 1
            //sql.run(`UPDATE murderMystery SET isOneVOne = ${row.isOneVOne = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}" WHERE guildId = '${message.guild.id}'`)
            //message.reply("has setup a **1v1 Mode** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.channel.send(message.author + translate[row.lang].kfofee + "**1v1 Mode**" + translate[row.lang].dkodee)
            //            fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //      	if (err) console.error(err)
            //    });
            return;
          }
          if (categorya === "sandbox") {
            //return message.reply("That mode hasn't even been added yet...")
            message.guild.createRole({
              name: 'Playing Murder Mystery (Sandbox Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${role.id} WHERE guildId = '${message.guild.id}'`))
            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${row.modeId = 11}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}" WHERE guildId = '${message.guild.id}'`)
            message.channel.send(message.author + translate[row.lang].kfofee + "**Sandbox Mode**" + translate[row.lang].dkodee)
            return;
          }
          if (categorya === "killermode") {
            return message.reply("That mode hasn't even been added yet...")
            sql.run(`UPDATE murderMystery SET isKillermode = ${row.isKillermode = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            //message.channel.send(message.author + " has setup a **Killer Mode** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.channel.send(message.author + translate[row.lang].kfofee + "**Killer Mode**" + translate[row.lang].dkodee)
            //           fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //       	if (err) console.error(err)
            //       });
            return;
          }
          if (categorya === "humansvsbots") {
            if (message.author.id !== "126119057232625664") return message.reply("This mode has been added but it has been put as a development build due to bugs and stuff. If you want to test out this build, you must be staff on our server.")
            message.guild.createRole({
              name: 'Playing Murder Mystery (Humans VS Bots)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))
            //return message.reply("That mode hasn't even been added yet...")
            //preventjoinData.isOneVOne = 1
            //preventjoinData.guildID = message.guild.id
            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            /*
            gamesession.push({
              guildid: message.guild.id,
              channelid: message.channel.id,
              gameid: gameid,
              hoster: message.author.tag,
              hosterid: message.author.id,
              players: 0,
              startedgame: false,
              type: categorya
            })*/
            /*
            bot.channels.get('351461628635774978').send({
              embed: new RichEmbed()
                .setTitle("Murder Mystery Bot Game Logs")
                .setDescription("A game has been started")
                .addField("Guild ID", message.guild.id)
                .addField("Channel ID", message.channel.id)
                .addField("Game ID", gameid)
                .addField("Host", message.author.tag)
                .addField("Host (User ID)", message.author.id)
                .addField("Type", categorya)
            })
            */
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${row.modeId = 4}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
            //preventjoinData.start = 1
            //sql.run(`UPDATE murderMystery SET isHumansvsbots = ${row.isHumansvsbots = 1} WHERE guildId = '${message.guild.id}'`);
            //message.reply("has setup a **Humans VS Bots** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.reply(message.author + translate[row.lang].kfofee + "**Humans VS Bots**" + translate[row.lang].dkodee)

            //            fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //      	if (err) console.error(err)
            //    });
            return;
          }
          if (categorya === "unlimitedmode") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Unlimited Players Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${role.id} WHERE guildId = '${message.guild.id}'`))

            sql.run(`UPDATE murderMystery SET host = ${message.author.id} WHERE guildId = '${message.guild.id}'`)

            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            //message.channel.send(message.author + " has setup a **Regular** (Unlimited Players Mode) Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.reply(message.author + translate[row.lang].kfofee + "**Regular** (Unlimited Players Mode)" + translate[row.lang].dkodee)
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${row.modeId = 5}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}|${rolerandomizer[row.modeId][2]}|${rolerandomizer[row.modeId][3]}|${rolerandomizer[row.modeId][4]}|${rolerandomizer[row.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
            return;
          }
          if (categorya === "shortroles") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Short Roles Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${role.id} WHERE guildId = '${message.guild.id}'`))

            sql.run(`UPDATE murderMystery SET host = "${message.author.id}" WHERE guildId = '${message.guild.id}'`)

            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            message.reply(message.author + translate[row.lang].kfofee + "**Short Roles**" + translate[row.lang].dkodee)
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${row.modeId = 8}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}|${rolerandomizer[row.modeId][2]}|${rolerandomizer[row.modeId][3]}" WHERE guildId = '${message.guild.id}'`)
            return;
          }
          if (categorya === "timemode") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Time Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

            sql.run(`UPDATE murderMystery SET host = ${row.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.reply(message.author + translate[row.lang].kfofee + "**Time Mode**" + translate[row.lang].dkodee)
            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);
            //preventjoinData.guildID = message.guild.id
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 9} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}|${rolerandomizer[row.modeId][2]}|${rolerandomizer[row.modeId][3]}|${rolerandomizer[row.modeId][4]}|${rolerandomizer[row.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
            //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //if (err) console.error(err)
            // });
            return;
          }
          if (categorya === "zombie") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Zombie Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))
            sql.run(`UPDATE murderMystery SET host = "${message.author.id}" WHERE guildId = '${message.guild.id}'`)
            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            message.reply(message.author + translate[row.lang].kfofee + "**Zombie Mode**" + translate[row.lang].dkodee)
            row.modeId = 12
            sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = 12, startcmd = 1, randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}|${rolerandomizer[row.modeId][2]}|${rolerandomizer[row.modeId][3]}|${rolerandomizer[row.modeId][4]}|${rolerandomizer[row.modeId][5]}" WHERE guildId = '${message.guild.id}'`);
            return;
          }
          if (categorya === "insane") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Insane Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

            sql.run(`UPDATE murderMystery SET host = ${row.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.reply(message.author + translate[row.lang].kfofee + "**Insane Mode**" + translate[row.lang].dkodee)
            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);
            //preventjoinData.guildID = message.guild.id
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 10} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}|${rolerandomizer[row.modeId][2]}|${rolerandomizer[row.modeId][3]}|${rolerandomizer[row.modeId][4]}|${rolerandomizer[row.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
            //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //if (err) console.error(err)
            // });
            return;
          }
          if (categorya === "regular") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Classic Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

            sql.run(`UPDATE murderMystery SET host = ${row.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

            gameid++;
            if (config.sharding === 1) {
              bot.gameid = gameid
            }
            //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            message.reply(message.author + translate[row.lang].kfofee + "**Regular**" + translate[row.lang].dkodee)

            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

            //preventjoinData.guildID = message.guild.id
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[row.modeId][0]}|${rolerandomizer[row.modeId][1]}|${rolerandomizer[row.modeId][2]}|${rolerandomizer[row.modeId][3]}|${rolerandomizer[row.modeId][4]}|${rolerandomizer[row.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
            //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //if (err) console.error(err)
            // });
          } else
            //message.reply("That mode doesn't exist!\nPlease use these categories:\n```md\nRegular - Classic Murder Mystery! (regular)\n\nMurder Party - Everyone is a murderer! (murderparty)\n\nHumans VS Bots - Added extra bots (not added yet)\n\nKiller Mode - There is one Detective and Everyone is a murderer (not added yet)\n\nSpecialist Town - Everyone is either Murderer, dective, healer, etc (not added yet)\n\n5050 - 50 murderers, 50 detectives (not added yet)\n\n2 birds 1 stone - 2 murds 1 detect Or 2 detect 1 murd (not added yet)\nFaster mode - Classic murder mystery but the time is quicker (fastermode)\n\nTime mode - In the day time, the Murderer can attack, but in the night they cant. (not added yet)\n\n1v1 Mode - 1 Detective and 1 Murderer, ONLY 2 People can do this mode. (1v1)\n\nBot Murder Mode - At night the bot types mm!kill (random) (not added yet)\n\nRejected Roles Mode - A mode that contains (most of) the rejected roles (not added yet)\n\nRobbery - 1-5 (varietied by server number) people are dressed in Robber clothing. Then Cops (act like detective) will try to apprehend them. The rest are Shop keepers. (innocents) They are managed to keep the store without being robbed.\nIf Robber/Murderer kills the Shop Keeper or gets detected by camera (camera has 3 seconds before detection) The Cops will get detected on where a robber is at\n(The Town varies around how much there is in the server)\n\n(Small Town: 1-5 People in Server)\n\n(Medium Town: 7-max People in server)\n(Big Town 8+ people in server) (not added yet)\n\nUnlimted Players Mode - Have more than 8 people? this is the mode for you! You can have an unlimited amount of players! (unlimitedmode)\n\nThats all the modes\n```")
            message.reply(translate[row.lang].modedoesntexist)
        }
      })
    } else
    if (category === "stop") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          message.guild.member(bot.user).setNickname("Murder Mystery Bot")
          let roledata = message.guild.roles.get(row.hostRoleID)

          //if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)
          if (!roledata) return message.reply(translate[row.lang].errors.hostrolenotfound)
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply(translate[row.lang].hostroleperms)
          }
          //if (row.startcmd === 0) return message.reply("There is no game going on!")
          if (row.startcmd === 0) return message.reply(translate[row.lang].gamehasntstart)
          //message.reply("Successfully (or not) stopped the game!")
          message.reply(translate[row.lang].stoppedgame)
          if (row.gameStarted === 0) {
            let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
            murdermysteryrole.delete()
            /**
                    //fs.writeFile('./mmplayers.json', '{}', 'utf8')
                    fs.writeFile('./mmgame.json', '{}', 'utf8')

                    fs.writeFile('./preventjoin.json', '{}', 'utf8')
            **/
            //bot.channels.get(row.defaultChannel).send("The game has been stopped by `" + message.author.tag + "`!")
            setTimeout(aaaaaaa, 1500)
            setTimeout(deleteallplayerz, 2000)
            let murdererr = 'N/A'
            let detectiveee = 'N/A'
            let healerr = 'N/A'
            let radiopersonn = 'N/A'
            let asssassisnsz = 'N/A'
            let jialirzo = 'N/A'
            let innocentes = ''
            sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then((rows) => {
              for (let row21 of rows) {
                if (row21.roleId === 1) {
                  murdererr = bot.users.get(row21.userId).tag
                } else if (row21.roleId === 2) {
                  detectiveee = bot.users.get(row21.userId).tag
                } else if (row21.roleId === 3) {
                  healerr = bot.users.get(row21.userId).tag
                } else if (row21.roleId === 3) {
                  healerr = bot.users.get(row21.userId).tag
                } else if (row21.roleId === 4) {
                  radiopersonn = bot.users.get(row21.userId).tag
                } else if (row21.roleId === 5) {
                  asssassisnsz = bot.users.get(row21.userId).tag
                } else if (row21.roleId === 6) {
                  jialirzo = bot.users.get(row21.userId).tag
                } else
                  innocentes += bot.users.get(row21.userId).tag + "\n"
              }
              bot.channels.get(row.defaultChannel).send({
                embed: new RichEmbed().setTitle(translate[row.lang].stoppedgameglob + message.author.tag + "`!").addField(translate[row.lang].roles.murderer, murdererr, true).addField(translate[row.lang].roles.detective, detectiveee, true).addField(translate[row.lang].roles.healer, healerr, true).addField(translate[row.lang].roles.radioperson, radiopersonn, true).addField(translate[row.lang].roles.assassin, asssassisnsz, true).addField(translate[row.lang].roles.jailor, jialirzo, true).setDescription("**Innocents**\n" + innocentes).setFooter("If they just say N/A, then ignore it.")
              })
            })
            //bot.channels.get(row.defaultChannel).send(translate[row.lang].stoppedgameglob + message.author.tag + "`!")
            return
          }
          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()
          deleteGameChannel()
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz, 2000)
          let murdererr = 'N/A'
          let detectiveee = 'N/A'
          let healerr = 'N/A'
          let radiopersonn = 'N/A'
          let asssassisnsz = 'N/A'
          let jialirzo = 'N/A'
          let innocentes = ''
          sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then((rows) => {
            for (let row21 of rows) {
              if (row21.roleId === 1) {
                murdererr = bot.users.get(row21.userId).tag
              } else if (row21.roleId === 2) {
                detectiveee = bot.users.get(row21.userId).tag
              } else if (row21.roleId === 3) {
                healerr = bot.users.get(row21.userId).tag
              } else if (row21.roleId === 3) {
                healerr = bot.users.get(row21.userId).tag
              } else if (row21.roleId === 4) {
                radiopersonn = bot.users.get(row21.userId).tag
              } else if (row21.roleId === 5) {
                asssassisnsz = bot.users.get(row21.userId).tag
              } else if (row21.roleId === 6) {
                jialirzo = bot.users.get(row21.userId).tag
              } else
                innocentes += bot.users.get(row21.userId).tag + "\n"
            }
            bot.channels.get(row.defaultChannel).send({
              embed: new RichEmbed().setTitle(translate[row.lang].stoppedgameglob + message.author.tag + "`!").addField(translate[row.lang].roles.murderer, murdererr, true).addField(translate[row.lang].roles.detective, detectiveee, true).addField(translate[row.lang].roles.healer, healerr, true).addField(translate[row.lang].roles.radioperson, radiopersonn, true).addField(translate[row.lang].roles.assassin, asssassisnsz, true).addField(translate[row.lang].roles.jailor, jialirzo, true).setDescription("**Innocents**\n" + innocentes).setFooter("If they just say N/A, then ignore it.")
            })
          })
        }
      })
    } else

    function createhealerchannel() {
      //var playeridz = 3
      //sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 3 AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          message.channel.send("Error Code 497 at createhealerchannel")
          console.error("[Murder Mystery Error] Error Code 497 at createhealerchannel")
        } else {

          message.guild.createChannel('healer', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(row1.userId, {
              READ_MESSAGES: true
            })
            c.overwritePermissions(bot.user, {
              READ_MESSAGES: true
            })
            //let healerida = arr[2]
            sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
              c.send(translate[row.lang].jobchannelmsgs.healer.channel)
              if (row.categoryChannelId !== "0") {
                c.setParent(row.categoryChannelId)
              }
              sql.run(`UPDATE murderMystery SET healchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
            })
            //c.send("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")
            //healerchannelidz(c.id)
          })
        }
      })
    }

    function createdetectivechannel(isHumansvsbots) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row5 => {
        //var playeridz = 2
        //var aaa = 1
        if (isHumansvsbots === 2) {
          console.log("DETECTIVE BOTS VS HUMANS BABYS")
          var playeridzz = 2
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridzz}' AND guildId ='${message.guild.id}'`).then(row1 => {
            //sql.get(`SELECT * FROM murderMysteryPlayers WHERE isSheriff ='${aaa}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {

              message.channel.send("Error Code 496 at createdetectivechannel")
              console.error("[Murder Mystery Error] Error Code 496 at createdetectivechannel")
            } else {
              message.guild.createChannel('detective', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (row5.categoryChannelId !== "0") {
                  c.setParent(row5.categoryChannelId)
                }
                //let sheriffthang = arr[1]

                c.send("ok wow admin, you broke the game ONCE AGAIN") // wow github user, just wow....Im sad about this.
                /**
                            //if(arr.length === 7){
                              //c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                            //}
                            //if(arr.length === 8){
                              c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                            }

                            if(arr.length === 6){
                            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                            }
                            if(arr.length === 5){
                            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
                **/
                sql.run(`UPDATE murderMystery SET sheriffchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
              })
            }
          })

          return;
        }
        if (isHumansvsbots === 1) {
          var playeridzz = 2
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridzz}' AND guildId ='${message.guild.id}'`).then(row1 => {
            //sql.get(`SELECT * FROM murderMysteryPlayers WHERE isSheriff ='${aaa}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {

              message.channel.send("Error Code 496 at createdetectivechannel")
              console.error("[Murder Mystery Error] Error Code 496 at createdetectivechannel")
            } else {

              message.guild.createChannel('detective', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                //let sheriffthang = arr[1]
                if (row5.categoryChannelId !== "0") {
                  c.setParent(row5.categoryChannelId)
                }
                c.send("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
                /**
                            //if(arr.length === 7){
                              //c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                            //}
                            //if(arr.length === 8){
                              c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                            }

                            if(arr.length === 6){
                            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                            }
                            if(arr.length === 5){
                            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
                **/
                sql.run(`UPDATE murderMystery SET sheriffchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
              })
            }
          })

          return;
        }

        //sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (debugmode === 1) {
          console.log("[DEBUG] CHECK IF SHERIFF IN cREATEDETECTIVECHANNEl")
        }
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 2 AND guildId ='${message.guild.id}'`).then(row1 => {

          //sql.get(`SELECT * FROM murderMysteryPlayers WHERE isSheriff ='${aaa}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.channel.send("Error Code 496 at createdetectivechannel")
            console.error("[Murder Mystery Error] Error Code 496 at createdetectivechannel")
          } else {

            message.guild.createChannel('detective', 'text').then(c => {
              c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false
              })
              c.overwritePermissions(row1.userId, {
                READ_MESSAGES: true
              })
              c.overwritePermissions(bot.user, {
                READ_MESSAGES: true
              })
              if (row5.categoryChannelId !== "0") {
                c.setParent(row5.categoryChannelId)
              }
              //let sheriffthang = arr[1]

              //c.send("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
              c.send(translate[row5.lang].jobchannelmsgs.detective.channel)
              /**
                          //if(arr.length === 7){
                            //c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                          //}
                          //if(arr.length === 8){
                            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                          }

                          if(arr.length === 6){
                          c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                          }
                          if(arr.length === 5){
                          c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
              **/
              sql.run(`UPDATE murderMystery SET sheriffchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
            })
          }
        })
      })
    }

    function doRandomquotez() {
      return botquotes[Math.floor(Math.random() * botquotes.length)];
    }

    function dorandomstuffdejefw() {
      var rand = [2, 3, 4, 5, 6, 7, 8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function randintegerforbotoneveone() {
      var rand = [1, 2]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwa() {
      var rand = [3, 4, 5, 6, 7, 8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwaa() {
      var rand = [4, 5, 6, 7, 8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwaaa() {
      var rand = [5, 6, 7, 8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwaaaa() {
      var rand = [6, 7, 8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwaaaaa() {
      var rand = [7, 8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwaaaaaaa() {
      var rand = [8, 9]
      return rand[Math.floor(Math.random() * rand.length)];
    }

    function dorandomstuffdejefwaaaaaa() {
      return 9
    }

    function randomtimesses() {

      var rand = [4000, 3500, 6000, 2000, 4000, 3000]

      var kk = rand[Math.floor(Math.random() * rand.length)];
      if (debugmode === 1) {
        console.log("[DEBUG] TYPE MESSAGE AT " + kk + "!")
      }


      return kk
    }

    function botchangename(playercount, fn) {
      if (debugmode === 1) {
        console.log("[DEBUG] BOT CHANGE NAME " + playercount)
      }
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${Math.floor(Math.random() * playercount)}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
        }
        if (row.lastwill === "") return //fn(null);
        message.guild.member(bot.user).setNickname(row.lastwill)
        //fn(row.lastwill)
      })
      /*
      if (playercount === 1) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 1")
        }

        var playeridz = dorandomstuffdejefw()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 2) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 2")
        }

        var playeridz = dorandomstuffdejefwa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 3) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 3")
        }

        var playeridz = dorandomstuffdejefwaa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 4) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 4")
        }

        var playeridz = dorandomstuffdejefwaaa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 5) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 5")
        }

        var playeridz = dorandomstuffdejefwaaaa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 6) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 6")
        }

        var playeridz = dorandomstuffdejefwaaaaa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 7) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 7")
        }

        var playeridz = dorandomstuffdejefwaaaaaa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
      if (playercount === 8) {
        if (debugmode === 1) {
          console.log("[DEBUG] BOT CHANGE NAME - PCOUNT 8")
        }

        var playeridz = dorandomstuffdejefwaaaaaaa()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
          }
          if (row.lastwill === "0") return;
          message.guild.member(bot.user).setNickname(row.lastwill)
          fn(row.lastwill)
        })
        return;
      }
*/

    }



    function random(number) {
      return Math.floor(Math.random() * number)
    }

    function botquotesa() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.channel.send("`ERROR` no data .-.")
          return
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] BOT QUOTES")
          }
          var kegerg = row.players
          let checkjfwfj = bot.channels.get(row.murdergamechannelid)
          if (!checkjfwfj) return nochannelfound()
          if (row.isStopcycle === 1) return;
          if (row.isDay === 1) {
            botchangename(kegerg)
            setTimeout(function () {
              setTimeout(function () {
                botquotesa()
              }, randomtimesses())
              checkjfwfj.send(`${/***${thing}**>*/""}${doRandomquotez()}`)
            }, 200)
            return;
          }
          if (row.isNight === 1) {
            //murder attack
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 2 AND userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
                  if (!row2) {

                  } else {
                    setTimeout(function () {
                      let userz = random(row.players)
                      if (userz === 2) return;
                      if (row.players === 2) {
                        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${userz}' AND guildId ='${message.guild.id}'`).then(row3 => {
                          if (!row3) {
                            console.log("Murder Mystery - Player not found.")
                          } else {
                            let users = bot.users.get(row3.userId)
                            if (row3.isDead === 1) return //new Error("That person is already dead!")
                            if (row2.isjailed === 1) return;
                            if (users.id === bot.user.id) return;
                            setTimeout(function () {
                              shoot(users.id, bot.user.id, row.murdergamechannelid, "")
                            }, 2000)
                            if (row.modeId === 3 || row.modeId === 7) {
                              sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
                              victory()
                              return;
                            }
                          }
                        })
                      }
                    }, 5000)
                  }
                })
              } else {
                /*
                              roleupdate(1, 3)
                              roleupdate(2, 5)
                              roleupdate(3, 1)
                              roleupdate(4, 2)
                              roleupdate(5, 4)
                              roleupdate(6, 6)
                */
                let userz = random(row.players)
                if (userz === 1) {
                  if (debugmode === 1) {
                    console.log("[DEBUG] BOT DISABLE KILL")
                  }

                } else {
                  setTimeout(function () {
                    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${userz}' AND guildId ='${message.guild.id}'`).then(row2 => {
                      if (!row2) {
                        //message.reply("ERROR")
                        console.error("[Murder Mystery Error] USER NOT FOUND")
                        //nochannelfound()
                        return;
                      }
                      if (debugmode === 1) {
                        console.log("[DEBUG] MURDER")
                      }
                      let users = bot.users.get(row2.userId)
                      if (row2.isDead === 1) return //new Error("That person is already dead!")
                      kill(users.id, bot.user.id, users.id, 0)
                      if (debugmode === 1) {
                        console.log("[DEBUG] BOT Kill " + users.id + " IN (" + message.guild.id + ")")
                      }
                      /*
                  if (row2.isjailed === 1) {
                    if (debugmode === 1) {
                      console.log("[DEBUG] CANNOT ATTACK (in jail)")
                    }
                    users.send(":angry::dagger: :arrow_up_down: :fearful::cop: A murderer tried to attack you! But you were in jail!")
                    //message.reply("You attack but the person is in cages, they might be in jail...")
                    //actioned(userid)
                    return;
                  }


                  users.send(":skull: You have been stabbed by the **Murderer** :skull: (The Murderer could be a bot...)")
                  if (debugmode === 1) {
                    console.log("[DEBUG] DM USER")
                  }
                  targetassassin(user.id, 1)
                  //if (targetassassin[0] === user.id) {
                  //bot.users.get(arr[4]).send("The **Murderer** has killed your target! You have gained $3!\nYou have no new Targets.")
                  //}
                  if (user.id === bot.user.id) {
                    stabbedbymurder(row2.userId, 1, row2.lastwill)
                  }
                  stabbedbymurder(row2.userId)
                  sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${users.id}'`)
                  //actioned(userid)
                  //message.reply("You have stabbed `" + users.tag + "`! But remember....He might be revived by the healer...")
                */
                    })
                  }, 2000)
                }
              }
            })
          }
        }
      })
    }

    function createmurderchannel(ismurderparty, mmroleidd) {
      var playeridz = 1;
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row5 => {
        if (!row5) {
          return message.reply("**ERROR**")
        } else {
          sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row2 => {
            if (!row2) return message.reply("Err - data")
            //if (row.isHumansvsbots === 1) {
            if (row2.modeId === 4) {
              playeridz++;
              playeridz++;
              if (debugmode === 1) {
                console.log("[DEBUG] ADD PLAYERIDZ")
              }
            }
          })
          console.log(playeridz)
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply("Error at create murder channel :thonk:")
            } else {
              if (ismurderparty === 1) {
                if (debugmode === 1) {
                  console.log("[DEBUG] IS MURDER PARTY IN createmurderchannel()")
                }

                message.guild.createChannel('murderer', 'text').then(c => {
                  c.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: false
                  })

                  c.overwritePermissions(mmroleidd, {
                    READ_MESSAGES: true
                  })
                  c.overwritePermissions(bot.user, {
                    READ_MESSAGES: true
                  })
                  if (row5.categoryChannelId !== "0") {
                    c.setParent(row5.categoryChannelId)
                  }
                  c.send(translate[row5.lang].jobchannelmsgs.murderer.channel)
                  c.send("@everyone" + translate[row5.lang].jobchannelmsgs.murderer.channel4)

                  //c.send("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that **actually there isnt cuz of murderparty**, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
                  //c.send("@everyone is the murderer.")

                  sql.run(`UPDATE murderMystery SET murderchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
                })



                return;
              }

              message.guild.createChannel('murderer', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (row5.categoryChannelId !== "0") {
                  c.setParent(row5.categoryChannelId)
                }
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 5 AND guildId ='${message.guild.id}'`).then(row6 => {
                  if (!row6) {
                    if (row5.modeId !== 3 && row5.modeId !== 8 && row5.modeId !== 7) {
                      message.channel.send("`ERROR` Assassin not found!")
                    }
                  }
                  //c.send("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
                  //c.send("<@" + row1.userId + "> is the Assassin AND\n<@" + row1.userId + ">, **YOU** are the murderer. ;)")
                  c.send(translate[row5.lang].jobchannelmsgs.murderer.channel)
                  let itemz = ""
                  //let itemz2 = translate[row5.lang].shopitemdesc
                  let thingsss = translate[row5.lang].darkshop
                  for (let i = 0; i < translate[row5.lang].darkshopitems.length; i++) {
                    itemz += `Name: ${translate[row5.lang].darkshopitems[i].name}\nDescription: ${translate[row5.lang].darkshopitems[i].description}\nPrice: ${translate[row5.lang].darkshopitems[i].price}<:darkgold:385205541955174401>\nID: ${translate[row5.lang].darkshopitems[i].id}\n\n`
                  }
                  thingsss = thingsss.replace("%item%", itemz)
                  setTimeout(function () {
                    c.send(thingsss)
                    if (debugmode === 1) {
                      console.log("[DEBUG] Add Dark Shop Items")
                    }
                  }, 1000)
                  if (row6) {
                    c.send("<@" + row6.userId + ">" + translate[row5.lang].jobchannelmsgs.murderer.channel2 + "<@" + row1.userId + ">" + translate[row5.lang].jobchannelmsgs.murderer.channel3)
                  }


                })

                sql.run(`UPDATE murderMystery SET murderchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
              })
            }
          })
        }
      })
    }

    function createradiochannel() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        var playeridz = 4
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.channel.send("Error Code 502 at createradiochannel")
            console.error("[Murder Mystery Error] Error Code 502 at createradiochannel")
          } else {
            message.guild.createChannel('radio', 'text').then(c => {
              c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false
              })
              c.overwritePermissions(row1.userId, {
                READ_MESSAGES: true
              })
              c.overwritePermissions(bot.user, {
                READ_MESSAGES: true
              })
              if (row.categoryChannelId !== "0") {
                c.setParent(row.categoryChannelId)
              }
              //c.send("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
              c.send(translate[row.lang].jobchannelmsgs.radioperson.channel)
              sql.run(`UPDATE murderMystery SET radiochannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
            })
          }
        })
      })
    }

    function createjailorchannel() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row5 => {
        if (!row5) {
          message.channel.send("**ERROR**\nData not found!")
        } else {
          var playeridz = 6
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.channel.send("Error Code 501 at createjailorchannel")
              console.error("[Murder Mystery Error] Error Code 501 at createjailorchannel")
            } else {
              message.guild.createChannel('jailor', 'text').then(c => {
                c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (row5.categoryChannelId !== "0") {
                  c.setParent(row5.categoryChannelId)
                }
                //let sheriffthang = arr[5]

                //c.send("Hello there, You are the **Jailor**, You will jail people every night and ask them questions. If you think the person is the murderer, feel free to type \n**" + config.prefix + "execute**\nTo execute the person, If you want to jail the person, type\n" + config.prefix + "jail `@user`\nTo jail the person you want to interrogate someone, OR you can type\n" + config.prefix + "jailnumber `id`\nTo jail the user but in a list that will be shown below, If you execute someone, Then it will be announced in the #murdergame, Hope you find out who the murderer is!")
                sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
                  c.send(translate[row5.lang].jobchannelmsgs.jailor.channel)


                  /**
                              //if(arr.length === 7){
                                c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                              }
                              if(arr.length === 8){
                                c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                              }

                              if(arr.length === 6){
                              c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                              }
                  **/

                  sql.run(`UPDATE murderMystery SET jailorchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
                })

                message.guild.createChannel('jail', 'text').then(c => {
                  c.overwritePermissions(message.guild.id, {
                    READ_MESSAGES: false
                  })
                  c.overwritePermissions(row1.userId, {
                    READ_MESSAGES: true
                  })
                  c.overwritePermissions(bot.user, {
                    READ_MESSAGES: true
                  })
                  if (row5.categoryChannelId !== "0") {
                    c.setParent(row5.categoryChannelId)
                  }
                  //c.send("Hello, Welcome to **Jail**, this is where you have jailed people and you interrogate them by answering some questions, Also hello jailed person! Welcome to jail, If the Jailor thinks your suspicious, then you probably are going to be executed, If you murder the person, They might have a last will and then it will show the public chat the will and show who they jailed. Anyways, Don't try to get executed or else you'll end up like Shadow where he had his head cut off. Anyways, Hope you try to not get executed!")
                  c.send(translate[row5.lang].jobchannelmsgs.jailor.jailchannel)
                  sql.run(`UPDATE murderMystery SET jailchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
                })

              })
            }
          })
        }
      })
    }

    function forceplayerid(playeridz, forced) {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          console.error("[Murder Mystery Error] Error Code 500101 at Force Player ID")
        } else {
          sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = forced} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`);
        }
      })
    }

    function assassinDM() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        var playeridz = 5
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.channel.send("Error Code 500 at assassinDM")
            console.error("[Murder Mystery Error] Error Code 500 at assassinDM")
          } else {
            //bot.users.get(row1.userId).send("Hello there, You are an **Assassin**, You are a person that is trying to get your target killed, if your target is killed you earn $3 and you will get a new target to kill... Your main goal is to kill your target, The murderer will know who the Assassin is, but you do not know who the Murderer is, You will be DM'd on what your next target is. Make sure the murderer can assign a target AND can kill once per night (Money system coming soon)")
            bot.users.get(row1.userId).send(translate[row.lang].jobchannelmsgs.assassin.channel).catch(e => {
              //message.channel.send("**Sorry but I can't seem to DM you...**")
              message.channel.send(translate[row.lang].reeeeee)
            })
          }
        })
      })
    }

    function aaaaaxxx() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then(rows => {
            for (let playerData of rows) {
              if (playerData.roleId === 5) {
                bot.users.get(playerData.userId).send(translate[row.lang].youarean + getRoleId(playerData.roleId, row.lang)).catch(e => {
                  message.channel.send(`<@${playerData.userId}>, ${translate[row.lang].dmsdisabled}`)
                })
              } else {
                bot.users.get(playerData.userId).send(translate[row.lang].youarea + getRoleId(playerData.roleId, row.lang)).catch(e => {
                  message.channel.send(`<@${playerData.userId}>, ${translate[row.lang].dmsdisabled}`)
                })
              }
            }
          })
        }
      })
    }
    if (category === "gamestart") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] Start")
          }
          let roledata = message.guild.roles.get(row.hostRoleID)
          //if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)
          if (!roledata) return message.reply(translate[row.lang].errors.hostrolenotfound)
          if (debugmode === 1) {
            console.log("[DEBUG] Host Role CHECK")
          }
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply(translate[row.lang].hostroleperms)
          }
          if (row.startcmd === 0) {
            message.reply(translate[row.lang].errors.startcmd)
            return;
          }
          if (row.gameStarted === 1) {
            //message.reply("There is already a game going on!")
            message.reply(translate[row.lang].tjeoi)
            return;
          }
          let murdermysterydataa = message.guild.roles.get(row.murdermysteryRoleID)
          //if (!murdermysterydataa) return message.reply(mm.msgs.errors.mmrolenotfound)
          if (debugmode === 1) {
            console.log("[DEBUG] MM Role CHECK")
          }
          if (!murdermysterydataa) return message.reply(translate[row.lang].errors.mmrolenotfound)
          if (debugmode === 1) {
            console.log("[DEBUG] Mode ID - " + row.modeId)
          }
          if (row.modeId === 7) {
            if (debugmode === 1) {
              console.log("[DEBUG] Bot 1v1 Mode")
            }
            if (row.players > 1) return message.reply(translate[row.lang].kreor + 1 + translate[row.lang].people)
            if (row.players < 1) return message.reply(translate[row.lang].wekfo)
            if (debugmode === 1) {
              console.log("[DEBUG] 2 Players")
            }

            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            message.reply("Creating Channels...")
            if (debugmode === 1) {
              console.log("[DEBUG] CREATING CHANNELS")
            }
            aaaaaxxx()
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            if (debugmode === 1) {
              console.log("[DEBUG] STOP CYCLE = 0")
            }
            insertbot(row.players)
            if (debugmode === 1) {
              console.log("[DEBUG] INSERT BOT")
            }
            if (debugmode === 1) {
              console.log("[DEBUG] ROLE UPDATE")
            }
            setTimeout(function () {
              createGameChannel("detective", {
                isHumansvsbots: 0
              }) //createdetectivechannel(0)
              if (debugmode === 1) {
                console.log("[DEBUG] CREATE DETECTIVE CHANNEL")
              }
              createGameChannel("murderer", {
                isMurderParty: 0
              }) //createmurderchannel(0, 0)
              if (debugmode === 1) {
                console.log("[DEBUG] CREATE MURDERER CHANNEL")
              }
              createGameChannel("shop")
              createGameChannel("murdergame", {isMurderParty: 0})
              message.reply(translate[row.lang].gamestart)
              if (debugmode === 1) {
                console.log("[DEBUG] SEND GAME STARTED, GOOD LUCK")
              }
              setTimeout(isDay, 10000)
              if (debugmode === 1) {
                console.log("[DEBUG] IS DAY")
              }
            }, 2000)
            return;
          }
          //if(preventjoinData.isOneVOne === 1){
          //if (row.isOneVOne === 1) {
          if (row.modeId === 3) {
            if (debugmode === 1) {
              console.log("[DEBUG] 1v1 Mode")
            }
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if (row.players > 2) return message.reply("You can't have more then 2 people.")
            if (row.players > 2) return message.reply(translate[row.lang].kreor + 2 + translate[row.lang].people)
            //if (row.players < 2) return message.reply("You need more than 0+ people.")
            if (row.players < 2) return message.reply(translate[row.lang].wekfo)
            if (debugmode === 1) {
              console.log("[DEBUG] 2 Players")
            }
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            message.reply("Creating Channels...")
            if (debugmode === 1) {
              console.log("[DEBUG] CREATING CHANNELS")
            }
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            if (debugmode === 1) {
              console.log("[DEBUG] STOP CYCLE = 0")
            }

            //let mmplayersDataheal2 = mmplayers[arr[0]]
            //mmplayersDataheal2.isMurderer = 1
            roleupdate(1, 1)
            if (debugmode === 1) {
              console.log("[DEBUG] ROLE UPDATE")
            }
            //let mmplayersDatadetect = mmplayers[arr[1]]
            //mmplayersDatadetect.isSheriff = 1
            roleupdate(2, 2)
            if (debugmode === 1) {
              console.log("[DEBUG] ROLE UPDATE")
            }
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE MURDERER CHANNEL")
            }
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE DETECTIVE CHANNEL")
            }
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("shop")
            createGameChannel("murdergame", {isMurderParty: 0})
            message.reply(translate[row.lang].gamestart)
            if (debugmode === 1) {
              console.log("[DEBUG] SEND GAME STARTED, GOOD LUCK")
            }
            setTimeout(isDay, 10000)
            if (debugmode === 1) {
              console.log("[DEBUG] IS DAY")
            }


            return;
          }
          //-------------------------------------------------------------------------------------------------------------------------------
          //faster mode
          if (row.modeId === 6) {
            //start
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(mmgameData.enterid < 4) return message.reply("You don't have enough players! You need 4+ people in order to play")
            if (row.players < 4) return message.reply("You don't have enough players! You need 4+ people in order to play")
            /*
                        var gamesess = gamesession.find(function (rolez) {
                          return rolez.gameid === row.gameid
                        });
                        if (gamesess === undefined) {
                          message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
                          stop()
                        }
                        gamesess.players = row.players
                        gamesess.startedgame = true
            */
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            //message.reply("Randomizing...")
            /**
                                  function shuffle(array) {
                                    var currentIndex = array.length, temporaryValue, randomIndex;
                                    // While there remain elements to shuffle...
                                    while (0 !== currentIndex) {
                                      // Pick a remaining element...
                                      randomIndex = Math.floor(Math.random() * currentIndex);
                                      currentIndex -= 1;
                                      // And swap it with the current element.
                                      temporaryValue = array[currentIndex];
                                      array[currentIndex] = array[randomIndex];
                                      array[randomIndex] = temporaryValue;
                                    }
                                    return array;
                                  }
                                  // Used like so
                                  arr = shuffle(arr);
            **/
            //message.reply(arr[0]);
            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            roleupdate(1, 1)
            roleupdate(2, 2)
            roleupdate(3, 3)
            roleupdate(4, 4)
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            /**
            message.guild.createChannel('detective', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[1], {
             READ_MESSAGES: true
            })

            let sheriffthang = arr[1]

            c.send("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)! You cannot chat in the public chat because you are dead of course.\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")

/**
            //if(arr.length === 7){
              //c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
            //}
            //if(arr.length === 8){
              c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
            }

            if(arr.length === 6){
            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
            }
            if(arr.length === 5){
            c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
   **/
            //sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
            //})
            message.guild.createChannel('radio', 'text').then(c => {
              c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false
              })
              c.overwritePermissions(arr[3], {
                READ_MESSAGES: true
              })
              c.overwritePermissions(bot.user, {
                READ_MESSAGES: true
              })
              if (row.categoryChannelId !== "0") {
                c.setParent(row.categoryChannelId)
              }
              //c.send("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
              c.send(translate[row.lang].jobchannelmsgs.healer.channel)
              sql.run(`UPDATE murderMystery SET radiochannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
            })
            message.guild.createChannel('healer', 'text').then(c => {
              c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false
              })
              c.overwritePermissions(arr[2], {
                READ_MESSAGES: true
              })
              c.overwritePermissions(bot.user, {
                READ_MESSAGES: true
              })
              if (row.categoryChannelId !== "0") {
                c.setParent(row.categoryChannelId)
              }
              let healerida = arr[2]
              c.send(translate[row.lang].jobchannelmsgs.healer.channel)

              if (arr.length === 7) {
                c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
              }
              if (arr.length === 8) {
                c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
              }

              if (arr.length === 6) {
                c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
              }
              if (arr.length === 5) {
                c.send('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
              }

              sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
            })

            message.guild.createChannel('murdergame', 'text').then(c => {
              c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false
              })
              c.overwritePermissions(murdermysterydataa.id, {
                READ_MESSAGES: true
              })
              c.overwritePermissions(bot.user, {
                READ_MESSAGES: true
              })
              if (row.categoryChannelId !== "0") {
                c.setParent(row.categoryChannelId)
              }
              c.send("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
              sql.run(`UPDATE murderMystery SET murdergamechannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)

            })

            /**
                      message.guild.createChannel('murderer-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                      c.overwritePermissions(message.guild.id, {
                        READ_MESSAGES: false
                      })
                      c.overwritePermissions(bot.users.get(arr[1]), {
                       READ_MESSAGES: true
                      })
                    c.send("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")

                    let sheriffthang = arr[1]


                    sql.run(`UPDATE murderMystery SET sheriffchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
                    sql.run(`UPDATE murderMystery SET sheriffid = ${row.murdererid = sheriffthang} WHERE guildId = '${message.guild.id}'`)



                      })

                      message.guild.createChannel('detective-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                      c.overwritePermissions(message.guild.id, {
                        READ_MESSAGES: false
                      })
                      c.overwritePermissions(bot.users.get(arr[2]), {
                       READ_MESSAGES: true
                      })

                      let sheriffthang = arr[2]

                    c.send("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
                    sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                    sql.run(`UPDATE murderMystery SET sheriffid = ${row.sheriffid = sheriffthang} WHERE guildId = '${message.guild.id}'`)

                      })





                      message.guild.createChannel('healer-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                      c.overwritePermissions(message.guild.id, {
                        READ_MESSAGES: false
                      })
                      c.overwritePermissions(bot.users.get(arr[3]), {
                       READ_MESSAGES: true
                      })
                      let healerida = arr[3]
                    c.send("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")
                    sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                    sql.run(`UPDATE murderMystery SET healerid = ${row.healerid = healerida} WHERE guildId = '${message.guild.id}'`)
                      })

                      message.guild.createChannel('murdergame-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                    c.send("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
                    sql.run(`UPDATE murderMystery SET murdergamechannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)

                  })
            **/
            message.reply(translate[row.lang].gamestart)

            fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
            });

            setTimeout(isDay, 10000)

            //end

            return;
          }
          //-------------------------------------------------------------------------------------------------------------------------------
          //if (row.isMurderparty === 1) {
          if (row.modeId === 2) {
            if (debugmode === 1) {
              console.log("[DEBUG] MURDER PARTY")
            }
            //start


            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if (row.players < 2) return message.reply("You don't have enough players! You need 2+ people in order to play")
            if (row.players < 2) return message.reply(translate[row.lang].keofra)
            //message.reply("Randomizing... (actually I dont need to randomize because there are no roles to pick except murderer)\nCreating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)

            /*
                        var gamesess = gamesession.find(function (rolez) {
                          return rolez.gameid === row.gameid
                        });
                        if (gamesess === undefined) {
                          message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
                          stop()
                        }

                        gamesess.players = row.players
                        gamesess.startedgame = true
            */
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            /**
  message.guild.createChannel('murderer', 'text').then(c => {
    c.overwritePermissions(message.guild.id, {
      READ_MESSAGES: false
    })

    c.overwritePermissions(murdermysterydataa.id, {
      READ_MESSAGES: true
    })

  c.send("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
  sql.run(`UPDATE murderMystery SET murderchannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)
  })
**/
            createGameChannel("murderer", {
              isMurderParty: 1
            }) //createmurderchannel(1, murdermysterydataa.id)
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE MURDER CHANNEl")
            }
            createGameChannel("murdergame", {isMurderParty: 1})
            message.reply(translate[row.lang].gamestart)
            //fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
            //if (err) console.error(err)
            //});
            setTimeout(isDay, 6000)
            return;


            //end

          }
          //if (row.isHumansvsbots === 1) {
          if (row.modeId === 4) {

            //call 911 now!!! lol
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")



            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            //if (row.players < 1) return message.reply("You don't have enough players! You need 1+ people in order to play")
            if (row.players < 1) return message.reply(translate[row.lang].keofr)
            if (row.players > 8) return message.reply(translate[row.lang].wdkdd)
            //if (row.players > 8) return message.reply("You cant have more than 8 people!")
            /*
                        var gamesess = gamesession.find(function (rolez) {
                          return rolez.gameid === row.gameid
                        });
                        if (gamesess === undefined) {
                          message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
                          stop()
                        }

                        gamesess.players = row.players
                        gamesess.startedgame = true
              */
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            //message.reply("Randomizing...")
            if (row.players === 1) {
              insertbot(3)
              insertbot(4)
              insertbot(5)
              insertbot(6)
              insertbot(7)
              insertbot(8)
              insertbot(9)
              sql.run(`UPDATE murderMystery SET players = ${row.players = 2} WHERE guildId = '${message.guild.id}'`)
            }

            if (row.players === 2) {
              insertbot(3)
              insertbot(4)
              insertbot(5)
              insertbot(6)
              insertbot(7)
              insertbot(8)
              insertbot(9)
            }
            if (row.players === 3) {
              insertbot(4)
              insertbot(5)
              insertbot(6)
              insertbot(7)
              insertbot(8)
              insertbot(9)
            }
            if (row.players === 4) {
              insertbot(5)
              insertbot(6)
              insertbot(7)
              insertbot(8)
              insertbot(9)
            }
            if (row.players === 5) {
              insertbot(6)
              insertbot(7)
              insertbot(8)
              insertbot(9)
            }
            if (row.players === 6) {
              insertbot(7)
              insertbot(8)
              insertbot(9)
            }
            if (row.players === 7) {
              insertbot(8)
              insertbot(9)
            }
            if (row.players === 8) {
              insertbot(9)
            }
            //sql.run(`UPDATE murderMystery SET players = ${row.players = 9} WHERE guildId = '${message.guild.id}'`)

            //message.reply(arr[0]);
            setTimeout(function () {
              message.reply("Creating Channels...")
              sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
              roleupdate(1, 3)
              roleupdate(2, 5)
              roleupdate(3, 1)
              roleupdate(4, 2)
              roleupdate(5, 4)
              roleupdate(6, 6)
              //assassinDM() --------------- Disabled due to bots not allowing to DM self idk
              createGameChannel("murderer", {
                isMurderParty: 0
              }) //createmurderchannel(0, 0)
              createGameChannel("jailor") //createjailorchannel()
              createGameChannel("detective", {
                isHumansvsbots: 1
              }) //createdetectivechannel(1)
              createGameChannel("healer") //createhealerchannel()
              createGameChannel("radio") //createradiochannel()
              message.reply(translate[row.lang].gamestart)

              setTimeout(isDay, 10000)
              if (debugmode === 1) {
                console.log("[DEBUG] IS DAY TIMER set")
              }
              createGameChannel("murdergame", {isMurderParty: 0})
            }, 2000)
            return;

          }
          //-------------------------------------------------------------------------------------------------------------------------------
          if (row.modeId === 5) {
            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            if (row.players < 6) return message.reply(translate[row.lang].fkeow)
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)

            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            assassinDM()
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("jailor") //createjailorchannel()
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("radio") //createradiochannel()
            createGameChannel("murdergame", {isMurderParty: 0})
            createGameChannel("shop")
            message.reply(translate[row.lang].gamestart)
            setTimeout(isDay, 10000)
          }
          if (row.modeId === 8) {
            if (row.players < 4) return message.reply(translate[row.lang].fkeowa)

            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)

            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("radio") //createradiochannel()
            createGameChannel("murdergame", {isMurderParty: 0})
            createGameChannel("shop")
            message.reply(translate[row.lang].gamestart)
            setTimeout(isDay, 15000)
          }
          if (row.modeId === 9) {
            if (row.players < 6) return message.reply(translate[row.lang].fkeow)

            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            assassinDM()
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("jailor") //createjailorchannel()
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("radio") //createradiochannel()
            createGameChannel("murdergame", {isMurderParty: 0})
            createGameChannel("shop")
            message.reply(translate[row.lang].gamestart)
            setTimeout(isDay, 15000)
          }
          if (row.modeId === 11) {
            if (row.players < 6) return message.reply(translate[row.lang].fkeow)
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            assassinDM()
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("jailor") //createjailorchannel()
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("radio") //createradiochannel()
            createGameChannel("murdergame", {isMurderParty: 0})
            createGameChannel("shop")
            message.reply(translate[row.lang].gamestart)
            setTimeout(isDay, 15000)
          }
          if (row.modeId === 12) {
            if (row.players < 6) return message.reply(translate[row.lang].fkeow)
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            assassinDM()
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("jailor") //createjailorchannel()
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("zombie")
            createGameChannel("murdergame", {isMurderParty: 0})
            createGameChannel("shop")
            message.reply(translate[row.lang].gamestart)
            setTimeout(isDay, 15000)
          }
          if (row.modeId === 10) {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            if (row.players < 6) return message.reply(translate[row.lang].fkeow)
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            assassinDM()
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("jailor") //createjailorchannel()
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("radio") //createradiochannel()
            createGameChannel("murdergame", {isMurderParty: 0})
            message.reply(translate[row.lang].gamestart)
            setTimeout(isDay, 15000)
          }
          if (row.modeId === 1) {
            //call 911 now!!! lol
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            if (row.players < 6) return message.reply(translate[row.lang].fkeow)
            sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)

            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)
            /*
                      roleupdate(1, 1)
                      roleupdate(2, 2)
                      roleupdate(3, 3)
                      roleupdate(4, 4)
                      roleupdate(5, 5)
                      roleupdate(6, 6)
                      */
            /**
          let mmplayersDataheal2 = mmplayers[arr[0]]
          mmplayersDataheal2.isMurderer = 1


		  let mmplayersDatadetect = mmplayers[arr[1]]
          mmplayersDatadetect.isSheriff = 1
	


          let mmplayersDataheal = mmplayers[arr[2]]
          mmplayersDataheal.isHealer = 1
	


          let mmplayersDataheaal = mmplayers[arr[3]]
          mmplayersDataheaal.isRadioPerson = 1
		  
		  
		  let mmplayersDataaaaaa = mmplayers[arr[4]]
		  mmplayersDataaaaaa.isAssassin = 1

      let mmplayersdataaaaaaa = mmplayers[5]
      mmplayersdataaaaaaa.isJailor = 1
	**/


            //let mmplayersDataheal2 = mmplayers['128296384200835073']
            //mmplayersDataheal2.isMurderer = 1

            //let mmplayersDatadetect = mmplayers['281397352177074177']
            //mmplayersDatadetect.isSheriff = 1

            //let mmplayersDataheal = mmplayers['275722540981288960']
            //mmplayersDataheal.isHealer = 1

            //bot.users.get(arr[4]).send("Hello there, You are an **Assassin**, You are a person that is trying to get your target killed, if your target is killed you earn $3 and you will get a new target to kill... Your main goal is to kill your target, The murderer will know who the Assassin is, but you do not know who the Murderer is, You will be DM'd on what your next target is. Make sure the murderer can assign a target AND can kill once per night (Money system coming soon)")
            assassinDM()
            createGameChannel("murderer", {
              isMurderParty: 0
            }) //createmurderchannel(0, 0)
            createGameChannel("jailor") //createjailorchannel()
            createGameChannel("detective", {
              isHumansvsbots: 0
            }) //createdetectivechannel(0)
            createGameChannel("healer") //createhealerchannel()
            createGameChannel("radio") //createradiochannel()
            createGameChannel("murdergame", {isMurderParty: 0})
            createGameChannel("shop")
            message.reply(translate[row.lang].gamestart)
            /**
                  fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                if (err) console.error(err)
              });
            **/
            setTimeout(isDay, 15000)
          }
        }
      })
    } else

      //"shopitemdesc": "**Name**: %itemname%\n**Description**: %itemdescription%\n**Price**: %itemprice%<:gold:384017291316297729>\n**ID**: %itemid%\n\n",

      if (category === "leave") {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            return message.reply("**This command is temperarly disabled due to bugs**")
            //if (row.startcmd === 0) return message.reply("The game hasn't been started!")
            if (row.startcmd === 0) return message.reply(translate[row.lang].gamehasntstart)

            //if (row.gameStarted === 1) return message.reply("The game has already started!")
            if (row.gameStarted === 1) return message.reply(translate[row.lang].gamealreadystart)

            message.channel.send("**Leaving...**").then(m => {
              sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
              setTimeout(deleteplayer, 1000, row.murdermysteryRoleID, m.id)
            })
          }
        })
      }

    if (category === "join") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          if (row.startcmd === 0) return message.reply(translate[row.lang].gamehasntstart)
          if (row.gameStarted === 1) return message.reply(translate[row.lang].gamealreadystart)
          if (![5, 8].includes(row.modeId)) {
            //if (row.players > 8) return message.reply("There are already enough players! (You can go on another server if you have like 17 people or somethin, or play unlimited players mode or 5050.)")
            if (row.players > 8) return message.reply(translate[row.lang].enoughplayers)
          }
          if (row.modeId === 3) {
            if (row.players >= 2) return message.reply(translate[row.lang].kreor + "2 " + translate[row.lang].people)
          }
          if (row.modeId === 7) {
            if (row.players >= 1) return message.reply(translate[row.lang].kreor + "1 " + translate[row.lang].people)
          }
          if (row.playerInsert === 1) return message.reply(translate[row.lang].alreadyjoinn)
          //if(preventjoinData.isOneVOne === 1){
          //if(mmplayersData.enterid === 2) return message.reply("There is already enough players!")
          //}
          //if(mmplayersData.isenter === 1) return message.reply("You're already in the game!")
          //mmplayersData.isenter = 1
          //mmplayersData.guildID = row.guildId
          message.channel.send("**Inserting player...**").then(m => {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                sql.run(`UPDATE murderMystery SET players = players + 1 WHERE guildId = '${message.guild.id}'`);
                sql.run(`UPDATE murderMystery SET playerInsert = 1 WHERE guildId = '${message.guild.id}'`)
                setTimeout(insertplayer, 1000, row.players, row.murdermysteryRoleID, m.id)
                if (bot.guilds.get("319583713262436354")) {
                  if ((bot.guilds.get("319583713262436354").members.filter(x => x.user.id == '126119057232625664').map(x => x.id).length) > 0) {
                    try {
                      bot.guilds.get("319583713262436354").addRole("386519423542099969")
                    } catch (e) {
                      console.log(e)
                    }
                  }
                }

              } else {
                //sql.run(`UPDATE murderMystery SET playerInsert = ${row.playerInsert = 1} WHERE guildId = '${message.guild.id}'`)
                setTimeout(insertplayer, 1000, row.players, row.murdermysteryRoleID, m.id)
              }
            })
          })
          //mmgameData.enterid++;
          //ggfunction()
          /**
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
            });
          **/
        }
      })
    } else
    if (category === "rules") {
      message.channel.send({
        embed: new RichEmbed().setDescription("***RULES OF MURDER MYSTERY***\n**These are the game rules of Murder Mystery, You must follow them or else you will get a punishment! (if your playing it on the MMBO server)**\n\n:one: **Look at a channel if you have the permission Administrator** If you aren't playing the game, thats fine, but if you are playing and your an administrator and show people who the murderer is, you will get a punishment\n**Punishment:** Warning if once, if twice then Timeout - 5 minutes\n:two: **Gamethrowing** Gamethrowing isn't fun, If you get caught gamethrowing, like show that your detective and show who the murderer is, Also same as if you have an Administrator Permission.\n**Punishment:** No warning, Timeout for 10 minutes\n:three: **Cheating** If some how you exploited the bot, it isn't really fair to be cheating from the bot, if you crash the bot or somehow found away to get by the permissions, its a big no no. Another way of cheating is using a \"Selfbot\" to see the channel permissions\n**Punishment:** Permanant Ban from the Game.").setColor(0xFF0000)
      })
    } else if (category === "howtoplay") {
      message.channel.send("a")
    } else

    if (!category) {
      message.channel.send({
        embed: new RichEmbed().setDescription("**Welcome to Murder Mystery! This is a game here YOU as the player has to try to find out who the murderer is!\n\nThere are 6 special roles!\n\nOne is the Murderer, what the Murderer does is kill a person each night. But becareful, The Detective can search/shoot the Murderer OR If you murder someone in jail and you attack the person, the Jailor will know who attacked the Prisoner, Which you have to be very careful on who you kill. If someone asks your role, say that you are an Innocent or some other role, I do not recommend you say that your Radio Person, because people will say to prove that your Radio Person by broadcasting the message they said. I also don't recommend you say that your a Detective or Jailor, that will send some alarms that they will shoot/execute you, If someone asks your role, say your Innocent, If you say a role like Healer then the Detective might search you, Becareful for that. You also have a partner, which is the Assassin, only YOU can assign who should be targetted, then the Assassin will try their best to get them killed. You cannot kill the Assassin and you will know who the Assassin is, but the Assassin doesn't know who the Murderer is.**\n\n**Two is the Detective, where he will try to search and shoot the murderer, BUT you cannot shoot/search people that are in jail, if you shoot someone in jail the jailor will know that the person was going to be shot (it will say they were killed so the jailor thinks you are the murderer/detective) if you search the jailor wont know you searched BUT it will say this: \"You tried to search the person but he/she is in jail!\" Not intirely sure it will say that but okay.**").setColor(0xFF0000)
      })
      message.channel.send({
        embed: new RichEmbed().setDescription("**Three is a Healer which will heal the person if they were stabbed/shot by the Murderer/Detective, They cannot heal people in jail.\n\nFour is the Radio Person which will broadcast in the chat at night only\n\nFive is the Assassin which will try to get their target stabbed/shot/lynched, if the target is stabbed/shot/executed/lynched then the Assassin will gain 3 gold, You are the Murderer's Partner, You wont know who the Murderer is, but the Murderer will know who you are. The Murderer cannot kill you but the Detective/Jailor can.\n\nSix is the Jailor which will jail people and ask them questions. If they think the prisoner is suspicious, They can execute the person and it will reveal their role to the whole intire chat.\n\nThere must be more than 6+ people, if there are none, then get some players!\nIf you haven't played Murder Mystery before, it is a game where there is one murderer and one detective, the detective has to find out who is the murderer.** As always...Good luck...\n\nNOTE: If you need any help or found a bug, please contact <@126119057232625664> or <@281397352177074177> and we will try our best to fix it as possible!\n**If you want to join our server, type mm!server\n\n:warning: ***PLEASE READ*** :warning:\n**If the game ends, be sure to remove the 'Murder Mytery' Roles from everyone that has participated in the game, else someone could get in the game randomly and glitch out the game or somethin, You could either remove the roles from everyone that participated once the game is done OR you can delete the role and recreate it and type mm!game murdermysteryrole or somethin.**\n\n***Beware of Selfbots***\n**People can use selfbots to see the channel permissions and cheat, they can use an eval and then tell who the exact murderer is, If you encounter this, please remove the person from the game from voting them to die.**\n\n***If you want to see the rules of the game, please type mm!game rules***").setColor(0xFF0000)
      })
      return;
    }
  }

  function stop() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        if (row.host === "0") return message.reply(translate[row.lang].nogamegoingon)
        bot.channels.get(row.defaultChannel).send("The game has been forcefully stopped by a **Murder Mystery Administrator**")
        fs.writeFile('./mmplayers.json', '{}', 'utf8')
        fs.writeFile('./mmgame.json', '{}', 'utf8')
        fs.writeFile('./preventjoin.json', '{}', 'utf8')
        deletgamesess()
        bot.channels.get(row.murdergamechannelid).delete()
        bot.channels.get(row.healchannelid).delete()
        bot.channels.get(row.sheriffchannelid).delete()
        bot.channels.get(row.murderchannelid).delete()
        bot.channels.get(row.radiochannelid).delete()
        bot.channels.get(row.shopchannelid).delete()
        message.channel.send(message.author + " has stopped the match!")


        setTimeout(aaaa, 1000)


        sql.run(`UPDATE murderMystery SET murderchannelid = 0, 
          murdergamechannelid = 0, 
          healchannelid = 0, 
          sheriffchannelid = 0,
          isDay = 0,
          isNight = 0,
          isStopcycle = 1,
          gameStarted = 0,
          startcmd = 0,
          players = 0,
          jailorchannelid = 0,
          jailchannelid = 0,
          radiochannelid = 0,
          shopchannelid = 0,
          zombiechannelid = 0,
          gameData = '',
          modeId = 0,
          gameid = 0,
          playerInsert = 0,
          randomizer = "0",
          day = 0
          WHERE guildId = '${message.guild.id}'`)
      }
    })

  }

  function unjail(users, eroigjreg) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("ERR!")
        console.error("[Murder Mystery Error] Player doesn't exist!")
        nochannelfound()

      } else {
        let user = bot.users.get(users)
        if (!user) return;
        bot.channels.get(eroigjreg).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        sql.run(`UPDATE murderMysteryPlayers SET isjailed = 0 WHERE userId = '${users}' AND guildId = '${message.guild.id}'`);
        sql.run(`UPDATE murderMysteryPlayers SET hasjailed = 0 WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
      }
    })

  }


  function jail(users, userid, eroigjreg, playerid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row5 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[row5.lang].userisnotingames)

        } else {
          let user = bot.users.get(users)
          if (!user) return;
          if (row.isDead === 1) return message.reply(translate[row5.lang].thatpersonisdead)
          if (row.isjailed === 1) return message.reply(translate[row5.lang].jobchannelmsgs.jailor.alreadyinjail)
          var somettt = isactioned()
          if (somettt) /*123717*/ return;
          sql.run(`UPDATE murderMysteryPlayers SET isjailed = 1 WHERE userId = '${users}' AND guildId = '${message.guild.id}'`);
          //message.reply(user + " has been jailed! Try and interrigate him, if (s)he sounds suspicious, you can execute them by typing mm!execute " + user)
          message.reply(user + translate[row5.lang].fekrofr + user)
          bot.channels.get(eroigjreg).overwritePermissions(user, {
            READ_MESSAGES: true
          })
          setTimeout(unjail, 50000, users, eroigjreg)
        }
      })
    })
  }

  function hasjailedcheck() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found. [hasjailedcheck()]")
      } else {
        if (row.hasjailed === 1) return message.reply("You have already jailed someone!");
      }
    })
  }

  if (command === "settings") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        let staff = message.guild.member(message.author).permissions.has('MANAGE_ROLES')

        //if (!staff) return message.reply("You do not have permission to add a host role! You need the `MANAGE_ROLES` permission")
        if (!staff) return message.reply(translate[row.lang].manageroless)
        let cater = args[0]


        if (!cater) return message.channel.send({
          embed: new RichEmbed().setTitle("Settings").setDescription(translate[row.lang].settings).setColor(0xFF0000)
        })
        if (cater === "help") {
          return message.channel.send({
            embed: new RichEmbed().setTitle("Settings").setDescription(translate[row.lang].settings).setColor(0xFF0000)
          })
        }
        if (cater === "daytime") {
          let int = args[1]
          if (!int) return message.channel.send(translate[row.lang].enternumber)
          int = parseInt(int)
          if (isNaN(int)) return message.channel.send(translate[row.lang].enternumber)
          sql.run(`UPDATE murderMystery SET daytimelen = ${int} WHERE guildId = "${message.guild.id}"`)
          message.channel.send("**Successfully set on how long a day should last!**\nThe day will last `" + int + " seconds`")
        }
        if (cater === "nighttime") {
          let int = args[1]
          if (!int) return message.channel.send(translate[row.lang].enternumber)
          int = parseInt(int)
          if (isNaN(int)) return message.channel.send(translate[row.lang].enternumber)
          sql.run(`UPDATE murderMystery SET nighttimelen = ${int} WHERE guildId = "${message.guild.id}"`)
          message.channel.send("**Successfully set on how long a night should last!**\nThe night will last `" + int + " seconds`")
        }
        if (cater === "category") {
          let channl = args.join(" ")
          if (channl.length < 1) return message.channel.send("Err category name not found")
          let findCategory = message.guild.channels.filter(x => x.type === "category").find('name', channl)
          if (!findCategory) return message.channel.send("Err category name not found")
          sql.run(`UPDATE murderMystery SET categoryChannelId = ? WHERE guildId = "${message.guild.id}"`, [findCategory.id])
          message.channel.send("**Successfully set the category!**\nNow if Murder Mystery Bot creates a game, it will put the channels inside of that category! Else if the category wont exist, it'll automatically reset this. (Meaning that if you want it in a category, youll have to set it again)")
          return;
        }
        if (cater === "defaultchannel") {
          let channl = message.mentions.channels.first()
          if (!channl) return message.reply(translate[row.lang].defaultchannel)
          if (channl.guild.id !== message.guild.id) return;
          sql.run(`UPDATE murderMystery SET defaultChannel = ${channl.id} WHERE guildId = '${message.guild.id}'`).catch()
          message.reply("**Successfully set your channel to " + channl + "!**")
          return;
        }
        if (cater === "locales") {
          let catee = args[1]
          if (catee === "apply") {
            message.reply("**Please look in DMS**")
            message.author.send(`**Want to become a translator? Well here is the link! Just DM fire the template and your good!**\nYou must not use Google Translate for this.\nhttps://discord.gg/rdqDEGG`).catch(e => {
              message.channel.send("**ERROR** I cant seem to send messages to you!\nError log:\n```" + e + "\n```")
            })
            return;
          }
          if (catee === "list") {
            snekfetch.get(`https://raw.githubusercontent.com/FireMario211/Murder-Mystery-Bot/master/locales/lang.txt`)
              .then(r => {
                message.channel.send(`\`\`\`prolog\n Avaliable Locales:\n${r.text}\n\`\`\``)
              }).catch(e => {
                message.channel.send("**ERROR**\nError Log:\n```\n" + e + "\n```")
              });;

          }
          if (catee === "set") {
            let lang = args[2]
            if (!lang) {
              //snekfetch.get(`http://i-was-pinged.cf/murder-mystery/lang.txt`)
              snekfetch.get(`https://raw.githubusercontent.com/FireMario211/Murder-Mystery-Bot/master/locales/lang.txt`)
                .then(r => {
                  message.channel.send(`**Please select a option!**\n\`\`\`prolog\n      --------- Language Options ------------\n      Use "mm!settings locale set [lang]" to set your locale!\n      Use "mm!settings locale list" to see the list of locales!\n      Use "mm!settings locale apply" to apply to be a translator!\n\n    Avaliable Locales:\n${r.text}\n\`\`\``)
                }).catch(e => {
                  message.channel.send("**ERROR**\nError Log:\n```\n" + e + "\n```")
                });;

              return
            }
            //snekfetch.get('http://i-was-pinged.cf/murder-mystery/langarray.json').then(r => {
            //snekfetch.get(`https://raw.githubusercontent.com/FireMario211/Murder-Mystery-Bot/master/locales/langarray.json`).then(r => {
            let rr = langarray.find(function (e) {
              return e === lang
            })
            if (rr === undefined) {
              //snekfetch.get(`http://i-was-pinged.cf/murder-mystery/lang.txt`)
              snekfetch.get(`https://raw.githubusercontent.com/FireMario211/Murder-Mystery-Bot/master/locales/lang.txt`)
                .then(r => {
                  message.channel.send("That language doesn't exist!\n**Please select a Language!**\nLanguages Available:\n" + r.text)
                }).catch(e => {
                  message.channel.send("**ERROR**\nError Log:\n```\n" + e + "\n```")
                });

              return
            }
            sql.run(`UPDATE murderMystery SET lang = '${lang}' WHERE guildId = '${message.guild.id}'`);
            message.channel.send(translate[row.lang].langsuccess + lang + "`!")

            //})
            return;
          }
          message.channel.send("**Please select an option!**\n```\napply\nlist\nset\n```")
        }
      }
    })


  }
  if (command === "buy") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.reply(translate[row.lang].isntingame)
          } else {
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (row.modeId === 2) return message.reply(translate[row.lang].shopthing)
            if (message.channel.id !== row.murderchannelid && message.channel.id !== row.shopchannelid && message.channel.id !== row.murdergamechannelid && message.channel.id !== row.sheriffchannelid && message.channel.id !== row.radiochannelid && message.channel.id !== row.jailorchannelid && message.channel.id !== row.jailchannelid && message.channel.id !== row.healchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              if (row.isNight === 1) return message.reply(translate[row.lang].shopclosed)

              let cate = args[0]
              if (!cate) return message.reply(translate[row.lang].plspickitem)

              let itemid = parseInt(args[0])

              if (isNaN(itemid)) return message.reply(translate[row.lang].unknownitem)

              let item = translate[row.lang].shopitems.find(function (e) {
                return e.id === itemid
              })
              let str = translate[row.lang].notenoughgold
              let str2 = item.price - row1.gold
              let str3 = translate[row.lang].bought
              str = str.replace("%golamount%", str2)
              str3 = str3.replace("%itemname%", item.name)
              if (item === undefined) return message.reply(translate[row.lang].unknownitem)
              if (row1.gold < item.price) return message.reply(str)
              if (itemid === 3) {
                sql.run(`UPDATE murderMysteryPlayers SET gold = ${row1.gold - item.price} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${row1.darkgold + 1} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                message.reply(str3)
                return;
              }
              sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 0`).then(row3 => {
                if (!row3) {
                  sql.run('INSERT INTO murderMysteryItems (userId, guildId, itemId, usedItem, itemName, amount, isDark, extraData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, message.guild.id, item.id, 0, item.name, 1, 0, '']);
                  sql.run(`UPDATE murderMysteryPlayers SET gold = ${row1.gold - item.price} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                  message.reply(str3)
                } else {
                  if (item.id === 1 && item.id === 2) {
                    return message.reply(translate[row.lang].shopthin)
                  }
                  sql.run(`UPDATE murderMysteryItems SET amount = ${row3.amount + 1} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id}`)
                  sql.run(`UPDATE murderMysteryPlayers SET gold = ${row1.gold - item.price} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                  message.reply(str3)
                }
              })
            })
          }
        })
      }
    })
  }
  if (command === "darkbuy") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.reply(translate[row.lang].isntingame)
          } else {
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (row.modeId === 2) return message.reply(translate[row.lang].shopthing)
            if (row1.roleId === 1) return;
            if (message.channel.id !== row.murderchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              //if (row.isNight === 1) return message.reply(translate[row.lang].shopclosed)
              let cate = args[0]
              if (!cate) return message.reply(translate[row.lang].plspickitem)
              let itemid = parseInt(args[0])
              if (isNaN(itemid)) return message.reply(translate[row.lang].unknownitem)
              let item = translate[row.lang].darkshopitems.find(function (e) {
                return e.id === itemid
              })
              let str = translate[row.lang].notenoughgolddark
              let str2 = item.price - row1.darkgold
              let str3 = translate[row.lang].bought
              str = str.replace("%golamount%", str2)
              str3 = str3.replace("%itemname%", item.name)
              if (item === undefined) return message.reply(translate[row.lang].unknownitem)
              if (row1.darkgold < item.price) return message.reply(str)
              sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 0`).then(row3 => {
                if (!row3) {
                  sql.run('INSERT INTO murderMysteryItems (userId, guildId, itemId, usedItem, itemName, amount, isDark, extraData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, message.guild.id, item.id, 0, item.name, 1, 1, '']);
                  sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${row1.darkgold - item.price} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                  message.reply(str3)
                } else {
                  if (item.id === 1 && item.id === 2 && item.id === 6) {
                    return message.reply(translate[row.lang].shopthin)
                  }
                  sql.run(`UPDATE murderMysteryItems SET amount = ${row3.amount + 1} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 1`)
                  sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${row1.darkgold - item.price} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                  message.reply(str3)
                }
              })
            })
          }
        })
      }
    })
  }

  if (command === "item") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.reply(translate[row.lang].isntingame)
          } else {
            let cate = args[0]
            if (!cate) return message.reply(translate[row.lang].plspickitem)
            if (row.modeId === 2) return message.reply(translate[row.lang].shopthing)
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.murderchannelid && message.channel.id !== row.shopchannelid && message.channel.id !== row.murdergamechannelid && message.channel.id !== row.sheriffchannelid && message.channel.id !== row.radiochannelid && message.channel.id !== row.jailorchannelid && message.channel.id !== row.jailchannelid && message.channel.id !== row.healchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              //if (row.isNight === 1) return message.reply(translate[row.lang].shopclosed)
              let itemid = parseInt(cate)

              if (isNaN(itemid)) return message.reply(translate[row.lang].unknownitem)

              let item = translate[row.lang].shopitems.find(function (e) {
                return e.id === itemid
              })
              if (item === undefined) return message.reply(translate[row.lang].unknownitem)
              sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 0`).then(row3 => {
                if (!row3) {
                  message.channel.send(translate[row.lang].hasnotbought)
                } else {
                  if (item.usable === 0) return message.reply(translate[row.lang].shopthings)
                  if (item.id === 1) {
                    let usage = message.mentions.users.keyArray()[0]
                    let prevent = message.mentions.users.keyArray().splice(1).join(" ")
                    if (!usage) return message.reply(translate[row.lang].userdoesntexist)
                    if (prevent) return message.reply("**Error**")
                    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${usage}' AND guildId ='${message.guild.id}'`).then(row12 => {
                      if (!row12) {
                        message.reply(translate[row.lang].userisnotingame)
                      } else {
                        if (row12.isDead === 1) return message.reply(translate[row.lang].thatpersonisalreadydead)
                        let kerok = item.msg
                        if (row3.usedItem === 1) return message.reply(item.seller)
                        kerok = kerok.replace("%user%", usage)
                        if (row.modeId === 3) {
                          let kerokz = item.msgss
                          kerokz = kerok.replace("%role%", "Murderer")
                          kerokz = kerok.replace("%user%", usage)
                          message.channel.send(kerokz)
                          bot.users.get(usage).send(item.sent).catch(e => {
                            message.channel.send("**ERROR**\n```\n" + e + "\n```")
                          })
                          setTimeout(victory, 1000)
                        }
                        let keogez = translate[row.lang].ekfoekfefef
                        keogez = keogez.replace("%author%", message.author.id)
                        keogez = keogez.replace("%user%", usage)
                        let kerokz = item.msgss
                        if (row12.isMurderer === 0 && row12.roleId !== 5) {
                          kerokz = kerokz.replace("%user%", usage)
                          if (row12.roleId === 2) {
                            kerokz = kerokz.replace("%role%", translate[row.lang].roles.detective)
                            keogez = keogez.replace("%role%", translate[row.lang].roles.detective)
                          } else
                          if (row12.roleId === 3) {
                            kerokz = kerokz.replace("%role%", translate[row.lang].roles.healer)
                            keogez = keogez.replace("%role%", translate[row.lang].roles.healer)
                          } else
                          if (row12.roleId === 4) {
                            kerokz = kerokz.replace("%role%", translate[row.lang].roles.radioperson)
                            keogez = keogez.replace("%role%", translate[row.lang].roles.radioperson)
                          } else
                          if (row12.roleId === 6) {
                            kerokz = kerokz.replace("%role%", translate[row.lang].roles.jailor)
                            keogez = keogez.replace("%role%", translate[row.lang].roles.jailor)
                          } else
                          if ( /*row12.isJailor === 0 && row12.isHealer === 0 && row12.isRadioPerson === 0 && row12.isSheriff === 0*/ row12.roleId === 0) {
                            kerokz = kerokz.replace("%role%", translate[row.lang].roles.innocent)
                            keogez = kerogez.replace("%role%", translate[row.lang].roles.innocent)
                          }

                          kerokz = kerok.replace("%user%", usage)
                          message.channel.send(kerokz)
                          bot.users.get(usage).send(item.sent).catch(e => {
                            message.channel.send("**ERROR**\n```\n" + e + "\n```")
                          })
                          sql.run(`UPDATE murderMysteryItems SET usedItem = ${row3.usedItem = 1} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id}`)
                          bot.channels.get(row.healchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.sheriffchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.murdergamechannelid).overwritePermissions(usage, {
                            SEND_MESSAGES: false
                          })

                          bot.channels.get(row.murderchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.radiochannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.jailchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.jailorchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.shopchannelid).overwritePermissions(usage, {
                            SEND_MESSAGES: false
                          })
                          message.reply(item.msgsss)
                          bot.channels.get(row.murdergamechannelid).send(keogez)
                          sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId = '${message.guild.id}' AND userId = '${usage}'`);
                          sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                          targetassassin(kerok, 32)
                          return;
                        }
                        if (row12.roleId === 5) {
                          kerokz = kerokz.replace("%role%", translate[row.lang].roles.assassin)

                          kerokz = kerokz.replace("%user%", usage)
                          message.channel.send(kerokz)
                          bot.users.get(usage).send(item.sent).catch(e => {
                            message.channel.send("**ERROR**\n```\n" + e + "\n```")
                          })

                          bot.channels.get(row.healchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.sheriffchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.murdergamechannelid).overwritePermissions(usage, {
                            SEND_MESSAGES: false
                          })

                          bot.channels.get(row.murderchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.radiochannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.jailchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.jailorchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.shopchannelid).overwritePermissions(usage, {
                            SEND_MESSAGES: false
                          })
                          sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 0`)
                          sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId = '${message.guild.id}' AND userId = '${usage}'`);
                          sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                          targetassassin(kerok, 32)
                        }
                        if (row12.roleId === 1) {
                          kerokz = kerokz.replace("%role%", translate[row.lang].roles.murderer)

                          kerokz = kerokz.replace("%user%", usage)
                          message.channel.send(kerokz)
                          bot.users.get(usage).send(item.sent).catch(e => {
                            message.channel.send("**ERROR**\n```\n" + e + "\n```")
                          })

                          bot.channels.get(row.healchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.sheriffchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.murdergamechannelid).overwritePermissions(usage, {
                            SEND_MESSAGES: false
                          })

                          bot.channels.get(row.murderchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.radiochannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.jailchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.jailorchannelid).overwritePermissions(usage, {
                            READ_MESSAGES: false
                          })
                          bot.channels.get(row.shopchannelid).overwritePermissions(usage, {
                            SEND_MESSAGES: false
                          })
                          sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 0`)
                          sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId = '${message.guild.id}' AND userId = '${usage}'`);
                          sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                          setTimeout(victory, 1000)
                        }
                      }
                    })
                    return;
                  }

                  if (item.id === 2) {
                    if (row3.amount >= 2) {
                      sql.run(`UPDATE murderMysteryItems SET amount = amount - 1 WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id}`)
                    }
                    if (row3.amount === 1) {
                      sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 0`)
                    }
                    let thingsssa = args.splice(2).join(" ")
                    if (thingsssa.length < 1) return message.reply(translate[row.lang].plstypemsg)
                    let usage = message.mentions.users.keyArray()[0]
                    if (!usage) return message.reply(translate[row.lang].userdoesntexist)
                    //if (prevent) return message.reply("**Error**")
                    let kertort = item.privatemsg
                    kertort = kertort.replace("%msg%", thingsssa)
                    let ketort = item.sent
                    ketort = ketort.replace("%us%", usage)
                    message.channel.send(ketort)
                    bot.users.get(usage).send(kertort).catch(e => {
                      message.channel.send("**ERROR**\n```\n" + e + "\n```")
                    })
                    return;
                  }
                }
              })
            })
          }
        })
      }
    })


  }
  if (command === "testing") {

  }
  if (command === "darkitem") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.reply(translate[row.lang].isntingame)
          } else {
            let cate = args[0]
            if (!cate) return message.reply(translate[row.lang].plspickitem)
            if (row.modeId === 2) return message.reply(translate[row.lang].shopthing)
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.murderchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              //if (row.isNight === 1) return message.reply(translate[row.lang].shopclosed)
              let itemid = parseInt(cate)
              if (isNaN(itemid)) return message.reply(translate[row.lang].unknownitem)

              let item = translate[row.lang].darkshopitems.find(function (e) {
                return e.id === itemid
              })
              if (item === undefined) return message.reply(translate[row.lang].unknownitem)
              sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 1`).then(row3 => {
                if (!row3) {
                  message.channel.send(translate[row.lang].hasnotbought)
                } else {

                  if (item.usable === 0) return message.reply(translate[row.lang].shopthings)
                  if (item.id === 1) {
                    bot.channels.get(row.murdergamechannelid).send(item.sent)
                    message.channel.send(item.sent2)
                    sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 1`)
                    setTimeout(function () {
                      nonvict()
                    }, 10000)
                    return;
                  }
                  if (item.id === 2) {
                    let usage = message.mentions.users.keyArray()[0]
                    let prevent = message.mentions.users.keyArray().splice(1).join(" ")
                    if (!usage) return message.reply(translate[row.lang].userdoesntexist)
                    if (prevent) return message.reply("**Error**")
                    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${usage}' AND guildId ='${message.guild.id}'`).then(row12 => {
                      if (!row12) {
                        message.reply(translate[row.lang].userisnotingame)
                      } else {
                        if (row12.isDead === 1) return message.reply(translate[row.lang].thatpersonisalreadydead)
                        sql.run(`UPDATE murderMysteryItems SET extraData = '${usage}' WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 1`)
                        message.channel.send(item.sent)
                      }
                    })
                    return;
                  }
                  if (item.id === 3) {
                    if (row.modeId !== 9 && row.modeId !== 10) {
                      if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
                    }
                    if (row.modeId === 9) {
                      if (row.isNight === 1) return message.reply(translate[row.lang].lola)
                    }
                    let replacee = translate[row.lang].jobchannelmsgs.radioperson.broadcast2
                    replacee = replacee.replace("%username%", message.author.tag)
                    if (!args[1]) return message.reply("**Please enter in a broadcast!**")
                    let broadcast = args.splice(1).join(" ")
                    //message.reply("You have sent a global message to the news! Everyone has saw what you said!\n\nOn TV - SHOCKING/REGULAR NEWS\nHello there, I'm your host " + message.author.username + ", and today we are talking about something that happened!\n" + "```\n" + args.join(" ") + "\n```")
                    message.reply(replacee + "```\n" + broadcast + "\n```")
                    bot.channels.get(row.murdergamechannelid).send({
                      //embed: new RichEmbed().addField("A Radio Person has broadcasted!", args.join(" ")).setColor(0x00FF00)
                      embed: new RichEmbed().addField(translate[row.lang].jobchannelmsgs.radioperson.broadcast, broadcast).setColor(0x00FF00)
                    }).then(m => {
                      m.pin()
                    })
                    return;
                  }
                }
              })
            })
          }
        })
      }
    })
  }

  if (command === "assign") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //return message.reply("Sorry but this command is in development.")


            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)


            if (message.channel.id !== row.murderchannelid) return;


            ///if (mmplayersData.isDead === 1) return
            deadcheck(function (ded) {
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              if (row.modeId === 3 || row.modeId === 8) return
              if (ded) /*123717*/ return;
              //var egegerg = checkassigned()
              //if (egegerg) /*123717*/ return message.reply("You have already assigned someone!")
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
                if (!row2) {
                  console.log("Murder Mystery - Player not found. [mm!assign]")
                } else {
                  if (row.modeId !== 10) {
                    if (row2.actioned === 1) return message.reply(translate[row1.lang].assignationis);
                  }
                  if (row2.isjailed === 1) return;
                  let userMention = message.mentions.users.first();
                  let userPID = args[0]
                  let query = "userId = ?"
                  let query2 = ""
                  if (!userMention) {
                    if (isNaN(parseInt(userPID))) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                    if (!userPID) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                  }
                  if (userPID) {
                    query = `userId = ?`
                    query2 = userPID
                  }
                  if (userMention) {
                    query = `userId = ?`
                    query2 = userMention.id
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                    if (!user) {
                      message.reply(translate[row.lang].userdoesntexist)
                    } else {

                      //if (user.id === message.author.id) return message.reply("You can't assign yourself.")
                      if (user.id === message.author.id) return message.reply(translate[row1.lang].assignation)

                      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.userId}' AND guildId = '${message.guild.id}'`).then(oewew => {
                        if (!oewew) {
                          message.channel.send(translate[row.lang].userisnotingame)
                        } else {
                          if (oewew.roleId === 5) return message.reply(translate[row1.lang].assignationisathing)
                          //if (oewew) /*123717*/ return message.reply(translate[row1.lang].assignationisathing)
                          //if (user.id === arr[4]) return message.reply("You cannot assign your partner!")
                          //let mmplayersDataa = mmplayers[user.id]
                          let aaaaaaaa = message.guild.roles.get(row.murdermysteryRoleID)
                          assigns(user.userId)

                          /*
                                    fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                                      if (err) console.error(err)
                                    });
                          */
                        }
                      })
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[1] && parseInt(lobby.gameType) !== 3) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "kill", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }
  if (command === "execute") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            //if(message.channel.id !== row.murderchannelid) return message.reply("a");
            //if (mmplayersData.isDead === 1) return
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              //if (row.isDay === 1) return message.reply("You cannot do this during the day time.")
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              //if (mmplayersData.actioned === 1) return message.reply("You have already executed someone!")
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                if (!row1) {
                  console.log("Murder Mystery - Player not found. [mm!execute]")
                } else {
                  //if (row.actioned === 1) return message.reply("You have already searched/shot someone!");
                  if (row1.actioned === 2) return message.reply(translate[row.lang].alreadyjailed);
                  let userMention = message.mentions.users.first();
                  let userPID = args[0]
                  let query = "userId = ?"
                  let query2 = ""
                  if (!userMention) {
                    if (isNaN(parseInt(userPID))) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                    if (!userPID) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                  }
                  if (userPID) {
                    query = `userId = ?`
                    query2 = userPID
                  }
                  if (userMention) {
                    query = `userId = ?`
                    query2 = userMention.id
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                    if (!user) {
                      message.reply(translate[row.lang].userdoesntexist)
                    } else {

                      //if (user.id === message.author.id) return message.reply("You can't execute yourself")
                      if (user.userId === message.author.id) return message.reply(translate[row.lang].jobchannelmsgs.jailor.cantexeute)
                      if (debugmode === 1) {
                        console.log("[DEBUG] LINE")
                      }
                      //let mmplayersDataa = mmplayers[user.id]
                      executez(user.userId, row.murdergamechannelid, message.author.id)
                      /*
                      if (targetassassin[0] === user.id) {
                        bot.users.get(arr[4]).send("The **Jailor** has killed your target! You have gained $3!\nYou have no new Targets.")

                      }
                      */
                      /*
                      if (mmplayersDataa.isMurderer === 1) {
                        message.reply("You have executed " + user + " and he/she was the **Murderer**!")
                        bot.channels.get(row.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were the **Murderer**")

                        setTimeout(victory, 1500)

                        return
                      }
                      */
                      /*
        if (mmplayersDataa.isHealer === 1) {

          if (targetassassin[0] === user.id) {
            bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")

            return
          }
          message.reply("You have executed " + user + " and he/she was a **Healer**!")
          bot.channels.get(row.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Healer**")



          bot.channels.get(row.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })

          bot.channels.get(row.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })

          return;
        }
        if (mmplayersData.isRadioPerson === 1) {
          if (targetassassin[0] === user.id) {
            bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")

            return
          }

          message.reply("You have executed " + user + " and he/she was a **Radio Person**!")
          bot.channels.get(row.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Radio Person**")

          bot.channels.get(row.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(row.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })

          return;

        }
        if (mmplayersData.isAssassin === 1) {
          message.reply("You have executed " + user + " and he/she was an **Assassin**!")
          bot.channels.get(row.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were an **Assassin**")

          bot.channels.get(row.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })

          bot.channels.get(row.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })

          return;
        }

        bot.channels.get(row.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were **Innocent**")




        mmplayersDataa.isDead = 1

        mmplayersData.actioned = 1

        message.guild.member(user).removeRole(aaaaaaaa.id)

        bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
          SEND_MESSAGES: false
        })

        bot.channels.get(row.healchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })

        bot.channels.get(row.radiochannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        bot.channels.get(row.jailchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
*/
                      //bot.channels.get(row.murderchannelid).overwritePermissions(user, {
                      //READ_MESSAGES: false
                      //})

                      /*
                              fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                                if (err) console.error(err)
                              });
                      */
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[9] || message.channel.id === extraData[10]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "execute", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }

  function executez(users, murdergame, userid) {
    if (debugmode === 1) {
      console.log("[DEBUG] EXECUTE FUNCTION")
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row5 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[row5.lang].userisnotingame)
        } else {
          let user = bot.users.get(users)
          //if (row.isDead === 1) return message.reply("That person is already dead!")
          if (row.isDead === 1) return message.reply(translate[row5.lang].thatpersonisalreadydead)
          //if (row.isjailed === 0) return message.reply("That person isn't in jail!");
          if (row.isjailed === 0) return message.reply(translate[row5.lang].jobchannelmsgs.jailor.isntinjail)
          console.log("YES")
          sql.run(`UPDATE murderMysteryPlayers SET actioned = 2 WHERE userId = '${userid}' AND guildId = '${message.guild.id}'`)
          user.send(translate[row5.lang].jobchannelmsgs.jailor.havesss).catch(e => {
            message.channel.send("**ERROR**\n```\n" + e + "\n```")
          })
          sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${users}'`)
          if (row.roleId === 1) {
            //message.reply("You have executed " + user + " and he/she was the **Murderer**!")
            message.reply(translate[row5.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[row5.lang].jobchannelmsgs.jailor.wasmurderer)

            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were the **Murderer**")
            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[row5.lang].jobchannelmsgs.jailor.fekfe + translate[row5.lang].jobchannelmsgs.jailor.wasmurderer)

            setTimeout(victory, 1500)

            return
          }
          if (row.roleId === 2) {
            /*
                      if (targetassassin[0] === user.id) {
                        bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
              
                        return
                      }
                      */
            targetassassin(user.id, 2)
            //message.reply("You have executed " + user + " and he/she was a **Detective**!")
            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Detective**")
            message.reply(translate[row5.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[row5.lang].jobchannelmsgs.jailor.wasdetective)

            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[row5.lang].jobchannelmsgs.jailor.fekfe + translate[row5.lang].jobchannelmsgs.jailor.wasdetective)
            actioned(userid)

            return;
          }
          if (row.roleId === 3) {
            /*
                      if (targetassassin[0] === user.id) {
                        bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
              
                        return
                      }
                      */

            //message.reply("You have executed " + user + " and he/she was a **Healer**!")
            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Healer**")
            message.reply(translate[row5.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[row5.lang].jobchannelmsgs.jailor.washealer)

            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[row5.lang].jobchannelmsgs.jailor.fekfe + translate[row5.lang].jobchannelmsgs.jailor.washealer)


            targetassassin(user.id, 2)
            actioned(userid)
            return;
          }
          if (row.roleId === 4) {
            /*
                      if (targetassassin[0] === user.id) {
                        bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
              
                        return
                      }
            */
            //message.reply("You have executed " + user + " and he/she was a **Radio Person**!")
            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Radio Person**")
            message.reply(translate[row5.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[row5.lang].jobchannelmsgs.jailor.wasradio)

            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[row5.lang].jobchannelmsgs.jailor.fekfe + translate[row5.lang].jobchannelmsgs.jailor.wasradio)

            actioned(userid)
            targetassassin(user.id, 2)
            return;

          }
          if (row.roleId === 5) {
            //message.reply("You have executed " + user + " and he/she was an **Assassin**!")
            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were an **Assassin**")
            message.reply(translate[row5.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[row5.lang].jobchannelmsgs.jailor.wasassassin)
            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[row5.lang].jobchannelmsgs.jailor.fekfe + translate[row5.lang].jobchannelmsgs.jailor.wasassassin)
            actioned(userid)
            return;
          }
          //message.reply("You have executed " + user + " and he/she was **Innocent**!")
          //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were **Innocent**")
          message.reply(translate[row5.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[row5.lang].jobchannelmsgs.jailor.wasinnocent)
          bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[row5.lang].jobchannelmsgs.jailor.fekfe + translate[row5.lang].jobchannelmsgs.jailor.wasinnocent)
          //mmplayersDataa.isDead = 1
          actioned(userid)
        }
      })
    })
  }

  function actioned(useridz) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${useridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found. [actioned()]")
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] ACTIONED [" + useridz + "]")
        }
        sql.run(`UPDATE murderMysteryPlayers SET actioned = 1 WHERE userId ='${useridz}' AND guildId ='${message.guild.id}'`)
        //setTimeout(actioned, 30000)
      }
    })
  }

  function deletgamesess() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.error("[Murder Mystery Error] no data found")
        message.channel.send("`ERROR` 404 Data not found!")
        return
      } else {
        gameid--;
        if (config.sharding === 1) {
          bot.gameid = gameid
        }
      }
    })
  }

  function nochannelfound() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.error("[Murder Mystery Error] no data found")
        message.channel.send("`ERROR` 404 Data not found!")
        return
      } else {
        /*
                fs.writeFile('./mmplayers.json', '{}', 'utf8')
                fs.writeFile('./mmgame.json', '{}', 'utf8')
                fs.writeFile('./preventjoin.json', '{}', 'utf8')
        */
        let roledata = message.guild.roles.get(row.hostRoleID)
        if (!roledata) return message.reply(translate[row.lang].errors.hostrolenotfound)
        if (row.gamestart === 0) return message.reply(translate[row.lang].nogamegoingon)
        deletgamesess()
        let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
        murdermysteryrole.delete()
        let checkjfwfj = bot.channels.get(row.murdergamechannelid)
        let checkjoegf = bot.channels.get(row.murderchannelid)
        if (row.modeId !== 2) {
          let ajwgiwajgr = bot.channels.get(row.shopchannelid)
          let jgoergqwww = bot.channels.get(row.sheriffchannelid)
          if (ajwgiwajgr) {
            bot.channels.get(row.shopchannelid).delete()
          }
          if (jgoergqwww) {
            bot.channels.get(row.sheriffchannelid).delete()
          }
          if (row.modeId === 12) {
            let jgoergqwwwdda = bot.channels.get(row.zombiechannelid)
            if (jgoergqwwwdda) {
              jgoergqwwwdda.delete()
            }
          }
          if (row.modeId !== 3 && row.modeId !== 7) {
            let jgoergqwwwa = bot.channels.get(row.radiochannelid)
            if (jgoergqwwwa) {
              bot.channels.get(row.radiochannelid).delete()
            }
            if (row.modeId !== 8) {
              let jgoergqwwwb = bot.channels.get(row.jailorchannelid)
              let jgoergqwwwc = bot.channels.get(row.jailchannelid)
              if (jgoergqwwwb) {
                bot.channels.get(row.jailorchannelid).delete()
              }
              if (jgoergqwwwc) {
                bot.channels.get(row.jailchannelid).delete()
              }
            }
          }
        }
        if (checkjfwfj) {
          bot.channels.get(row.murdergamechannelid).delete()
        }
        if (checkjoegf) {
          bot.channels.get(row.murderchannelid).delete()
        }
        setTimeout(aaaaaaa, 1500)
        setTimeout(deleteallplayerz, 1000, 1)
        bot.channels.get(row.defaultChannel).send("Sorry to interrupt! But the game has been stopped because I couldn't find a certain channel!\nThink this is a mistake? Contact the Bot Developer to fix this issue!")
      }
    })
  }

  function hasvotedcheck() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row1 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          console.log("Murder Mystery - Player not found. [hasvotedcheck()]")
        } else {
          //if (row.hasvoted === 1) return message.reply("You have already voted!");
          if (row.hasvoted === 1) return message.reply(translate[row1.lang].alreadyvote);
        }
      })
    })
  }

  function deadcheck(fn) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found. [deadcheck()]")
      } else {
        if (row.isDead === 1) {
          return fn(true);
        } else {
          return fn(false)
        };
      }
    })
  }

  function executeactioned() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row1 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          console.log("Murder Mystery - Player not found. [executeactioned()]")
        } else {
          //if (row.actioned === 1) return message.reply("You have already executed someone!");
          if (row.actioned === 1) return message.reply(translate[row1.lang].alreadyexecute);
        }
      })
    })
  }



  function isactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found. [isactioned()]")
      } else {
        if (row.actioned === 1) {
          return true
        } else {
          return false
        }
      }
    })
  }

  function checkassigned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
      } else {
        if (row.beenassigned === 1) {
          return true
        } else {
          return false
        }
      }
    })
  }

  function checkassignedid(userid, fn) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
      } else {
        if (row.beenassigned === 1) {
          return fn(true)
        } else {
          return fn(false)
        }
      }
    })
  }

  function stabbedbymurder(user, checkc, ldwdewdw, lastwill, roleid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] GET USER (stabbedbymurder)")
        }
        if (checkc === 1) {
          if (debugmode === 1) {
            console.log("[DEBUG] BROADCAST STAB [BOT]")
          }
          //bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + " has been stabbed by the **Murderer**! :dagger:")
          if (roleid === 1) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasmurderer)
          }
          if (roleid === 2) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasdetective)
          }
          if (roleid === 3) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.washealer)
          }
          if (roleid === 4) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasradio)
          }
          if (roleid === 5) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasassassin)
          }
          if (roleid === 6) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + " and they were a **Jailor**")
          }
          if (roleid === 0) {
            bot.channels.get(row.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasinnocent)
          }
          if (lastwill !== "") {
            bot.channels.get(row.murdergamechannelid).send(ldwdewdw + " **Had a last will!**\nIt reads\n```\n" + lastwill + "\n```")
          }
          return;
        }

        let users = bot.users.get(user)
        if (debugmode === 1) {
          console.log("[DEBUG] BROADCAST STAB")
        }
        //bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + " has been stabbed by the **Murderer**! :dagger:")

        if (roleid === 1) {
          bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasmurderer)
        }
        if (roleid === 2) {
          bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasdetective)
        }
        if (roleid === 3) {
          bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.washealer)
        }
        if (roleid === 4) {
          bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasradio)
        }
        if (roleid === 5) {
          bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + translate[row.lang].stabbed + "\n" + translate[row.lang].jobchannelmsgs.jailor.wasassassin)
        }
        if (roleid === 6) {
          bot.channels.get(row.murdergamechannelid).send(":dagger: " + users.tag + translate[row.lang].stabbed + "\n" + " and they were a **Jailor**")
        }
        if (lastwill !== "") {
          bot.channels.get(row.murdergamechannelid).send(users.tag + " **Had a last will!**\nIt reads\n```\n" + lastwill + "\n```")
        }
      }
    })
  }

  function kill(user, userid, thing, playeridcheck) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row5 => {
      let users = bot.users.get(user)
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users.id}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[row5.lang].userisnotingame)
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] Kill " + user + " IN (" + message.guild.id + ")")
          }
          if (row.isDead === 1) return message.reply(translate[row5.lang].thatpersonisalreadydead)
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

            if (row1.actioned === 1) {
              return;
            }

          })
          if (row.isjailed === 1) {
            if (debugmode === 1) {
              console.log("[DEBUG] CANNOT ATTACK (in jail)")
            }
            //users.send(":angry::dagger: :arrow_up_down: :fearful::cop: A murderer tried to attack you! But you were in jail!")
            users.send(":angry::dagger: :arrow_up_down: :fearful::cop: " + translate[row5.lang].stabbed3)

            //message.reply("You attack but the person is in cages, they might be in jail...")
            message.reply(translate[row5.lang].dledee)
            actioned(userid)
            return;
          }
          if (row.roleId === 1 && row5.modeId !== 2) return message.reply(translate[row5.lang].reeeess)
          if (row.roleId === 5) return message.reply(translate[row5.lang].welluhh)
          /*
          sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${thing}' AND guildId ='${message.guild.id}' AND itemId = 0 AND isDark = 0`).then(row3 => {
            if (!row3) {
              users.send(translate[row5.lang].stabbed2)
              if (debugmode === 1) {
                console.log("[DEBUG] DM USER")
              }

              //if (targetassassin[0] === user.id) {
              //bot.users.get(arr[4]).send("The **Murderer** has killed your target! You have gained $3!\nYou have no new Targets.")
              //}
              sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${thing}'`)

              nopermstoanychannel(row.playerid)
              stabbedbymurder(user)
              actioned(userid)
              message.reply(translate[row5.lang].jobchannelmsgs.murderer.stabstab + users.tag + translate[row5.lang].jobchannelmsgs.murderer.stabbady)

              targetassassin(users.id, 1)
            } else {
              let things = translate[row.lang].shopitems.find(function (a) {
                return a.id === 0
              })
              if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
              message.reply(things.sent)
              message.author.send(things.sent)
              users.send(things.sent2)
              sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
              setTimeout(victory, 1000)
            }
          })
*/
          checkifhasitem(thing, 0, 0, function (hasItem) {
            if (!hasItem) /* 321827 */ {
              users.send(translate[row5.lang].stabbed2)
              checkifhasitem(userid, 5, 1, function (hasItezm) {
                if (hasItezm) /*123717*/ {
                  sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = ${userid}`)
                }
                checkifhasitem(userid, 7, 1, function (hasOtherItem) {
                  if (hasOtherItem) /*123717*/ {
                    sql.run(`UPDATE murderMysteryPlayers SET gold = gold + ${(row.gold - 1)} WHERE userId = ${userid}`)
                  }
                  if (debugmode === 1) {
                    console.log("[DEBUG] DM USER")
                  }

                  //if (targetassassin[0] === user.id) {
                  //bot.users.get(arr[4]).send("The **Murderer** has killed your target! You have gained $3!\nYou have no new Targets.")
                  //}
                  sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${thing}'`)

                  nopermstoanychannel(row.playerid)
                  stabbedbymurder(user, 0, 0, row.lastwill, row.roleId)
                  actioned(userid)
                  message.reply(translate[row5.lang].jobchannelmsgs.murderer.stabstab + users.tag + translate[row5.lang].jobchannelmsgs.murderer.stabbady)

                  targetassassin(users.id, 1)
                })
              })
            } else {
              if (debugmode === 1) {
                console.log("[DEBUG] MURDER DIED FROM ITEM")
              }
              let things = translate[row5.lang].shopitems.find(function (a) {
                return a.id === 0
              })
              if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
              message.reply(things.sent)
              message.author.send(things.sent).catch(e => {
                message.reply(translate[row5.lang].dmsdisabled)
              })
              users.send(things.sent2)
              sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
              setTimeout(victory, 1000)
            }
          })
        }
      })
    })
  }

  function checkifhasitem(userid, itemid, isdark, fn) {
    sql.get(`SELECT * FROM murderMysteryItems WHERE userId = ? AND guildId ='${message.guild.id}' AND itemId = ? AND isDark = ?`, [userid, itemid, isdark]).then(row3 => {
      if (!row3) {
        return fn(false)
      } else {
        return fn(true)
      }
    })
  }

  function nopermstoanychannel(playerid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid =${playerid} AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row) return new Error("Player ID does not exist!")
          let user = bot.users.get(row1.userId)
          //return;
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(row.shopchannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          if (row1.roleId === 1) {
            bot.channels.get(row.murderchannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
          }
          if (row1.roleId === 2) {
            bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
          }
          if (row1.roleId === 3) {
            bot.channels.get(row.healchannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
          }
          if (row1.roleId === 4) {
            bot.channels.get(row.radiochannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
          }
          if (row1.roleId === 6) {
            bot.channels.get(row.jailorchannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
            bot.channels.get(row.jailchannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
          }
          if (row1.roleId === 7) {
            bot.channels.get(row.zombiechannelid).overwritePermissions(user, {
              SEND_MESSAGES: false
            })
          }
        })
      }

    })
  }
  if (command === "jail") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.jailorchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                if (!row1) {
                  console.log("Murder Mystery - Player not found.")
                } else {
                  //if (row.actioned === 1) return message.reply("You have already searched/shot someone!");
                  if (row1.actioned === 1 || row1.actioned === 2) return message.reply(translate[row.lang].alreadyjailed);

                  let userMention = message.mentions.users.first();
                  let userPID = args[0]
                  let query = "userId = ?"
                  let query2 = ""
                  if (!userMention) {
                    if (isNaN(parseInt(userPID))) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                    if (!userPID) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                  }
                  if (userPID) {
                    query = `userId = ?`
                    query2 = userPID
                  }
                  if (userMention) {
                    query = `userId = ?`
                    query2 = userMention.id
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                    if (!user) {
                      message.reply(translate[row.lang].userdoesntexist)
                    } else {
                      console.log("JAILING")
                      //if (user.id === message.author.id) return message.reply("You can't jail yourself.")
                      if (user.userId === message.author.id) return message.reply(translate[row.lang].jailingurself)

                      jail(user.userId, message.author.id, row.jailchannelid, "")
                      //let aaaaaaaa = message.guild.roles.get(row.murdermysteryRoleID)

                      //mmplayersDataa.isjailed = 1
                      //mmplayersData.hasjailed = 1
                      actioned(message.author.id)
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[9]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "jail", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }
  if (command === "balance") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
          if (!row2) {
            console.log("Murder Mystery - Player not found.")
          } else {
            if (row2.isDead === 1) return;
            message.channel.send("**You have**\n`" + row2.gold + "` Gold\n`" + row2.darkgold + "` Dark Gold")
          }
        })
      }
    })
  }
  if (command === "bite") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
        deadcheck(function (ded) {
          if (row.modeId !== 9 && row.modeId !== 10) {
            if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
          }
          if (row.modeId === 9) {
            if (row.isNight === 1) return message.reply(translate[row.lang].lola)
          }
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
            if (!row2) {
              console.log("Murder Mystery - Player not found.")
            } else {
              if (row2.isjailed === 1) return;
              if (row.modeId !== 10) {
                if (row2.actioned === 1) return message.reply(translate[row.lang].jobchannelmsgs.zombie.alreadybitten);
              }
              if (row2.isjailed === 1) return;
              if (ded) /*123717*/ return;
              let userMention = message.mentions.users.first();
              let userPID = args[0]
              let query = "userId = ?"
              let query2 = ""
              if (!userMention) {
                if (isNaN(parseInt(userPID))) {
                  return message.reply(translate[row.lang].userdoesntexist)
                }
                if (!userPID) {
                  return message.reply(translate[row.lang].userdoesntexist)
                }
              }
              if (userPID) {
                query = `userId = ?`
                query2 = userPID
              }
              if (userMention) {
                query = `userId = ?`
                query2 = userMention.id
              }
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                if (!user) {
                  message.reply(translate[row.lang].userdoesntexist)
                } else {
                  if (user.userId === message.author.id) return message.reply("You can't infect yourself, you're already a zombie!")
                  let aaaaaaaa = message.guild.roles.get(row.murdermysteryRoleID)
                  if (debugmode === 1) {
                    console.log("[DEBUG] Infect [" + query2 + "] IN (" + message.guild.id + ")")
                  }
                  let users = bot.users.get(user.userId)
                  if (user.isDead === 1) return message.reply(translate[row.lang].thatpersonisalreadydead)
                  if (user.isjailed === 1) {
                    if (debugmode === 1) {
                      console.log("[DEBUG] CANNOT BITE (in jail)")
                    }
                    users.send(":angry: :arrow_up_down: :fearful::cop: " + translate[row.lang].stabbed4)
                    message.reply(translate[row.lang].dledee)
                    actioned(message.author.id)
                    return;
                  }
                  if (user.roleId === 7) return message.reply(translate[row.lang].welluhh)
                  let gameData = row.gameData
                  let gameDataArray = gameData.split("|")
                  if (gameData.length > 0) {
                    gameDataArray.forEach(function (b) {
                      let z = b.split(',')
                      if (z[0] === users.id) return;
                    })
                  }
                  checkifhasitem(users.id, 0, 0, function (hasItem) {
                    if (!hasItem) /* 321827 */ {
                      users.send(translate[row.lang].jobchannelmsgs.zombie.infecteddm)
                      if (debugmode === 1) {
                        console.log("[DEBUG] DM USER")
                      }

                      if (gameData.length === 0) {
                        gameData += `${users.id},0`
                      }
                      if (gameData.length > 0) {
                        gameData += `|${users.id},0`
                      }

                      let coneaial = translate[row.lang].jobchannelmsgs.zombie.bitten
                      coneaial = coneaial.replace("%user%", users.tag)
                      coneaial = coneaial.replace("%user%", users.tag)
                      sql.run(`UPDATE murderMystery SET gameData = ? WHERE guildId = "${message.guild.id}"`, [gameData])
                      message.channel.send(coneaial)
                      actioned(message.author.id)
                    } else {
                      if (debugmode === 1) {
                        console.log("[DEBUG] ZOMBIE DIED FROM ITEM")
                      }
                      let things = translate[row.lang].shopitems.find(function (a) {
                        return a.id === 0
                      })
                      if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
                      message.reply(things.sent)
                      message.author.send(things.sent).catch(e => {
                        message.reply(translate[row.lang].dmsdisabled)
                      })
                      users.send(things.sent2)
                      sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`);
                      nopermstoanychannel(user.playerid)
                    }
                  })

                }
              })
            }
          })
        })
      }
    })
  }
  if (command === "kill") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.murderchannelid) return;
            deadcheck(function (ded) {
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              //murderactioned()
              //var somettt = isactioned()
              //if (somettt) /*123717*/ return;
              /*
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
      
                if (row1.actioned === 1) {
                  return message.reply("You have already murderered someone!");
                }
      
              })
      */
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
                if (!row2) {
                  console.log("Murder Mystery - Player not found.")
                } else {
                  if (row2.isjailed === 1) return;
                  //if (row.actioned === 1) return message.reply("You have already murdered someone!");
                  if (row.modeId !== 10) {
                    if (row2.actioned === 1) return message.reply(translate[row.lang].alreadymurder);
                  }
                  if (row2.isjailed === 1) return;
                  if (ded) /*123717*/ return;
                  let userMention = message.mentions.users.first();
                  let userPID = args[0]
                  let query = "userId = ?"
                  let query2 = ""
                  if (!userMention) {
                    if (isNaN(parseInt(userPID))) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                    if (!userPID) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                  }
                  if (userPID) {
                    query = `userId = ?`
                    query2 = userPID
                  }
                  if (userMention) {
                    query = `userId = ?`
                    query2 = userMention.id
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                    if (!user) {
                      message.reply(translate[row.lang].userdoesntexist)
                    } else {
                      if (user.userId === message.author.id) return message.reply("You can't stab yourself")

                      //if (user.id === arr[4]) return message.reply("You cant kill your own partner.")

                      //let mmplayersDataa = mmplayers[user.id]

                      let aaaaaaaa = message.guild.roles.get(row.murdermysteryRoleID)

                      kill(user.userId, message.author.id, user.userId, 0)
                      //message.guild.member(user).removeRole(aaaaaaaa.id)
                      //if (row.isOneVOne === 1) {
                      if (row.modeId === 3 || row.modeId === 7) {
                        let checkjfwfj = bot.channels.get(row.murdergamechannelid)
                        let checkjoegf = bot.channels.get(row.murderchannelid)
                        let jgoergqwww = bot.channels.get(row.sheriffchannelid)
                        let joiegjear = bot.channels.get(row.shopchannelid)
                        if (!checkjfwfj) return nochannelfound()
                        if (!checkjoegf) return nochannelfound()
                        if (!jgoergqwww) return nochannelfound()
                        if (!joiegjear) return nochannelfound()

                        bot.channels.get(row.murdergamechannelid).overwritePermissions(user.userId, {
                          SEND_MESSAGES: false
                        })
                        bot.channels.get(row.sheriffchannelid).overwritePermissions(user.userId, {
                          SEND_MESSAGES: false
                        })
                        bot.channels.get(row.shopchannelid).overwritePermissions(user.userId, {
                          SEND_MESSAGES: false
                        })
                        sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                        nonvict()
                        return;
                      }
                      let checkjfwfj = bot.channels.get(row.murdergamechannelid)
                      let checkjoegf = bot.channels.get(row.murderchannelid)
                      if (row.modeId !== 2) {
                        let ajwgiwajgr = bot.channels.get(row.shopchannelid)
                        let jgoergqwww = bot.channels.get(row.sheriffchannelid)
                        if (!ajwgiwajgr) return nochannelfound()
                        if (!jgoergqwww) return nochannelfound()
                        if (row.modeId !== 3 && row.modeId !== 7 && row.modeId !== 12) {
                          let jgoergqwwwa = bot.channels.get(row.radiochannelid)
                          if (!jgoergqwwwa) return nochannelfound()
                        }
                        if (row.modeId == 12) {
                          let jgoergqwwwfefa = bot.channels.get(row.zombiechannelid)
                          if (!jgoergqwwwfefa) return nochannelfound()
                        }
                        if (row.modeId !== 3 && row.modeId !== 7 && row.modeId !== 8) {
                          let jgoergqwwwb = bot.channels.get(row.jailorchannelid)
                          let jgoergqwwwc = bot.channels.get(row.jailchannelid)
                          if (!jgoergqwwwb) return nochannelfound()
                          if (!jgoergqwwwc) return nochannelfound()
                        }
                      }
                      if (!checkjfwfj) return nochannelfound()
                      if (!checkjoegf) return nochannelfound()
                      sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                      //bot.channels.get(row.murderchannelid).overwritePermissions(user, {
                      //READ_MESSAGES: false
                      //})

                      /**
                              fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                            if (err) console.error(err)
                            });
                      **/
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[0]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "kill", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }

  function search(user, userid, playerid) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        //message.reply(translate[row.lang].userisnotingame)
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND guildId = '${message.guild.id}'`).then(lul => {
          if (!lul) {
            return message.channel.send("**ERROR** Murderer not found!")
          } else {
            let users = bot.users.get(user)
            if (row.isDead === 1) return message.reply("That person is already dead!")
            sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${lul.userId}' AND guildId ='${message.guild.id}' AND itemId = 2 AND isDark = 1 AND extraData = "%${row.userId}%"`).then(row10 => {
              if (row10) {
                message.reply("<@" + row.userId + "> is the **Murderer**!")
                actioned(userid)
                return;
              } else {
                if (row.roleId === 1) {
                  message.reply("<@" + row.userId + "> is the **Murderer**!")
                  actioned(userid)
                  return
                }
                if (row.roleId === 5) {
                  message.reply("<@" + row.userId + "> works with the **Murderer** but doesn't know who the **Murderer** is, they must be an **Assassin**!")
                  actioned(userid)
                  return
                }
                if (row.roleId > 0) {
                  message.reply("<@" + row.userId + "> is not the **Murderer** but they have a **Role**!")
                  actioned(userid)
                  return
                }
                message.reply("<@" + row.userId + "> is not the **Murderer**.")
                actioned(userid)
              }
            })
          }
        })
      }
    })
  }
  if (command === "search") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.sheriffchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              //if (row.isDay === 1) return message.reply("You cannot do this in the day time.")
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              //sheriffactioned()
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                if (!row1) {
                  console.log("Murder Mystery - Player not found.")
                } else {
                  if (row1.isjailed === 1) return;
                  //if (row.actioned === 1) return message.reply("You have already searched/shot someone!");
                  if (row.modeId !== 10) {
                    if (row1.actioned === 1) return message.reply(translate[row.lang].alreadysearch);
                  }
                  let userMention = message.mentions.users.first();
                  let userPID = args[0]
                  let query = "userId = ?"
                  let query2 = ""
                  if (!userMention) {
                    if (isNaN(parseInt(userPID))) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                    if (!userPID) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                  }
                  if (userPID) {
                    query = `userId = ?`
                    query2 = userPID
                  }
                  if (userMention) {
                    query = `userId = ?`
                    query2 = userMention.id
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                    if (!user) {
                      message.reply(translate[row.lang].userdoesntexist)
                    } else {
                      if (user.userId === message.author.id) return message.reply("You are a **Detective** wait what?")
                      search(user.userId, message.author.id, "")
                    }
                  })
                }
              })
              /**
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })

              **/
              /**
                      fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                    if (err) console.error(err)
                    });
              **/
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[1]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "search", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }


  //IDEA: idea


  function broadcastactioned() {

    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
      } else {
        //if (row.actioned === 1) return message.reply("You have already broadcasted!")
        //translate[row.lang].alreadybroadcast
      }
    })

  }

  if (command === "broadcast") {
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.radiochannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              //broadcastactioned()
              //var somettt = isactioned()
              //if (isactioned()) /*123717*/ return;
              //sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

              //if (row1.actioned === 1) {
              //return;
              //}

              //})
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                if (!row1) {
                  return message.reply(translate[row.lang].isntingame)
                } else {
                  if (row1.isjailed === 1) return;
                  //if (row.actioned === 1) return message.reply("You have already searched/shot someone!");
                  if (row.modeId !== 10) {
                    if (row1.actioned === 1) return message.reply(translate[row.lang].alreadybroadcast);
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND guildId ='${message.guild.id}'`).then(row21 => {
                    if (!row21) {
                      message.channel.send("**ERROR**")
                    } else {
                      checkifhasitem(row21.userId, 4, 1, function (hasItem) {
                        if (hasItem) /*123717*/ {
                          let finditem = translate[row.lang].darkshopitems.find(function (a) {
                            return a.id === 4
                          })
                          message.channel.send(finditem.sent)
                        } else {
                          let replacee = translate[row.lang].jobchannelmsgs.radioperson.broadcast2
                          replacee = replacee.replace("%username%", message.author.tag)
                          //message.reply("You have sent a global message to the news! Everyone has saw what you said!\n\nOn TV - SHOCKING/REGULAR NEWS\nHello there, I'm your host " + message.author.username + ", and today we are talking about something that happened!\n" + "```\n" + args.join(" ") + "\n```")
                          message.reply(replacee + "```\n" + args.join(" ") + "\n```")
                          bot.channels.get(row.murdergamechannelid).send({
                            //embed: new RichEmbed().addField("A Radio Person has broadcasted!", args.join(" ")).setColor(0x00FF00)
                            embed: new RichEmbed().addField(translate[row.lang].jobchannelmsgs.radioperson.broadcast, args.join(" ")).setColor(0x00FF00)
                          }).then(m => {
                            m.pin()
                          })
                          actioned(message.author.id)
                        }
                      })
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[4]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "broadcast", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }

  function wasmurdershoot(user) {

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {
        let rolereplc = translate[row.lang].deakofk
        rolereplc = rolereplc.replace("%role%", "Murderer")
        //bot.channels.get(row.murdergamechannelid).send(":gun: " + user + " was shot by the **Detective** and he/she was the **Murderer**! :gun:")
        bot.channels.get(row.murdergamechannelid).send(":gun: " + user + translate[row.lang].deakofk)

      }
    })
  }

  function washealershoot(user) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {
        //bot.channels.get(row.murdergamechannelid).send(":gun: " + user + " was shot by the **Detective** and he/she was a **Healer**! :gun:")
        let rolereplc = translate[row.lang].deakofks
        rolereplc = rolereplc.replace("%role%", "Healer")
        bot.channels.get(row.murdergamechannelid).send(":gun: " + user + translate[row.lang].deakofks)
      }
    })
  }

  function wasjailorshoot(user) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {
        //bot.channels.get(row.murdergamechannelid).send(":gun: " + user + " was shot by the **Detective** and he/she was a **Jailor**! :gun:")
        let rolereplc = translate[row.lang].deakofks
        rolereplc = rolereplc.replace("%role%", "Jailor")
        bot.channels.get(row.murdergamechannelid).send(":gun: " + user + translate[row.lang].deakofks)
      }
    })
  }

  function assigns(users, userid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row1 => {
      if (!row1) {
        console.error("[Murder Mystery Error] Murder Mystery Bot Database Data not found!")
      } else {
        //if (!mmplayersDataa) return message.reply("That user isn't in the game!")
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply(translate[row1.lang].userisnotingame)
          } else {
            let user = bot.users.get(users)
            if (row.isDead === 1) return message.reply(translate[row1.lang].thatpersonisdead)
            //mmplayersData.assigned = 1
            if (row.roleId === 5) return message.reply(translate[row1.lang].assignationisathing);
            sql.run(`UPDATE murderMysteryPlayers SET assigned = 1 WHERE userId ='${users}' AND guildId ='${message.guild.id}'`)

            //user.send(":fearful: You feel like you have been assigned... :cold_sweat:")
            user.send(translate[row1.lang].assigneddmd).catch(e => {
              message.channel.send(`${user}, ${translate[row1.lang].dmsdisabled}`)
            })
            //targetassassin = [user.id]
            //bot.users.get(arr[4]).send("Your target is " + user + ".")
            dmassassin(4, user.id)
          }
        })
      }
    })
  }

  function shoot(user, userid, murdergame, playerid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row1 => {
      let shootthing = translate[row1.lang].jobchannelmsgs.detective.shoot
      let shootthing2 = translate[row1.lang].jobchannelmsgs.detective.sent2
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[row1.lang].userisnotingame)
        } else {
          let users = bot.users.get(user)
          sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${users.id}' AND guildId ='${message.guild.id}' AND itemId = 0 AND isDark = 0`).then(row3 => {
            if (!row3) {
              shootthing = shootthing.replace("%user%", user)
              if (row.isDead === 1) return message.reply(translate[row1.lang].thatpersonisalreadydead)
              if (row.isjailed === 1) {
                if (debugmode === 1) {
                  console.log("[DEBUG] CANNOT SHOOT (in jail)")
                }
                users.send(":angry::gun: :arrow_up_down: :fearful::cop: " + translate[row5.lang].stabbed4)
                message.reply(translate[row5.lang].dledee)
                actioned(userid)
                return;
              }
              if (row.roleId === 1) {
                shootthing = shootthing.replace("%role%", translate[row1.lang].roles.murderer)
                //message.reply("You have shot " + users + " and he/she was the **Murderer**!")
                shootthing2 = shootthing2.replace("%role%", translate[row1.lang].roles.murderer)
                message.reply(shootthing)
                bot.channels.get(murdergame).send(":gun: " + users + shootthing2)
                //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun:")
                wasmurdershoot(users)
                users.send(translate[row1.lang].jobchannelmsgs.detective.sent)
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                setTimeout(victory, 1500)
                actioned(userid)
                return
              }
              if (row.roleId === 3) {
                shootthing = shootthing.replace("%role%", translate[row1.lang].roles.healer)
                //message.reply("You have shot " + users + " and they were a **Healer**!")
                shootthing2 = shootthing2.replace("%role%", translate[row1.lang].roles.healer)
                message.reply(shootthing)
                washealershoot(users)
                users.send(translate[row1.lang].jobchannelmsgs.detective.sent)
                //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun:")
                bot.channels.get(murdergame).send(":gun: " + users + shootthing2)
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                actioned(userid)
                targetassassin(users.id, 3)

                return;
              }
              if (row.roleId === 6) {
                shootthing = shootthing.replace("%role%", translate[row1.lang].roles.jailor)
                //message.reply("You have shot " + users + " and they were a **Jailor**!")
                shootthing2 = shootthing2.replace("%role%", translate[row1.lang].roles.jailor)
                message.reply(shootthing)
                wasjailorshoot(users)
                //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun:")
                bot.channels.get(murdergame).send(":gun: " + users + shootthing2)
                users.send(translate[row1.lang].jobchannelmsgs.detective.sent)
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                actioned(userid)
                targetassassin(users.id, 3)
                return;
              }
              if (row.roleId === 4) {
                shootthing = shootthing.replace("%role%", translate[row1.lang].roles.radioperson)
                //message.reply("You have shot " + users + " and he/she was a **Radio Person**!")
                shootthing2 = shootthing2.replace("%role%", translate[row1.lang].roles.radioperson)
                message.reply(shootthing)
                //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was a **Radio Person** :gun: ")
                bot.channels.get(murdergame).send(":gun: " + users + shootthing2)
                users.send(translate[row1.lang].jobchannelmsgs.detective.sent)
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                actioned(userid)
                targetassassin(users.id, 3)
                return;

              }
              if (row.roleId === 5) {
                shootthing = shootthing.replace("%role%", translate[row1.lang].roles.assassin)
                //message.reply("You have shot " + users + " and he/she was an **Assassin**!")
                shootthing2 = shootthing2.replace("%role%", translate[row1.lang].roles.assassin)
                message.reply(shootthing)
                //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was a **Assassin** :gun: ")
                bot.channels.get(murdergame).send(":gun: " + users + shootthing2)
                users.send(translate[row1.lang].jobchannelmsgs.detective.sent)
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
                actioned(userid)
                return;
              }
              shootthing = shootthing.replace("%role%", translate[row1.lang].roles.innocent)
              shootthing2 = shootthing2.replace("%role%", translate[row1.lang].roles.innocent)
              //message.reply("You have shot " + users + " and he/she was **Innocent**!")
              message.reply(shootthing)
              //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun: ")
              bot.channels.get(murdergame).send(":gun: " + users + shootthing2)

              user.send(translate[row1.lang].jobchannelmsgs.detective.sent).catch(e => {
                message.channel.send(`${user}, ${translate[row1.lang].dmsdisabled}`)
              })


              sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
              sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
              targetassassin(users.id, 3)
              actioned(userid)
            } else {
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row111 => {
                nopermstoanychannel(row111.playerid)
                targetassassin(row111.userId, 32)
                let things = translate[row1.lang].shopitems.find(function (a) {
                  return a.id === 0
                })
                if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
                message.reply(things.sent)
                message.author.send(things.sent).catch(e => {
                  message.reply(translate[row1.lang].dmsdisabled)
                })
                users.send(things.sent2).catch(e => {
                  message.channel.send(`${users}, ${translate[row1.lang].dmsdisabled}`)
                })
                sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`)
                actioned(userid)
                bot.channels.get(murdergame).send(things.sent3)
              })
            }
          })
        }
      })
    })
  }

  function shootactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
      } else {
        //if (row.actioned === 1) return message.reply("You have already shot someone!");
      }
    })
  }



  if (command === "players") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        let ms = translate[row.lang].playersxd
        ms = ms.replace("%playercount%", row.players)
        //message.channel.send(`**You have around **${row.players}** Players on your game!**`)
        if (row.players === 0) return message.channel.send(ms)
        sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId LIKE '${message.guild.id}' ORDER BY userId`).then((rows) => {
          let str = ''
          for (let row6 of rows) {
            let t = bot.users.get(row6.userId)
            if (!t) return message.channel.send("**Error!**\nUser not found!\n\nPlease restart the game as you cannot play without that player!\nUser ID: " + row6.userId)
            str += (bot.users.get(row6.userId).tag + " (" + bot.users.get(row6.userId).id + ") [" + ((row6.isDead == 1) ? "Dead" : "Alive") + "]\n")

          }
          message.channel.send(ms + "\n**Users**:\n```\n" + str + "\n```")
        })

      }
    })
  }
  if (command === "server") {
    message.channel.send({
      embed: new RichEmbed().setDescription("**So you want to join our Offical server? Here is the invite: https://discord.gg/Hh5ttkf**").setURL("https://discord.gg/Hh5ttkf").setFooter("Murder Mystery Offical Server").setColor(0xFF0000).setThumbnail("https://images-ext-1.discordapp.net/external/cSTR-tL78BoeH1EawDv8VAL4CCqWDfcNslhJeIMbanU/https/cdn.discordapp.com/icons/319583713262436354/60606acaadea629293d2d6f38c4fbfd4.jpg?width=80&height=80")
    })
  }
  /*
    if (command === "testserver") {
      message.channel.send({
        embed: new RichEmbed().setDescription("**So you want to join our Offical server? Here is the invite: https://discord.gg/Jh5Yh3w**").setURL("https://discord.gg/Jh5Yh3w").setFooter("Murder Mystery Offical Server").setColor(0xFF0000).setThumbnail("https://images-ext-1.discordapp.net/external/QhSE8qhUufw8M3t9tr6l6GiCD0X6vH-fYRBdFH9nxCg/https/cdn.discordapp.com/icons/320365660066676736/afa77c36d9a1bf2b3317022a34345366.jpg?width=80&height=80")
      })
    }
  */
  if (command === "shoot") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.sheriffchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              //shootactioned()
              //var somettt = isactioned()
              //if (somettt) /*123717*/ return;
              /*
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
  
            if (row1.actioned === 1) {
              return message.reply("You have already shot someone");
            }
  
          })
          */
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                if (!row1) {
                  console.log("Murder Mystery - Player not found.")
                } else {
                  if (row1.isjailed === 1) return;
                  //if (row.actioned === 1) return message.reply("You have already searched/shot someone!");
                  if (row.modeId !== 10) {
                    if (row1.actioned === 1) return message.reply(translate[row.lang].alreadyshot);
                  }

                  let userMention = message.mentions.users.first();
                  let userPID = args[0]
                  let query = "userId = ?"
                  let query2 = ""
                  if (!userMention) {
                    if (isNaN(parseInt(userPID))) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                    if (!userPID) {
                      return message.reply(translate[row.lang].userdoesntexist)
                    }
                  }
                  if (userPID) {
                    query = `userId = ?`
                    query2 = userPID
                  }
                  if (userMention) {
                    query = `userId = ?`
                    query2 = userMention.id
                  }
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                    if (!user) {
                      message.reply(translate[row.lang].userdoesntexist)
                    } else {
                      //if (user.id === message.author.id) return message.reply("You cannot shoot yourself 🤔")
                      if (user.userId === message.author.id) return message.reply(translate[row.lang].dke)
                      setTimeout(function () {
                        shoot(user.userId, message.author.id, row.murdergamechannelid, "")
                        let aaaaaaaa = message.guild.roles.get(row.murdermysteryRoleID)

                        //message.guild.member(user).removeRole(aaaaaaaa.id)
                      }, 2000)
                      //if (row.isOneVOne === 1) {
                      if (row.modeId === 3 || row.modeId === 7) {
                        sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                        victory()
                        return;
                      }
                      /*
          bot.channels.get(row.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(row.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.jailorchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
  */
                      /**
                              fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                            if (err) console.error(err)
                            });
                      **/
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[1]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "shoot", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }

  function healedactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found. [healedactioned()]")
      } else {
        //if (row.actioned === 1) return message.reply("You have already healed someone!");
      }
    })
  }

  function heal(user, murdergameid, userid, playerid, stuff) {
    //user = user.id
    //userid = message.author.id
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row1 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[row1.lang].userisnotingame)
        } else {
          if (row1.modeId === 12) {
            let gameData = row1.gameData.split("|")
            gameData.forEach(function (a) {
              let zD = a.split(',')
              if (zD[0] === user) {
                let findInfected = gameData.find(function (b) {
                  return b === `${zD[0]},${zD[1]}`
                })
                if (findInfected === undefined) {
                  if (row.isDead === 0) return message.reply(translate[row1.lang].thatpersonisntdead)
                  if (row.isDead === 1) {
                    healedactioned()
                    checkrole(user, playerid, function (checkrolee) {
                      if ([1, 5, 7].includes(checkrolee)) return;
                      if (checkrolee === 1) {
                        return;
                        bot.channels.get(row1.murderchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                      }
                      if (checkrolee === 2) {
                        bot.channels.get(row1.sheriffchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                      }
                      if (checkrolee === 4) {
                        bot.channels.get(row1.radiochannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                      }
                      if (checkrolee === 6) {
                        bot.channels.get(row1.jailorchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                        bot.channels.get(row1.jailchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })

                      }
                      bot.channels.get(row1.murdergamechannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      bot.channels.get(row1.shopchannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      message.reply(translate[row1.lang].jobchannelmsgs.healer.youhavehealed + users + translate[row1.lang].jobchannelmsgs.healer.youhavehealed2)
                      bot.channels.get(murdergameid).send(":angel: " + users + translate[row1.lang].jobchannelmsgs.healer.hasbeenrevived)
                      // users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
                      users.send(translate[row1.lang].jobchannelmsgs.healer.dm)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user} AND guildId = "${message.guild.id}"`);
                      sql.run(`UPDATE murderMystery SET players = ${stuff + 1} WHERE guildId = '${message.guild.id}'`);
                    })
                  }
                } else {
                  let users = bot.users.get(user)
                  if (row.isDead === 1) {
                    healedactioned()
                    checkrole(user, playerid, function (checkrolee) {
                      if ([1, 5, 7].includes(checkrolee)) return;
                      if (checkrolee === 1) {
                        return;
                        bot.channels.get(row1.murderchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                      }
                      if (checkrolee === 2) {
                        bot.channels.get(row1.sheriffchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                      }
                      if (checkrolee === 4) {
                        bot.channels.get(row1.radiochannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                      }
                      if (checkrolee === 6) {
                        bot.channels.get(row1.jailorchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })
                        bot.channels.get(row1.jailchannelid).overwritePermissions(users, {
                          SEND_MESSAGES: null
                        })

                      }
                      bot.channels.get(row1.murdergamechannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      bot.channels.get(row1.shopchannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      message.reply(translate[row1.lang].jobchannelmsgs.healer.youhavehealed + users + translate[row1.lang].jobchannelmsgs.healer.youhavehealed2)
                      bot.channels.get(murdergameid).send(":angel: " + users + translate[row1.lang].jobchannelmsgs.healer.hasbeenrevived)
                      // users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
                      users.send(translate[row1.lang].jobchannelmsgs.healer.dm)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user} AND guildId = "${message.guild.id}"`);
                      sql.run(`UPDATE murderMystery SET players = ${stuff + 1} WHERE guildId = '${message.guild.id}'`);
                      gameData.splice(gameData.indexOf(a), 1)

                    })
                  } else {
                    message.reply(translate[row1.lang].jobchannelmsgs.healer.youhavehealed + users)
                    users.send(translate[row.lang].jobchannelmsgs.zombie.healer)
                    gameData.splice(gameData.indexOf(a), 1)
                  }
                }
              }
            })
          }
          let users = bot.users.get(user)
          //if (row.isDead === 0) return message.reply("That person isn't dead!")
          if (row.isDead === 0) return message.reply(translate[row1.lang].thatpersonisntdead)
          healedactioned()
          //message.reply("You have healed " + users + "!\nHe will be alive in the morning!")
          //bot.channels.get(murdergameid).send(":angel: " + users + " has been revived by a **Healer** :angel:")
          checkrole(user, playerid, function (checkrolee) {
            if ([1, 5, 7].includes(checkrolee)) return;
            if (checkrolee === 1) {
              bot.channels.get(row1.murderchannelid).overwritePermissions(users, {
                SEND_MESSAGES: null
              })
            }
            if (checkrolee === 2) {
              bot.channels.get(row1.sheriffchannelid).overwritePermissions(users, {
                SEND_MESSAGES: null
              })
            }
            if (checkrolee === 4) {
              bot.channels.get(row1.radiochannelid).overwritePermissions(users, {
                SEND_MESSAGES: null
              })
            }
            if (checkrolee === 6) {
              bot.channels.get(row1.jailorchannelid).overwritePermissions(users, {
                SEND_MESSAGES: null
              })
              bot.channels.get(row1.jailchannelid).overwritePermissions(users, {
                SEND_MESSAGES: null
              })
            }
            bot.channels.get(row1.murdergamechannelid).overwritePermissions(users, {
              SEND_MESSAGES: null
            })
            bot.channels.get(row1.shopchannelid).overwritePermissions(users, {
              SEND_MESSAGES: null
            })
            message.reply(translate[row1.lang].jobchannelmsgs.healer.youhavehealed + users + translate[row1.lang].jobchannelmsgs.healer.youhavehealed2)
            bot.channels.get(murdergameid).send(":angel: " + users + translate[row1.lang].jobchannelmsgs.healer.hasbeenrevived)
            // users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
            users.send(translate[row1.lang].jobchannelmsgs.healer.dm)
            sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user} AND guildId = "${message.guild.id}"`);
            sql.run(`UPDATE murderMystery SET players = ${stuff + 1} WHERE guildId = '${message.guild.id}'`);
          })
        }
      })
    })
  }

  function checkrole(user, playerid, fn) {
    if (playerid !== "") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playerid}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          console.log("Murder Mystery - Player not found. [checkrole()]")
        } else {
          if (row.roleId === 1) {
            return fn(1)
          }
          if (row.roleId === 2) {
            return fn(2)
          }
          if (row.roleId === 3) {
            return fn(3)
          }
          if (row.roleId === 4) {
            return fn(4)
          }
          if (row.roleId === 5) {
            return fn(5)
          }
          if (row.roleId === 6) {
            return fn(6)
          }
          if (row.roleId === 7) {
            return fn(6)
          }
        }
      })
      return
    }
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found. [checkrole()]")
      } else {
        if (row.roleId === 1) {
          return fn(1)
        }
        if (row.roleId === 2) {
          return fn(2)
        }
        if (row.roleId === 3) {
          return fn(3)
        }
        if (row.roleId === 4) {
          return fn(4)
        }
        if (row.roleId === 5) {
          return fn(5)
        }
        if (row.roleId === 6) {
          return fn(6)
        }
      }
    })
  }
  if (command === "heal") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
            if (message.channel.id !== row.healchannelid) return;
            deadcheck(function (ded) {
              if (ded) /*123717*/ return;
              if (row.modeId !== 9 && row.modeId !== 10) {
                if (row.isDay === 1) return message.reply(translate[row.lang].eeer)
              }
              if (row.modeId === 9) {
                if (row.isNight === 1) return message.reply(translate[row.lang].lola)
              }
              let userMention = message.mentions.users.first();
              let userPID = args[0]
              let query = "userId = ?"
              let query2 = ""
              if (!userMention) {
                if (isNaN(parseInt(userPID))) {
                  return message.reply(translate[row.lang].userdoesntexist)
                }
                if (!userPID) {
                  return message.reply(translate[row.lang].userdoesntexist)
                }
              }
              if (userPID) {
                query = `userId = ?`
                query2 = userPID
              }
              if (userMention) {
                query = `userId = ?`
                query2 = userMention.id
              }
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE ${query}`, [query2]).then(user => {
                if (!user) {
                  message.reply(translate[row.lang].userdoesntexist)
                } else {
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                    if (!row1) {
                      console.log("Murder Mystery - Player not found. [mm!heal]")
                    } else {
                      //if (row.actioned === 1) return message.reply("You have already searched/shot someone!");
                      if (row.modeId !== 10) {
                        if (row1.actioned === 1) return message.reply(translate[row.lang].alreadyjailed);
                      }
                      if (row1.isjailed === 1) return;
                      //if (user.id === message.author.id) return message.reply("You realize that you healed yourself, You have successfully wasted a first-aid kit. How terrible, heres another one *gives another one* Now dont use it on yourself!")
                      if (user.userId === message.author.id) return message.reply(translate[row.lang].jobchannelmsgs.healer.wasteheal)
                      heal(user.userId, row.murdergamechannelid, message.author.id, "", row.players)
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[2]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "heal", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }

  function checkassassindead(fn) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 5 AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {

        if (row.isDead === 1) {
          return fn(1);
        } else {
          return fn(0);
        }

      }
    })
  }

  function playeridthingssss() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {
        checkassassindead(function (assassinded) {
          if (assassinded === 1) {
            if (row.players === 1) {
              return nonvict()
            }
          } else {
            if (row.players === 2) {
              return nonvict()
            }
          }
        })
      }
    })
  }

  function checkmurderdead() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) return;
      if (row.gameStarted === 0) return;

      var playeridz = 1
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          if (row.modeId === 12) {
            sql.get(`SELECT count(*) FROM murderMysteryPlayers WHERE roleId = 7 AND guildId ='${message.guild.id}' AND isDead = 0`).then(getZombies => {
              if (getZombies['count(*)'] === 0) {
                victory()
              } else {
                if (getZombies['count(*)'] == row.players) {
                  nonvict()
                }
              }
            })
          } else {
            console.error("[Murder Mystery Error] Error Code 499 at checkmurderdead")
          }

        } else {
          checkifhasitem(row1.userId, 4, 1, function (hasItem) {
            if (hasItem) /*123717*/ {
              sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${row1.userId}' AND itemId =4 AND isDark = 1`)
            }
            checkifhasitem(row1.userId, 2, 1, function (hasItem2) {
              if (hasItem2) /*123717*/ {
                sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${row1.userId}' AND itemId =2 AND isDark = 1`)
              }
              if (row.modeId === 2) {
                sql.get(`SELECT count(*) FROM murderMysteryPlayers WHERE roleId = 1 AND guildId ='${message.guild.id}' AND isDead = 0`).then(getMurderers => {
                  if (getMurderers['count(*)'] == 1) {
                    victory()
                  }
                })
              } else {
                if (row1.isDead === 0) {
                  playeridthingssss()
                } else {
                  if (row.modeId === 12) {
                    sql.get(`SELECT count(*) FROM murderMysteryPlayers WHERE roleId = 7 AND guildId ='${message.guild.id}' AND isDead = 0`).then(getZombies => {
                      if (getZombies['count(*)'] === 0) {
                        victory()
                      } else {
                        if (getZombies['count(*)'] == row.players) {
                          nonvict()
                        }
                      }
                    })
                  } else {
                    return victory()
                  }
                }
              }
            })
          })
        }
      })
    })
  }

  function isDay() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.error("[Murder Mystery Error] Murder Mystery - ERR.")
        return
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] isDay")
        }
        //if (row.isHumansvsbots === 1) {
        if (row.modeId === 4) {
          setTimeout(function () {
            botquotesa()
          }, 2000)
        }
        if (row.modeId === 12) {
          let gameData = row.gameData.split("|")
          let gameDataString = ""
          if (row.gameData.length > 0) {
            gameData.forEach(function (a) {
              let zD = a.split(",")
              if (parseInt(zD[1]) >= 1) {
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = ? AND guildId = "${message.guild.id}"`, [zD[0]]).then(userData => {
                  if (!userData) return
                  if (userData.isDead === 1) return
                  bot.users.get(zD[0]).send(translate[row.lang].jobchannelmsgs.zombie.turnedintozombie)
                  let turnedzombieString = translate[row.lang].jobchannelmsgs.zombie.turnedintozombie
                  turnedzombieString = turnedzombieString.replace("%user%", "<@" + zD[0] + ">")
                  turnedzombieString = turnedzombieString.replace("%role%", getRoleId(userData.roleId, row.lang))
                  bot.channels.get(row.zombiechannelid).send(turnedzombieString)
                  sql.run(`UPDATE murderMysteryPlayers SET roleId = 7 WHERE guildId = "${message.guild.id}" AND userId = ?`, [zD[0]])
                  gameData.splice(gameData.indexOf(a), 1)
                  gameDataString += `${zD[0]},${zD[1]}|`
                  checkrole(zD[0], userData.roleId, function (checkrolee) {
                    if (checkrolee === 1) {
                      bot.channels.get(row.murderchannelid).overwritePermissions(bot.users.get(zD[0]), {
                        READ_MESSAGES: null
                      })
                    }
                    if (checkrolee === 2) {
                      bot.channels.get(row.sheriffchannelid).overwritePermissions(bot.users.get(zD[0]), {
                        READ_MESSAGES: null
                      })
                    }
                    if (checkrolee === 4) {
                      bot.channels.get(row.radiochannelid).overwritePermissions(bot.users.get(zD[0]), {
                        READ_MESSAGES: null
                      })
                    }
                    if (checkrolee === 6) {
                      bot.channels.get(row.jailorchannelid).overwritePermissions(bot.users.get(zD[0]), {
                        READ_MESSAGES: null
                      })
                      bot.channels.get(row.jailchannelid).overwritePermissions(bot.users.get(zD[0]), {
                        READ_MESSAGES: null
                      })

                    }
                    bot.channels.get(row.zombiechannelid).overwritePermissions(bot.users.get(zD[0]), {
                      READ_MESSAGES: true
                    })
                  })
                })
              } else {
                zD[1] = parseInt(zD[1]) + 1
                gameDataString += `${zD[0]},${zD[1]}|`
                gameDataString = gameDataString.slice(0, -1)
              }
            })
            sql.run(`UPDATE murderMystery SET gameData = ? WHERE guildId = "${message.guild.id}"`, [gameDataString])
          }

        }
        if (row.modeId === 7) {
          setTimeout(function () {
            botquotesa()
          }, 2000)
        }
        //if (row.isMurderparty === 0) {
        sql.run(`UPDATE murderMystery SET day = day + 1 WHERE guildId = '${message.guild.id}'`)
        //}
        //if (row.isMurderparty === 1) {
        if (row.modeId === 3) {
          if (row.players === 1) {
            return victory()
          }
        }
        if (row.modeId === 7) {
          if (row.players === 1) {
            return victory()
          }
        }
        if (row.modeId === 2) {
          if (row.players === 1) {
            return victory()
          }
        }
        if (row.modeId !== 3 && row.modeId !== 7) {
          checkmurderdead()
          if (debugmode === 1) {
            console.log("[DEBUG] CHECK MURDER DEAD OUTSIDE FUNCTION")
          }
        }
        sql.run(`DELETE FROM murderMysteryItems WHERE guildId = '${message.guild.id}' AND itemId = 2 AND isDark = 1`)
        sql.run(`UPDATE murderMysteryPlayers SET voted = 0, isjailed = 0, actioned = 0, hasVoted = 0, gold = gold + 1 WHERE guildId = '${message.guild.id}'`)
        sql.run(`UPDATE murderMysteryPlayers SET darkgold = darkgold + 0.5 WHERE roleId = 1 AND guildId = '${message.guild.id}'`)
        /*
        sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId LIKE '${message.guild.id}' ORDER BY userId`).then((rows) => {
          for (let row6 of rows) {
            if (debugmode === 1) {
              console.log("[DEBUG] REPLACED ALL THINGS")
            }
            if (row6.roleId === 1) {
              sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${row6.darkgold + 0.5} WHERE userId = '${row6.userId}' AND guildId = '${message.guild.id}'`)
            }
          }
        });
        */
        sql.run(`UPDATE murderMystery SET isNight = 0, isDay = 1 WHERE guildId = '${message.guild.id}'`)
        //mmplayersData.hasvoted = 0
        //mmplayersData.actioned = 0
        /**
          fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
          if (err) console.error(err)
          });
        **/
        if (row.isStopcycle === 1) return;
        //bot.channels.get(row.murdergamechannelid).send("Good morning!\nTo vote to kill you must type mm!votehang `@user`\nThe morning will go on for a minute.\nWhile its morning, chat with others to figure out who the murderer/assassin is!")
        if (row.day >= 50) {
          let lerotr = translate[row.lang].darkshopitems.find(function (a) {
            return a.id === 1
          })
          bot.channels.get(row.murdergamechannelid).send(lerotr.sent)
          setTimeout(function () {
            nonvict()
          }, 10000)
          return;
        }

        bot.channels.get(row.murdergamechannelid).send(translate[row.lang].goodmorning)
        bot.channels.get(row.murdergamechannelid).overwritePermissions(message.guild.id, {
          SEND_MESSAGES: null,
          READ_MESSAGES: false
        })
        //if (row.isFasterMode === 1) {
        if (row.modeId === 6) {
          isdayloop = setTimeout(isNight, 10000)
          return;
        }
        if (row.modeId === 10) return;
        isdayloop = setTimeout(isNight, (row.nighttimelen * 1000))
      }
    })
  }

  function isNight() {
    message.guild.member(bot.user).setNickname("Murder Mystery Bot")
    if (debugmode === 1) {
      console.log("[DEBUG] CHANGE NAME")
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
        return
      } else {

        sql.run(`UPDATE murderMystery SET isDay = 0, isNight = 1 WHERE guildId = '${message.guild.id}'`)


        if (row.isStopcycle === 1) return;
        //bot.channels.get(row.murdergamechannelid).send("Good night...")
        bot.channels.get(row.murdergamechannelid).send(translate[row.lang].goodnight)

        bot.channels.get(row.murdergamechannelid).overwritePermissions(message.guild.id, {
          READ_MESSAGES: false,
          SEND_MESSAGES: false
        })
        //if (row.isFasterMode === 1) {
        if (row.modeId === 6) {
          isnightloop = setTimeout(isDay, 30000)
          return;
        }
        isnightloop = setTimeout(isDay, (row.daytimelen * 1000))

      }
    })
  }

  function votemp(playeridzzz) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playeridzzz}'`).then(row => {
      if (!row) {
        message.reply("That player isn't in the game!")
        return
      } else {

        if (row.players === 1) {
          playeridthingssss()
        }

      }
    })
  }

  function addvote(useridz) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${useridz}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That player isn't in the game!")
        return
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET voted = voted + 1 WHERE userId ='${useridz}' AND guildId = '${message.guild.id}'`)


      }
    })
  }

  function hasvoteremoved() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That player isn't in the game!")
        return
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET hasvoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)


      }
    })
  }

  function hasvoteadd() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That player isn't in the game!")
        return
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET hasvoted = 1 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
      }
    })
  }


  function hisrole(murderpartycheck, murderchannelid) {
    if (murderpartycheck === 1) {
      bot.channels.get(murderchannelid).send(user + " was the **Murderer**")
      //mmplayersData.hasvoted = 0
      hasvoteremoved()

      return;
    }
  }


  function nowill() {
    bot.channels.get(row.murdergamechannelid).send("There were no last wills to be found...")
  }

  function haswill() {
    bot.channels.get(row.murdergamechannelid).send(user + " Had a last will!\nHis will reads:\n```\n" + mmplayersDataa.lastwill + "\n```")
  }

  function willcheck(useridz, murderparty, murderchannelid) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${useridz}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        console.log("Murder Mystery - Player not found.")
      } else {
        if (murderparty === 1) {
          if (row.lastwill !== "") {
            setTimeout(haswill, 1000, murderchannelid)

            setTimeout(hisrole, 2000, 1, murderchannelid)
            return;
          }
          if (row.lastwill === "") {
            setTimeout(nowill, 1000)

            setTimeout(hisrole, 2000, 1, murderchannelid)
            return;
          }
        } else {
          if (row.lastwill !== "") {
            setTimeout(haswill, 1000)

            setTimeout(hisrole, 2000)
            return;
          }
          if (row.lastwill === "") {
            setTimeout(nowill, 1000)

            setTimeout(hisrole, 2000)
            return;
          }
        }

      }
    })
  }
  if (command === "suggest" || command === "suggestion") {
    if (blacklistedguild(message.guild.id)) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Hello there, Sorry but your guild is blacklisted! If you want to appeal your guild, please type mm!appealserver and join that server then appeal your blacklist!")
        } else {
          return message.reply(translate[row.lang].blacklistguildjsa)
        }
      })
      return;
    }
    if (blacklisteduser(message.author.id)) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Hello there, Sorry but your guild is blacklisted! If you want to appeal your guild, please type mm!appealserver and join that server then appeal your blacklist!")
        } else {
          return message.reply(translate[row.lang].blacklistguildjsa)
        }
      })
      return;
    }
    //if (message.guild.id !== "319583713262436354") return;
    let type = args[0]
    if (!type) return message.reply("**Please put in on what type of suggestion you are suggesting!**\nTypes:\n```\nGamemodes (If you are using this then use this format: mm!suggest gamemodes <Name>|<Description>)\nRoles (If you are using this then use this format: mm!suggest roles <Name>|<Description>|<What the role can do and cannot do>)\nShop Items (If you are using this then use this format: mm!suggest shopitems <Name>|<Price>|<Description>|<What can it do>)\nDark Shop Items (If you are using this then use this format: mm!suggest darkshopitems <Name>|<Price>|<Description>|<What can it do>)\nOther (If you are using this then use this format: mm!suggest other <Title>|<Description>)\n```\n**NOTE:** Abusing this command will result in a blacklist for the bot, meaning you cannot submit any bugs or suggestions but can still start games.")
    type = type.toLowerCase()

    let author = message.author.tag
    let id = message.author.id
    let guildname = message.guild.name
    let guildid = message.guild.id
    let guildicon = message.guild.iconURL
    let authorurl = message.author.avatarURL

    if (type === "gamemodes") {
      let thing = "**Please use this format:**\n```\nmm!suggest gamemodes <Name>|<Description>"
      if (args.splice(1).join(" ").length < 1) return message.channel.send(thing)
      let name = ''
      let myString = args.splice(1).join(" ")
      var string = myString.split(/(|)/)
      string = myString.split("|")
      name = string[0]
      let description = string.splice(1).join(' ')
      if (!name) return message.channel.send(thing)
      if (description.length < 1) return message.channel.send(thing)
      bot.shard.broadcastEval(`let discord = require('discord.js')
this.channels.has("423154259404521472") && this.channels.get("423154259404521472").send({embed: new discord.RichEmbed().setTitle("New Suggestion!").setColor(0xA00000).setAuthor("${author} (${id}) has suggested a Gamemode!", "${authorurl}").setDescription("**Gamemode Name**: ${name}\\n**Gamemode Description**: ${description}").setFooter("${guildname} (${guildid})", "${guildicon}")}).then(m => {
    m.react("👍")
    m.react("👎")
})`)
      message.channel.send("**Successfully sent a suggestion!**\nPlease wait until your suggestion gets reviewed.\n*NOTE: You will not be notified when your suggestion is added/removed*")
      return;
    }
    if (type === "roles") {
      let thing = "**Please use this format:**\n```\nmm!suggest roles <Name>|<Description>|<What the role can do and cannot do>"
      if (args.splice(1).join(" ").length < 1) return message.channel.send(thing)
      let name = ''
      let myString = args.splice(1).join(" ")
      var string = myString.split(/(|)/)
      string = myString.split("|")
      name = string[0]
      let description = string.splice(1).join(' ')
      let whatcandoandcannot = string.splice(2).join(' ')
      if (!name) return message.channel.send(thing)
      if (description.length < 1) return message.channel.send(thing)
      if (whatcandoandcannot.length < 1) return message.channel.send(thing)
      bot.shard.broadcastEval(`let discord = require('discord.js')
this.channels.has("423154259404521472") && this.channels.get("423154259404521472").send({embed: new discord.RichEmbed().setTitle("New Suggestion!").setColor(0xC4E500).setAuthor("${author} (${id}) has suggested a Role!", "${authorurl}").setDescription("**Role Name**: ${name}\\n**Role Description**: ${description}\\n**What it can do and cannot do**: ${whatcandoandcannot}").setFooter("${guildname} (${guildid})", "${guildicon}")}).then(m => {
    m.react("👍")
    m.react("👎")
})`)
      message.channel.send("**Successfully sent a suggestion!**\nPlease wait until your suggestion gets reviewed.\n*NOTE: You will not be notified when your suggestion is added/removed*")
      return;
    }
    if (type === "shopitems") {
      let thing = "**Please use this format:**\n```\nmm!suggest shopitems <Name>|<Price>|<Description>|<What it can do>"
      if (args.splice(1).join(" ").length < 1) return message.channel.send(thing)
      let name = ''
      let myString = args.splice(1).join(" ")
      var string = myString.split(/(|)/)
      string = myString.split("|")
      name = string[0]
      let price = string[1]
      let description = string[2]
      let whatcandoandcannot = string.splice(2).join(' ')
      if (!name) return message.channel.send(thing)
      if (description.length < 1) return message.channel.send(thing)
      if (price.length < 1) return message.channel.send(thing)
      if (whatcandoandcannot.length < 1) return message.channel.send(thing)
      bot.shard.broadcastEval(`let discord = require('discord.js')
this.channels.has("423154259404521472") && this.channels.get("423154259404521472").send({embed: new discord.RichEmbed().setTitle("New Suggestion!").setColor(0xFFA500).setAuthor("${author} (${id}) has suggested an Item for the Shop!", "${authorurl}").setDescription("**Item Name**: ${name}\\n**Item Description**: ${description}\\n**Price**: ${price}\\n**What it can do**: ${whatcandoandcannot}").setFooter("${guildname} (${guildid})", "${guildicon}")}).then(m => {
    m.react("👍")
    m.react("👎")
})`)
      message.channel.send("**Successfully sent a suggestion!**\nPlease wait until your suggestion gets reviewed.\n*NOTE: You will not be notified when your suggestion is added/removed*")
      return;
    }
    if (type === "darkshopitems") {
      let thing = "**Please use this format:**\n```\nmm!suggest darkshopitems <Name>|<Price>|<Description>|<What it can do>"
      if (args.splice(1).join(" ").length < 1) return message.channel.send(thing)
      let name = ''
      let myString = args.splice(1).join(" ")
      var string = myString.split(/(|)/)
      string = myString.split("|")
      name = string[0]
      let price = string[1]
      let description = string[2]
      let whatcandoandcannot = string.splice(2).join(' ')
      if (!name) return message.channel.send(thing)
      if (description.length < 1) return message.channel.send(thing)
      if (price.length < 1) return message.channel.send(thing)
      if (whatcandoandcannot.length < 1) return message.channel.send(thing)
      bot.shard.broadcastEval(`let discord = require('discord.js')
this.channels.has("423154259404521472") && this.channels.get("423154259404521472").send({embed: new discord.RichEmbed().setTitle("New Suggestion!").setColor(0x000000).setAuthor("${author} (${id}) has suggested an Item for the Dark Shop!", "${authorurl}").setDescription("**Item Name**: ${name}\\n**Item Description**: ${description}\\n**Price**: ${price}\\n**What it can do**: ${whatcandoandcannot}").setFooter("${guildname} (${guildid})", "${guildicon}")}).then(m => {
    m.react("👍")
    m.react("👎")
})`)
      message.channel.send("**Successfully sent a suggestion!**\nPlease wait until your suggestion gets reviewed.\n*NOTE: You will not be notified when your suggestion is added/removed*")
      return;
    }
    if (type === "darkshopitems") {
      let thing = "**Please use this format:**\n```\nmm!suggest darkshopitems <Name>|<Price>|<Description>|<What it can do>"
      if (args.splice(1).join(" ").length < 1) return message.channel.send(thing)
      let name = ''
      let myString = args.splice(1).join(" ")
      var string = myString.split(/(|)/)
      string = myString.split("|")
      name = string[0]
      let description = string.splice(1).join(' ')
      if (description.length < 1) return message.channel.send(thing)
      bot.shard.broadcastEval(`let discord = require('discord.js')
this.channels.has("423154259404521472") && this.channels.get("423154259404521472").send({embed: new discord.RichEmbed().setTitle("New Suggestion!").setAuthor("${author} (${id}) has suggested something for the Bot!", "${authorurl}").setDescription("**Title**: ${name}\\n**Description**: ${description}").setFooter("${guildname} (${guildid})", "${guildicon}")}).then(m => {
    m.react("👍")
    m.react("👎")
})`)
      message.channel.send("**Successfully sent a suggestion!**\nPlease wait until your suggestion gets reviewed.\n*NOTE: You will not be notified when your suggestion is added/removed*")
      return;
    }
    return message.reply("**Please put in on what type of suggestion you are suggesting!**\nTypes:\n```\nGamemodes (If you are using this then use this format: mm!suggest gamemodes <Name>|<Description>)\nRoles (If you are using this then use this format: mm!suggest roles <Name>|<Description>|<What the role can do and cannot do>)\nShop Items (If you are using this then use this format: mm!suggest shopitems <Name>|<Description>|<Price>|<What can it do>)\nDark Shop Items (If you are using this then use this format: mm!suggest darkshopitems <Name>|<Description>|<Price>|<What can it do>)\nOther (If you are using this then use this format: mm!suggest other <Name>|<Description>)\n```\n**NOTE:** Abusing this command will result in a blacklist for the bot, meaning you cannot submit any bugs or suggestions but can still start games.")
  }
  if (command === "votehang") {
    sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
      if (!lobby) {
        sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
            return
          } else {
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
            if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)

            if (message.channel.id !== row.murdergamechannelid) return; //message.reply("You cannot vote in your private channel!");

            //if (row.isNight === 1) return message.reply("You cannot do this in the night!")
            if (row.isNight === 1) return message.reply(translate[row.lang].lola)
            //mmplayersData.actioned = 0
            let user = message.mentions.users.first();
            if (!user) return message.reply(translate[row.lang].userdoesntexist)
            hasvotedcheck()
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
              if (!row2) {
                //message.reply("You aren't in the game!")
                message.reply(translate[row.lang].isntingame)
              } else {
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                  if (!row1) {
                    //message.reply("That user isn't in the game!")
                    message.reply(translate[row.lang].userisnotingame)
                  } else {
                    //if(mmplayersData.hasvoted === 1) return message.reply("You have already voted!")
                    //if (row2.hasVoted === 1) return message.reply("You have already voted!")
                    if (row2.hasVoted === 1) return message.reply(translate[row.lang].b)
                    if (row1.isDead === 1) return message.reply(translate[row.lang].thatpersonisdead)
                    //if (user.id === message.author.id) return message.reply("You cannot vote yourself!")
                    if (user.id === message.author.id) return message.reply(translate[row.lang].fkefoekf)
                    sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 5 AND guildId = '${message.guild.id}'`).then(getAssassin => {
                      if (!getAssassin) {
                        message.channel.send("**ERROR** Assassin not found!\nThis error may show if you are on a gamemode in which the Assassin doesn't exist in.")
                      } else {
                        checkifhasitem(getAssassin.userId, 6, 1, function (checkItem) {
                          checkassignedid(user.id, function (checkassignedd) {
                            //mmplayersDataa.voted++;
                            if (checkItem) /*123717*/ {
                              sql.run(`UPDATE murderMysteryPlayers SET voted = voted + 1 WHERE userId ='${user.id}' AND guildId = '${message.guild.id}'`)
                            }
                            sql.run(`UPDATE murderMysteryPlayers SET voted = voted + 1, hasVoted = 1 WHERE userId ='${user.id}' AND guildId = '${message.guild.id}'`)

                            function diedbeingkilled() {
                              bot.channels.get(row.murdergamechannelid).send(user + translate[row.lang].hasbeenhung)
                            }

                            function nowill() {
                              bot.channels.get(row.murdergamechannelid).send("There were no last wills to be found...")
                            }

                            function haswill() {
                              bot.channels.get(row.murdergamechannelid).send(user + " Had a last will!\nHis will reads:\n```\n" + row1.lastwill + "\n```")
                            }

                            function hisrole() {
                              if (row1.roleId !== 1 || row1.roleId !== 5) {
                                if (row1.roleId === 0) {
                                  bot.channels.get(row.murdergamechannelid).send(`${user} ${translate[row.lang].wasan} **${getRoleId(row1.roleId, row.lang)}**`)
                                  if (checkassignedd === 1) {
                                    bot.channels.get(row.murdergamechannelid).send(`${user} was an **${getRoleId(row1.roleId, row.lang)}** and the **Assassin** gained 3 gold for killing his target!"`)
                                    dmassassin(5)
                                    sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                    return
                                  }
                                } else {
                                  if (checkassignedd === 1) {
                                    bot.channels.get(row.murdergamechannelid).send(`${user} ${translate[row.lang].wasa} **${getRoleId(row1.roleId, row.lang)}** and the **Assassin** gained 3 gold for killing his target!`)
                                    sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                    dmassassin(5)
                                    return
                                  }
                                  bot.channels.get(row.murdergamechannelid).send(`${user} ${translate[row.lang].wasa} **${getRoleId(row1.roleId, row.lang)}**`)
                                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                  return
                                }
                              } else {
                                if (row1.roleId === 1) {
                                  bot.channels.get(row.murdergamechannelid).send(`${user} ${translate[row.lang].wasthe} **${getRoleId(row1.roleId, row.lang)}**`)
                                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                  setTimeout(victory, 2000)
                                } else {
                                  bot.channels.get(row.murdergamechannelid).send(`${user} ${translate[row.lang].wasan} **${getRoleId(row1.roleId, row.lang)}**`)
                                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                }
                              }
                            }
                            let aldadaasd = parseInt(row.players) - 1
                            if (aldadaasd === row1.voted) {
                              message.reply(user + translate[row.lang].hasaroundvote + "**0**" + translate[row.lang].hasaroundvote2)
                              //user.send(translate[row.lang].youhavedied)
                              user.send(translate[row.lang].youhavedied).catch(e => {
                                message.channel.send(`${user}, ${translate[row.lang].dmsdisabled}`)
                              })
                              bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                                SEND_MESSAGES: false
                              })
                              //nopermstoanychannel(row.playerId)
                              sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
                              setTimeout(diedbeingkilled, 1000)

                              if (row1.lastwill === 0) {
                                setTimeout(nowill, 5000)

                                setTimeout(hisrole, 10000)
                                return;
                              }
                              if (row1.lastwill !== 0) {
                                setTimeout(haswill, 5000)

                                setTimeout(hisrole, 10000)
                                return;
                              }
                            } else {
                              if (checkItem) /*123717*/ {
                                var weird = ((aldadaasd - row1.voted) + 1)
                                message.reply(user + translate[row.lang].hasbeenvoted + `**${tasdasd}**` + translate[row.lang].morevotes)
                              } else {
                                let weird = aldadaasd - row1.voted
                                message.reply(user + translate[row.lang].hasbeenvoted + `**${weird}**` + translate[row.lang].morevotes)
                              }
                            }
                          })
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      } else {
        let eD = lobby.extraData
        let extraData = eD.split(":")
        if (message.channel.id === extraData[3]) {
          try {
            let commandFile = require(`./cogs/GlobalGames.js`); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
            commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "votehang", lobby);
          } catch (err) {
            console.error(err);
          }
        } else {}
      }
    })
  }
  if (command === "lastwill") {
    if (message.channel.type === 'dm') {
      return;
      message.author.send("I cannot respond with this command in DMS. Please type this in the default channel or some other channel in your guild")
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        if (row.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
        if (!args[0]) {
          return message.channel.send("Please type in a last will!")
        }
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            return message.reply(translate[row.lang].isntingame)
          } else {
            sql.run(`UPDATE murderMysteryPlayers SET lastwill = ? WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`, [args.join(" ")])
            message.author.send("Success! Your will is now:\n```\n" + args.join(" ") + "\n```")
          }
        })
      }
    })
  }
  if (command === "appeal") {
    if (message.guild.id !== "320365660066676736") return; //Deny it so that only one guild can use this command
    let typeban = args[0] //True/False Ban/Blacklist
    if (typeban !== "ban" || typeban !== "blacklist") return message.reply("**Please put in a Type of Blacklist/Ban!**")
    let falsetrue = args[1]
    if (falsetrue !== "true" || falsetrue !== "false") return message.reply("**Please put in if the Blacklist/Ban was true or false!**")
    let reason = args.splice(2).join(' ')
    if (reason.length < 1) return message.reply("**Please put in a reason and proof!**");
    if (!reason.includes("https://imgur.com") || !reason.includes("http://imgur.com") || !reason.includes("https://www.imgur.com") || !reason.includes("http://www.imgur.com") || !reason.includes("www.imgur.com") || !reason.includes("imgur.com")) return message.reply("**Please put in a imgur link as the proof!**")
    message.channel.send("**Please wait while the Appeal gets submitted!**").then(msg => {
      bot.channels.get('388811977398419459').send({
        embed: new RichEmbed().setTitle("New Appeal!")
          .setAuthor("Appeal from " + message.author.tag, message.author.avatarURL)
          .addField("Username:", message.author.tag)
          .addField("User ID:", message.author.id)
          .addField("Type", typeban)
          .addField("True or False", falsetrue)
          .addField("Reason and Proof (If provided):", reason)
      })
      setTimeout(function () {
        msg.edit("**Successfully posted the appeal!** The appeal will take a minimum of 1 day or more! If it's been a week, please DM one of our staff.")
      }, 1000)
    })
  }
  if (command === "help") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        //message.channel.send("`Help Command`\n\n***Regular Commands***\n**mm!invite** - Invite Murder Mystery Bot to your server!\n**mm!shardinfo** - Shows the info of Murder Mystery's shards!\n**mm!server** - Shows you the invite to the Offical Murder Mystery Bot Server!\n\n***Game Commands***\n**mm!game** - Shows the detail of the game and how to play I guess\n**mm!game rules** - Shows you the rules of the game!\n**mm!game start** - Start a game!\n**mm!game fixgame** - Attempts to fix the game.\n**mm!game join** - Join a game!\n**mm!game setupdata** - Add your guild data in our database!\n**mm!game addhostrole <role name>** - Add your host role to the database!\n**mm!game leave** - Leave the game!\n**mm!game gamestart** - Start the game which will create all channels and setup roles, etc...\n**mm!game stop** - Stop the game!\n\n***Ingame Commands***\n**mm!kill <@user>** - Kill a user! (Murderer Permission Needed)\n**mm!search <@user>** - Search the user to see if they are the murderer!\n**mm!shoot <@user>** - Shoot a user if you think they are the murderer!\n**mm!broadcast** - Broadcast a global message to the news!\n**mm!votehang <@user>** - Vote to kill the person if you think they are suspicious!\n**mm!jail <@user>** - Jail a person to interrigate them\n**mm!execute <@user>** - Execute the user if they are suspicious...\n**mm!heal <@user>** - Bring the user back from the dead!\n**mm!lastwill <will>** - When you die or get hung, there will be a lastwill message to all the users to see before you actually die.\n\n***Bot made by FireMario211***\nVersion " + version + "\nPlease note that there may be bugs, if you see any, please type mm!bug (message)")
        let text = translate["English"].help
        text = text.replace("%version%", version)
        message.channel.send(text, {
          split: "\n"
        })
      } else {
        let text = translate[row.lang].help
        text = text.replace("%version%", version)
        message.channel.send(text, {
          split: "\n"
        })
      }
    })
  }
  if (command === "bug") {
    if (blacklistedguild(message.guild.id)) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Hello there, Sorry but your guild is blacklisted! If you want to appeal your guild, please type mm!appealserver and join that server then appeal your blacklist!")
        } else {
          return message.reply(translate[row.lang].blacklistguildjsa)
        }
      })
      return;
    }
    if (blacklisteduser(message.author.id)) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Hello there, Sorry but your guild is blacklisted! If you want to appeal your guild, please type mm!appealserver and join that server then appeal your blacklist!")
        } else {
          return message.reply(translate[row.lang].blacklistguildjsa)
        }
      })
      return;
    }
    if (!args[0]) return message.reply("Please state your bug")
    if (message.guild.id === "264445053596991498") return message.reply("Bug reports aren't allowed in Discord Bot Lists")
    let thing = "**New Bug!**\n**Bug report by **`" + message.author.tag + "` (" + message.author.id + ") in " + message.guild.name + ` (${message.guild.id}) - Channel ID (${message.channel.id})\nThe bug is\n` + "```\n" + args.join(" ") + "\n```"
    //bot.channels.get('349993166788886537').send("**New Bug!**\n**Bug report by **`" + message.author.tag + "` (" + message.author.id + ") in " + message.guild.name + ` (${message.guild.id}) - Channel ID (${message.channel.id})\nThe bug is\n` + "```\n" + args.join(" ") + "\n```")
    //bot.shard.broadcastEval('this.channels.has(`349993166788886537`) && this.channels.get(`349993166788886537`).send(' + thing + ')')
    bot.shard.broadcastEval(`this.channels.has(\`349993166788886537\`) && this.channels.get(\`349993166788886537\`).send("**New Bug!**\\n**Bug report by** \`${message.author.tag}\` (${message.author.id}) in ${message.guild.name} (${message.guild.id}) - Channel ID (${message.channel.id})\\nThe bug is\\n\`\`\`\\n${args.join(" ")}\\n\`\`\`")`)
    message.reply("Your bug has been submitted! Please do not abuse this command or we will have to block your guild from the bot.")

  }
  if (command === "admin") {
    if (!isAdmin(message.author.id)) return;
    let category = args[0]
    if (category === "warn") {
      let user = message.mentions.users.first();
      if (!user) return message.reply("Please mention a user.")
      let reason = args.splice(1).join(' ')
      if (reason.length < 1) return message.reply("Please enter a reason.")
      bot.channels.get('322168099220750338').send({
        embed: new RichEmbed().setAuthor(user.tag + " was warned!", user.avatarURL).addField("Username:", user.tag).addField("Action:", "Warning").addField("Staff:", message.author.tag).setFooter("Murder Mystery Bot 2017").setColor(0xFFFF00)
      })
      message.reply("Successfully warned!")
    }
    if (category === "timeout") {
      let user = message.mentions.users.first();
      if (!user) return message.reply("Please mention a user.")
      let reason = args.splice(1).join(' ')
      if (reason.length < 1) return message.reply("Please enter a reason.")
      bot.channels.get('322168099220750338').send({
        embed: new RichEmbed().setAuthor(user.tag + " was warned!", user.avatarURL).addField("Username:", user.tag).addField("Action:", "Timeout").addField("Timeout for:", "").addField("Staff:", message.author.tag).setFooter("Murder Mystery Bot 2017").setColor(0xFFA500)
      })
    }
    if (category === "cleardat") {
      message.reply("Successfully Cleared JSON Datas.")
      cleardatfilez()
    }
    if (category === "restart") {
      message.channel.send("Are you sure you want to restart " + bot.user.username + "?\n\nYou must clear all mysql player data if you want to restart this bot, if not the game will be glitched and such.\n**React with :white_check_mark: If you want to restart the bot**\n**React with :x: If you dont want to restart the client.**\n\n__This message will be deleted in 30 seconds.__")
        .then(mes => {
          mes.react('✅')
          mes.react('❌')
          let collector = mes.createReactionCollector(
            (reaction, user) => user.id === message.author.id, {
              time: 30000
            }
          );
          collector.on(`collect`, r => {
            if (r.emoji.name === '✅') {
              message.channel.send(`**Restarting...**`).then(es => {
                collector.stop();
                console.log(message.author.tag + " has restarted the bot!")
                bot.gameid = 0
                gameid = 0
                if (config.sharding === 1) {
                  bot.shard.broadcastEval("this.gameid = 0")
                }

                sql.run(`UPDATE murderMystery SET gameid = 0`)
                setTimeout(function () {
                  es.edit("**Restarted!**")
                }, 10000)
                setTimeout(function () {
                  bot.shard.broadcastEval("process.exit()")
                }, 10500)
              })

            } else if (r.emoji.name === '❌') {
              message.channel.send("`COLLECTION STOPPED` - Restart has been cancelled.")
              collector.stop()
            }
          })
          collector.on(`end`, r => {
            mes.delete();
          })
        });
    }
    if (category === "forcestop") {
      stop()
      return;
    }
    if (category === "rejectbug") {
      let id = args[1]
      if (!id) return message.reply("Please put in a user id")
      let reason = args.splice(2).join(' ')
      let user = bot.users.get(id)
      if (reason.length < 1) return message.reply("Please put in a reason!")
      if (!user) return message.reply("That user doesnt exist!")
      user.send("Hello there, thank you for submitting your bug but, your bug has been denied! As for this reason: `" + args[2] + "`\nYour bug has been rejected by " + message.author.tag + " (" + message.author.id + ")")
      return;
    }
    if (category === "acceptbug") {
      let id = args[1]
      if (!id) return message.reply("Please put in a user id")
      let user = bot.users.get(id)
      if (!user) return message.reply("That user doesnt exist!")
      user.send("Hello there, thank you for submitting your bug! Your bug has been accepted and it will be fixed sooner or later!\nYour bug has been accepted by " + message.author.tag + " (" + message.author.id + ")")
      return;
    }
  }

  function deleteplayer(murderroleid, msgid) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      } else {
        sql.run(`DELETE FROM murderMysteryPlayers WHERE userId = '${message.author.id}' AND guildId ='${message.guild.id}'`);
        let murderrole = message.guild.roles.get(murderroleid)
        message.guild.member(message.author).removeRoles(murderrole.id)
        message.channel.fetchMessage(msgid).then(m => {
          m.edit(message.author + ", You have successfully left the game!")
        })
      }
    })
  }

  function deleteallplayerz(check) {
    sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
  }

  function loopjustincase() {
    sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId = ${message.guild.id}`)
  }

  function cleardatfilez() {
    fs.writeFile('./mmplayers.json', '{}', 'utf8')
    fs.writeFile('./mmgame.json', '{}', 'utf8')

    fs.writeFile('./preventjoin.json', '{}', 'utf8')
  }

  function victory() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("ERR!")
        return
      } else {
        deletgamesess()
        let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
        murdermysteryrole.delete()

        //if (row.isMurderparty === 1) {
        if (row.modeId === 2) {
          deleteGameChannel()
          let murdererr = 'N/A'
          let detectiveee = 'N/A'
          let healerr = 'N/A'
          let radiopersonn = 'N/A'
          let asssassisnsz = 'N/A'
          let jialirzo = 'N/A'
          let innocentes = ''
          sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then((rows) => {
            for (let row21 of rows) {
              innocentes += bot.users.get(row21.userId).tag + "\n"
            }
            bot.channels.get(row.defaultChannel).send({
              embed: new RichEmbed().setTitle("The evils have won, the town is dead").setColor(0xFF0000).setDescription("**Murderers**\n" + innocentes).setFooter("If they just say N/A, then ignore it.")
            })
          })

          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz, 1000)
          return
        }
        deleteGameChannel()
        setTimeout(aaaaaaa, 1500)
        setTimeout(deleteallplayerz, 1000, 0)
        let murdererr = 'N/A'
        let detectiveee = 'N/A'
        let healerr = 'N/A'
        let radiopersonn = 'N/A'
        let asssassisnsz = 'N/A'
        let jialirzo = 'N/A'
        let innocentes = ''
        sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then((rows) => {
          for (let row21 of rows) {
            if (row21.roleId === 1) {
              murdererr = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 2) {
              detectiveee = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 3) {
              healerr = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 3) {
              healerr = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 4) {
              radiopersonn = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 5) {
              asssassisnsz = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 6) {
              jialirzo = bot.users.get(row21.userId).tag
            } else
              innocentes += bot.users.get(row21.userId).tag + "\n"
          }
          bot.channels.get(row.defaultChannel).send({
            embed: new RichEmbed().setTitle("Innocents win! The town survived!").setColor(0x00FF00).addField(translate[row.lang].roles.murderer, murdererr, true).addField(translate[row.lang].roles.detective, detectiveee, true).addField(translate[row.lang].roles.healer, healerr, true).addField(translate[row.lang].roles.radioperson, radiopersonn, true).addField(translate[row.lang].roles.assassin, asssassisnsz, true).addField(translate[row.lang].roles.jailor, jialirzo, true).setDescription("**Innocents**\n" + innocentes).setFooter("If they just say N/A, then ignore it.")
          })
        })
      }
    })
  }

  function aaaaaaa() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("ERR!")
        return
      } else {
        sql.run(`DELETE FROM murderMysteryItems WHERE guildId = "${message.guild.id}"`)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET murderchannelid = 0, 
          murdergamechannelid = 0, 
          healchannelid = 0, 
          sheriffchannelid = 0,
          isDay = 0,
          isNight = 0,
          isStopcycle = 1,
          gameStarted = 0,
          startcmd = 0,
          players = 0,
          jailorchannelid = 0,
          jailchannelid = 0,
          radiochannelid = 0,
          shopchannelid = 0,
          zombiechannelid = 0,
          gameData = '',
          modeId = 0,
          gameid = 0,
          playerInsert = 0,
          randomizer = "0",
          day = 0
          WHERE guildId = '${message.guild.id}'`)
        }, 500)
      }
    })
  }

  function nonvict() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("ERR!")
        return
      } else {
        deletgamesess()
        //if (row.isOneVOne === 1) {
        let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
        murdermysteryrole.delete()
        deleteGameChannel()
        setTimeout(aaaaaaa, 1500)
        setTimeout(deleteallplayerz, 2000)
        sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then((rows) => {
          for (let row21 of rows) {
            if (row21.roleId === 1) {
              murdererr = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 2) {
              detectiveee = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 3) {
              healerr = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 3) {
              healerr = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 4) {
              radiopersonn = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 5) {
              asssassisnsz = bot.users.get(row21.userId).tag
            } else if (row21.roleId === 6) {
              jialirzo = bot.users.get(row21.userId).tag
            } else
              innocentes += bot.users.get(row21.userId).tag + "\n"
          }
          bot.channels.get(row.defaultChannel).send({
            embed: new RichEmbed().setTitle("The town has died. The evils have won.").setColor(0xFF0000).addField(translate[row.lang].roles.murderer, murdererr, true).addField(translate[row.lang].roles.detective, detectiveee, true).addField(translate[row.lang].roles.healer, healerr, true).addField(translate[row.lang].roles.radioperson, radiopersonn, true).addField(translate[row.lang].roles.assassin, asssassisnsz, true).addField(translate[row.lang].roles.jailor, jialirzo, true).setDescription("**Innocents**\n" + innocentes).setFooter("If they just say N/A, then ignore it.")
          })
        })
      }
    })
  }

  function ggfunction() {
    fs.writeFile('./mmgame.json', JSON.stringify(mmgame), (err) => {
      if (err) console.error(err)
    });
  }
  /*
    if (command === "verify") {
      if (message.guild.id !== "319583713262436354") return;
      if (!args[0]) {
        return message.reply("Please put in a verification code!")
      }
      let verifylol = args[0]
      let verifydataw = verifyt[verifylol]

      if (!verifydataw) return message.reply("That verification code doesn't exist!")
      if (!verifydataw.userid === message.author.id) return message.reply("That isn't your verification code!")
      message.reply("Congratulations! You have been verified! You can now access the server!")
      const memberdata = bot.guilds.get('319583713262436354').roles.get('319589358342504448')
      const roledata = bot.guilds.get('319583713262436354').roles.get('319589338574880769')
      message.guild.member(message.author).addRole(roledata)
      message.guild.member(message.author).addRole(memberdata)
      delete verifyt[verifylol]
      bot.channels.get('319590345052520448').send(message.author + " has verified with the code `" + args[0] + "`!")

      fs.writeFile('./verificationids.json', JSON.stringify(verifyt), (err) => {
        if (err) console.error(err)
      });

    }
    */
  if (command === "shardinfo") {
    const requests = [
      bot.shard.broadcastEval('this.guilds.size').then(v => v.reduce((a, b) => a + b, 0)),
      bot.shard.broadcastEval('this.channels.size').then(v => v.reduce((a, b) => a + b, 0)),
      bot.shard.broadcastEval('this.users.size').then(v => v.reduce((a, b) => a + b, 0)),
      bot.shard.broadcastEval('(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(0)').then(v => v.reduce((a, b) => a + b, 0)),
      bot.shard.broadcastEval('this.voiceConnections.size').then(v => v.reduce((a, b) => a + b, 0)),
      bot.shard.broadcastEval('this.gameid').then(v => v.reduce((a, b) => a + b, 0))
    ];
    Promise.all(requests).then(shards => {
      bot.shard.broadcastEval('[this.shard.id, this.guilds.size, this.channels.size, this.users.size, (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(0), this.voiceConnections.size, this.gameid]').then(results => {
        message.channel.send(`**Shard Info**\n\`\`\`prolog\n${results.map(r =>`SHARD ${r[0]} ~> GUILDS: ${r[1]} | CHANNELS: ${r[2]} | USERS: ${r[3]}, | MEMORY: ${r[4]} | VOICE CHANNELS: ${r[5]} | ACTIVE GAMES: ${r[6]}`).join('\n')}\n\`\`\`\nCredit \`ohlookitsAugust#1793\` for the code`)
      });
    });
  }
  if (command === "invite") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.channel.send("Please look in DMs! (If you don't see the DM, enable DMs)")
        message.author.send("https://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417").catch(e => {
          message.channel.send("**Since your DMs are disabled, here is the invite:**\nhttps://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417")
        })
      } else {
        message.channel.send(translate[row.lang].lookindms)
        message.author.send("https://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417").catch(e => {
          message.channel.send("https://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417")
        })
      }
    })
  }
  // then KEEL died and went to heaven
  // so one day they met and said hi
  if (command === 'eval') {
    if (message.author.id != '126119057232625664' /*&& message.author.id != '280158289667555328' && message.author.id != '281397352177074177'*/ ) {
      return;
    }
    if (args.join(" ").length < 1) return message.reply("`ERROR` Please eval something!")
    try {
      let result = eval(args.join(' '));
      //result = result.replace(bot.token, "Hell no, I aint giving you my token")
      if (typeof result != 'string') {
        require('util').inspect(result, {
          depth: 3,
          maxArray: 2048
        });
      } else if (result.length > 1990) {
        snekfetch.post(`https://haste.passthemayo.space/documents`)
          .send(result)
          .then((res) => {
            message.channel.send(`Result was over 2k characters, posted it to hastebin!\n\`Link\` -> https://haste.passthemato.space/${res.body.key}.js`);
          }).catch((e) => {
            message.channel.send("An error has occured while posting it to hastebin!");
            console.log(`[ERROR]: ${e}`);
            return; // Yea no.
          });
      } else {

      }
      message.channel.send(":white_check_mark: Went successful!\n```js\n" + result + "\n```")
      //message.channel.send(":white_check_mark: Went successful!\n```js\n" + result + "\n```")
    } catch (e) {
      message.channel.send(":x: Something went wrong! Error details: ```js\n" + e + "\n```")
    }
  }
  const hd = require('humanize-duration');
  const os = require('os');
  if (command === "stats") {
    const embed = new RichEmbed()
      .setTitle(`${bot.user.username}'s stats`)
      .setDescription(`Uptime: ${hd(bot.uptime, {round: true})}`)
      .addField(`Misc >`, `**Guilds (size)**: ${bot.guilds.size} (Since this isnt valid, please type mm!shardinfo to see full info of shards + guilds)\n**Users/Bots**: ${bot.users.size} (Since this isnt valid, please type mm!shardinfo to see full info of shards + guilds)/${bot.users.filter(g => g.bot).size} (Since this isnt valid, please type mm!shardinfo to see full info of shards + guilds)\nPing: \`${bot.ping.toFixed(0)}ms\``, true)
      .addField(`VPS >`, `**VPS OS**: ${os.platform()}\n**Mem Usage**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\nNode.js Version: ${process.version}\nDiscord.js Version: v${require('discord.js').version}\nActive Games: ${gameid}\nMurder Mystery Bot Version: ${version}`, true)
      .setTimestamp()
    message.channel.send({
      embed
    });
  }
  if (command === "about") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.channel.send(`Hello! I am ${bot.user.username} developed by <@126119057232625664> & <@280158289667555328>!\nI was based on the Hypixel game "Murder Mystery"; I was being private for 2 months and 30 days (So long...) but I am public as of August 24th, 2017!\nIf you need help, Do **mm!help** or if you need my stats? Use **mm!stats**, Is there a bug? Use **mm!bug [report]** to report a bug!`)
      } else {
        let trans = translate[row.lang].about
        trans = trans.replace("%user%", bot.user.username)
        setTimeout(function () {
          message.channel.send(trans)
        }, 500)
      }
    })
  }
  if (command === 'exec') {
    if (message.author.id != '126119057232625664' && message.author.id != '280158289667555328' && message.author.id != '281397352177074177') return message.reply("You need a permission: `Developer`")
    if (!args[0]) return message.reply("`ERROR` Please execute something!")
    require("child_process").exec(args.join(" "), (err, stdout, stderr) => {
      if (err) return message.channel.send(":x: Something went wrong! Error details: ```" + stderr + "```")
      message.channel.send(":white_check_mark: Went successful!\n```" + stdout + "\n```")
    })
  }
  if (command === '^~^') {
    message.channel.send("^~^ ~Tsukasa");
  }
})
// then KEEL KEELED all gods of KEEL and became god
