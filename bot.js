/**
 *    Murder Mystery Bot
 *        V1.3.0b
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
 * 13 - Chaos'ity
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
var globalGamesDir = "./cogs/GlobalGames.js"
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
gamemodes array object thing
gamemodeName > Name of the gamemode, for when users type the categorya
modeId > Mode ID
modeStatus > Status of the Gamemode (If it's available, or only available for certain people, or not available at all)
minPlayers > Minimum players needed to start the game
maxPlayers > Maximum of how many players can join
allowedShop > If users can use shop commands
allowedInnocent > If Innocents can be considered a role
allowedRoles > An array containing of what roles are in the gamemode (Will be randomized and the roles will depend on what channels will be created)
createChannels > An array containing of what channels can be created (IDs: 0 > #murdergame | 5 > #shop | 1 > #murderer | 2 > #detective | 3 > #healer | 4 > #radio | 6 > #jailor and #jail | 7 > #zombie)
start obj >
  modeName > No description provided
  roleName > No description provided
extra obj >
  allow > If the gamemode has extra options (Default: false)
  botsAllowed > Will enable it so that bots will be in the game (Default: false)
  executeRoleCommands > What time users can enter in role commands (Default: "night" or just false)
  timeCycle > If the gamemode disallows a day/night cycle (Default: false)
  noAction > If (when users enter role commands) it should say that they cannot enter in the command again. (Default: false)

*/
let gamemodes = [{
  gamemodeName: "regular",
  modeId: 1,
  modeStatus: 0,
  minPlayers: 6,
  maxPlayers: 8,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Regular",
    roleName: "Classic Mode",
    desc: "Classic Murder Mystery!",
    credit: {
      userTag: "Noahs Gaming and More#9436",
      userId: "281397352177074177"
    }
  }
}, {
  gamemodeName: "murderparty",
  modeId: 2,
  modeStatus: 0,
  minPlayers: 2,
  maxPlayers: 8,
  allowedShop: false,
  allowedInnocent: false,
  allowedRoles: [1],
  createChannels: [0, 1],
  start: {
    modeName: "Murder Party",
    roleName: "Murder Party",
    desc: "Everyone is a murderer!",
    credit: {
      userTag: "betterface ツ#1983",
      userId: "204270560501432320"
    }
  },
}, {
  gamemodeName: "1v1",
  modeId: 3,
  modeStatus: 0,
  minPlayers: 2,
  maxPlayers: 2,
  allowedShop: true,
  allowedInnocent: false,
  allowedRoles: [1, 2],
  createChannels: [0, 5, 1, 2],
  start: {
    modeName: "1v1 Mode",
    roleName: "1v1 Mode",
    desc: "1 Detective and 1 Murderer, ONLY 2 People play on this mode.",
    credit: {
      userTag: "FireMario211#2948",
      userId: "126119057232625664"
    }
  }
}, {
  gamemodeName: "humansvsbots",
  modeId: 4,
  modeStatus: 2,
  minPlayers: 1,
  maxPlayers: 8,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Humans VS Bots",
    roleName: "Humans VS Bots",
    desc: "Murder Mystery except with extra bots!",
    credit: {
      userTag: "Noahs Gaming and More#9436",
      userId: "281397352177074177"
    }
  },
  extra: {
    allow: true,
    botsAllowed: true,
    botBehavior: {

    }
  }
}, {
  gamemodeName: "unlimitedmode",
  modeId: 5,
  modeStatus: 0,
  minPlayers: 6,
  maxPlayers: -1,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Regular (Unlimited Players Mode)",
    roleName: "Unlimited Players Mode",
    desc: "Have more than 8 people? this is the mode for you! You can have an \"unlimited\" amount of players!",
    credit: {
      userTag: "FireMario211#2948",
      userId: "126119057232625664"
    }
  }
}, {
  gamemodeName: "killermode",
  modeId: 6,
  modeStatus: 3,
  minPlayers: 3,
  maxPlayers: 6,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Killer Mode",
    roleName: "Killer Mode",
    desc: "There is one Detective and Everyone is a murderer",
    credit: {
      userTag: "Noahs Gaming and More#9436",
      userId: "281397352177074177"
    }
  }
}, {
  gamemodeName: "bot1v1",
  modeId: 7,
  modeStatus: 0,
  minPlayers: 2,
  maxPlayers: 2,
  allowedShop: true,
  allowedInnocent: false,
  allowedRoles: [1, 2, 3],
  createChannels: [0, 5, 1, 2, 3],
  start: {
    modeName: "Bot 1v1 Mode",
    roleName: "Bot 1v1 Mode",
    desc: "A mode that requires 2 players but in reality there are 3 since the bot joins, the bot is either a Murderer, Detective, or Healer.",
    credit: {
      userTag: "FireMario211#2948",
      userId: "126119057232625664"
    }
  },
  extra: {
    allow: true,
    botsAllowed: true,
    botBehavior: {
      bots: 1,
      chatBehavior: {}
    }
  }
}, {
  gamemodeName: "shortroles",
  modeId: 8,
  modeStatus: 0,
  minPlayers: 4,
  maxPlayers: 8,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4],
  createChannels: [0, 5, 1, 2, 3, 4],
  start: {
    modeName: "Short Roles",
    roleName: "Short Roles Mode",
    desc: "Want to play Murder Mystery with just 4 roles and 4 people? This is the mode!",
    credit: {
      userTag: "FireMario211#2948",
      userId: "126119057232625664"
    }
  }
}, {
  gamemodeName: "timemode",
  modeId: 9,
  modeStatus: 0,
  minPlayers: 6,
  maxPlayers: 8,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Time Mode",
    roleName: "Time Mode",
    desc: "In the day time, the Murderer can attack, but in the night they cant.",
    credit: {
      userTag: "betterface ツ#1983",
      userId: "204270560501432320"
    }
  },
  extra: {
    allow: true,
    executeRoleCommands: "day"
  }
}, {
  gamemodeName: "insane",
  modeId: 10,
  modeStatus: 0,
  minPlayers: 6,
  maxPlayers: 8,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Insane Mode",
    roleName: "Insane Mode",
    desc: "Always day, murder can kill anytime and sheriff",
    credit: {
      userTag: "giorno requiem#6428",
      userId: "253659143523532801"
    }
  },
  extra: {
    allow: true,
    timeCycle: true,
    executeRoleCommands: "day",
    noAction: true
  }
}, {
  gamemodeName: "sandbox",
  modeId: 11,
  modeStatus: 0,
  minPlayers: 2,
  maxPlayers: 2,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  createChannels: [0, 5, 1, 2, 3, 4, 6],
  start: {
    modeName: "Sandbox Mode",
    roleName: "Sandbox Mode",
    desc: "You have access to everything.",
    credit: {
      userTag: "betterface ツ#1983",
      userId: "204270560501432320"
    }
  }
}, {
  gamemodeName: "zombie",
  modeId: 12,
  modeStatus: 0,
  minPlayers: 6,
  maxPlayers: 8,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 2, 3, 4, 5, 7],
  createChannels: [0, 5, 1, 2, 3, 4, 7],
  start: {
    modeName: "Zombie Mode",
    roleName: "Zombie Mode",
    desc: "A mode but with zombies that invade the world by infecting others!",
    credit: {
      userTag: "FireMario211#2948",
      userId: "126119057232625664"
    }
  }
}, {
  gamemodeName: "chaosity",
  modeId: 13,
  modeStatus: 0,
  minPlayers: 5,
  maxPlayers: 10,
  allowedShop: true,
  allowedInnocent: true,
  allowedRoles: [1, 1, 1, 2, 2],
  createChannels: [0, 5, 1, 2],
  start: {
    modeName: "Chaos'ity Mode",
    roleName: "Chaos'ity Mode",
    desc: "A mode with 3 murderers, and 2 detectives. The rest however are innocents.",
    credit: {
      userTag: "miro#9638",
      userId: "260024428723830784"
    }
  }
}]
/*
switch (categorya) {
          case "regular":
            modeName = "Regular"
            roleName = "Classic Mode"
            modeId = 1
            break;
          case "murderparty":
            modeName = "Murder Party"
            roleName = modeName
            modeId = 2
            break;
          case "1v1":
            modeName = "1v1 Mode"
            roleName = modeName
            modeId = 3
            break;
          case "humansvsbots":
            modeName = "Humans VS Bots"
            roleName = modeName
            modeId = 4
            break;
          case "unlimitedmode":
            modeName = "Regular (Unlimited Players Mode)"
            roleName = "Unlimited Players Mode"
            modeId = 5
            break;
          case "killermode":
            modeStatus = 1
            return;
            modeName = "Killer Mode"
            roleName = modeName
            modeId = 6
            break;
          case "bot1v1":
            modeName = "Bot 1v1 Mode"
            roleName = modeName
            modeId = 7
            break;
          case "shortroles":
            modeName = "Short Roles"
            roleName = "Short Roles Mode"
            modeId = 8
            break;
          case "timemode":
            modeName = "Time Mode"
            roleName = modeName
            modeId = 9
            break;
          case "insane":
            modeName = "Insane Mode"
            roleName = modeName
            modeId = 10
            break;
          case "sandbox":
            modeName = "Sandbox Mode"
            roleName = modeName
            modeId = 11
            break;
          case "zombie":
            modeName = "Zombie Mode"
            roleName = modeName
            modeId = 12
            break;
          default:
            modeStatus = 3
        }
*/

/*
"detective": "Detective",
            "healer": "Healer",
            "radioperson": "Radio Person",
            "assassin": "Assassin",
            "jailor": "Jailor",
            "innocent": "Innocent"
*/
function random(number) {
  return Math.floor(Math.random() * number)
}
function objectMap(object, mapFn) {
  // credit https://stackoverflow.com/a/14810722
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapFn(object[key])
    return result
  }, {})
}

function turnToArray(object) {
  var result = [];
  for (var key in object) {
    result.push({
      obj: key,
      value: object[key]
    });
  }
  return result
}

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
    case 7:
      return translate[lang].roles.zombie
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
    results.map(x => {
      guildcount = guildcount + x
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
var version = "1.3.0b"
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
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

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
let ownerids = ["126119057232625664", "280158289667555328", "281397352177074177", "553971625679126549"]
bot.on('error', (e) => console.error(e));
bot.on("warn", (e) => console.warn(e));
//bot.on('debug', (e) => console.info(e));
bot.on('ready', () => {
  console.log('Logged in as ' + bot.user.username + ' and I am on ' + bot.guilds.size + ' guilds! (' + bot.user.id + ')')
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
  sql.run(`INSERT INTO murderMystery (guildId, hostRoleID, rank, murderWins, innocentWins, murderchannelid, healchannelid, sheriffchannelid, murdergamechannelid, radiochannelid, host, gameStarted, spectatorchannelid, isDay, isNight, isStopcycle, murdermysteryRoleID, jailorchannelid, jailchannelid, shopchannelid, zombiechannelid, players, modeId, startcmd, gameid, lang, playerInsert, defaultChannel, randomizer, day, daytimelen, nighttimelen, categoryChannelId, gameData, prefix) VALUES ("${guildId}", "0", "0", 0, 0, "0", "0", "0", "0", "0", "0", 0, "0", "0", "0", "0", 0, 0, 0, 0, 0, 0, 0, 0, 0, "English", 0, "0", "0", 0, 55, 60, '0', '', 'mm!')`);
}
bot.on("guildCreate", guild => {
  bot.shard.broadcastEval(`let discord = require('discord.js')
  this.channels.has('350984977371889664') && this.channels.get('350984977371889664').send({
    embed: new discord.RichEmbed().setTitle(':inbox_tray: New Server added!').setAuthor('Server Name: ${guild.name} (${guild.id})'${(guild.iconURL == null) ? ")" : `, '${guild.iconURL}').setThumbnail('${guild.iconURL}')`}.addField('Server Owner ID:', '${guild.ownerID}', true).addField('Member Count:', '${guild.memberCount}', true).setColor(0xFFDF00).setDescription('I am now in ${bot.guilds.size} Servers!').setTimestamp()
  });`)
    .catch(err => console.log(`GUILDHANDLER.DELETE ERR: ${err.stack}`))
  insertGuild(guild.id)
  console.log(`SHARD [${bot.shard.id}] ` + 'Server Name: ' + guild.name + ' (' + guild.id + ')' + ' New Server added! ' + 'I am now in ' + bot.guilds.size + ' Servers!')
  defgame()
  //bot.user.setGame(config.playing + bot.guilds.size + " servers")
});
bot.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  if (["264445053596991498", "110373943822540800"].includes(guild.id)) return;
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
  bot.shard.broadcastEval(`let discord = require('discord.js')
  this.channels.has('350984977371889664') && this.channels.get('350984977371889664').send({
    embed: new discord.RichEmbed().setTitle(':outbox_tray: Bot was removed from a server :(').setAuthor('Server Name: ${guild.name} (${guild.id})'${(guild.iconURL == null) ? ")" : `, '${guild.iconURL}').setThumbnail('${guild.iconURL}')`}.setColor(0xFFDF00).setDescription('I am now in ${bot.guilds.size} Servers!').setTimestamp()
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

function randomizearrayroles() {
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
  if (message.channel.type == 'dm') return;
  sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(guildData => {
    var isstopcycle = 0
    if (guildData) {
      isstopcycle = guildData.isStopcycle
    }

    function createGameChannel(name, data) {
      if (!guildData) throw new Error("I cannot find Guild Data!")
      const findGamemode = gamemodes.find(function (gm) {
        return gm.modeId == guildData.modeId
      })
      if (!findGamemode) return console.trace("ERROR AT createGameChannel")
      switch (name) {
        case "murderer":
          sql.all(`SELECT * FROM murderMysteryPlayers WHERE roleId =1 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (row1.length < 1) {
              message.reply("Error at create murder channel :thonk:")
            } else {
              message.guild.createChannel('murderer', 'text').then(async function (c) {
                var await0 = await c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                if (data.isMurderParty !== 1) {
                  await row1.forEach(async function (userd) {
                    var await1 = await c.overwritePermissions(userd.userId, {
                      READ_MESSAGES: true
                    })
                  })
                }
                var await2 = await c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (data.isMurderParty == 1) {
                  var await3 = await c.overwritePermissions(guildData.murdermysteryRoleID, {
                    READ_MESSAGES: true
                  })
                }
                if (guildData.categoryChannelId !== "0") {
                  var await4 = await c.setParent(guildData.categoryChannelId)
                }
                var await5 = await sql.run(`UPDATE murderMystery SET murderchannelid = "${guildData.murderchannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
                if (data.isMurderParty === 1) {
                  var await6 = await c.send(translate[guildData.lang].jobchannelmsgs.murderer.channel.replace("%prefix%", guildData.prefix))
                  var await7 = await c.send("@everyone" + translate[guildData.lang].jobchannelmsgs.murderer.channel4)
                } else {
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 5 AND guildId ='${message.guild.id}'`).then(async (row6) => {
                    
                    var await8 = await c.send(translate[guildData.lang].jobchannelmsgs.murderer.channel.replace("%prefix%", guildData.prefix))
                    let itemz = ""
                    //let itemz2 = translate[guildData.lang].shopitemdesc
                    let thingsss = translate[guildData.lang].darkshop
                    var await11 = await (function () {
                      for (let i = 0; i < translate[guildData.lang].darkshopitems.length; i++) {
                        itemz += `Name: ${translate[guildData.lang].darkshopitems[i].name}\nDescription: ${translate[guildData.lang].darkshopitems[i].description}\nPrice: ${translate[guildData.lang].darkshopitems[i].price}<:darkgold:385205541955174401>\nID: ${translate[guildData.lang].darkshopitems[i].id}\n\n`
                      }
                      thingsss = thingsss.replace("%item%", itemz)
                    })()
                    thingsss = thingsss.replaceAll("%prefix%", guildData.prefix)
                    var await10 = await c.send(thingsss)
                    var await12 = await (function () {
                      if (debugmode === 1) {
                        console.log("[DEBUG] Add Dark Shop Items")
                      }
                    })()
                    let strthing = `${(row6) ? `<@${row6.userId}>${translate[guildData.lang].jobchannelmsgs.murderer.channel2}` : ""}${row1.map(x=>`<@${x.userId}>`).join(", ")}${translate[guildData.lang].jobchannelmsgs.murderer.channel3}`
                    //var await9 = await c.send("<@" + row6.userId + ">" + translate[guildData.lang].jobchannelmsgs.murderer.channel2 + "<@" + row1.userId + ">" + translate[guildData.lang].jobchannelmsgs.murderer.channel3)
                    
                    var await9 = await c.send(strthing)
                    if (!row6) {
                      if (findGamemode.allowedRoles.includes(5)) {
                        return message.channel.send("`ERROR` Assassin not found!")
                      }
                    }
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
          sql.all(`SELECT * FROM murderMysteryPlayers WHERE roleId = 2 AND guildId ='${message.guild.id}'`).then(row1 => {
            if (row1.length < 1) {
              message.channel.send("Error Code 496 at createdetectivechannel")
              console.error("[Murder Mystery Error] Error Code 496 at createdetectivechannel")
            } else {
              message.guild.createChannel('detective', 'text').then(async function (c) {
                var await0 = await c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                if (data.isHumansvsbots !== 2) {
                  await row1.forEach(async function (userd) {
                    var await1 = await c.overwritePermissions(userd.userId, {
                      READ_MESSAGES: true
                    })
                  })
                }
                var await2 = await c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (guildData.categoryChannelId !== "0") {
                  var await3 = await c.setParent(guildData.categoryChannelId)
                }
                //c.send("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
                var await4 = await c.send(translate[guildData.lang].jobchannelmsgs.detective.channel.replaceAll("%prefix%", guildData.prefix))
                var await5 = await c.send(row1.map(x => `<@${x.userId}>`).join(", "))
                var await6 = await sql.run(`UPDATE murderMystery SET sheriffchannelid = "${guildData.sheriffchannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
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
              message.guild.createChannel('healer', 'text').then(async function (c) {
                var await0 = await c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                var await1 = await c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                var await2 = await c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                var await3 = await c.send(translate[guildData.lang].jobchannelmsgs.healer.channel.replace("%prefix%", guildData.prefix))
                var await4 = await c.send("<@" + row1.userId + ">")
                if (guildData.categoryChannelId !== "0") {
                  var await5 = await c.setParent(guildData.categoryChannelId)
                }
                var await6 = await sql.run(`UPDATE murderMystery SET healchannelid = ${guildData.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
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
              message.guild.createChannel('radio', 'text').then(async function (c) {
                var await0 = await c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                var await1 = await c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                var await2 = await c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (guildData.categoryChannelId !== "0") {
                  var await3 = await c.setParent(guildData.categoryChannelId)
                }
                //c.send("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
                var await4 = await c.send(translate[guildData.lang].jobchannelmsgs.radioperson.channel.replace("%prefix%", guildData.prefix))
                var await5 = await c.send("<@" + row1.userId + ">")
                var await6 = await sql.run(`UPDATE murderMystery SET radiochannelid = "${guildData.radiochannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
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
                  message.guild.createChannel('jailor', 'text').then(async function (c) {
                    var await30 = await c.overwritePermissions(message.guild.id, {
                      READ_MESSAGES: false
                    })
                    var await31 = await c.overwritePermissions(row1.userId, {
                      READ_MESSAGES: true
                    })
                    var await32 = await c.overwritePermissions(bot.user, {
                      READ_MESSAGES: true
                    })
                    if (guildData.categoryChannelId !== "0") {
                      var await33 = await c.setParent(guildData.categoryChannelId)
                    }
                    //c.send("Hello there, You are the **Jailor**, You will jail people every night and ask them questions. If you think the person is the murderer, feel free to type \n**" + config.prefix + "execute**\nTo execute the person, If you want to jail the person, type\n" + config.prefix + "jail `@user`\nTo jail the person you want to interrogate someone, OR you can type\n" + config.prefix + "jailnumber `id`\nTo jail the user but in a list that will be shown below, If you execute someone, Then it will be announced in the #murdergame, Hope you find out who the murderer is!")
                    var await34 = await c.send(translate[guildData.lang].jobchannelmsgs.jailor.channel.replaceAll("%prefix%", guildData.prefix))
                    var await35 = await c.send("<@" + row1.userId + ">")
                    var await36 = await sql.run(`UPDATE murderMystery SET jailorchannelid = "${guildData.jailorchannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
                  })
                }

                function b() {
                  message.guild.createChannel('jail', 'text').then(async function (c) {
                    var await30 = await c.overwritePermissions(message.guild.id, {
                      READ_MESSAGES: false
                    })
                    var await31 = await c.overwritePermissions(row1.userId, {
                      READ_MESSAGES: true
                    })
                    var await32 = await c.overwritePermissions(bot.user, {
                      READ_MESSAGES: true
                    })
                    if (guildData.categoryChannelId !== "0") {
                      var await33 = await c.setParent(guildData.categoryChannelId)
                    }
                    //c.send("Hello, Welcome to **Jail**, this is where you have jailed people and you interrogate them by answering some questions, Also hello jailed person! Welcome to jail, If the Jailor thinks your suspicious, then you probably are going to be executed, If you murder the person, They might have a last will and then it will show the public chat the will and show who they jailed. Anyways, Don't try to get executed or else you'll end up like Shadow where he had his head cut off. Anyways, Hope you try to not get executed!")
                    var await34 = await c.send(translate[guildData.lang].jobchannelmsgs.jailor.jailchannel)
                    var await35 = await sql.run(`UPDATE murderMystery SET jailchannelid = "${guildData.jailchannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
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
              message.guild.createChannel('zombie', 'text').then(async function (c) {
                var await0 = await c.overwritePermissions(message.guild.id, {
                  READ_MESSAGES: false
                })
                var await1 = await c.overwritePermissions(row1.userId, {
                  READ_MESSAGES: true
                })
                var await2 = await c.overwritePermissions(bot.user, {
                  READ_MESSAGES: true
                })
                if (guildData.categoryChannelId !== "0") {
                  var await3 = await c.setParent(guildData.categoryChannelId)
                }
                var await4 = await c.send(translate[guildData.lang].jobchannelmsgs.zombie.channel.replace("%prefix%", guildData.prefix))
                var await5 = await c.send("<@" + row1.userId + ">")
                var await6 = await sql.run(`UPDATE murderMystery SET zombiechannelid = "${guildData.zombiechannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
              })
            }
          })
          break;
        default:
          message.channel.send("you thing an error has occured because you were trying to hack inside the bot")
          break;
        case "murdergame":
          message.guild.createChannel('murdergame', 'text').then(async function (c) {
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE MURDER GAME CHANNEL")
            }
            var await0 = await c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            var await1 = await c.overwritePermissions(guildData.murdermysteryRoleID, {
              READ_MESSAGES: true
            })
            if (guildData.categoryChannelId !== "0") {
              var await2 = await c.setParent(guildData.categoryChannelId)
            }
            if (data.isMurderParty === 1) {
              //c.send("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **" + guildData.players + "** Murderer(s)...wait why is there **" + mmgameData.enterid + "** Murderer(s)...There is suppose to be one...OH I remember! We are playing Murder Party Mode! That means EVERYONE is a murderer, and you should not trust ANYONE If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, then it doesn't matter because everyone is a murderer\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game!~~Hope Innocents Win!~~")
              var await3 = await c.send(translate[guildData.lang].murdergamemurderparty.replaceAll("%prefix%", guildData.prefix))
            } else if (data.isMurderParty === 0) {
              var await4 = await c.send(translate[guildData.lang].murdergameregular.replaceAll("%prefix%", guildData.prefix))
            }
            if (debugmode === 1) {
              console.log("[DEBUG] MURDER GAME Channel ID set")
            }
            var await5 = await sql.run(`UPDATE murderMystery SET murdergamechannelid = "${guildData.murdergamechannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
          })
          break;
        case "shop":
          message.guild.createChannel('shop', 'text').then(async function (c) {
            var await0 = await c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            var await1 = await c.overwritePermissions(guildData.murdermysteryRoleID, {
              READ_MESSAGES: true
            })
            var await2 = await c.overwritePermissions(bot.user, {
              READ_MESSAGES: true
            })
            if (guildData.categoryChannelId !== "0") {
              var await3 = await c.setParent(guildData.categoryChannelId)
            }
            let itemz = ""
            let itemz2 = translate[guildData.lang].shopitemdesc
            let thingsss = translate[guildData.lang].shop
            var await4 = await (function () {
              for (let i = 0; i < translate[guildData.lang].shopitems.length; i++) {
                itemz += `Name: ${translate[guildData.lang].shopitems[i].name}\nDescription: ${translate[guildData.lang].shopitems[i].description}\nPrice: ${translate[guildData.lang].shopitems[i].price}<:gold:384017291316297729>\nID: ${translate[guildData.lang].shopitems[i].id}\n\n`
              }
              thingsss = thingsss.replace("%item%", itemz)
            })()
            thingsss = thingsss.replaceAll("%prefix%", guildData.prefix)

            var await5 = await c.send(thingsss)
            var await6 = await sql.run(`UPDATE murderMystery SET shopchannelid = "${guildData.shopchannelid = c.id}" WHERE guildId = '${message.guild.id}'`)
          })
          break;
      }
    }
    async function stopGameMsg(rows, msg, color, findGamemode) {
      let embed = new RichEmbed().setTitle(msg).setFooter("If they just say N/A, then ignore it.")
      if (color != 'DEFAULT') {
        embed = embed.setColor(color)
      }
      let rolesEm = []
      let strInno = []
      async function otherfunc(rol, eo) {
        // Refrence (and credit): https://stackoverflow.com/questions/23357933/merge-duplicates-in-javascript-array and https://stackoverflow.com/a/35017482
        var newStupdi = rol.reduce(function (a, b) {
          // row not existing, nothing about this id registered > add only string
          if (!a[b.role] || !a[b.role].user) {
            a[b.role] = {
              user: b.user
            };
          }
          // row already an array > add new with []
          else if (a[b.role].user instanceof Array) {
            a[b.role].user.push(b.user);
          }
          // row existing > create array with existing string and new one
          else {
            a[b.role] = {
              user: [a[b.role].user, b.user]
            };
          }
          return a;
        }, {});
        await turnToArray(newStupdi).forEach(function (wow) {
          embed = embed.addField(wow.obj, ((Array.isArray(wow.value.user)) ? wow.value.user.filter((item, pos) => wow.value.user.indexOf(item) == pos).join(", ") : wow.value.user), true)
        })
        await bot.channels.get(guildData.defaultChannel).send({
          embed: ((findGamemode.allowedInnocent) ? embed.setDescription("**Innocents**\n" + eo.filter((item, pos) => eo.indexOf(item) == pos).join("\n")) : embed)
        })
      }
      await (function () {
        for (let row21 of rows) {
          findGamemode.allowedRoles.forEach(function (rol) {
            if (rol == 1 && row21.roleId == 1) {
              rolesEm.push({
                role: translate[guildData.lang].roles.murderer,
                user: bot.users.get(row21.userId).tag
              })
            } else if (rol == 2 && row21.roleId == 2) {
              rolesEm.push({
                role: translate[guildData.lang].roles.detective,
                user: bot.users.get(row21.userId).tag
              })
            } else if (rol == 3 && row21.roleId == 3) {
              rolesEm.push({
                role: translate[guildData.lang].roles.healer,
                user: bot.users.get(row21.userId).tag
              })
            } else if (rol == 4 && row21.roleId == 4) {
              rolesEm.push({
                role: translate[guildData.lang].roles.radioperson,
                user: bot.users.get(row21.userId).tag
              })
            } else if (rol == 5 && row21.roleId == 5) {
              rolesEm.push({
                role: translate[guildData.lang].roles.assassin,
                user: bot.users.get(row21.userId).tag
              })
            } else if (rol == 6 && row21.roleId == 6) {
              rolesEm.push({
                role: translate[guildData.lang].roles.jailor,
                user: bot.users.get(row21.userId).tag
              })
            } else if (rol == 7 && row21.roleId == 7) {
              rolesEm.push({
                role: translate[guildData.lang].roles.zombie,
                user: bot.users.get(row21.userId).tag
              })
            } else if (findGamemode.allowedInnocent && row21.roleId == 0) {
              strInno.push(bot.users.get(row21.userId).tag)
            }
          })
        }
        otherfunc(rolesEm, strInno)
      })()
      await (async function () {

      })()
    }
    async function deleteGameChannel() {
      if (!guildData) return message.reply("ERR!")
      let findGamemode = gamemodes.find(function (gm) {
        return gm.modeId == guildData.modeId
      })
      // (IDs: 0 > #murdergame | 5 > #shop | 1 > #murderer | 2 > #detective | 3 > #healer | 4 > #radio | 6 > #jailor and #jail | 7 > #zombie)
      async function deleteC(e) {
        switch (e) {
          case 0:
            let channela = bot.channels.get(guildData.murdergamechannelid)
            if (!channela) {
              await message.channel.send("`ERROR` Murder Game Channel not found!")
            } else {
              await channela.delete()
            }
            break;
          case 1:
            let channelab = bot.channels.get(guildData.murderchannelid)
            if (!channelab) {
              await message.channel.send("`ERROR` Murderer Channel not found!")
            } else {
              await channelab.delete()
            }
            break;
          case 2:
            let channelac = bot.channels.get(guildData.sheriffchannelid)
            if (!channelac) {
              await message.channel.send("`ERROR` Detective Channel not found!")
            } else {
              await channelac.delete()
            }
            break;
          case 3:
            let channelad = bot.channels.get(guildData.healchannelid)
            if (!channelad) {
              await message.channel.send("`ERROR` Healer Channel not found!")
            } else {
              await channelad.delete()
            }
            break;
          case 4:
            let channelaf = bot.channels.get(guildData.radiochannelid)
            if (!channelaf) {
              await message.channel.send("`ERROR` Radio Channel not found!")
            } else {
              await channelaf.delete()
            }
            break;
          case 5:
            let channelae = bot.channels.get(guildData.shopchannelid)
            if (!channelae) {
              await message.channel.send("`ERROR` Shop Channel not found!")
            } else {
              await channelae.delete()
            }
            break;
          case 6:
            let channelag = bot.channels.get(guildData.jailorchannelid)
            let channelage = bot.channels.get(guildData.jailchannelid)

            if (!channelag) {
              await message.channel.send("`ERROR` Jailor Channel not found!")
            }
            if (!channelage) {
              await message.channel.send("`ERROR` Jail Channel not found!")
            }
            if (channelag) {
              await channelag.delete()
            }
            if (channelage) {
              await channelage.delete()
            }
            break;
          case 7:
            let channelah = bot.channels.get(guildData.zombiechannelid)
            if (!channelah) {
              await message.channel.send("`ERROR` Zombie Channel not found!")
            } else {
              await channelah.delete()
            }
            break;

        }
      }
      findGamemode.createChannels.forEach(async function (e) {
        await deleteC(e)
      })
    }
    // eval commands
    var execute = function (command) {
      let response = ""
      let res = ""
      let erro = false
      switch (command) {
        case "win":
          try {
            victory()
            res = "Ran victory() function successfully"
          } catch (err) {
            erro = true
            res = err
          }
          break;
        case "lose":
          try {
            nonvict()
            res = "Ran nonvict() function successfully"
          } catch (err) {
            erro = true
            res = err
          }
          break;
        case "help":
        default:
          res = "win, lose, help"
          break;
      }
      if (!erro) {
        response = `Executed 1 Command(s): ${(command == undefined) ? "N/A" : command} successfully with response:\n${res}`
      } else {
        response = `ERROR: There was an issue whilist executing 1 command: ${command}\n${res}`
      }
      return response;
    }
    if (message.channel.type === "dm") return // message.author.send("Sorry but you may not DM Murder Mystery Bot.")
    if (!guildData) return insertGuild(message.guild.id)

    function roleupdate(playerid, roleid, checkforcedrole) {
      if (checkforcedrole === 1) return;
      var playeridz = playerid
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          message.channel.send(translate[guildData.lang].errors.error498code)
          console.error("[Murder Mystery Error] Error Code 498 at roleupdate")
        } else {
          sql.run(`UPDATE murderMysteryPlayers SET roleId = ${roleid} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
        }
      })
    }
    if (message.author.bot) return;
    //if (message.channel.type === 'dm') return message.author.send("You cannot use commands in DMs! Please use it on a server!")
    function afwefaw() {
      try {
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
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
    //old is config.prefix
    if (message.content.startsWith(guildData.prefix)) {
      command = command.split(" ")[0];
      command = command.slice(guildData.prefix.length);
      wjoiagfewjfw = 1
    }
    if (botMentionPrefix && botMentionPrefix.id === bot.user.id && !message.content.startsWith(guildData.prefix)) {
      command = command.split(" ")[1];
      wjoiagfewjfw = 1
    }
    if (wjoiagfewjfw === 0) return;
    if (command === "" || command === undefined) return message.channel.send("**The prefix is `" + guildData.prefix + "`.**")
    //if (!message.content.startsWith(config.prefix)) return;
    var isdayloop;
    var isnightloop;
    var murderdeadloop;
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
      message.channel.send("**The prefix is `" + guildData.prefix + "`.**")
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
      if (!guildData) return message.reply("**ERROR**")
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
            bot.users.get(row.userId).send(translate[guildData.lang].haha + bot.users.get(user) + ".")
          }
          if (type === 5) {
            //bot.users.get(row.userId).send("Your target has been killed! You have gained 3 <:gold:384017291316297729>!\nYou have no new Targets.")
            sql.run(`UPDATE murderMysteryPlayers SET gold = gold + 1 WHERE userId = '${row.userId}' AND guildId = '${message.guild.id}'`)
            bot.users.get(row.userId).send(translate[guildData.lang].fekrofa)
            return
          }
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
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
        commandFile.globalgamesCMD(bot, message, args, config, sql, rolerandomizer, debugmode, "profile");
      } catch (err) {
        console.error(err);
      }
    }
    if (command === "friendinfo") {
      if (!cooldowns.has("globalgamesFriendInf")) {
        cooldowns.set("globalgamesFriendInf", new Collection());
      }
      let cooldownAmountz = 15
      const now = Date.now();
      const timestamps = cooldowns.get("globalgamesFriendInf");
      const cooldownAmount = (cooldownAmountz || 3) * 1000;

      if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      } else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`**Please wait \`${timeLeft.toFixed(1)}\` more second(s) before reusing the \`Friend Info\` command.**`);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
      try {
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
        commandFile.globalgamesCMD(bot, message, args, config, sql, rolerandomizer, debugmode, "friendinfo");
      } catch (err) {
        console.error(err);
      }
    }
    if (command === "acceptreport") {
      try {
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
        commandFile.reportCommand(bot, message, args, config, sql, rolerandomizer, debugmode, "acceptreport");
      } catch (err) {
        console.error(err);
      }
    }
    if (command === "rejectreport") {
      try {
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
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
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
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
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
        commandFile.commandHandler(bot, message, args, config, sql, rolerandomizer, debugmode, "taunt");
      } catch (err) {
        console.error(err);
      }
    }
    if (command === "leave") {
      try {
        let commandFile = require("./cogs/GlobalGames.js"); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
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
        let commandFile = require(globalGamesDir); // GlobalGames.js is a private file and will not be shared anywhere or to anyone.
        commandFile.globalgamesCMD(bot, message, args, config, sql, rolerandomizer, debugmode, -1);
      } catch (err) {
        console.error(err);
      }
    }
    if (command == "spectate") {
      if (guildData.gameStarted === 0) return message.reply(translate[row.lang].gamehasntstart)
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
        if (!checkUser) {
          if (!bot.channels.get(guildData.murdergamechannelid)) return;
          if (bot.channels.get(guildData.murdergamechannelid).permissionOverwrites.filter(x => x.id == "553971625679126549").map(x => x.allow) == 1024) return message.reply("**You are already spectating the game!**")
          message.channel.send("**You are now spectating the game!**\nYou may not be able to see role channels however, due to the risk of spectators calling out the Murderer, spectators also cannot send messages.")
          bot.channels.get(guildData.murdergamechannelid).overwritePermissions(message.author, {
            READ_MESSAGES: true,
            SEND_MESSAGES: false
          })
          bot.channels.get(guildData.shopchannelid).overwritePermissions(message.author, {
            READ_MESSAGES: true,
            SEND_MESSAGES: false
          })
        } else {
          message.channel.send("**You cannot spectate as you are already playing.**")
        }
      })
    }
    if (command === "game") {
      if (blacklistedguild(message.guild.id) || blacklisteduser(message.author.id)) return message.reply(translate[row.lang].blacklistguildjsa.replace("%prefix%", guildData.prefix))
      if (message.channel.type === 'dm') {
        message.author.send("I cannot respond with this command in DMS.")
        return;
      }
      let category = args[0]
      if (category === "dev") {
        if (!["126119057232625664", "553971625679126549"].includes(message.author.id)) return
        let ccc = args[1]
        if (ccc === "day") {
          isDay()
        }
      } else
      if (category === "modecmds") {
        let roledata = message.guild.roles.get(guildData.hostRoleID)
        //let murdermysterydataa = message.guild.roles.get(guildData.murdermysteryRoleID)
        //if (!roledata) return message.reply(mm.msgs.errors.hostrole)
        if (!roledata) return message.reply(translate[guildData.lang].hostrole)
        if (!message.guild.member(message.author).roles.has(roledata.id)) {
          return message.reply(translate[guildData.lang].hostroleperms)
        }
        if (guildData.startcmd === 0) return message.reply(translate[guildData.lang].gamehasntstart)
        if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
        let cmdonlyworks = translate[guildData.lang].cmdonlyworks
        if (guildData.modeId !== 11) return message.reply(cmdonlyworks.replace("%modename%", "Sandbox Mode"))
        let settings = args[1]
        let thi = translate[guildData.lang].notrightarguments
        if (!settings) return message.channel.send(thi.replace("%modename%", "Sandbox Mode") + "\n```\nmm!game modecmds setgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds addgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds removegold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds kill <@User>\nmm!game modecmds daytime\nmm!game modecmds nighttime\nmm!game modecmds revive <@User>\nmm!game modecmds destruction\nmm!game modecmds additem <@User> <Type (either normal/dark)> <ItemID>\n```");
        if (settings === "setgold") {
          let typegold = args[2]
          if (!typegold) return message.channel.send(translate[guildData.lang].sandboxmode.typeofgold)
          if (typegold.toLowerCase() === "normal") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let goldamount = args[4]
            if (!goldamount) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount)
            if (isNaN(parseInt(goldamount))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount);
            goldamount = parseInt(goldamount)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                sql.run(`UPDATE murderMysteryPlayers SET gold = ${goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)

                let goldthtin = translate[guildData.lang].sandboxmode.setgold
                goldthtin = goldthtin.replace("%goldamount%", goldamount)
                goldthtin = goldthtin.replace("%user%", user)
                message.channel.send(goldthtin)
              }
            })
            return;
          }
          if (typegold.toLowerCase() === "dark") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let goldamount = args[4]
            if (!goldamount) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount)
            if (isNaN(parseInt(goldamount))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount);
            goldamount = parseInt(goldamount)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                let goldthtin = translate[guildData.lang].sandboxmode.setgold
                goldthtin = goldthtin.replace("%goldamount%", goldamount)
                goldthtin = goldthtin.replace("%user%", user)
                message.channel.send(goldthtin)
              }
            })
            return;
          }
          return message.channel.send(translate[guildData.lang].sandboxmode.typeofgold)
        }
        if (settings === "additem") {
          //additem <@User> <Type (either normal/dark)> <ItemID>
          let typeitem = args[3]
          if (!typeitem) return message.channel.send(translate[guildData.lang].sandboxmode.typeofitem)
          let shopitems = translate[guildData.lang].shopitems
          let darkshopitems = translate[guildData.lang].darkshopitems
          if (typeitem.toLowerCase() === "normal") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let itemID = args[4]
            if (!itemID) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteritemid)
            if (isNaN(parseInt(itemID))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteritemid);
            itemID = parseInt(itemID)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                let findItem = shopitems.find(function (a) {
                  return a.id === itemID
                })
                if (findItem === undefined) return message.reply(translate[guildData.lang].unknownitem)
                let goldthtin = translate[guildData.lang].sandboxmode.addgold
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
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let itemID = args[4]
            if (!itemID) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteritemid)
            if (isNaN(parseInt(itemID))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteritemid);
            itemID = parseInt(itemID)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                let findItem = darkshopitems.find(function (a) {
                  return a.id === itemID
                })
                if (findItem === undefined) return message.reply(translate[guildData.lang].unknownitem)
                let goldthtin = translate[guildData.lang].sandboxmode.addgold
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
          return message.channel.send(translate[guildData.lang].sandboxmode.typeofitem)
        }
        if (settings === "addgold") {
          let typegold = args[2]
          if (!typegold) return message.channel.send(translate[guildData.lang].sandboxmode.typeofgold)
          if (typegold.toLowerCase() === "normal") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let goldamount = args[4]
            if (!goldamount) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount)
            if (isNaN(parseInt(goldamount))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount);
            goldamount = parseInt(goldamount)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                sql.run(`UPDATE murderMysteryPlayers SET gold = ${checkUser.gold + goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                let goldthtin = translate[guildData.lang].sandboxmode.addgold
                goldthtin = goldthtin.replace("%goldamount%", goldamount)
                goldthtin = goldthtin.replace("%user%", user)
                message.channel.send(goldthtin)
              }
            })
            return;
          }
          if (typegold.toLowerCase() === "dark") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let goldamount = args[4]
            if (!goldamount) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount)
            if (isNaN(parseInt(goldamount))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount);
            goldamount = parseInt(goldamount)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${checkUser.darkgold + goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                let goldthtin = translate[guildData.lang].sandboxmode.addgold
                goldthtin = goldthtin.replace("%goldamount%", goldamount)
                goldthtin = goldthtin.replace("%user%", user)
                message.channel.send(goldthtin)
              }
            })
            return;
          }
          return message.channel.send(translate[guildData.lang].sandboxmode.typeofgold)
        }
        if (settings === "removegold") {
          let typegold = args[2]
          if (!typegold) return message.channel.send(translate[guildData.lang].sandboxmode.typeofgold)
          if (typegold.toLowerCase() === "normal") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let goldamount = args[4]
            if (!goldamount) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount)
            if (isNaN(parseInt(goldamount))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount);
            goldamount = parseInt(goldamount)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                sql.run(`UPDATE murderMysteryPlayers SET gold = ${checkUser.gold - goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                let goldthtin = translate[guildData.lang].sandboxmode.removegold
                goldthtin = goldthtin.replace("%goldamount%", goldamount)
                goldthtin = goldthtin.replace("%user%", user)
                message.channel.send(goldthtin)
              }
            })
            return;
          }
          if (typegold.toLowerCase() === "dark") {
            let user = message.mentions.users.first()
            if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
            let goldamount = args[4]
            if (!goldamount) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount)
            if (isNaN(parseInt(goldamount))) return message.channel.send(translate[guildData.lang].sandboxmode.pleaseenteramount);
            goldamount = parseInt(goldamount)
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
              if (!checkUser) {
                message.channel.send(translate[guildData.lang].userisnotingame)
              } else {
                sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${checkUser.darkgold - goldamount} WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`)
                let goldthtin = translate[guildData.lang].sandboxmode.removegold
                goldthtin = goldthtin.replace("%goldamount%", goldamount)
                goldthtin = goldthtin.replace("%user%", user)
                message.channel.send(goldthtin)
              }
            })
            return;
          }
          return message.channel.send(translate[guildData.lang].sandboxmode.typeofgold)
        }
        if (settings === "kill") {
          let user = message.mentions.users.first()
          if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
            if (!checkUser) {
              message.channel.send(translate[guildData.lang].userisnotingame)
            } else {
              if (checkUser.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
              if (checkUser.roleId === 1) {
                let taaaaa = translate[guildData.lang].sandboxmode.kill
                message.channel.send(taaaaa.replace("%user%", user))
                setTimeout(function () {
                  victory()
                }, 1000)
                return;
              }
              user.send(translate[guildData.lang].stabbed2).catch(e => {
                message.channel.send(`${user}, ${translate[guildData.lang].dmsdisabled}`)
              })
              sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
              sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
              nopermstoanychannel(checkUser.playerid)
              stabbedbymurder(user.id, 0, 0, checkUser.lastwill, checkUser.roleId)
              //targetassassin(thing, 1)
              let taaaaa = translate[guildData.lang].sandboxmode.kill
              message.channel.send(taaaaa.replace("%user%", user))
            }
          })
          return
        }
        if (settings === "revive") {
          let user = message.mentions.users.first()
          if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId = '${message.guild.id}'`).then(checkUser => {
            if (!checkUser) {
              message.channel.send(translate[guildData.lang].userisnotingame)
            } else {
              if (checkUser.isDead === 0) return
              bot.channels.get(guildData.murderchannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.sheriffchannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.radiochannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.jailorchannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.jailchannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.shopchannelid).overwritePermissions(user, {
                SEND_MESSAGES: null
              })
              let taaaaa = translate[guildData.lang].sandboxmode.revive
              message.channel.send(taaaaa.replace("%user%", user))
              bot.channels.get(guildData.murdergamechannelid).send(":angel: " + user + translate[guildData.lang].jobchannelmsgs.healer.hasbeenrevived)
              user.send(translate[guildData.lang].jobchannelmsgs.healer.dm).catch(e => {
                message.channel.send(`${user}, ${translate[guildData.lang].dmsdisabled}`)
              })
              sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user.id}`);
              sql.run(`UPDATE murderMystery SET players = ${guildData.players + 1} WHERE guildId = '${message.guild.id}'`);

            }
          })
          return
        }
        if (settings === "destruction") {
          message.channel.send(translate[guildData.lang].sandboxmode.destruction)
          setTimeout(function () {
            nonvict()
          }, 1000)
          return;
        }
        if (settings === "daytime") {
          clearTimeout(isdayloop)
          clearTimeout(isnightloop)
          isDay()
          message.channel.send(translate[guildData.lang].sandboxmode.daytime)
          return;
        }
        if (settings === "nighttime") {
          clearTimeout(isdayloop)
          clearTimeout(isnightloop)
          isNight()
          message.channel.send(translate[guildData.lang].sandboxmode.nighttime)
          return;
        }
        return message.channel.send(thi.replace("%modename%", "Sandbox Mode") + "\n```\nmm!game modecmds setgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds addgold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds removegold <Type (either normal/dark)> <@User> <GoldAmount>\nmm!game modecmds kill <@User>\nmm!game modecmds daytime\nmm!game modecmds nighttime\nmm!game modecmds revive <@User>\nmm!game modecmds destruction\n```");

      }
      if (category === "fixgame") {
        let roledata = message.guild.roles.get(guildData.hostRoleID)
        //let murdermysterydataa = message.guild.roles.get(guildData.murdermysteryRoleID)
        //if (!roledata) return message.reply(mm.msgs.errors.hostrole)
        if (!roledata) return message.reply(translate[guildData.lang].hostrole)
        if (!message.guild.member(message.author).roles.has(roledata.id)) {
          return message.reply(translate[guildData.lang].hostroleperms)
        }
        message.reply(translate[guildData.lang].fixgame).then(async m => {
          await aaaaaaa()
          await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
          await m.edit(translate[guildData.lang].fixedgame)
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
      function insertbot(playercount, fn) {
        var playeridzz = playercount
        var tenant_id_count = parseInt(playeridzz);
        var playeridz = tenant_id_count + 1
        if (isNaN(tenant_id_count)) return new Error("Player ID isn't an Integer!")
        let myString = guildData.randomizer
        var rolerand = myString.split(/(|)/)
        rolerand = myString.split("|")
        if (debugmode === 1) {
          console.log("[DEBUG] INSERT BOT ID " + playeridz)
        }

        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            //addplayer()
            sql.run(`INSERT INTO murderMysteryPlayers (guildId, userId, playerid, gold, isGlobalGames, lastwill) VALUES ("${message.guild.id}", "${bot.user.id}", ${playeridz}, 1, 0, ?)`, [randomnamechooser()]);
            sql.run(`UPDATE murderMystery SET players = ${guildData.players = guildData.players + 1} WHERE guildId = '${message.guild.id}'`)
            return fn(1);
          } else {
            message.reply("`ERROR` Bot is already in the game!")
            console.error("[Murder Mystery Error] Bot is already in the game!")
            sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
            return fn(0);
          }
        })
        return 
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playeridzz}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, bot.user.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, randomnamechooser(), 0, 0, 0, 0, 0, 0, playeridzz]);

          } else {
            message.reply("`ERROR` Bot is already in the game!")
            console.error("[Murder Mystery Error] Bot is already in the game!")
          }
        })
      }

      function insertplayer(playercount, mmroleid, msgid) {
        //if (guildData.playerInsert === 1) return;
        var playeridzz = playercount
        var tenant_id_count = parseInt(playeridzz);
        var playeridz = tenant_id_count + 1
        if (isNaN(tenant_id_count)) return new Error("Player ID isn't an Integer!")
        let myString = guildData.randomizer
        var rolerand = myString.split(/(|)/)
        rolerand = myString.split("|")
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            //addplayer()
            sql.run(`INSERT INTO murderMysteryPlayers (guildId, userId, playerid, gold, isGlobalGames) VALUES ("${message.guild.id}", "${message.author.id}", ${playeridz}, 1, 0)`);
            let murdermysterydataa = message.guild.roles.get(mmroleid)
            if (!murdermysterydataa) return message.reply("Error...")
            //arr.push(message.author.id)
            message.guild.member(message.author).addRole(murdermysterydataa)
            message.channel.fetchMessage(msgid).then(m => {
              m.edit(message.author + translate[guildData.lang].joinedgame)
            })
            sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
            //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = 1www} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
            //message.reply("SETUP!")
          } else {

            message.channel.fetchMessage(msgid).then(m => {
              m.edit(message.author + translate[guildData.lang].alreadyingame)
            })
            sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
          }
        })


        return;
        //if (guildData.isMurderparty === 1) {
        if (guildData.modeId === 2) {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0, 1, 0, 0]);
              sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, roleId, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted, gold, darkgold, isGlobalGames) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 1, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0]);
              let murdermysterydataa = message.guild.roles.get(mmroleid)

              if (!murdermysterydataa) return message.reply("Error...")
              //arr.push(message.author.id)
              message.guild.member(message.author).addRole(murdermysterydataa)

              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + translate[guildData.lang].joinedgame)
              })
              sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
            } else {
              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + translate[guildData.lang].alreadyingame)
              })
              sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
            }
          })
          return;
        }
        if (guildData.modeId === 8) {
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
                m.edit(message.author + translate[guildData.lang].joinedgame)
              })
              sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
              //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = 1www} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
              //message.reply("SETUP!")
            } else {
              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + translate[guildData.lang].alreadyingame)
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
              m.edit(message.author + translate[guildData.lang].joinedgame)
            })
            sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
            //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = 1www} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
            //message.reply("SETUP!")
          } else {

            message.channel.fetchMessage(msgid).then(m => {
              m.edit(message.author + translate[guildData.lang].alreadyingame)
            })
            sql.run(`UPDATE murderMystery SET playerInsert = 0 WHERE guildId = '${message.guild.id}'`)
          }
        })
      }
      if (category === "addhostrole") {
        let staff = message.guild.member(message.author).permissions.has('MANAGE_ROLES')
        //if (!staff) return message.reply("You do not have permission to add a host role! You need the `MANAGE_ROLES` permission")
        if (!staff) return message.reply(translate[guildData.lang].manageroles)
        let rolename = args.splice(1).join(' ')
        let roledata = message.guild.roles.find(function (role) {
          return role.name.toLowerCase() == rolename.toLowerCase
        })
        let roleMention = message.mentions.roles.first()
        //if (!roledata) return message.reply(mm.msgs.errors.roleexisting)
        if (!roledata && !roleMention) return message.reply(translate[guildData.lang].errors.roleexisting)
        let aaaa
        if (!roledata && roleMention) {
          aaaa = roleMention
        }
        if (roledata && !roleMention) {
          aaaa = roledata
        }
        sql.run(`UPDATE murderMystery SET hostRoleID = ? WHERE guildId = '${message.guild.id}'`, [aaaa.id]);
        //message.reply("Successfully put the role '" + rolename + "' into the Database! ")
        message.reply(translate[guildData.lang].koefk + aaaa.name + translate[guildData.lang].keeod)
      } else
      if (category === "setupdata") {
        /*sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
          if (!row) {
            insertGuild(message.guild.id)
            message.reply("Successfully put your server into the database!")
          } else {
            message.reply("You have already setup this.")
          }
        })*/
      } else

      function forcerole(userid) {

      }
      if (category === "force") {
        return message.reply("This command is not finished yet!")
        if (guildData.gameStarted === 1) return message.reply(translate[guildData.lang].gamealreadystart)
        if (guildData.startcmd === 0) return message.reply("The game hasn't been started!")
        //if (guildData.isMurderparty === 1) return message.reply("Sorry but you can't change roles in `Murder Party` Mode!")
        if (guildData.modeId === 2) return message.reply("Sorry but you can't change roles in `Murder Party` Mode!")
        if (guildData.modeId === 3) return message.reply("Sorry but you can't change roles in `1v1` Mode!")
        if (guildData.modeId === 7) return message.reply("Sorry but you can't change roles in `Bot 1v1` Mode!")
        //if (guildData.isOneVOne === 1) return message.reply("Sorry but you can't change roles in `1v1` Mode!")

        let user = message.mentions.users.first();
        if (!args[0]) return message.reply("Please mention a user.")
        if (!user) return message.reply("That is an invalid user!")
        let role = args[1]
        if (!role) return message.reply("Please type in a role you want to pick.\n**List of roles:**\n```\nmurderer\ndetective\nhealer\nbroadcaster\nassassin\njailor")
        if (role === "murderer") {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply(translate[guildData.lang].thatuserhasntjoined)
            } else {
              roleupdate(row1.playerid, 1)
            }
          })
          return;
        }
        if (role === "detective") {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply(translate[guildData.lang].thatuserhasntjoined)
            } else {
              roleupdate(row1.playerid, 2)
            }
          })
          return;
        }
        if (role === "healer") {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply(translate[guildData.lang].thatuserhasntjoined)
            } else {
              roleupdate(row1.playerid, 3)
            }
          })
          return;
        }
        if (role === "broadcaster") {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply(translate[guildData.lang].thatuserhasntjoined)
            } else {
              roleupdate(row1.playerid, 4)
            }
          })

          return;
        }
        if (role === "assassin") {
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              message.reply(translate[guildData.lang].thatuserhasntjoined)
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
              message.reply(translate[guildData.lang].thatuserhasntjoined)
            } else {
              roleupdate(row1.playerid, 6)
            }
          })

          return;
        }
      }
      if (category === "start") {
        if (guildData.categoryChannelId !== "0") {
          let findCategoryExists = message.guild.channels.find('id', guildData.categoryChannelId)
          if (!findCategoryExists) {
            sql.run(`UPDATE murderMystery SET categoryChannelId = 0 WHERE guildId = "${message.guild.id}"`)
            message.channel.send("**The setting you've entered for \"category\" had been reset because the category you've provided doesn't exist!")
          }
        }
        //if(preventjoinData.start === 1) return message.reply("There is already a game going on in another server")
        let roledata = message.guild.roles.get(guildData.hostRoleID)
        //let murdermysterydataa = message.guild.roles.get(guildData.murdermysteryRoleID)
        //if (!roledata) return message.reply(mm.msgs.errors.hostrole)
        if (!roledata) return message.reply(translate[guildData.lang].errors.hostrole)
        if (!message.guild.member(bot.user).permissions.has('MANAGE_ROLES')) return message.reply("Please give me the permission `MANAGE_ROLES` so you can play Murder Mystery!")
        if (!message.guild.member(bot.user).permissions.has('MANAGE_CHANNELS')) return message.reply("Please give me the permission `MANAGE_CHANNELS` so you can play Murder Mystery!")
        if (guildData.defaultChannel === '0') return message.reply("**Please set the default channel!** You can do this by typing mm!settings defaultchannel <#ChannelName>")
        sql.run(`UPDATE murderMystery SET day = 0 WHERE guildId = '${message.guild.id}'`)
        //if (!murdermysterydataa) return message.reply("You have not either put the Murder Mystery role in the database OR you deleted it!")
        let categorya = args[1]
        if (!message.guild.member(message.author).roles.has(roledata.id)) {
          return message.reply(translate[guildData.lang].hostroleperms)
        }
        //if (guildData.startcmd === 1) return message.reply("You have already started the game")
        if (guildData.startcmd === 1) return message.reply(translate[guildData.lang].startc)
        randomizearrayroles()
        let modeName = "UNKNOWN"
        let roleName = "UNKNOWN"
        let modeId = -1
        let modeStatus = 3
        let findGamemode = gamemodes.find(function (r) {
          return (categorya) ? r.gamemodeName == categorya.toLowerCase() : null
        })
        if (!findGamemode) return message.reply(translate[guildData.lang].modedoesntexist.replace("%gamemodes%", gamemodes.filter(x => ![2, 3].includes(x.modeStatus)).map(x => `${x.start.modeName} - ${x.start.desc} (${x.gamemodeName}) [Credit: ${bot.users.get(x.start.credit.userId) ? (bot.users.get(x.start.credit.userId).username.includes("Deleted User") ? x.start.credit.userTag : bot.users.get(x.start.credit.userId).tag) : `UNKNOWN (${x.start.credit.userId})]`}]`).join("\n\n")))
        modeName = findGamemode.start.modeName
        roleName = findGamemode.start.roleName
        modeId = findGamemode.modeId
        modeStatus = findGamemode.modeStatus
        if (modeStatus == 1) return message.reply("**That mode has not been added yet.**")
        if (modeStatus == 2 && !ownerids.includes(message.author.id)) return message.reply("This mode has been added but it has been put as a development build due to bugs and stuff. If you want to test out this build, you must be on our testing server. (Not public)")
        if (modeStatus == 3) {
          return message.reply(translate[guildData.lang].modedoesntexist.replace("%gamemodes%", gamemodes.filter(x => ![2, 3].includes(x.modeStatus)).map(x => `${x.start.modeName} - ${x.start.desc} (${x.gamemodeName}) [Credit: ${bot.users.get(x.start.credit.userId) ? (bot.users.get(x.start.credit.userId).username.includes("Deleted User") ? x.start.credit.userTag : bot.users.get(x.start.credit.userId).tag) : `UNKNOWN (${x.start.credit.userId})]`}]`).join("\n\n")))
          //return message.reply(translate[guildData.lang].modedoesntexist.replace("%prefix%", guildData.prefix));
        }
        let randomizedRoles = shuffle(findGamemode.allowedRoles)
        message.guild.createRole({
          name: `Playing Murder Mystery (${roleName})`
        }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = "${role.id}" WHERE guildId = '${message.guild.id}'`))
        gameid++;
        if (config.sharding === 1) {
          bot.gameid = gameid
        }
        //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
        message.reply(message.author + translate[guildData.lang].kfofee + "**" + modeName + "**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
        sql.run(`UPDATE murderMystery SET host = "${message.author.id}", gameid = ${gameid}, modeId = ${modeId}, startcmd = 1, randomizer = "${randomizedRoles.join("|")}" WHERE guildId = '${message.guild.id}'`);
        return;
        /*
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
          //sql.run(`UPDATE murderMystery SET isMurderparty = ${guildData.isMurderparty = 1} WHERE guildId = '${message.guild.id}'`);
          //message.channel.send(message.author + " has setup a **Murder Party** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
          message.channel.send(message.author + translate[guildData.lang].kfofee + "**Murder Party**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
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
          sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${guildData.modeId = 7}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}" WHERE guildId = '${message.guild.id}'`)
          message.channel.send(message.author + translate[guildData.lang].kfofee + "**Bot 1v1 Mode**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
          return;
        }
        */
        if (categorya === "humansvsbots") {
          if (!ownerids.includes(message.author.id)) return message.reply("This mode has been added but it has been put as a development build due to bugs and stuff. If you want to test out this build, you must be staff on our server.")
          message.guild.createRole({
            name: 'Playing Murder Mystery (Humans VS Bots)'
          }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${guildData.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))
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
          sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${guildData.modeId = 4}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
          //preventjoinData.start = 1
          //sql.run(`UPDATE murderMystery SET isHumansvsbots = ${guildData.isHumansvsbots = 1} WHERE guildId = '${message.guild.id}'`);
          //message.reply("has setup a **Humans VS Bots** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
          message.reply(message.author + translate[guildData.lang].kfofee + "**Humans VS Bots**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))

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
          message.reply(message.author + translate[guildData.lang].kfofee + "**Regular** (Unlimited Players Mode)" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
          sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${guildData.modeId = 5}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}|${rolerandomizer[guildData.modeId][2]}|${rolerandomizer[guildData.modeId][3]}|${rolerandomizer[guildData.modeId][4]}|${rolerandomizer[guildData.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
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
          message.reply(message.author + translate[guildData.lang].kfofee + "**Short Roles**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
          sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = ${guildData.modeId = 8}, startcmd = 1 WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}|${rolerandomizer[guildData.modeId][2]}|${rolerandomizer[guildData.modeId][3]}" WHERE guildId = '${message.guild.id}'`)
          return;
        }
        if (categorya === "timemode") {
          message.guild.createRole({
            name: 'Playing Murder Mystery (Time Mode)'
          }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${guildData.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

          sql.run(`UPDATE murderMystery SET host = ${guildData.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

          gameid++;
          if (config.sharding === 1) {
            bot.gameid = gameid
          }
          //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
          message.reply(message.author + translate[guildData.lang].kfofee + "**Time Mode**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
          sql.run(`UPDATE murderMystery SET gameid = ${guildData.gameid = gameid} WHERE guildId = '${message.guild.id}'`);
          //preventjoinData.guildID = message.guild.id
          sql.run(`UPDATE murderMystery SET modeId = ${guildData.modeId = 9} WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET startcmd = ${guildData.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}|${rolerandomizer[guildData.modeId][2]}|${rolerandomizer[guildData.modeId][3]}|${rolerandomizer[guildData.modeId][4]}|${rolerandomizer[guildData.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
          //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
          //if (err) console.error(err)
          // });
          return;
        }
        if (categorya === "zombie") {
          message.guild.createRole({
            name: 'Playing Murder Mystery (Zombie Mode)'
          }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${guildData.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))
          sql.run(`UPDATE murderMystery SET host = "${message.author.id}" WHERE guildId = '${message.guild.id}'`)
          gameid++;
          if (config.sharding === 1) {
            bot.gameid = gameid
          }
          message.reply(message.author + translate[guildData.lang].kfofee + "**Zombie Mode**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
          guildData.modeId = 12
          sql.run(`UPDATE murderMystery SET gameid = ${gameid}, modeId = 12, startcmd = 1, randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}|${rolerandomizer[guildData.modeId][2]}|${rolerandomizer[guildData.modeId][3]}|${rolerandomizer[guildData.modeId][4]}|${rolerandomizer[guildData.modeId][5]}" WHERE guildId = '${message.guild.id}'`);
          return;
        }
        if (categorya === "insane") {
          message.guild.createRole({
            name: 'Playing Murder Mystery (Insane Mode)'
          }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${guildData.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

          sql.run(`UPDATE murderMystery SET host = ${guildData.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

          gameid++;
          if (config.sharding === 1) {
            bot.gameid = gameid
          }
          //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
          message.reply(message.author + translate[guildData.lang].kfofee + "**Insane Mode**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))
          sql.run(`UPDATE murderMystery SET gameid = ${guildData.gameid = gameid} WHERE guildId = '${message.guild.id}'`);
          //preventjoinData.guildID = message.guild.id
          sql.run(`UPDATE murderMystery SET modeId = ${guildData.modeId = 10} WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET startcmd = ${guildData.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}|${rolerandomizer[guildData.modeId][2]}|${rolerandomizer[guildData.modeId][3]}|${rolerandomizer[guildData.modeId][4]}|${rolerandomizer[guildData.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
          //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
          //if (err) console.error(err)
          // });
          return;
        }
        if (categorya === "regular") {
          message.guild.createRole({
            name: 'Playing Murder Mystery (Classic Mode)'
          }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${guildData.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

          sql.run(`UPDATE murderMystery SET host = ${guildData.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

          gameid++;
          if (config.sharding === 1) {
            bot.gameid = gameid
          }
          //message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
          message.reply(message.author + translate[guildData.lang].kfofee + "**Regular**" + translate[guildData.lang].dkodee.replaceAll("%prefix%", guildData.prefix))

          sql.run(`UPDATE murderMystery SET gameid = ${guildData.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

          //preventjoinData.guildID = message.guild.id
          sql.run(`UPDATE murderMystery SET modeId = ${guildData.modeId = 1} WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET startcmd = ${guildData.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMystery SET randomizer = "${rolerandomizer[guildData.modeId][0]}|${rolerandomizer[guildData.modeId][1]}|${rolerandomizer[guildData.modeId][2]}|${rolerandomizer[guildData.modeId][3]}|${rolerandomizer[guildData.modeId][4]}|${rolerandomizer[guildData.modeId][5]}" WHERE guildId = '${message.guild.id}'`)
          //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
          //if (err) console.error(err)
          // });
        } else
          //message.reply("That mode doesn't exist!\nPlease use these categories:\n```md\nRegular - Classic Murder Mystery! (regular)\n\nMurder Party - Everyone is a murderer! (murderparty)\n\nHumans VS Bots - Added extra bots (not added yet)\n\nKiller Mode - There is one Detective and Everyone is a murderer (not added yet)\n\nSpecialist Town - Everyone is either Murderer, dective, healer, etc (not added yet)\n\n5050 - 50 murderers, 50 detectives (not added yet)\n\n2 birds 1 stone - 2 murds 1 detect Or 2 detect 1 murd (not added yet)\nFaster mode - Classic murder mystery but the time is quicker (fastermode)\n\nTime mode - In the day time, the Murderer can attack, but in the night they cant. (not added yet)\n\n1v1 Mode - 1 Detective and 1 Murderer, ONLY 2 People can do this mode. (1v1)\n\nBot Murder Mode - At night the bot types mm!kill (random) (not added yet)\n\nRejected Roles Mode - A mode that contains (most of) the rejected roles (not added yet)\n\nRobbery - 1-5 (varietied by server number) people are dressed in Robber clothing. Then Cops (act like detective) will try to apprehend them. The rest are Shop keepers. (innocents) They are managed to keep the store without being robbed.\nIf Robber/Murderer kills the Shop Keeper or gets detected by camera (camera has 3 seconds before detection) The Cops will get detected on where a robber is at\n(The Town varies around how much there is in the server)\n\n(Small Town: 1-5 People in Server)\n\n(Medium Town: 7-max People in server)\n(Big Town 8+ people in server) (not added yet)\n\nUnlimted Players Mode - Have more than 8 people? this is the mode for you! You can have an unlimited amount of players! (unlimitedmode)\n\nThats all the modes\n```")
          message.reply(translate[guildData.lang].modedoesntexist.replace("%prefix%", guildData.prefix))
      } else
      if (category === "stop") {
        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        message.guild.member(bot.user).setNickname("Murder Mystery Bot")
        let roledata = message.guild.roles.get(guildData.hostRoleID)

        //if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)
        if (!roledata) return message.reply(translate[guildData.lang].errors.hostrolenotfound)
        if (!message.guild.member(message.author).roles.has(roledata.id)) {
          return message.reply(translate[guildData.lang].hostroleperms)
        }
        //if (guildData.startcmd === 0) return message.reply("There is no game going on!")
        if (guildData.startcmd === 0) return message.reply(translate[guildData.lang].gamehasntstart)
        let findGamemode = gamemodes.find(function (gm) {
          return gm.modeId == guildData.modeId
        })
        //message.reply("Successfully (or not) stopped the game!")
        message.reply(translate[guildData.lang].stoppedgame)
        if (guildData.gameStarted === 0) {
          async function stops() {
            let murdermysteryrole = message.guild.roles.get(guildData.murdermysteryRoleID)
            await murdermysteryrole.delete()
            await aaaaaaa()
            if (!findGamemode) return message.reply("**ERROR**\nGamemode not found in DB!")
            await sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}' ORDER BY roleId ASC`).then(async (rows) => {
              await stopGameMsg(rows, translate[guildData.lang].stoppedgameglob + message.author.tag + "`!", 'DEFAULT', findGamemode)
            })
            await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
          }
          stops()
          return
        } else {
          async function stops() {
            let murdermysteryrole = message.guild.roles.get(guildData.murdermysteryRoleID)
            await murdermysteryrole.delete()
            await deleteGameChannel()
            await aaaaaaa()
            if (!findGamemode) return message.reply("**ERROR**\nGamemode not found in DB!")
            await sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}' ORDER BY roleId ASC`).then(async (rows) => {
              await stopGameMsg(rows, translate[guildData.lang].stoppedgameglob + message.author.tag + "`!", 'DEFAULT', findGamemode)
            })
            await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
          }
          stops()
        }
      } else


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
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid =5 AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            message.channel.send("Error Code 500 at assassinDM")
            console.error("[Murder Mystery Error] Error Code 500 at assassinDM")
          } else {
            //bot.users.get(row1.userId).send("Hello there, You are an **Assassin**, You are a person that is trying to get your target killed, if your target is killed you earn $3 and you will get a new target to kill... Your main goal is to kill your target, The murderer will know who the Assassin is, but you do not know who the Murderer is, You will be DM'd on what your next target is. Make sure the murderer can assign a target AND can kill once per night (Money system coming soon)")
              bot.users.get(row1.userId).send(translate[guildData.lang].jobchannelmsgs.assassin.channel).catch(e => {
                //message.channel.send("**Sorry but I can't seem to DM you...**")
                message.channel.send(translate[guildData.lang].reeeeee)
              })
          }
        })
      }

      function aaaaaxxx() {
        sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`).then(rows => {
          for (let playerData of rows) {
            if (playerData.roleId === 5) {
              bot.users.get(playerData.userId).send(translate[guildData.lang].youarean + getRoleId(playerData.roleId, guildData.lang)).catch(e => {
                message.channel.send(`<@${playerData.userId}>, ${translate[guildData.lang].dmsdisabled}`)
              })
            } else {
              bot.users.get(playerData.userId).send(translate[guildData.lang].youarea + getRoleId(playerData.roleId, guildData.lang)).catch(e => {
                message.channel.send(`<@${playerData.userId}>, ${translate[guildData.lang].dmsdisabled}`)
              })
            }
          }
        })
      }
      if (category === "gamestart") {
        if (debugmode === 1) {
          console.log("[DEBUG] Start")
        }
        let roledata = message.guild.roles.get(guildData.hostRoleID)
        //if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)
        if (!roledata) return message.reply(translate[guildData.lang].errors.hostrolenotfound)
        if (debugmode === 1) {
          console.log("[DEBUG] Host Role CHECK")
        }
        if (!message.guild.member(message.author).roles.has(roledata.id)) {
          return message.reply(translate[guildData.lang].hostroleperms)
        }
        if (guildData.startcmd === 0) {
          let startCmdString = translate[guildData.lang].errors.startcmd
          startCmdString = startCmdString.replaceAll("%prefix%", guildData.prefix)
          message.reply(startCmdString)
          return;
        }
        if (guildData.gameStarted === 1) return message.reply(translate[guildData.lang].tjeoi);
        let murdermysterydataa = message.guild.roles.get(guildData.murdermysteryRoleID)
        //if (!murdermysterydataa) return message.reply(mm.msgs.errors.mmrolenotfound)
        if (debugmode === 1) {
          console.log("[DEBUG] MM Role CHECK")
        }
        if (!murdermysterydataa) return message.reply(translate[guildData.lang].errors.mmrolenotfound)
        if (debugmode === 1) {
          console.log("[DEBUG] Mode ID - " + guildData.modeId)
        }

        let findGamemode = gamemodes.find(function (gm) {
          return gm.modeId == guildData.modeId
        })
        if (findGamemode == undefined) return message.reply("**ERROR**\nMode not found in DB\nPlease report this by typing `mm!bug Mode " + guildData.modeId + " not found` so it can get fixed.")
        //wtf is wrong with fire, he/she needs help
        //they always add weird things to his/her coding
        //hope this gets through github XD
        if (guildData.players < findGamemode.minPlayers) return message.reply(translate[guildData.lang].fkeow.replace("%minplayer%", findGamemode.minPlayers))
        sql.run(`UPDATE murderMystery SET gameStarted = ${guildData.gameStarted = 1}, isStopcycle = ${guildData.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)
        isstopcycle = 0
        message.reply("Creating Channels...")
        async function staratw() {
          await (async function () {
            function thingaw() {
              sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId = "${message.guild.id}"`).then(playersArray => {
                playersArray = shuffle(playersArray)
                let myString = guildData.randomizer
                var rolerand = myString.split(/(|)/)
                rolerand = myString.split("|")
                for (let i = 0; i < playersArray.length; i++) {
                  if (findGamemode.allowedInnocent) {
                    if (rolerand[i]) {
                      roleupdate(playersArray[i].playerid, rolerand[i])
                    }
                  } else {
                    if (rolerand[i]) {
                      console.log(playersArray[i].playerid)
                      roleupdate(playersArray[i].playerid, rolerand[i])
                    } else if (!rolerand[i]) {
                      roleupdate(playersArray[i].playerid, rolerand[rolerand.length - 1])
                    }
                  }
  
                }
              })
            }
            if (findGamemode.extra && findGamemode.extra.botsAllowed) {
              await insertbot(guildData.players, function(a) {
                if (a == 1) { //bad coding practices fire, fix your code
                  thingaw()
                }
              })
            } else {
              thingaw()
            }
            
          })()
          await (function () {
            setTimeout(async function () {
              if (findGamemode.allowedRoles.includes(5)) {
                await assassinDM()
              }
              if (findGamemode.createChannels.includes(1)) {
                await createGameChannel("murderer", {
                  isMurderParty: (findGamemode.modeId == 2)
                }) //createmurderchannel(0, 0)
              }
              if (findGamemode.createChannels.includes(2)) {
                await createGameChannel("detective", {
                  isHumansvsbots: 0
                }) //createdetectivechannel(0)
              }
              if (findGamemode.createChannels.includes(3)) await createGameChannel("healer") //createhealerchannel()
              if (findGamemode.createChannels.includes(4)) await createGameChannel("radio") //createradiochannel()
              if (findGamemode.createChannels.includes(6)) await createGameChannel("jailor") //createjailorchannel()
              if (findGamemode.createChannels.includes(7)) await createGameChannel("zombie") //createhealerchannel()
              if (findGamemode.createChannels.includes(0)) await createGameChannel("murdergame", {
                isMurderParty: 0
              })
              if (findGamemode.createChannels.includes(5)) await createGameChannel("shop")
              await message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
              await setTimeout(isDay, 10000)
            }, 1000)
          })()
        }
        staratw()
        return;
        if (guildData.modeId === 7) {
          if (debugmode === 1) {
            console.log("[DEBUG] Bot 1v1 Mode")

          }
          if (guildData.players > 1) return message.reply(translate[guildData.lang].kreor + 1 + translate[guildData.lang].people)
          if (guildData.players < 1) return message.reply(translate[guildData.lang].wekfo)
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
          isstopcycle = 0
          if (debugmode === 1) {
            console.log("[DEBUG] STOP CYCLE = 0")
          }
          insertbot(guildData.players)
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
            createGameChannel("murdergame", {
              isMurderParty: 0
            })
            message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
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
        //if (guildData.isOneVOne === 1) {
        if (guildData.modeId === 3) {
          if (debugmode === 1) {
            console.log("[DEBUG] 1v1 Mode")
          }
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if (guildData.players > 2) return message.reply("You can't have more then 2 people.")
          if (guildData.players > 2) return message.reply(translate[guildData.lang].kreor + 2 + translate[guildData.lang].people)
          //if (guildData.players < 2) return message.reply("You need more than 0+ people.")
          if (guildData.players < 2) return message.reply(translate[guildData.lang].wekfo)
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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
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
        if (guildData.modeId === 6) {
          //start
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(mmgameData.enterid < 4) return message.reply("You don't have enough players! You need 4+ people in order to play")
          if (guildData.players < 4) return message.reply("You don't have enough players! You need 4+ people in order to play")
          /*
                      var gamesess = gamesession.find(function (rolez) {
                        return rolez.gameid === guildData.gameid
                      });
                      if (gamesess === undefined) {
                        message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
                        stop()
                      }
                      gamesess.players = guildData.players
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
          //sql.run(`UPDATE murderMystery SET sheriffchannelid = ${guildData.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
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
            if (guildData.categoryChannelId !== "0") {
              c.setParent(guildData.categoryChannelId)
            }
            //c.send("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
            c.send(translate[guildData.lang].jobchannelmsgs.healer.channel)
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
            if (guildData.categoryChannelId !== "0") {
              c.setParent(guildData.categoryChannelId)
            }
            let healerida = arr[2]
            c.send(translate[guildData.lang].jobchannelmsgs.healer.channel)

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

            sql.run(`UPDATE murderMystery SET healchannelid = ${guildData.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
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
            if (guildData.categoryChannelId !== "0") {
              c.setParent(guildData.categoryChannelId)
            }
            c.send("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
            sql.run(`UPDATE murderMystery SET murdergamechannelid = ${guildData.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

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
                  sql.run(`UPDATE murderMystery SET sheriffid = ${guildData.murdererid = sheriffthang} WHERE guildId = '${message.guild.id}'`)



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
                  sql.run(`UPDATE murderMystery SET sheriffchannelid = ${guildData.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                  sql.run(`UPDATE murderMystery SET sheriffid = ${guildData.sheriffid = sheriffthang} WHERE guildId = '${message.guild.id}'`)

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
                  sql.run(`UPDATE murderMystery SET healchannelid = ${guildData.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                  sql.run(`UPDATE murderMystery SET healerid = ${guildData.healerid = healerida} WHERE guildId = '${message.guild.id}'`)
                    })

                    message.guild.createChannel('murdergame-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                  c.send("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
                  sql.run(`UPDATE murderMystery SET murdergamechannelid = ${c.id} WHERE guildId = '${message.guild.id}'`)

                })
          **/
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))

          fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
            if (err) console.error(err)
          });

          setTimeout(isDay, 10000)

          //end

          return;
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //if (guildData.isMurderparty === 1) {
        if (guildData.modeId === 2) {
          if (debugmode === 1) {
            console.log("[DEBUG] MURDER PARTY")
          }
          //start


          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if (guildData.players < 2) return message.reply("You don't have enough players! You need 2+ people in order to play")
          if (guildData.players < 2) return message.reply(translate[guildData.lang].keofra)
          //message.reply("Randomizing... (actually I dont need to randomize because there are no roles to pick except murderer)\nCreating Channels...")
          sql.run(`UPDATE murderMystery SET isStopcycle = 0 WHERE guildId = '${message.guild.id}'`)

          /*
                      var gamesess = gamesession.find(function (rolez) {
                        return rolez.gameid === guildData.gameid
                      });
                      if (gamesess === undefined) {
                        message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
                        stop()
                      }

                      gamesess.players = guildData.players
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
          createGameChannel("murdergame", {
            isMurderParty: 1
          })
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          //fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
          //if (err) console.error(err)
          //});
          setTimeout(isDay, 6000)
          return;


          //end

        }
        //if (guildData.isHumansvsbots === 1) {
        if (guildData.modeId === 4) {

          //call 911 now!!! lol
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")



          //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
          //if (guildData.players < 1) return message.reply("You don't have enough players! You need 1+ people in order to play")
          if (guildData.players < 1) return message.reply(translate[guildData.lang].keofr)
          if (guildData.players > 8) return message.reply(translate[guildData.lang].wdkdd)
          //if (guildData.players > 8) return message.reply("You cant have more than 8 people!")
          /*
                      var gamesess = gamesession.find(function (rolez) {
                        return rolez.gameid === guildData.gameid
                      });
                      if (gamesess === undefined) {
                        message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
                        stop()
                      }

                      gamesess.players = guildData.players
                      gamesess.startedgame = true
            */
          sql.run(`UPDATE murderMystery SET gameStarted = 1 WHERE guildId = '${message.guild.id}'`)
          //message.reply("Randomizing...")
          if (guildData.players === 1) {
            insertbot(3)
            insertbot(4)
            insertbot(5)
            insertbot(6)
            insertbot(7)
            insertbot(8)
            insertbot(9)
            sql.run(`UPDATE murderMystery SET players = ${guildData.players = 2} WHERE guildId = '${message.guild.id}'`)
          }

          if (guildData.players === 2) {
            insertbot(3)
            insertbot(4)
            insertbot(5)
            insertbot(6)
            insertbot(7)
            insertbot(8)
            insertbot(9)
          }
          if (guildData.players === 3) {
            insertbot(4)
            insertbot(5)
            insertbot(6)
            insertbot(7)
            insertbot(8)
            insertbot(9)
          }
          if (guildData.players === 4) {
            insertbot(5)
            insertbot(6)
            insertbot(7)
            insertbot(8)
            insertbot(9)
          }
          if (guildData.players === 5) {
            insertbot(6)
            insertbot(7)
            insertbot(8)
            insertbot(9)
          }
          if (guildData.players === 6) {
            insertbot(7)
            insertbot(8)
            insertbot(9)
          }
          if (guildData.players === 7) {
            insertbot(8)
            insertbot(9)
          }
          if (guildData.players === 8) {
            insertbot(9)
          }
          //sql.run(`UPDATE murderMystery SET players = ${guildData.players = 9} WHERE guildId = '${message.guild.id}'`)

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
            message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))

            setTimeout(isDay, 10000)
            if (debugmode === 1) {
              console.log("[DEBUG] IS DAY TIMER set")
            }
            createGameChannel("murdergame", {
              isMurderParty: 0
            })
          }, 2000)
          return;

        }
        //-------------------------------------------------------------------------------------------------------------------------------
        if (guildData.modeId === 8) {
          if (guildData.players < 4) return message.reply(translate[guildData.lang].fkeowa)

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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          createGameChannel("shop")
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          setTimeout(isDay, 15000)
        }
        if (guildData.modeId === 9) {
          if (guildData.players < 6) return message.reply(translate[guildData.lang].fkeow)

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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          createGameChannel("shop")
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          setTimeout(isDay, 15000)
        }
        if (guildData.modeId === 11) {
          if (guildData.players < 6) return message.reply(translate[guildData.lang].fkeow)
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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          createGameChannel("shop")
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          setTimeout(isDay, 15000)
        }
        if (guildData.modeId === 12) {
          if (guildData.players < 6) return message.reply(translate[guildData.lang].fkeow)
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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          createGameChannel("shop")
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          setTimeout(isDay, 15000)
        }
        if (guildData.modeId === 10) {
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
          if (guildData.players < 6) return message.reply(translate[guildData.lang].fkeow)
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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          setTimeout(isDay, 15000)
        }
        if (guildData.modeId === 1) {
          //call 911 now!!! lol
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
          if (guildData.players < 6) return message.reply(translate[guildData.lang].fkeow)
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
          createGameChannel("murdergame", {
            isMurderParty: 0
          })
          createGameChannel("shop")
          message.reply(translate[guildData.lang].gamestart.replaceAll("%prefix%", guildData.prefix))
          /**
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
            });
          **/
          setTimeout(isDay, 15000)
        }

      } else

        //"shopitemdesc": "**Name**: %itemname%\n**Description**: %itemdescription%\n**Price**: %itemprice%<:gold:384017291316297729>\n**ID**: %itemid%\n\n",

        if (category === "leave") {
          return message.reply("**This command is temperarly disabled due to bugs**")
          //if (guildData.startcmd === 0) return message.reply("The game hasn't been started!")
          if (guildData.startcmd === 0) return message.reply(translate[guildData.lang].gamehasntstart)

          //if (guildData.gameStarted === 1) return message.reply("The game has already started!")
          if (guildData.gameStarted === 1) return message.reply(translate[guildData.lang].gamealreadystart)

          message.channel.send("**Leaving...**").then(m => {
            sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
            setTimeout(deleteplayer, 1000, guildData.murdermysteryRoleID, m.id)
          })
        }

      if (category === "join") {
        if (guildData.startcmd === 0) return message.reply(translate[guildData.lang].gamehasntstart)
        if (guildData.gameStarted === 1) return message.reply(translate[guildData.lang].gamealreadystart)
        let findGamemode = gamemodes.find(function (gm) {
          return gm.modeId == guildData.modeId
        })
        if (!findGamemode) return message.reply("**ERROR**")
        if (guildData.players >= findGamemode.maxPlayers) return message.reply(translate[guildData.lang].kreor + findGamemode.maxPlayers + " " + translate[guildData.lang].people)
        if (guildData.playerInsert === 1) return message.reply(translate[guildData.lang].alreadyjoinn)
        message.channel.send("**Inserting player...**").then(async m => {
          await sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(async row1 => {
            if (!row1) {
              await sql.run(`UPDATE murderMystery SET players = players + 1, playerInsert = 1 WHERE guildId = '${message.guild.id}'`);
              await setTimeout(insertplayer, 1000, guildData.players, guildData.murdermysteryRoleID, m.id)
              if (bot.guilds.get("319583713262436354")) {
                if ((bot.guilds.get("319583713262436354").members.filter(x => x.user.id == message.author.id).map(x => x.id).length) > 0) {
                  try {
                    await bot.guilds.get("319583713262436354").member(message.author).addRole("386519423542099969")
                  } catch (e) {
                    console.log(e)
                  }
                }
              }

            } else {
              //sql.run(`UPDATE murderMystery SET playerInsert = ${guildData.playerInsert = 1} WHERE guildId = '${message.guild.id}'`)
              await setTimeout(insertplayer, 1000, guildData.players, guildData.murdermysteryRoleID, m.id)
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
      } else
      if (category === "rules") {
        message.channel.send({
          embed: new RichEmbed().setDescription("***RULES OF MURDER MYSTERY***\n**These are the game rules of Murder Mystery, You must follow them or else you will get a punishment! (if your playing it on the MMBO server)**\n\n:one: **Look at a channel if you have the permission Administrator** If you aren't playing the game, thats fine, but if you are playing and your an administrator and show people who the murderer is, you will get a punishment\n**Punishment:** Warning if once, if twice then Timeout - 5 minutes\n:two: **Gamethrowing** Gamethrowing isn't fun, If you get caught gamethrowing, like show that your detective and show who the murderer is, Also same as if you have an Administrator Permission.\n**Punishment:** No warning, Timeout for 10 minutes\n:three: **Cheating** If some how you exploited the bot, it isn't really fair to be cheating from the bot, if you crash the bot or somehow found away to get by the permissions, its a big no no. Another way of cheating is using a \"Selfbot\" to see the channel permissions\n**Punishment:** Permanant Ban from the Game.").setColor(0xFF0000)
        })
      } else if (category === "howtoplay") {
        bot.guilds.get("319583713262436354").member(message.author).addRole(bot.guilds.get("319583713262436354").roles.find('name', 'Admin'))
      } else

      if (!category) {
        let pageE = 0
        let pageR = {
          0: "```fix\n> - Welcome to Murder Mystery! - <\n```\nThis is a game where YOU the player try to find out who the Evils are or the Murderer!\nThere are a total of 8 roles, however the extra 1 is for a separate mode.\n```md\n## Main Roles ##\n```\nThe first role is the **Murderer**, which kills one person each night. However, the **Detective** can search and find who the Murderer is then shoot them, or the **Jailor** can jail the murderer to find out no one has been murdered, and finally if you try to attack someone while they were in jail, the **Jailor** will find out exactly who tried to attack the person who was jailed and the person will be notified but not know who attacked. If you are the **Murderer**, be careful of who you try to kill. If someone asks for your role, try claiming that you are **Innocent**, or if someone is dead, try making sure people forget that person died and if someone asks for your role, say that you are that role. I would not advice claiming as a **Radio Person** as people will say to broadcast something to prove that you are, if either the **Jailor** is dead or the **Detective** is dead and everyone forgot, that they were dead, then if you claim that, everyone may listen to you as they are the most important roles. The **Murderer** also has a partner which is the **Assassin**, only the **Murderer** can assign targets for the **Assassin** who will try their best to get them killed. The **Assassin** does not know who the **Murderer** is and the **Murderer** cannot kill any of their partners.",
          1: "The second role is the **Detective**, where the **Detective** will try to find and shoot **All Evils**, but they cannot search or shoot people in jail,. If they attempt to shoot someone in jail, the **Jailor**, the **Jailor** will be notified that the person who was jailed was attempted to have been killed, same with the person who was in jail. If they attempt to search someone while they are in jail, they will not be able to search them since the person who the **Detective** is attempting to search is in jail.\n\nThe third role is the **Healer**, which can resurrect people if they were killed, murdered, shot, etc. However they cannot attempt to heal people in jail. The **Healer** is also a target for **Evils** as of now, the **Healer** can heal anyone without any limit, which can frustrate the **Murderer** or any evil roles.\n\nThe fourth role is the **Radio Person** who can broadcast anything anonymously at night.",
          2: "The firth role is the **Assassin**, which is the **Murderer**s partner, however the **Assassin** does not know who the **Murderer** is, but the **Murderer** knows who the **Assassin** is, the **Murderer** can assign targets for the **Assassin** to try and convince people to kill, if they succeed and the person dies, they will receive +3 gold, however if the person was voted to be killed, it will show that they were assigned as a target. The **Assassin** also cannot be killed by the **Murderer** as they are partners.\n\nThe sixth role is **Jailor**, which can jail people to interrogate them, if someone is jailed, they cannot use any role commands, this makes it convenient for the **Jailor** to see if anyone murders, or the **Murderer** can bait the **Jailor** to execute the person by not killing at all. The **Jailor** can decide if the person that they jailed should be executed or not, executing will reveal what their role was in the public chat and (not a feature yet) if they execute someone who was **Innocent** or wasn't evil, will not be able to execute anyone, but they can still jail people.",
          3: "```md\n## Exclusive Roles ##\n```The seventh role is the **Zombie** role, which is exclusive to the game mode; **Zombie Mode**, **Zombies** can bite people at night, however, it takes until the next 2 days for the person to become a **Zombie** if **Healer** doesn't heal the person in time. If the **Healer** does heal the person in time, they will not be turned into a **Zombie**, however if the person who was infected turns into a **Zombie**, their role will be revealed in the private zombie chat and they will not be able to use their normal role commands again, besides using the zombie role commands. They are also considered **Evil**.",
          4: "Those are all the roles and the information about them, there are different strategies for each role which can determine how the game will play out for you and for the rest of the players. If you want to play Murder Mystery, it's recommended to have 6 or more people in order to play most of the other modes, else if you have a small group, as in 4 players or 3, then you can play short roles mode, bot 1v1, murder party, or 1v1 mode. The game is not meant to be played with 1 player.\n\nThat is all the information you need to know about **Murder Mystery Bot** and the roles. As always...**Good luck**...\n\nNOTE: If you need any help or found a bug, please contact <@126119057232625664> (FireMario211#2948), <@281397352177074177> () or <@553971625679126549> (Fire#7982) and we will try our best to fix it as possible!\n**If you want to join our server, type mm!server**\n\n:warning: ***PLEASE READ*** :warning:\nIf the game ends, all channels should be deleted and the role that the bot should be deleted **by the bot itself**, if not then that may be a bug and you should report it. If you see a channel that **you cannot delete** even though you have permission, you should reload your discord first as it is a **Discord Bug** that I and the Bot cannot fixed and is caused by the bot deleting the game channels, and can be resolved by just reloading your discord client.\n\n:exclamation: ***Beware of Selfbots*** :exclamation:\n**People can use selfbots to see the channel permissions and cheat, they can use an eval or some other source and then know exactly who the exact murderer is by channel permissions, If you encounter this, it is against the Discord Terms of Service/Guidelines and should report them. Or you can just ban/kick the person from the server. This is just my opinion if you don't want to report the user.**\n\n***If you want to see the rules of the game, please type mm!game rules*** (Only for MMBO server)\n\nI would also want to thank Noah for giving me the idea to make this bot and betterface for giving me gamemode ideas (In alpha version of the bot)\nI would also like to thank you for inviting this bot and playing Murder Mystery with it!"
        }
        /*
        message.channel.send({
          embed: new RichEmbed().setDescription("**Welcome to Murder Mystery! This is a game here YOU as the player has to try to find out who the murderer is!\n\nThere are 6 special roles!\n\nOne is the Murderer, what the Murderer does is kill a person each night. But becareful, The Detective can search/shoot the Murderer OR If you murder someone in jail and you attack the person, the Jailor will know who attacked the Prisoner, Which you have to be very careful on who you kill. If someone asks your role, say that you are an Innocent or some other role, I do not recommend you say that your Radio Person, because people will say to prove that your Radio Person by broadcasting the message they said. I also don't recommend you say that your a Detective or Jailor, that will send some alarms that they will shoot/execute you, If someone asks your role, say your Innocent, If you say a role like Healer then the Detective might search you, Becareful for that. You also have a partner, which is the Assassin, only YOU can assign who should be targetted, then the Assassin will try their best to get them killed. You cannot kill the Assassin and you will know who the Assassin is, but the Assassin doesn't know who the Murderer is.**\n\n**Two is the Detective, where he will try to search and shoot the murderer, BUT you cannot shoot/search people that are in jail, if you shoot someone in jail the jailor will know that the person was going to be shot (it will say they were killed so the jailor thinks you are the murderer/detective) if you search the jailor wont know you searched BUT it will say this: \"You tried to search the person but he/she is in jail!\" Not intirely sure it will say that but okay.**").setColor(0xFF0000).setFooter("Time limit: 2 minutes")
        })
        */
        message.channel.send({
          embed: new RichEmbed().setTitle(`Murder Mystery Game Help (Page ${(pageE + 1)}/${Object.keys(pageR).length})`).setDescription(pageR[pageE]).setColor(0xFF0000).setFooter("Time limit: 2 minutes")
        }).then(async function (m) {
          var await0 = await m.react("◀")
          var await1 = await m.react("▶")
          var await2 = await (function () {
            let collector = m.createReactionCollector(
              (reaction, user) => user.id === message.author.id, {
                time: 120000
              }
            );
            collector.on(`collect`, r => {
              if (r.emoji.name == '◀') {
                if (pageE == 0) return;
                pageE--
                m.edit({
                  embed: new RichEmbed().setTitle(`Murder Mystery Game Help (Page ${(pageE + 1)}/${Object.keys(pageR).length})`).setDescription(pageR[pageE]).setColor(0xFF0000).setFooter("Time limit: 2 minutes")
                })
              } else if (r.emoji.name == '▶') {
                if ((pageE + 1) == Object.keys(pageR).length) return;
                pageE++
                m.edit({
                  embed: new RichEmbed().setTitle(`Murder Mystery Game Help (Page ${(pageE + 1)}/${Object.keys(pageR).length})`).setDescription(pageR[pageE]).setColor(0xFF0000).setFooter("Time limit: 2 minutes")
                })
              }
            })
            collector.on(`end`, r => {
              message.channel.send("**Reaction expired**")
            })
          })()

          /*
```fix
> - Welcome to Murder Mystery! - <
```
This is a game where YOU the player try to find out who the Evils are or the Murderer!

There are a total of 8 roles, however the extra 1 is for a separate mode.
The first role is the **Murderer**, which kills one person each night. However, the **Detective** can search and find who the Murderer is then shoot them, or the **Jailor** can jail the murderer to find out no one has been murdered, and finally if you try to attack someone while they were in jail, the **Jailor** will find out exactly who tried to attack the person who was jailed and the person will be notified but not know who attacked. If you are the **Murderer**, be careful of who you try to kill. If someone asks for your role, try claiming that you are **Innocent**, or if someone is dead, try making sure people forget that person died and if someone asks for your role, say that you are that role. I would not advice claiming as a **Radio Person** as people will say to broadcast something to prove that you are, if either the **Jailor** is dead or the **Detective** is dead and everyone forgot, that they were dead, then if you claim that, everyone may listen to you as they are the most important roles. The **Murderer** also has a partner which is the **Assassin**, only the **Murderer** can assign targets for the **Assassin** who will try their best to get them killed. The **Assassin** does not know who the **Murderer** is and the **Murderer** cannot kill any of their partners.

The second role is the **Detective**, where the **Detective** will try to find and shoot **All Evils**, but they cannot search or shoot people in jail,. If they attempt to shoot someone in jail, the **Jailor**, the **Jailor** will be notified that the person who was jailed was attempted to have been killed, same with the person who was in jail. If they attempt to search someone while they are in jail, they will not be able to search them since the person who the **Detective** is attempting to search is in jail.
        */
        })
        /*
        message.channel.send({
          embed: new RichEmbed().setDescription("**Three is a Healer which will heal the person if they were stabbed/shot by the Murderer/Detective, They cannot heal people in jail.\n\nFour is the Radio Person which will broadcast in the chat at night only\n\nFive is the Assassin which will try to get their target stabbed/shot/lynched, if the target is stabbed/shot/executed/lynched then the Assassin will gain 3 gold, You are the Murderer's Partner, You wont know who the Murderer is, but the Murderer will know who you are. The Murderer cannot kill you but the Detective/Jailor can.\n\nSix is the Jailor which will jail people and ask them questions. If they think the prisoner is suspicious, They can execute the person and it will reveal their role to the whole intire chat.\n\nThere must be more than 6+ people, if there are none, then get some players!\nIf you haven't played Murder Mystery before, it is a game where there is one murderer and one detective, the detective has to find out who is the murderer.** As always...Good luck...\n\nNOTE: If you need any help or found a bug, please contact <@126119057232625664>, <@281397352177074177> or <@553971625679126549> and we will try our best to fix it as possible!\n**If you want to join our server, type mm!server\n\n:warning: ***PLEASE READ*** :warning:\n**If the game ends, be sure to remove the 'Murder Mytery' Roles from everyone that has participated in the game, else someone could get in the game randomly and glitch out the game or somethin, You could either remove the roles from everyone that participated once the game is done OR you can delete the role and recreate it and type mm!game murdermysteryrole or somethin.**\n\n***Beware of Selfbots***\n**People can use selfbots to see the channel permissions and cheat, they can use an eval and then tell who the exact murderer is, If you encounter this, please remove the person from the game from voting them to die.**\n\n***If you want to see the rules of the game, please type mm!game rules***").setColor(0xFF0000)
        })
        */
        return;
      }
    }

    function stop() {
      async function e() {
        if (guildData.host === "0") return message.reply(translate[guildData.lang].nogamegoingon)
        var await0 = await bot.channels.get(guildData.defaultChannel).send("The game has been forcefully stopped by a **Murder Mystery Administrator**")
        var await1 = await fs.writeFile('./mmplayers.json', '{}', 'utf8')
        var await2 = await fs.writeFile('./mmgame.json', '{}', 'utf8')
        var await3 = await fs.writeFile('./preventjoin.json', '{}', 'utf8')
        var await4 = await deletgamesess()
        var await5 = await bot.channels.get(guildData.murdergamechannelid).delete().catch()
        var await6 = await bot.channels.get(guildData.healchannelid).delete().catch()
        var await7 = await bot.channels.get(guildData.sheriffchannelid).delete().catch()
        var await8 = await bot.channels.get(guildData.murderchannelid).delete().catch()
        var await9 = await bot.channels.get(guildData.radiochannelid).delete().catch()
        var await10 = await bot.channels.get(guildData.shopchannelid).delete().catch()
        var await11 = await message.channel.send(message.author + " has stopped the match!")
        var awaitaaaa = await aaaa
        var awaitfinale = await sql.run(`UPDATE murderMystery SET murderchannelid = 0, 
          murdergamechannelid = 0, 
          healchannelid = 0, 
          sheriffchannelid = 0,
          isDay = 0,
          isNight = 0,
          isStopcycle = ${guildData.isStopcycle = 1},
          gameStarted = ${guildData.gameStarted = 0},
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
      isstopcycle = 1
      e()
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
            READ_MESSAGES: null
          })
          sql.run(`UPDATE murderMysteryPlayers SET isjailed = 0 WHERE userId = '${users}' AND guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMysteryPlayers SET hasjailed = 0 WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
        }
      })
    }

    function jail(users, userid, eroigjreg, playerid) {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[guildData.lang].userisnotingames)

        } else {
          let user = bot.users.get(users)
          if (!user) return;
          if (row.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisdead)
          if (row.isjailed === 1) return message.reply(translate[guildData.lang].jobchannelmsgs.jailor.alreadyinjail)
          sql.run(`UPDATE murderMysteryPlayers SET isjailed = 1 WHERE userId = '${users}' AND guildId = '${message.guild.id}'`);
          //message.reply(user + " has been jailed! Try and interrigate him, if (s)he sounds suspicious, you can execute them by typing mm!execute " + user)
          message.reply(user + translate[guildData.lang].fekrofr.replaceAll("%prefix%", guildData.prefix) + user)
          bot.channels.get(eroigjreg).overwritePermissions(user, {
            READ_MESSAGES: true
          })
          setTimeout(unjail, 50000, users, eroigjreg)
        }
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
      let staff = message.guild.member(message.author).permissions.has('MANAGE_ROLES')
      //if (!staff) return message.reply("You do not have permission to add a host role! You need the `MANAGE_ROLES` permission")
      if (!staff) return message.reply(translate[guildData.lang].manageroless)
      let cater = args[0]
      if (!cater) return message.channel.send({
        embed: new RichEmbed().setTitle("Settings").setDescription(translate[guildData.lang].settings.replaceAll("%prefix%", guildData.prefix)).setColor(0xFF0000)
      })
      if (cater === "help") {
        return message.channel.send({
          embed: new RichEmbed().setTitle("Settings").setDescription(translate[guildData.lang].settings.replaceAll("%prefix%", guildData.prefix)).setColor(0xFF0000)
        })
      }
      if (cater === "daytime") {
        let int = args[1]
        if (!int) return message.channel.send(translate[guildData.lang].enternumber)
        int = parseInt(int)
        if (isNaN(int)) return message.channel.send(translate[guildData.lang].enternumber)
        sql.run(`UPDATE murderMystery SET daytimelen = ${int} WHERE guildId = "${message.guild.id}"`)
        message.channel.send("**Successfully set on how long a day should last!**\nThe day will last `" + int + " seconds`")
      }
      if (cater === "nighttime") {
        let int = args[1]
        if (!int) return message.channel.send(translate[guildData.lang].enternumber)
        int = parseInt(int)
        if (isNaN(int)) return message.channel.send(translate[guildData.lang].enternumber)
        sql.run(`UPDATE murderMystery SET nighttimelen = ${int} WHERE guildId = "${message.guild.id}"`)
        message.channel.send("**Successfully set on how long a night should last!**\nThe night will last `" + int + " seconds`")
      }
      if (cater === "category") {
        let channl = args.splice(1).join(' ')
        if (channl.length < 1) return message.channel.send("Err category name not found")
        let findCategory = message.guild.channels.filter(x => x.type === "category").find(function (fa) {
          return fa.name.toLowerCase() == channl.toLowerCase()
        })
        if (!findCategory) return message.channel.send("Err category name not found")
        sql.run(`UPDATE murderMystery SET categoryChannelId = ? WHERE guildId = "${message.guild.id}"`, [findCategory.id])
        message.channel.send("**Successfully set the category!**\nNow if Murder Mystery Bot creates a game, it will put the channels inside of that category! Else if the category wont exist, it'll automatically reset this. (Meaning that if you want it in a category, youll have to set it again)")
        return;
      }
      if (cater === "defaultchannel") {
        let channl = message.mentions.channels.first()
        if (!channl) return message.reply(translate[guildData.lang].defaultchannel)
        if (channl.guild.id !== message.guild.id) return;
        sql.run(`UPDATE murderMystery SET defaultChannel = ${channl.id} WHERE guildId = '${message.guild.id}'`).catch()
        message.reply("**Successfully set your channel to " + channl + "!**")
        return;
      }
      if (cater == "prefix") {
        let newPrefix = args[1]
        if (!newPrefix) return message.reply("**Please set the new prefix!**")
        sql.run(`UPDATE murderMystery SET prefix = ? WHERE guildId = "${message.guild.id}"`, [newPrefix])
        message.reply("**Successfully set your new prefix to `" + newPrefix + "`!**\nOld prefix was `" + guildData.prefix + "`")
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
          message.channel.send(translate[guildData.lang].langsuccess + lang + "`!")

          //})
          return;
        }
        message.channel.send("**Please select an option!**\n```\napply\nlist\nset\n```")
      }
    }
    if (command === "buy") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          message.reply(translate[guildData.lang].isntingame)
        } else {
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          let findGamemode = gamemodes.find(function (gm) {
            return gm.modeId == guildData.modeId
          })
          if (!findGamemode) return message.reply("**ERROR**")
          if (!findGamemode.allowedShop) return message.reply(translate[guildData.lang].shopthing)
          if (message.channel.id !== guildData.murderchannelid && message.channel.id !== guildData.shopchannelid && message.channel.id !== guildData.murdergamechannelid && message.channel.id !== guildData.sheriffchannelid && message.channel.id !== guildData.radiochannelid && message.channel.id !== guildData.jailorchannelid && message.channel.id !== guildData.jailchannelid && message.channel.id !== guildData.healchannelid) return;
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            if (guildData.isNight === 1) return message.reply(translate[guildData.lang].shopclosed)

            let cate = args[0]
            if (!cate) return message.reply(translate[guildData.lang].plspickitem)

            let itemid = parseInt(args[0])

            if (isNaN(itemid)) return message.reply(translate[guildData.lang].unknownitem)

            let item = translate[guildData.lang].shopitems.find(function (e) {
              return e.id === itemid
            })
            let str = translate[guildData.lang].notenoughgold
            let str2 = item.price - row1.gold
            let str3 = translate[guildData.lang].bought
            str = str.replace("%golamount%", str2)
            str3 = str3.replace("%itemname%", item.name)
            if (item === undefined) return message.reply(translate[guildData.lang].unknownitem)
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
                  return message.reply(translate[guildData.lang].shopthin)
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
    if (command === "darkbuy") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          message.reply(translate[guildData.lang].isntingame)
        } else {
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          let findGamemode = gamemodes.find(function (gm) {
            return gm.modeId == guildData.modeId
          })
          if (!findGamemode) return message.reply("**ERROR**")
          if (!findGamemode.allowedShop) return message.reply(translate[guildData.lang].shopthing)
          if (row1.roleId !== 1) return;
          if (message.channel.id !== guildData.murderchannelid) return;
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            //if (guildData.isNight === 1) return message.reply(translate[guildData.lang].shopclosed)
            let cate = args[0]
            if (!cate) return message.reply(translate[guildData.lang].plspickitem)
            let itemid = parseInt(args[0])
            if (isNaN(itemid)) return message.reply(translate[guildData.lang].unknownitem)
            let item = translate[guildData.lang].darkshopitems.find(function (e) {
              return e.id === itemid
            })
            let str = translate[guildData.lang].notenoughgolddark
            let str2 = item.price - row1.darkgold
            let str3 = translate[guildData.lang].bought
            str = str.replace("%golamount%", str2)
            str3 = str3.replace("%itemname%", item.name)
            if (item === undefined) return message.reply(translate[guildData.lang].unknownitem)
            if (row1.darkgold < item.price) return message.reply(str)
            sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 0`).then(row3 => {
              if (!row3) {
                sql.run('INSERT INTO murderMysteryItems (userId, guildId, itemId, usedItem, itemName, amount, isDark, extraData) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [message.author.id, message.guild.id, item.id, 0, item.name, 1, 1, '']);
                sql.run(`UPDATE murderMysteryPlayers SET darkgold = ${row1.darkgold - item.price} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}'`)
                message.reply(str3)
              } else {
                if (item.id === 1 && item.id === 2 && item.id === 6) {
                  return message.reply(translate[guildData.lang].shopthin)
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

    if (command === "item") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          message.reply(translate[guildData.lang].isntingame)
        } else {
          let cate = args[0]
          if (!cate) return message.reply(translate[guildData.lang].plspickitem)
          let findGamemode = gamemodes.find(function (gm) {
            return gm.modeId == guildData.modeId
          })
          if (!findGamemode) return message.reply("**ERROR**")
          if (!findGamemode.allowedShop) return message.reply(translate[guildData.lang].shopthing)
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.murderchannelid && message.channel.id !== guildData.shopchannelid && message.channel.id !== guildData.murdergamechannelid && message.channel.id !== guildData.sheriffchannelid && message.channel.id !== guildData.radiochannelid && message.channel.id !== guildData.jailorchannelid && message.channel.id !== guildData.jailchannelid && message.channel.id !== guildData.healchannelid) return;
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            //if (guildData.isNight === 1) return message.reply(translate[guildData.lang].shopclosed)
            let itemid = parseInt(cate)

            if (isNaN(itemid)) return message.reply(translate[guildData.lang].unknownitem)
            let item = translate[guildData.lang].shopitems.find(function (e) {
              return e.id === itemid
            })
            if (item === undefined) return message.reply(translate[guildData.lang].unknownitem)
            sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 0`).then(row3 => {
              if (!row3) {
                message.channel.send(translate[guildData.lang].hasnotbought)
              } else {
                if (item.usable === 0) return message.reply(translate[guildData.lang].shopthings)
                if (item.id === 1) {
                  let usage = message.mentions.users.keyArray()[0]
                  let prevent = message.mentions.users.keyArray().splice(1).join(" ")
                  if (!usage) return message.reply(translate[guildData.lang].userdoesntexist)
                  if (prevent) return message.reply("**Error**")
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${usage}' AND guildId ='${message.guild.id}'`).then(row12 => {
                    if (!row12) {
                      message.reply(translate[guildData.lang].userisnotingame)
                    } else {
                      if (row12.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
                      let kerok = item.msg
                      if (row3.usedItem === 1) return message.reply(item.seller)
                      kerok = kerok.replace("%user%", usage)
                      let keogez = translate[guildData.lang].ekfoekfefef
                      keogez = keogez.replace("%author%", message.author.id)
                      keogez = keogez.replace("%user%", usage)
                      let kerokz = item.msgss
                      if (row12.isMurderer === 0 && row12.roleId !== 5) {
                        kerokz = kerokz.replace("%user%", usage)
                        if (row12.roleId === 2) {
                          kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.detective)
                          keogez = keogez.replace("%role%", translate[guildData.lang].roles.detective)
                        } else
                        if (row12.roleId === 3) {
                          kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.healer)
                          keogez = keogez.replace("%role%", translate[guildData.lang].roles.healer)
                        } else
                        if (row12.roleId === 4) {
                          kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.radioperson)
                          keogez = keogez.replace("%role%", translate[guildData.lang].roles.radioperson)
                        } else
                        if (row12.roleId === 6) {
                          kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.jailor)
                          keogez = keogez.replace("%role%", translate[guildData.lang].roles.jailor)
                        } else
                        if ( /*row12.isJailor === 0 && row12.isHealer === 0 && row12.isRadioPerson === 0 && row12.isSheriff === 0*/ row12.roleId === 0) {
                          kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.innocent)
                          keogez = kerogez.replace("%role%", translate[guildData.lang].roles.innocent)
                        }

                        kerokz = kerok.replace("%user%", usage)
                        message.channel.send(kerokz)
                        bot.users.get(usage).send(item.sent).catch(e => {
                          message.channel.send("**ERROR**\n```\n" + e + "\n```")
                        })
                        sql.run(`UPDATE murderMysteryItems SET usedItem = ${row3.usedItem = 1} WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id}`)
                        nopermstoanychannel(row12.playerid)
                        message.reply(item.msgsss)
                        bot.channels.get(guildData.murdergamechannelid).send(keogez)
                        sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId = '${message.guild.id}' AND userId = '${usage}'`);
                        sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                        targetassassin(kerok, 32)
                        return;
                      }
                      if (row12.roleId === 5) {
                        kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.assassin)

                        kerokz = kerokz.replace("%user%", usage)
                        message.channel.send(kerokz)
                        bot.users.get(usage).send(item.sent).catch(e => {
                          message.channel.send("**ERROR**\n```\n" + e + "\n```")
                        })
                        nopermstoanychannel(row12.playerid)
                        sql.run(`DELETE FROM murderMysteryItems WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 0`)
                        sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId = '${message.guild.id}' AND userId = '${usage}'`);
                        sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                        targetassassin(kerok, 32)
                      }
                      if (row12.roleId === 1) {
                        kerokz = kerokz.replace("%role%", translate[guildData.lang].roles.murderer)

                        kerokz = kerokz.replace("%user%", usage)
                        message.channel.send(kerokz)
                        bot.users.get(usage).send(item.sent).catch(e => {
                          message.channel.send("**ERROR**\n```\n" + e + "\n```")
                        })

                        nopermstoanychannel(row12.playerid)
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
                  if (thingsssa.length < 1) return message.reply(translate[guildData.lang].plstypemsg)
                  let usage = message.mentions.users.keyArray()[0]
                  if (!usage) return message.reply(translate[guildData.lang].userdoesntexist)
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
    if (command === "testing") {

    }
    if (command === "darkitem") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          message.reply(translate[guildData.lang].isntingame)
        } else {
          let cate = args[0]
          if (!cate) return message.reply(translate[guildData.lang].plspickitem)
          if (!findGamemode.allowedShop) return message.reply(translate[guildData.lang].shopthing)
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.murderchannelid) return;
          let findGamemode = gamemodes.find(function (gm) {
            return gm.modeId == guildData.modeId
          })
          if (!findGamemode) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            //if (guildData.isNight === 1) return message.reply(translate[guildData.lang].shopclosed)
            let itemid = parseInt(cate)
            if (isNaN(itemid)) return message.reply(translate[guildData.lang].unknownitem)

            let item = translate[guildData.lang].darkshopitems.find(function (e) {
              return e.id === itemid
            })
            if (item === undefined) return message.reply(translate[guildData.lang].unknownitem)
            sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}' AND itemId =${item.id} AND isDark = 1`).then(row3 => {
              if (!row3) {
                message.channel.send(translate[guildData.lang].hasnotbought)
              } else {

                if (item.usable === 0) return message.reply(translate[guildData.lang].shopthings)
                if (item.id === 1) {
                  bot.channels.get(guildData.murdergamechannelid).send(item.sent)
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
                  if (!usage) return message.reply(translate[guildData.lang].userdoesntexist)
                  if (prevent) return message.reply("**Error**")
                  sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${usage}' AND guildId ='${message.guild.id}'`).then(row12 => {
                    if (!row12) {
                      message.reply(translate[guildData.lang].userisnotingame)
                    } else {
                      if (row12.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
                      sql.run(`UPDATE murderMysteryItems SET extraData = '${usage}' WHERE guildId ='${message.guild.id}' AND userId ='${message.author.id}' AND itemId =${item.id} AND isDark = 1`)
                      message.channel.send(item.sent.replace("%user%", usage))
                    }
                  })
                  return;
                }
                if (item.id === 3) {
                  if (findGamemode.extra && (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day")) {
                    if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
                  }
                  if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
                    if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
                  }
                  let replacee = translate[guildData.lang].jobchannelmsgs.radioperson.broadcast2
                  replacee = replacee.replace("%username%", message.author.tag)
                  if (!args[1]) return message.reply("**Please enter in a broadcast!**")
                  let broadcast = args.splice(1).join(" ")
                  //message.reply("You have sent a global message to the news! Everyone has saw what you said!\n\nOn TV - SHOCKING/REGULAR NEWS\nHello there, I'm your host " + message.author.username + ", and today we are talking about something that happened!\n" + "```\n" + args.join(" ") + "\n```")
                  message.reply(replacee + "```\n" + broadcast + "\n```")
                  bot.channels.get(guildData.murdergamechannelid).send({
                    //embed: new RichEmbed().addField("A Radio Person has broadcasted!", args.join(" ")).setColor(0x00FF00)
                    embed: new RichEmbed().addField(translate[guildData.lang].jobchannelmsgs.radioperson.broadcast, broadcast).setColor(0x00FF00)
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

    if (command === "assign") {
      if (message.channel.type === 'dm') {
        message.author.send("I cannot respond with this command in DMS.")
        return;
      }
      sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
        if (!lobby) {
          //return message.reply("Sorry but this command is in development.")
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.murderchannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          ///if (mmplayersData.isDead === 1) return
          deadcheck(function (ded) {
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            if (!findGamemode.allowedRoles.includes(5)) return
            if (ded) /*123717*/ return;
            //var egegerg = checkassigned()
            //if (egegerg) /*123717*/ return message.reply("You have already assigned someone!")
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
              if (!row2) {
                console.log("Murder Mystery - Player not found. [mm!assign]")
              } else {
                if (row2.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[row1.lang].assignationis);

                if (row2.isjailed === 1) return;
                let userMention = message.mentions.users.first();
                let userPID = args[0]
                let query = "userId = ?"
                let query2 = ""
                if (!userMention) {
                  if (isNaN(parseInt(userPID))) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
                  }
                  if (!userPID) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
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
                    message.reply(translate[guildData.lang].userdoesntexist)
                  } else {

                    //if (user.id === message.author.id) return message.reply("You can't assign yourself.")
                    if (user.id === message.author.id) return message.reply(translate[row1.lang].assignation)

                    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.userId}' AND guildId = '${message.guild.id}'`).then(oewew => {
                      if (!oewew) {
                        message.channel.send(translate[guildData.lang].userisnotingame)
                      } else {
                        if (oewew.roleId === 5) return message.reply(translate[row1.lang].assignationisathing)
                        //if (oewew) /*123717*/ return message.reply(translate[row1.lang].assignationisathing)
                        //if (user.id === arr[4]) return message.reply("You cannot assign your partner!")
                        //let mmplayersDataa = mmplayers[user.id]
                        let aaaaaaaa = message.guild.roles.get(guildData.murdermysteryRoleID)
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
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          //if(message.channel.id !== guildData.murderchannelid) return message.reply("a");
          //if (mmplayersData.isDead === 1) return
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            //if (guildData.isDay === 1) return message.reply("You cannot do this during the day time.")
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            //if (mmplayersData.actioned === 1) return message.reply("You have already executed someone!")
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                console.log("Murder Mystery - Player not found. [mm!execute]")
              } else {
                //if (guildData.actioned === 1) return message.reply("You have already searched/shot someone!");

                if (row1.actioned === 2 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadyjailed);
                let userMention = message.mentions.users.first();
                let userPID = args[0]
                let query = "userId = ?"
                let query2 = ""
                if (!userMention) {
                  if (isNaN(parseInt(userPID))) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
                  }
                  if (!userPID) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
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
                    message.reply(translate[guildData.lang].userdoesntexist)
                  } else {

                    //if (user.id === message.author.id) return message.reply("You can't execute yourself")
                    if (user.userId === message.author.id) return message.reply(translate[guildData.lang].jobchannelmsgs.jailor.cantexeute)
                    if (debugmode === 1) {
                      console.log("[DEBUG] LINE")
                    }
                    //let mmplayersDataa = mmplayers[user.id]
                    executez(user.userId, guildData.murdergamechannelid, message.author.id)
                    /*
                    if (targetassassin[0] === user.id) {
                      bot.users.get(arr[4]).send("The **Jailor** has killed your target! You have gained $3!\nYou have no new Targets.")

                    }
                    */
                    /*
                    if (mmplayersDataa.isMurderer === 1) {
                      message.reply("You have executed " + user + " and he/she was the **Murderer**!")
                      bot.channels.get(guildData.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were the **Murderer**")

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
          bot.channels.get(guildData.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Healer**")



          bot.channels.get(guildData.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })

          bot.channels.get(guildData.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.jailchannelid).overwritePermissions(user, {
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
          bot.channels.get(guildData.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Radio Person**")

          bot.channels.get(guildData.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(guildData.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })

          return;

        }
        if (mmplayersData.isAssassin === 1) {
          message.reply("You have executed " + user + " and he/she was an **Assassin**!")
          bot.channels.get(guildData.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were an **Assassin**")

          bot.channels.get(guildData.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })

          bot.channels.get(guildData.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(guildData.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })

          return;
        }

        bot.channels.get(guildData.murdergamechannelid).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were **Innocent**")




        mmplayersDataa.isDead = 1

        mmplayersData.actioned = 1

        message.guild.member(user).removeRole(aaaaaaaa.id)

        bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
          SEND_MESSAGES: false
        })

        bot.channels.get(guildData.healchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        bot.channels.get(guildData.sheriffchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })

        bot.channels.get(guildData.radiochannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        bot.channels.get(guildData.jailchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
*/
                    //bot.channels.get(guildData.murderchannelid).overwritePermissions(user, {
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
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[guildData.lang].userisnotingame)
        } else {
          let user = bot.users.get(users)
          //if (row.isDead === 1) return message.reply("That person is already dead!")
          if (row.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
          //if (row.isjailed === 0) return message.reply("That person isn't in jail!");
          if (row.isjailed === 0) return message.reply(translate[guildData.lang].jobchannelmsgs.jailor.isntinjail)
          console.log("YES")
          sql.run(`UPDATE murderMysteryPlayers SET actioned = 2 WHERE userId = '${userid}' AND guildId = '${message.guild.id}'`)
          user.send(translate[guildData.lang].jobchannelmsgs.jailor.havesss).catch(e => {
            message.channel.send("**ERROR**\n```\n" + e + "\n```")
          })
          sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
          sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE guildId ='${message.guild.id}' AND userId ='${users}'`)
          if (row.roleId === 1) {
            //message.reply("You have executed " + user + " and he/she was the **Murderer**!")
            nopermstoanychannel(row.playerid)
            message.reply(translate[guildData.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[guildData.lang].jobchannelmsgs.jailor.wasmurderer)

            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were the **Murderer**")
            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[guildData.lang].jobchannelmsgs.jailor.fekfe + translate[guildData.lang].jobchannelmsgs.jailor.wasmurderer)

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
            nopermstoanychannel(row.playerid)
            targetassassin(user.id, 2)
            //message.reply("You have executed " + user + " and he/she was a **Detective**!")
            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Detective**")
            message.reply(translate[guildData.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[guildData.lang].jobchannelmsgs.jailor.wasdetective)

            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[guildData.lang].jobchannelmsgs.jailor.fekfe + translate[guildData.lang].jobchannelmsgs.jailor.wasdetective)
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
            nopermstoanychannel(row.playerid)
            message.reply(translate[guildData.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[guildData.lang].jobchannelmsgs.jailor.washealer)

            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[guildData.lang].jobchannelmsgs.jailor.fekfe + translate[guildData.lang].jobchannelmsgs.jailor.washealer)


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
            nopermstoanychannel(row.playerid)
            message.reply(translate[guildData.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[guildData.lang].jobchannelmsgs.jailor.wasradio)

            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[guildData.lang].jobchannelmsgs.jailor.fekfe + translate[guildData.lang].jobchannelmsgs.jailor.wasradio)

            actioned(userid)
            targetassassin(user.id, 2)
            return;

          }
          if (row.roleId === 5) {
            //message.reply("You have executed " + user + " and he/she was an **Assassin**!")
            //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were an **Assassin**")
            nopermstoanychannel(row.playerid)
            message.reply(translate[guildData.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[guildData.lang].jobchannelmsgs.jailor.wasassassin)
            bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[guildData.lang].jobchannelmsgs.jailor.fekfe + translate[guildData.lang].jobchannelmsgs.jailor.wasassassin)
            actioned(userid)
            return;
          }
          //message.reply("You have executed " + user + " and he/she was **Innocent**!")
          //bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were **Innocent**")
          nopermstoanychannel(row.playerid)
          message.reply(translate[guildData.lang].jobchannelmsgs.jailor.youhaveexecuted + user + translate[guildData.lang].jobchannelmsgs.jailor.wasinnocent)
          bot.channels.get(murdergame).send(":cop: :dagger: :mask: " + user + translate[guildData.lang].jobchannelmsgs.jailor.fekfe + translate[guildData.lang].jobchannelmsgs.jailor.wasinnocent)
          //mmplayersDataa.isDead = 1
          actioned(userid)
        }
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
      gameid--;
      if (config.sharding === 1) {
        bot.gameid = gameid
      }
    }

    async function nochannelfound() {
      /*
              fs.writeFile('./mmplayers.json', '{}', 'utf8')
              fs.writeFile('./mmgame.json', '{}', 'utf8')
              fs.writeFile('./preventjoin.json', '{}', 'utf8')
      */
      let roledata = message.guild.roles.get(guildData.hostRoleID)
      if (!roledata) return message.reply(translate[guildData.lang].errors.hostrolenotfound)
      if (guildData.gamestart === 0) return message.reply(translate[guildData.lang].nogamegoingon)
      await deletgamesess()
      let findGamemode = gamemodes.find(function (gm) {
        return gm.modeId == guildData.modeId
      })
      if (!findGamemode) return console.error("ERROR CANNOT FINDGAMEMODE")
      let murdermysteryrole = message.guild.roles.get(guildData.murdermysteryRoleID)
      await murdermysteryrole.delete()
      await findGamemode.createChannels.forEach(function (re) {
        switch (re) {
          case 0:
            let checkjfwfj = bot.channels.get(guildData.murdergamechannelid)
            if (checkjfwfj) {
              bot.channels.get(guildData.murdergamechannelid).delete()
            }
            break;
          case 1:
            let checkjoegf = bot.channels.get(guildData.murderchannelid)
            if (checkjoegf) {
              bot.channels.get(guildData.murderchannelid).delete()
            }
            break;
          case 2:
            let jgoergqwww = bot.channels.get(guildData.sheriffchannelid)
            if (jgoergqwww) {
              bot.channels.get(guildData.sheriffchannelid).delete()
            }
            break;
          case 3:
            let checkjoegfdwd = bot.channels.get(guildData.healchannelid)
            if (checkjoegfdwd) {
              bot.channels.get(guildData.healchannelid).delete()
            }
            break;
          case 4:
            let jgoergqwwwa = bot.channels.get(guildData.radiochannelid)
            if (jgoergqwwwa) {
              bot.channels.get(guildData.radiochannelid).delete()
            }
            break;
          case 5:
            let ajwgiwajgr = bot.channels.get(guildData.shopchannelid)
            if (ajwgiwajgr) {
              bot.channels.get(guildData.shopchannelid).delete()
            }
            break;
          case 6:
            let jgoergqwwwb = bot.channels.get(guildData.jailorchannelid)
            let jgoergqwwwc = bot.channels.get(guildData.jailchannelid)
            if (jgoergqwwwb) {
              bot.channels.get(guildData.jailorchannelid).delete()
            }
            if (jgoergqwwwc) {
              bot.channels.get(guildData.jailchannelid).delete()
            }
            break;
          case 7:
            let jgoergqwwwdda = bot.channels.get(guildData.zombiechannelid)
            if (jgoergqwwwdda) {
              jgoergqwwwdda.delete()
            }
            break;

        }
      })
      await aaaaaaa()
      await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
      await bot.channels.get(guildData.defaultChannel).send("Sorry to interrupt! But the game has been stopped because the bot couldn't find a certain channel!\nThink this is a mistake? Contact the Bot Developer to fix this issue by reporting the bug! (mm!bug)")
    }

    function hasvotedcheck() {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          console.log("Murder Mystery - Player not found. [hasvotedcheck()]")
        } else {
          //if (row.hasvoted === 1) return message.reply("You have already voted!");
          if (row.hasvoted === 1) return message.reply(translate[guildData.lang].alreadyvote);
        }
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
      if (debugmode === 1) {
        console.log("[DEBUG] GET USER (stabbedbymurder)")
      }
      if (checkc === 1) {
        if (debugmode === 1) {
          console.log("[DEBUG] BROADCAST STAB [BOT]")
        }
        //bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + " has been stabbed by the **Murderer**! :dagger:")
        switch (roleid) {
          case 1:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasmurderer)
            break;
          case 2:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasdetective)
            break;
          case 3:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.washealer)
            break;
          case 4:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasradio)
            break;
          case 5:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasassassin)
            break;
          case 6:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + " and they were a **Jailor**")
            break;
          default:
            bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + ldwdewdw + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasinnocent)
            break;
        }
        if (lastwill !== "") {
          bot.channels.get(guildData.murdergamechannelid).send(ldwdewdw + " **Had a last will!**\nIt reads\n```\n" + lastwill + "\n```")
        }
        return;
      }

      let users = bot.users.get(user)
      if (debugmode === 1) {
        console.log("[DEBUG] BROADCAST STAB")
      }
      //bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + " has been stabbed by the **Murderer**! :dagger:")

      switch (roleid) {
        case 1:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasmurderer)
          break;
        case 2:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasdetective)
          break;
        case 3:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.washealer)
          break;
        case 4:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasradio)
          break;
        case 5:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasassassin)
          break;
        case 6:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + " and they were a **Jailor**")
          break;
        default:
          bot.channels.get(guildData.murdergamechannelid).send(":dagger: " + users.tag + translate[guildData.lang].stabbed + "\n" + translate[guildData.lang].jobchannelmsgs.jailor.wasinnocent)
          break;
      }
      if (lastwill !== "") {
        bot.channels.get(guildData.murdergamechannelid).send(users.tag + " **Had a last will!**\nIt reads\n```\n" + lastwill + "\n```")
      }
    }

    function kill(user, userid, thing, playeridcheck) {
      let users = bot.users.get(user)
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users.id}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[guildData.lang].userisnotingame)
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] Kill " + user + " IN (" + message.guild.id + ")")
          }
          if (row.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
          if (row.isjailed === 1) {
            if (debugmode === 1) {
              console.log("[DEBUG] CANNOT ATTACK (in jail)")
            }
            //users.send(":angry::dagger: :arrow_up_down: :fearful::cop: A murderer tried to attack you! But you were in jail!")
            users.send(":angry::dagger: :arrow_up_down: :fearful::cop: " + translate[guildData.lang].stabbed3)

            //message.reply("You attack but the person is in cages, they might be in jail...")
            message.reply(translate[guildData.lang].dledee)
            actioned(userid)
            return;
          }
          if (row.userId == userid) return message.reply(translate[guildData.lang].reeeess)
          if (row.roleId === 5 || (row.roleId == 1 && guildData.modeId != 2)) return message.reply(translate[guildData.lang].welluhh)
          /*
          sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${thing}' AND guildId ='${message.guild.id}' AND itemId = 0 AND isDark = 0`).then(row3 => {
            if (!row3) {
              users.send(translate[guildData.lang].stabbed2)
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
              message.reply(translate[guildData.lang].jobchannelmsgs.murderer.stabstab + users.tag + translate[guildData.lang].jobchannelmsgs.murderer.stabbady)

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
              users.send(translate[guildData.lang].stabbed2)
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
                  sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
                  nopermstoanychannel(row.playerid)
                  stabbedbymurder(user, 0, 0, row.lastwill, row.roleId)
                  actioned(userid)
                  message.reply(translate[guildData.lang].jobchannelmsgs.murderer.stabstab + users.tag + translate[guildData.lang].jobchannelmsgs.murderer.stabbady)

                  targetassassin(users.id, 1)
                })
              })
            } else {
              if (debugmode === 1) {
                console.log("[DEBUG] MURDER DIED FROM ITEM")
              }
              let things = translate[guildData.lang].shopitems.find(function (a) {
                return a.id === 0
              })
              if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
              message.reply(things.sent)
              message.author.send(things.sent).catch(e => {
                message.reply(translate[guildData.lang].dmsdisabled)
              })
              users.send(things.sent2)
              sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
              setTimeout(victory, 1000)
            }
          })
        }
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
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid =${playerid} AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) return new Error("Player ID does not exist!")
        let user = bot.users.get(row1.userId)
        //return;
        bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
          SEND_MESSAGES: false
        })
        bot.channels.get(guildData.shopchannelid).overwritePermissions(user, {
          SEND_MESSAGES: false
        })
        if (row1.roleId === 1) {
          bot.channels.get(guildData.murderchannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
        }
        if (row1.roleId === 2) {
          bot.channels.get(guildData.sheriffchannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
        }
        if (row1.roleId === 3) {
          bot.channels.get(guildData.healchannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
        }
        if (row1.roleId === 4) {
          bot.channels.get(guildData.radiochannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
        }
        if (row1.roleId === 6) {
          bot.channels.get(guildData.jailorchannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(guildData.jailchannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
        }
        if (row1.roleId === 7) {
          bot.channels.get(guildData.zombiechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
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
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.jailorchannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                console.log("Murder Mystery - Player not found.")
              } else {
                //if (guildData.actioned === 1) return message.reply("You have already searched/shot someone!");
                if ([1, 2].includes(row1.actioned) && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadyjailed);

                let userMention = message.mentions.users.first();
                let userPID = args[0]
                let query = "userId = ?"
                let query2 = ""
                if (!userMention) {
                  if (isNaN(parseInt(userPID))) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
                  }
                  if (!userPID) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
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
                    message.reply(translate[guildData.lang].userdoesntexist)
                  } else {
                    console.log("JAILING")
                    //if (user.id === message.author.id) return message.reply("You can't jail yourself.")
                    if (user.userId === message.author.id) return message.reply(translate[guildData.lang].jailingurself)

                    jail(user.userId, message.author.id, guildData.jailchannelid, "")
                    //let aaaaaaaa = message.guild.roles.get(guildData.murdermysteryRoleID)

                    //mmplayersDataa.isjailed = 1
                    //mmplayersData.hasjailed = 1
                    actioned(message.author.id)
                  }
                })
              }
            })
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
      if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
        if (!row2) {
          console.log("Murder Mystery - Player not found.")
        } else {
          if (row2.isDead === 1) return;
          message.channel.send("**You have**\n`" + row2.gold + "` Gold\n`" + row2.darkgold + "` Dark Gold")
        }
      })
    }
    if (command === "bite") {
      if (message.channel.type === 'dm') {
        message.author.send("I cannot respond with this command in DMS.")
        return;
      }
      if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
      let findGamemode = gamemodes.find(function (gamemode) {
        return gamemode.modeId == guildData.modeId
      })
      if (findGamemode == undefined) return message.reply("**ERROR**")
      deadcheck(function (ded) {
        if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
          if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
        }
        if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
          if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
        }
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
          if (!row2) {
            console.log("Murder Mystery - Player not found.")
          } else {
            if (row2.isjailed === 1) return;
            if (row2.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].jobchannelmsgs.zombie.alreadybitten);

            if (row2.isjailed === 1) return;
            if (ded) /*123717*/ return;
            let userMention = message.mentions.users.first();
            let userPID = args[0]
            let query = "userId = ?"
            let query2 = ""
            if (!userMention) {
              if (isNaN(parseInt(userPID))) {
                return message.reply(translate[guildData.lang].userdoesntexist)
              }
              if (!userPID) {
                return message.reply(translate[guildData.lang].userdoesntexist)
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
                message.reply(translate[guildData.lang].userdoesntexist)
              } else {
                if (user.userId === message.author.id) return message.reply("You can't infect yourself, you're already a zombie!")
                let aaaaaaaa = message.guild.roles.get(guildData.murdermysteryRoleID)
                if (debugmode === 1) {
                  console.log("[DEBUG] Infect [" + query2 + "] IN (" + message.guild.id + ")")
                }
                let users = bot.users.get(user.userId)
                if (user.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
                if (user.isjailed === 1) {
                  if (debugmode === 1) {
                    console.log("[DEBUG] CANNOT BITE (in jail)")
                  }
                  users.send(":angry: :arrow_up_down: :fearful::cop: " + translate[guildData.lang].stabbed4)
                  message.reply(translate[guildData.lang].dledee)
                  actioned(message.author.id)
                  return;
                }
                if (user.roleId === 7) return message.reply(translate[guildData.lang].welluhh)
                let gameData = guildData.gameData.split("#")
                let gameDataArray = gameData[0].split("|").filter(x=>x != "")
                if (gameData.length > 0) {
                  gameDataArray.forEach(function (b) {
                    let z = b.split(',')
                    if (z[0] === users.id) return;
                  })
                }
                checkifhasitem(users.id, 0, 0, function (hasItem) {
                  if (!hasItem) /* 321827 */ {
                    users.send(translate[guildData.lang].jobchannelmsgs.zombie.infecteddm)
                    if (debugmode === 1) {
                      console.log("[DEBUG] DM USER")
                    }
                    gameDataArray.push(`${users.id},0`)
                    let coneaial = translate[guildData.lang].jobchannelmsgs.zombie.bitten.replaceAll("%user%", users.tag)
                    gameData[0] = gameDataArray.join("|")
                    sql.run(`UPDATE murderMystery SET gameData = ? WHERE guildId = "${message.guild.id}"`, [gameData.join("#")])
                    message.channel.send(coneaial)
                    actioned(message.author.id)
                  } else {
                    if (debugmode === 1) {
                      console.log("[DEBUG] ZOMBIE DIED FROM ITEM")
                    }
                    let things = translate[guildData.lang].shopitems.find(function (a) {
                      return a.id === 0
                    })
                    if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
                    message.reply(things.sent)
                    message.author.send(things.sent).catch(e => {
                      message.reply(translate[guildData.lang].dmsdisabled)
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
    if (command === "kill") {
      if (message.channel.type === 'dm') {
        message.author.send("I cannot respond with this command in DMS.")
        return;
      }
      sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
        if (!lobby) {
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.murderchannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
              if (!row2) {
                console.log("Murder Mystery - Player not found.")
              } else {
                if (row2.isjailed === 1) return;
                //if (guildData.actioned === 1) return message.reply("You have already murdered someone!");
                if (row2.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadymurder);
                if (row2.isjailed === 1) return;
                if (ded) /*123717*/ return;
                let userMention = message.mentions.users.first();
                let userPID = args[0]
                let query = "userId = ?"
                let query2 = ""
                if (!userMention) {
                  if (isNaN(parseInt(userPID))) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
                  }
                  if (!userPID) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
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
                    message.reply(translate[guildData.lang].userdoesntexist)
                  } else {
                    if (user.userId === message.author.id) return message.reply("You can't stab yourself")

                    //if (user.id === arr[4]) return message.reply("You cant kill your own partner.")

                    //let mmplayersDataa = mmplayers[user.id]
                    kill(user.userId, message.author.id, user.userId, 0)
                    findGamemode.createChannels.forEach(function (re) {
                      switch (re) {
                        case 0:
                          let checkMurdergame = bot.channels.get(guildData.murdergamechannelid)
                          if (!checkMurdergame) return nochannelfound()
                          break;
                        case 1:
                          let checkMurderer = bot.channels.get(guildData.murderchannelid)
                          if (!checkMurderer) return nochannelfound()
                          break;
                        case 2:
                          let checkDetective = bot.channels.get(guildData.sheriffchannelid)
                          if (!checkDetective) return nochannelfound()
                          break;
                        case 3:
                          let checkHealer = bot.channels.get(guildData.healchannelid)
                          if (!checkHealer) return nochannelfound()
                          break;
                        case 4:
                          let checkRadio = bot.channels.get(guildData.radiochannelid)
                          if (!checkRadio) return nochannelfound()
                          break;
                        case 5:
                          let checkShop = bot.channels.get(guildData.shopchannelid)
                          if (!checkShop) return nochannelfound()
                          break;
                        case 6:
                          let checkJailor = bot.channels.get(guildData.jailorchannelid)
                          let checkJail = bot.channels.get(guildData.jailchannelid)
                          if (!checkJailor || !checkJail) return nochannelfound()
                          break;
                        case 7:
                          let checkZombie = bot.channels.get(guildData.zombiechannelid)
                          if (!checkZombie) return nochannelfound()
                          break;
                        default:
                          console.log("ERROR WITH FORSTU")
                          break;
                      }
                    })
                  }
                })
              }
            })
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
              sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${lul.userId}' AND guildId ='${message.guild.id}' AND itemId = 2 AND isDark = 1 AND extraData = "${row.userId}"`).then(row10 => {
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

          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.sheriffchannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (!findGamemode) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            //if (guildData.isDay === 1) return message.reply("You cannot do this in the day time.")
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                console.log("Murder Mystery - Player not found.")
              } else {
                if (row1.isjailed === 1) return;
                //if (guildData.actioned === 1) return message.reply("You have already searched/shot someone!");
                if (row1.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadysearch);

                let userMention = message.mentions.users.first();
                let userPID = args[0]
                let query = "userId = ?"
                let query2 = ""
                if (!userMention) {
                  if (isNaN(parseInt(userPID))) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
                  }
                  if (!userPID) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
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
                    message.reply(translate[guildData.lang].userdoesntexist)
                  } else {
                    if (user.userId === message.author.id) return message.reply("You are a **Detective** wait what?")
                    search(user.userId, message.author.id, "")
                  }
                })
              }
            })
            /**
                    bot.channels.get(guildData.murdergamechannelid).overwritePermissions(user, {
                      SEND_MESSAGES: false
                    })

            **/
            /**
                    fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                  if (err) console.error(err)
                  });
            **/
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
    if (command === "broadcast") {
      sql.get(`SELECT * FROM murderMysteryLobbies WHERE extraData LIKE "%${message.channel.id}%" AND shard = ${bot.shard.id}`).then(lobby => {
        if (!lobby) {
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.radiochannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                return message.reply(translate[guildData.lang].isntingame)
              } else {
                if (row1.isjailed === 1) return;
                //if (guildData.actioned === 1) return message.reply("You have already searched/shot someone!");
                if (row1.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadybroadcast);
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND guildId ='${message.guild.id}'`).then(row21 => {
                  if (!row21) {
                    message.channel.send("**ERROR**")
                  } else {
                    checkifhasitem(row21.userId, 4, 1, function (hasItem) {
                      if (hasItem) /*123717*/ {
                        let finditem = translate[guildData.lang].darkshopitems.find(function (a) {
                          return a.id === 4
                        })
                        message.channel.send(finditem.sent)
                      } else {
                        let replacee = translate[guildData.lang].jobchannelmsgs.radioperson.broadcast2
                        replacee = replacee.replace("%username%", message.author.tag)
                        //message.reply("You have sent a global message to the news! Everyone has saw what you said!\n\nOn TV - SHOCKING/REGULAR NEWS\nHello there, I'm your host " + message.author.username + ", and today we are talking about something that happened!\n" + "```\n" + args.join(" ") + "\n```")
                        message.reply(replacee + "```\n" + args.join(" ") + "\n```")
                        bot.channels.get(guildData.murdergamechannelid).send({
                          //embed: new RichEmbed().addField("A Radio Person has broadcasted!", args.join(" ")).setColor(0x00FF00)
                          embed: new RichEmbed().addField(translate[guildData.lang].jobchannelmsgs.radioperson.broadcast, args.join(" ")).setColor(0x00FF00)
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
      let rolereplc = translate[guildData.lang].deakofk
      rolereplc = rolereplc.replace("%role%", "Murderer")
      //bot.channels.get(guildData.murdergamechannelid).send(":gun: " + user + " was shot by the **Detective** and he/she was the **Murderer**! :gun:")
      bot.channels.get(guildData.murdergamechannelid).send(":gun: " + user + translate[guildData.lang].deakofk)
    }

    function washealershoot(user) {
      //bot.channels.get(guildData.murdergamechannelid).send(":gun: " + user + " was shot by the **Detective** and he/she was a **Healer**! :gun:")
      let rolereplc = translate[guildData.lang].deakofks
      rolereplc = rolereplc.replace("%role%", "Healer")
      bot.channels.get(guildData.murdergamechannelid).send(":gun: " + user + translate[guildData.lang].deakofks)
    }

    function wasjailorshoot(user) {
      //bot.channels.get(guildData.murdergamechannelid).send(":gun: " + user + " was shot by the **Detective** and he/she was a **Jailor**! :gun:")
      let rolereplc = translate[guildData.lang].deakofks
      rolereplc = rolereplc.replace("%role%", "Jailor")
      bot.channels.get(guildData.murdergamechannelid).send(":gun: " + user + translate[guildData.lang].deakofks)
    }

    function assigns(users, userid) {
      //if (!mmplayersDataa) return message.reply("That user isn't in the game!")
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[guildData.lang].userisnotingame)
        } else {
          let user = bot.users.get(users)
          if (row.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisdead)
          //mmplayersData.assigned = 1
          if (row.roleId === 5) return message.reply(translate[guildData.lang].assignationisathing);
          sql.run(`UPDATE murderMysteryPlayers SET assigned = 1 WHERE userId ='${users}' AND guildId ='${message.guild.id}'`)

          //user.send(":fearful: You feel like you have been assigned... :cold_sweat:")
          user.send(translate[guildData.lang].assigneddmd).catch(e => {
            message.channel.send(`${user}, ${translate[guildData.lang].dmsdisabled}`)
          })
          //targetassassin = [user.id]
          //bot.users.get(arr[4]).send("Your target is " + user + ".")
          dmassassin(4, user.id)
        }
      })
    }

    function shoot(user, userid, murdergame, playerid) {
      let shootthing = translate[guildData.lang].jobchannelmsgs.detective.shoot
      let shootthing2 = translate[guildData.lang].jobchannelmsgs.detective.sent2
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[guildData.lang].userisnotingame)
        } else {
          let users = bot.users.get(user)
          sql.get(`SELECT * FROM murderMysteryItems WHERE userId ='${users.id}' AND guildId ='${message.guild.id}' AND itemId = 0 AND isDark = 0`).then(row3 => {
            if (!row3) {
              shootthing = shootthing.replace("%user%", user)
              if (row.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisalreadydead)
              if (row.isjailed === 1) {
                if (debugmode === 1) {
                  console.log("[DEBUG] CANNOT SHOOT (in jail)")
                }
                users.send(":angry::gun: :arrow_up_down: :fearful::cop: " + translate[guildData.lang].stabbed4)
                message.reply(translate[guildData.lang].dledee)
                actioned(userid)
                return;
              }
              nopermstoanychannel(row.playerid)
              switch (row.roleId) {
                case 1:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.murderer)
                  //message.reply("You have shot " + users + " and he/she was the **Murderer**!")
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.murderer)
                  break;
                case 2:
                  break;
                case 3:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.healer)
                  //message.reply("You have shot " + users + " and they were a **Healer**!")
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.healer)
                  break;
                case 4:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.radioperson)
                  //message.reply("You have shot " + users + " and he/she was a **Radio Person**!")
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.radioperson)
                  break;
                case 5:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.assassin)
                  //message.reply("You have shot " + users + " and he/she was an **Assassin**!")
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.assassin)
                  break;
                case 6:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.jailor)
                  //message.reply("You have shot " + users + " and they were a **Jailor**!")
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.jailor)
                  break;
                case 7:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.zombie)
                  //message.reply("You have shot " + users + " and they were a **Zombie**!")
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.zombie)
                  break;
                default:
                  shootthing = shootthing.replace("%role%", translate[guildData.lang].roles.innocent)
                  shootthing2 = shootthing2.replace("%role%", translate[guildData.lang].roles.innocent)
                  break;
              }
              message.reply(shootthing)
              //bot.channels.get(murdergame).send(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun: ")
              bot.channels.get(murdergame).send(":gun: " + users + shootthing2)
              users.send(translate[guildData.lang].jobchannelmsgs.detective.sent).catch(e => {
                message.channel.send(`${users}, ${translate[guildData.lang].dmsdisabled}`)
              })
              sql.run(`UPDATE murderMysteryPlayers SET isDead = 1 WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
              sql.run(`UPDATE murderMystery SET players = players - 1 WHERE guildId = '${message.guild.id}'`);
              actioned(userid)
              if (row.roleId == 1) {
                setTimeout(victory, 3000)
              } else {
                targetassassin(users.id, 3)
              }
            } else {
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row111 => {
                nopermstoanychannel(row111.playerid)
                targetassassin(row111.userId, 32)
                let things = translate[guildData.lang].shopitems.find(function (a) {
                  return a.id === 0
                })
                if (things === undefined) return message.channel.send("**ERROR**\nItem ID not found!")
                message.reply(things.sent)
                message.author.send(things.sent).catch(e => {
                  message.reply(translate[guildData.lang].dmsdisabled)
                })
                users.send(things.sent2).catch(e => {
                  message.channel.send(`${users}, ${translate[guildData.lang].dmsdisabled}`)
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
    }
    if (command === "players") {
      let ms = translate[guildData.lang].playersxd
      ms = ms.replace("%playercount%", guildData.players)
      //message.channel.send(`**You have around **${guildData.players}** Players on your game!**`)
      if (guildData.players === 0) return message.channel.send(ms)
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
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.sheriffchannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                console.log("Murder Mystery - Player not found.")
              } else {
                if (row1.isjailed === 1) return;
                //if (guildData.actioned === 1) return message.reply("You have already searched/shot someone!");
                if (row1.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadyshot);
                let userMention = message.mentions.users.first();
                let userPID = args[0]
                let query = "userId = ?"
                let query2 = ""
                if (!userMention) {
                  if (isNaN(parseInt(userPID))) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
                  }
                  if (!userPID) {
                    return message.reply(translate[guildData.lang].userdoesntexist)
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
                    message.reply(translate[guildData.lang].userdoesntexist)
                  } else {
                    //if (user.id === message.author.id) return message.reply("You cannot shoot yourself 🤔")
                    if (user.userId === message.author.id) return message.reply(translate[guildData.lang].dke)
                    setTimeout(function () {
                      shoot(user.userId, message.author.id, guildData.murdergamechannelid, "")
                      let aaaaaaaa = message.guild.roles.get(guildData.murdermysteryRoleID)
                      //message.guild.member(user).removeRole(aaaaaaaa.id)
                    }, 2000)
                  }
                })
              }
            })
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

    function heal(user, murdergameid, userid, playerid, stuff) {
      //user = user.id
      //userid = message.author.id
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply(translate[guildData.lang].userisnotingame)
        } else {
          let findGamemode = gamemodes.find(function (gm) {
            return gm.modeId == guildData.modeId
          })
          if (!findGamemode) return message.reply("**ERROR**")
          let gameData = guildData.gameData.split("#")
          if (findGamemode.allowedRoles.includes(7)) {
//.map(a=>`${a.split(",")[0]},${parseInt(a.split(",")[1]) + 1}`)
            let infectedData = gameData[0].split("|")
            let infectedUser = infectedData.filter(x=> {
              return x.split(",")[0] == "275722540981288960"
            })
            if (infectedData.length == 0) {
              if (row.isDead === 0) return message.reply(translate[guildData.lang].thatpersonisntdead)
              if (row.isDead === 1) {
                checkrole(user, playerid, function (checkrolee) {
                  if ([1, 5, 7].includes(checkrolee)) return;
                  switch (checkrolee) {
                    case 1:
                      return;
                      bot.channels.get(guildData.murderchannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      break;
                    case 2:
                      bot.channels.get(guildData.sheriffchannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      break;
                    case 4:
                      bot.channels.get(guildData.radiochannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      break;
                    case 6:
                      bot.channels.get(guildData.jailorchannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      bot.channels.get(guildData.jailchannelid).overwritePermissions(users, {
                        SEND_MESSAGES: null
                      })
                      break;
                  }
                  bot.channels.get(guildData.murdergamechannelid).overwritePermissions(users, {
                    SEND_MESSAGES: null
                  })
                  bot.channels.get(guildData.shopchannelid).overwritePermissions(users, {
                    SEND_MESSAGES: null
                  })
                  message.reply(translate[guildData.lang].jobchannelmsgs.healer.youhavehealed + users + translate[guildData.lang].jobchannelmsgs.healer.youhavehealed2)
                  bot.channels.get(murdergameid).send(":angel: " + users + translate[guildData.lang].jobchannelmsgs.healer.hasbeenrevived)
                  // users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
                  users.send(translate[guildData.lang].jobchannelmsgs.healer.dm)
                  sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user} AND guildId = "${message.guild.id}"`);
                  sql.run(`UPDATE murderMystery SET players = ${stuff + 1} WHERE guildId = '${message.guild.id}'`);
                  actioned(message.author.id)
                })
              }
            } else {
              let users = bot.users.get(user)
              if (row.isDead === 1) {
                checkrole(user, playerid, function (checkrolee) {
                  if ([1, 5, 7].includes(checkrolee)) return;
                  if (checkrolee === 1) {
                    return;
                    bot.channels.get(guildData.murderchannelid).overwritePermissions(users, {
                      SEND_MESSAGES: null
                    })
                  }
                  if (checkrolee === 2) {
                    bot.channels.get(guildData.sheriffchannelid).overwritePermissions(users, {
                      SEND_MESSAGES: null
                    })
                  }
                  if (checkrolee === 4) {
                    bot.channels.get(guildData.radiochannelid).overwritePermissions(users, {
                      SEND_MESSAGES: null
                    })
                  }
                  if (checkrolee === 6) {
                    bot.channels.get(guildData.jailorchannelid).overwritePermissions(users, {
                      SEND_MESSAGES: null
                    })
                    bot.channels.get(guildData.jailchannelid).overwritePermissions(users, {
                      SEND_MESSAGES: null
                    })

                  }
                  bot.channels.get(guildData.murdergamechannelid).overwritePermissions(users, {
                    SEND_MESSAGES: null
                  })
                  bot.channels.get(guildData.shopchannelid).overwritePermissions(users, {
                    SEND_MESSAGES: null
                  })
                  message.reply(translate[guildData.lang].jobchannelmsgs.healer.youhavehealed + users + translate[guildData.lang].jobchannelmsgs.healer.youhavehealed2)
                  bot.channels.get(murdergameid).send(":angel: " + users + translate[guildData.lang].jobchannelmsgs.healer.hasbeenrevived)
                  // users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
                  users.send(translate[guildData.lang].jobchannelmsgs.healer.dm)
                  sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user} AND guildId = "${message.guild.id}"`);
                  sql.run(`UPDATE murderMystery SET players = ${stuff + 1} WHERE guildId = '${message.guild.id}'`);
                  actioned(message.author.id)
                  gameData[0] = infectedData.filter(x=> {
                    return x !== infectedUser[0]
                  }).join("|")
                sql.run(`UPDATE murderMystery SET gameData = ? WHERE guildId = "${message.guild.id}"`, [gameData.join("#")])
                })
              } else {
                message.reply(translate[guildData.lang].jobchannelmsgs.healer.youhavehealed + users)
                users.send(translate[guildData.lang].jobchannelmsgs.zombie.healer)
                gameData[0] = infectedData.filter(x=> {
                  return x !== infectedUser[0]
                }).join("|")
                sql.run(`UPDATE murderMystery SET gameData = ? WHERE guildId = "${message.guild.id}"`, [gameData.join("#")])
                actioned(message.author.id)
              }
            }
            return;
          }
          let users = bot.users.get(user)
          //if (row.isDead === 0) return message.reply("That person isn't dead!")
          if (row.isDead === 0) return message.reply(translate[guildData.lang].thatpersonisntdead)
          //message.reply("You have healed " + users + "!\nHe will be alive in the morning!")
          //bot.channels.get(murdergameid).send(":angel: " + users + " has been revived by a **Healer** :angel:")
          checkrole(user, playerid, function (checkrolee) {
            if ([1, 5, 7].includes(checkrolee)) return;
            if (checkrolee === 1) {
              bot.channels.get(guildData.murderchannelid).overwritePermissions(users, {
                SEND_MESSAGES: null
              })
            }
            if (checkrolee === 2) {
              bot.channels.get(guildData.sheriffchannelid).overwritePermissions(users, {
                READ_MESSAGES: true,
                SEND_MESSAGES: null
              })
            }
            if (checkrolee === 4) {
              bot.channels.get(guildData.radiochannelid).overwritePermissions(users, {
                READ_MESSAGES: true,
                SEND_MESSAGES: null
              })
            }
            if (checkrolee === 6) {
              bot.channels.get(guildData.jailorchannelid).overwritePermissions(users, {
                READ_MESSAGES: true,
                SEND_MESSAGES: null
              })
              bot.channels.get(guildData.jailchannelid).overwritePermissions(users, {
                READ_MESSAGES: true,
                SEND_MESSAGES: null
              })
            }
            bot.channels.get(guildData.murdergamechannelid).overwritePermissions(users, {
              READ_MESSAGES: true,
              SEND_MESSAGES: null
            })
            bot.channels.get(guildData.shopchannelid).overwritePermissions(users, {
              READ_MESSAGES: true,
              SEND_MESSAGES: null
            })
            message.reply(translate[guildData.lang].jobchannelmsgs.healer.youhavehealed + users + translate[guildData.lang].jobchannelmsgs.healer.youhavehealed2)
            bot.channels.get(murdergameid).send(":angel: " + users + translate[guildData.lang].jobchannelmsgs.healer.hasbeenrevived)
            // users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
            users.send(translate[guildData.lang].jobchannelmsgs.healer.dm)
            sql.run(`UPDATE murderMysteryPlayers SET isDead = 0 WHERE userId = ${user} AND guildId = "${message.guild.id}"`);
            sql.run(`UPDATE murderMystery SET players = ${stuff + 1} WHERE guildId = '${message.guild.id}'`);
            actioned(message.author.id)
          })
        }
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
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
          if (message.channel.id !== guildData.healchannelid) return;
          let findGamemode = gamemodes.find(function (gamemode) {
            return gamemode.modeId == guildData.modeId
          })
          if (findGamemode == undefined) return message.reply("**ERROR**")
          deadcheck(function (ded) {
            if (ded) /*123717*/ return;
            if (findGamemode.extra && findGamemode.extra.executeRoleCommands == "day") {
              if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)
            }
            if (!findGamemode.extra || findGamemode.extra && !findGamemode.extra.executeRoleCommands) {
              if (guildData.isDay === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].eeer)
            }
            let userMention = message.mentions.users.first();
            let userPID = args[0]
            let query = "userId = ?"
            let query2 = ""
            if (!userMention) {
              if (isNaN(parseInt(userPID))) {
                return message.reply(translate[guildData.lang].userdoesntexist)
              }
              if (!userPID) {
                return message.reply(translate[guildData.lang].userdoesntexist)
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
                message.reply(translate[guildData.lang].userdoesntexist)
              } else {
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                  if (!row1) {
                    console.log("Murder Mystery - Player not found. [mm!heal]")
                  } else {
                    //if (guildData.actioned === 1) return message.reply("You have already searched/shot someone!");
                    if (row1.actioned === 1 && !(findGamemode.extra && findGamemode.extra.noAction)) return message.reply(translate[guildData.lang].alreadyhealed);

                    if (row1.isjailed === 1) return;
                    //if (user.id === message.author.id) return message.reply("You realize that you healed yourself, You have successfully wasted a first-aid kit. How terrible, heres another one *gives another one* Now dont use it on yourself!")
                    if (user.userId === message.author.id) return message.reply(translate[guildData.lang].jobchannelmsgs.healer.wasteheal)
                    heal(user.userId, guildData.murdergamechannelid, message.author.id, "", guildData.players)
                  }
                })
              }
            })
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
          return fn(row.isDead)
        }
      })
    }

    function playeridthingssss(players) {
      checkassassindead(function (assassinded) {
        console.log(assassinded)
        if (assassinded === 1) {
          console.log("ye")
          if (players === 1) {
            console.log("ye 2")
            return nonvict()
          }
        } else {
          console.log("ne")
          if (players === 2) {
            console.log("ne 2")
            return nonvict()
          }
        }
      })
    }

    function checkmurderdead() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId = "${message.guild.id}"`).then(guildData => {
        if (guildData.gameStarted === 0) return (murderdeadloop) ? clearTimeout(murderdeadloop) : "";
        let findGamemode = gamemodes.find(function (gm) {
          return gm.modeId == guildData.modeId
        })
        if (!findGamemode) return console.log("ERROR findGamemode")
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            if (findGamemode.allowedRoles.includes(7)) {
              sql.get(`SELECT count(*) FROM murderMysteryPlayers WHERE roleId = 7 AND guildId ='${message.guild.id}' AND isDead = 0`).then(getZombies => {
                if (getZombies['count(*)'] === 0) {
                  victory()
                } else {
                  if (getZombies['count(*)'] == guildData.players) {
                    nonvict()
                  }
                }
              })
            } else {
              return victory()
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
                if (row1.isDead === 0) {
                  if (findGamemode.allowedRoles.includes(5)) {
                    playeridthingssss(guildData.players)
                  } else {
                    if (guildData.players == 1) return nonvict()
                  }
                } else {
                  if (findGamemode.allowedRoles.includes(7)) {
                    sql.get(`SELECT count(*) FROM murderMysteryPlayers WHERE roleId = 7 AND guildId ='${message.guild.id}' AND isDead = 0`).then(getZombies => {
                      if (getZombies['count(*)'] === 0) {
                        victory()
                      } else {
                        if (getZombies['count(*)'] == guildData.players) {
                          nonvict()
                        }
                      }
                    })
                  } else {
                    return victory()
                  }
                }
              })
            })
          }
        })
      })
    }
    function botchangename(playercount, fn) {
      if (debugmode === 1) {
        console.log("[DEBUG] BOT CHANGE NAME " + playercount)
      }
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${Math.floor(Math.random() * playercount)}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return new Error("NUUUUUUUUUUU CANT FIND ROW AAAAAAAAAAAAAAAAAAAA")
        }
        if (guildData.lastwill === "") return //fn(null);
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        //fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
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
        if (guildData.lastwill === "0") return;
        message.guild.member(bot.user).setNickname(guildData.lastwill)
        fn(guildData.lastwill)
      })
      return;
    }
*/

    }
    function randomtimesses() {
      var rand = [4000, 3500, 6000, 2000, 4000, 3000]
      var kk = rand[Math.floor(Math.random() * rand.length)];
      if (debugmode === 1) {
        console.log("[DEBUG] TYPE MESSAGE AT " + kk + "!")
      }
      return kk
    }
    function botquotesa() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId = "${message.guild.id}"`).then(guildData => { //stupid javascript function defining thing not working, making me redefine guildData
      if (debugmode === 1) {
        console.log("[DEBUG] BOT QUOTES")
      }
      var kegerg = guildData.players
      let checkjfwfj = bot.channels.get(guildData.murdergamechannelid)
      if (!checkjfwfj) return nochannelfound()
      if (isstopcycle == 1) return;
      if (guildData.isDay == 1) {
        botchangename(kegerg)
        setTimeout(function () {
          setTimeout(function () {
            botquotesa()
          }, randomtimesses())
          checkjfwfj.send(`${/***${thing}**>*/""}${botquotes[Math.floor(Math.random() * botquotes.length)]}`)
        }, 200)
        return;
      }
      if (guildData.isNight === 1) {
        //murder attack
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 1 AND userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE roleId = 2 AND userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
              if (!row2) {

              } else {
                setTimeout(function () {
                  let userz = random(guildData.players)
                  if (userz === 2) return;
                  if (guildData.players === 2) {
                    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${userz}' AND guildId ='${message.guild.id}'`).then(row3 => {
                      if (!row3) {
                        console.log("Murder Mystery - Player not found.")
                      } else {
                        let users = bot.users.get(row3.userId)
                        if (row3.isDead === 1) return //new Error("That person is already dead!")
                        if (row2.isjailed === 1) return;
                        if (users.id === bot.user.id) return;
                        setTimeout(function () {
                          shoot(users.id, bot.user.id, guildData.murdergamechannelid, "")
                        }, 2000)
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
            let userz = random(guildData.players)
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
    })
    }
    function isDay() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId = "${message.guild.id}"`).then(guildData => { //stupid javascript function defining thing not working, making me redefine guildData
        isstopcycle = guildData.isStopcycle
        if (guildData.gameStarted == 0) return;
        if (debugmode === 1) {
          console.log("[DEBUG] isDay")
        }
        if (!bot.guilds.has(message.guild.id)) { //CONFIRM IF GUILD ISNT
          if (debugmode == 1) {
            console.log("[DEBUG] CONFIRM GUILD ISNT")
          }
          try {
            bot.channels.get(guildData.murdergamechannelid).send("**TESTING**\nPlease ignore this.")
          } catch (err) {
            console.log(err)
            if (debugmode == 1) {
              console.log("[DEBUG] Silently End Game (BOT NOT IN GUILD)")
            }
            aaaaaaa()
            sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
          }
        }
        //if (guildData.isHumansvsbots === 1) {
        let findGamemode = gamemodes.find(function (gamemode) {
          return gamemode.modeId == guildData.modeId
        })
        if (!findGamemode) return message.reply("**ERROR**")
        let gameData = guildData.gameData.split("#")
        if (findGamemode.allowedRoles.includes(7)) {
          let infectedData = gameData[0].split("|")
          let gameDataString = ""
          if (infectedData.length > 0) {


            let infectedUsers = infectedData.map(a=>`${a.split(",")[0]},${parseInt(a.split(",")[1]) + 1}`)
infectedUsers.filter(function(b) {
              if (parseInt(b.split(",")[1]) > 1) {
                let zD = b.split(",")
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = ? AND guildId = "${message.guild.id}"`, [zD[0]]).then(userData => {
                  if (!userData) return
                  if (userData.isDead === 1) return
                  bot.users.get(zD[0]).send(translate[guildData.lang].jobchannelmsgs.zombie.turnedintozombie)
                  let turnedzombieString = translate[guildData.lang].jobchannelmsgs.zombie.turnedintozombie
                  turnedzombieString = turnedzombieString.replace("%user%", "<@" + zD[0] + ">")
                  turnedzombieString = turnedzombieString.replace("%role%", getRoleId(userData.roleId, guildData.lang))
                  bot.channels.get(guildData.zombiechannelid).send(turnedzombieString)
                  sql.run(`UPDATE murderMysteryPlayers SET roleId = 7 WHERE guildId = "${message.guild.id}" AND userId = ?`, [zD[0]])
                  console.log(userData.roleId)
                  switch(parseInt(userData.roleId)) {
                    case 1:
                        bot.channels.get(guildData.murderchannelid).overwritePermissions(zD[0], {
                          READ_MESSAGES: null
                        })
                      break;
                    case 2:
                        bot.channels.get(guildData.sheriffchannelid).overwritePermissions(zD[0], {
                          READ_MESSAGES: null
                        })
                      break;
                    case 4:
                        bot.channels.get(guildData.radiochannelid).overwritePermissions(zD[0], {
                          READ_MESSAGES: null
                        })
                      break;
                    case 6:
                        bot.channels.get(guildData.jailorchannelid).overwritePermissions(zD[0], {
                          READ_MESSAGES: null
                        })
                        bot.channels.get(guildData.jailchannelid).overwritePermissions(zD[0], {
                          READ_MESSAGES: null
                        })
                      break;
                  }
                  bot.channels.get(guildData.zombiechannelid).overwritePermissions(zD[0], {
                    READ_MESSAGES: true
                  })
                })
}
            })
            gameData[0] = infectedUsers.filter(b => {
              return parseInt(b.split(",")[1]) < 2
            }).join("|")
            sql.run(`UPDATE murderMystery SET gameData = ? WHERE guildId = "${message.guild.id}"`, [gameData.join("#")])
          }

        }
        if (findGamemode.extra && findGamemode.extra.botsAllowed) {
          setTimeout(function () {
            botquotesa()
          }, 2000)
        }
        //if (guildData.isMurderparty === 0) {
        sql.run(`UPDATE murderMystery SET day = ${guildData.day = guildData.day + 1} WHERE guildId = '${message.guild.id}'`)
        //}
        //if (guildData.isMurderparty === 1) {
        /*
        if (guildData.modeId === 3) {
          if (guildData.players === 1) {
            return victory()
          }
        }
        if (guildData.modeId === 7) {
          if (guildData.players === 1) {
            return victory()
          }
        }
        if (guildData.modeId === 2) {
          if (guildData.players === 1) {
            return victory()
          }
        }
        */
        //if (guildData.modeId !== 3 && guildData.modeId !== 7) {
        checkmurderdead()
        if (debugmode === 1) {
          console.log("[DEBUG] CHECK MURDER DEAD OUTSIDE FUNCTION")
        }
        //}
        sql.run(`DELETE FROM murderMysteryItems WHERE guildId = '${message.guild.id}' AND itemId = 2 AND isDark = 1`)
        sql.run(`UPDATE murderMysteryPlayers SET voted = 0, isjailed = 0, actioned = 0, hasVoted = 0, gold = gold + 1 WHERE guildId = '${message.guild.id}'`)
        sql.run(`UPDATE murderMysteryPlayers SET darkgold = darkgold + 0.5 WHERE roleId = 1 AND guildId = '${message.guild.id}'`)

        sql.run(`UPDATE murderMystery SET isNight = ${guildData.isNight = 0}, isDay = ${guildData.isDay = 1} WHERE guildId = '${message.guild.id}'`)
        //mmplayersData.hasvoted = 0
        //mmplayersData.actioned = 0
        /**
          fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
          if (err) console.error(err)
          });
        **/
        if (isstopcycle == 1 || guildData.gameStarted == 0) return
        //bot.channels.get(guildData.murdergamechannelid).send("Good morning!\nTo vote to kill you must type mm!votehang `@user`\nThe morning will go on for a minute.\nWhile its morning, chat with others to figure out who the murderer/assassin is!")
        if (guildData.day >= 50) {
          let lerotr = translate[guildData.lang].darkshopitems.find(function (a) {
            return a.id === 1
          })
          bot.channels.get(guildData.murdergamechannelid).send(lerotr.sent)
          setTimeout(function () {
            nonvict()
          }, 10000)
          return;
        }
        if (debugmode == 1) {
          console.log("[DEBUG] SEND MURDER GAME CHANNEL")
        }
        bot.channels.get(guildData.murdergamechannelid).send(translate[guildData.lang].goodmorning.replace("%prefix%", guildData.prefix))
        bot.channels.get(guildData.murdergamechannelid).overwritePermissions(message.guild.id, {
          SEND_MESSAGES: null,
          READ_MESSAGES: false
        })
        if (findGamemode.createChannels.includes(5)) {
          bot.channels.get(guildData.shopchannelid).overwritePermissions(message.guild.id, {
            READ_MESSAGES: false,
            SEND_MESSAGES: null
          })
        }
        if (findGamemode.extra && findGamemode.extra.timeCycle){
          if (debugmode === 1) {
            console.log("[DEBUG] CHECK MURDER DEAD OUTSIDE FUNCTION (interval of 10 seconds)")
          }
          murderdeadloop = setInterval(function() {
            checkmurderdead()
          }, 10000);
          return;
        }
        //if (guildData.isFasterMode === 1) {
        if (guildData.modeId === 6) {
          isdayloop = setTimeout(isNight, 10000)
          return;
        }
        isdayloop = setTimeout(isNight, (guildData.nighttimelen * 1000))
      })

    }

    function isNight() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId = "${message.guild.id}"`).then(guildData => { //stupid javascript function defining thing not working, making me redefine guildData
        isstopcycle = guildData.isStopcycle
        if (isstopcycle == 1 || guildData.gameStarted == 0) return
        message.guild.member(bot.user).setNickname("Murder Mystery Bot")
        let findGamemode = gamemodes.find(function(gm) {
          return gm.modeId == guildData.modeId
        })
        if (!findGamemode) return message.reply("**ERROR**")
        if (debugmode === 1) {
          console.log("[DEBUG] CHANGE NAME")
        }
        sql.run(`UPDATE murderMystery SET isDay = ${guildData.isDay = 0}, isNight = ${guildData.isNight = 1} WHERE guildId = '${message.guild.id}'`)
        if (debugmode == 1) {
          console.log("[DEBUG] isNight")
        }
        
        //bot.channels.get(guildData.murdergamechannelid).send("Good night...")
        bot.channels.get(guildData.murdergamechannelid).send(translate[guildData.lang].goodnight)

        bot.channels.get(guildData.murdergamechannelid).overwritePermissions(message.guild.id, {
          READ_MESSAGES: false,
          SEND_MESSAGES: false
        })
        if (findGamemode.createChannels.includes(5)) {
        bot.channels.get(guildData.shopchannelid).overwritePermissions(message.guild.id, {
          READ_MESSAGES: false,
          SEND_MESSAGES: false
        })
      }
        //if (guildData.isFasterMode === 1) {
        if (guildData.modeId === 6) {
          isnightloop = setTimeout(isDay, 30000)
          return;
        }
        isnightloop = setTimeout(isDay, (guildData.daytimelen * 1000))
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
      if (blacklistedguild(message.guild.id) || blacklisteduser(message.author.id)) return message.reply(translate[row.lang].blacklistguildjsa)
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
this.channels.has("423154259404521472") && this.channels.get("423154259404521472").send({embed: new discord.RichEmbed().setTitle("New Suggestion!").setColor('DEFAULT').setAuthor("${author} (${id}) has suggested an Item for the Dark Shop!", "${authorurl}").setDescription("**Item Name**: ${name}\\n**Item Description**: ${description}\\n**Price**: ${price}\\n**What it can do**: ${whatcandoandcannot}").setFooter("${guildname} (${guildid})", "${guildicon}")}).then(m => {
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
          //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
          //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
          if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)

          if (message.channel.id !== guildData.murdergamechannelid) return; //message.reply("You cannot vote in your private channel!");

          //if (guildData.isNight === 1) return message.reply("You cannot do this in the night!")
          if (guildData.isNight === 1 || (guildData.isDay == 0 && guildData.isNight == 0)) return message.reply(translate[guildData.lang].lola)

          //mmplayersData.actioned = 0
          let user = message.mentions.users.first();
          if (!user) return message.reply(translate[guildData.lang].userdoesntexist)
          hasvotedcheck()
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
            if (!row2) {
              //message.reply("You aren't in the game!")
              message.reply(translate[guildData.lang].isntingame)
            } else {
              sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
                if (!row1) {
                  //message.reply("That user isn't in the game!")
                  message.reply(translate[guildData.lang].userisnotingame)
                } else {
                  //if(mmplayersData.hasvoted === 1) return message.reply("You have already voted!")
                  //if (row2.hasVoted === 1) return message.reply("You have already voted!")
                  if (row2.isDead === 1) return;
                  if (row2.hasVoted === 1) return message.reply(translate[guildData.lang].b)
                  if (row1.isDead === 1) return message.reply(translate[guildData.lang].thatpersonisdead)
                  //if (user.id === message.author.id) return message.reply("You cannot vote yourself!")
                  if (user.id === message.author.id) return message.reply(translate[guildData.lang].fkefoekf)
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
                            bot.channels.get(guildData.murdergamechannelid).send(user + translate[guildData.lang].hasbeenhung)
                          }

                          function nowill() {
                            bot.channels.get(guildData.murdergamechannelid).send("There were no last wills to be found...")
                          }

                          function haswill() {
                            bot.channels.get(guildData.murdergamechannelid).send(user + " Had a last will!\nHis will reads:\n```\n" + row1.lastwill + "\n```")
                          }

                          function hisrole() {
                            if (row1.roleId !== 1 || row1.roleId !== 5) {
                              if (row1.roleId === 0) {
                                bot.channels.get(guildData.murdergamechannelid).send(`${user} ${translate[guildData.lang].wasan} **${getRoleId(row1.roleId, guildData.lang)}**`)
                                if (checkassignedd === 1) {
                                  bot.channels.get(guildData.murdergamechannelid).send(`${user} was an **${getRoleId(row1.roleId, guildData.lang)}** and the **Assassin** gained 3 gold for killing his target!"`)
                                  dmassassin(5)
                                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                  return
                                }
                              } else {
                                if (checkassignedd === 1) {
                                  bot.channels.get(guildData.murdergamechannelid).send(`${user} ${translate[guildData.lang].wasa} **${getRoleId(row1.roleId, guildData.lang)}** and the **Assassin** gained 3 gold for killing his target!`)
                                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                  dmassassin(5)
                                  return
                                }
                                bot.channels.get(guildData.murdergamechannelid).send(`${user} ${translate[guildData.lang].wasa} **${getRoleId(row1.roleId, guildData.lang)}**`)
                                sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                return
                              }
                            } else {
                              if (row1.roleId === 1) {
                                bot.channels.get(guildData.murdergamechannelid).send(`${user} ${translate[guildData.lang].wasthe} **${getRoleId(row1.roleId, guildData.lang)}**`)
                                sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                                setTimeout(victory, 2000)
                              } else {
                                bot.channels.get(guildData.murdergamechannelid).send(`${user} ${translate[guildData.lang].wasan} **${getRoleId(row1.roleId, guildData.lang)}**`)
                                sql.run(`UPDATE murderMysteryPlayers SET hasVoted = 0 WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)
                              }
                            }
                          }
                          let aldadaasd = parseInt(guildData.players) - 1
                          if (aldadaasd === row1.voted) {
                            message.reply(user + translate[guildData.lang].hasaroundvote + "**0**" + translate[guildData.lang].hasaroundvote2)
                            //user.send(translate[guildData.lang].youhavedied)
                            user.send(translate[guildData.lang].youhavedied).catch(e => {
                              message.channel.send(`${user}, ${translate[guildData.lang].dmsdisabled}`)
                            })
                            nopermstoanychannel(row1.playerid)
                            //nopermstoanychannel(guildData.playerId)
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
                              message.reply(user + translate[guildData.lang].hasbeenvoted + `**${tasdasd}**` + translate[guildData.lang].morevotes)
                            } else {
                              let weird = aldadaasd - row1.voted
                              message.reply(user + translate[guildData.lang].hasbeenvoted + `**${weird}**` + translate[guildData.lang].morevotes)
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
      if (guildData.gameStarted === 0) return message.reply(translate[guildData.lang].gamehasntstart)
      if (!args[0]) {
        return message.channel.send("Please type in a last will!")
      }
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          return message.reply(translate[guildData.lang].isntingame)
        } else {
          sql.run(`UPDATE murderMysteryPlayers SET lastwill = ? WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`, [args.join(" ")])
          message.author.send("Success! Your will is now:\n```\n" + args.join(" ") + "\n```")
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
      let text = translate[guildData.lang].help
      text = text.replace("%version%", version)
      text = text.replaceAll("%prefix%", guildData.prefix)
      message.channel.send(text, {
        split: "\n"
      })
    }
    if (command === "bug") {
      if (blacklistedguild(message.guild.id) || blacklisteduser(message.author.id)) return message.reply(translate[row.lang].blacklistguildjsa)
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
        fs.writeFile('./mmplayers.json', '{}', 'utf8')
        fs.writeFile('./mmgame.json', '{}', 'utf8')
        fs.writeFile('./preventjoin.json', '{}', 'utf8')
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
    async function victory() {
      await deletgamesess()
      let murdermysteryrole = message.guild.roles.get(guildData.murdermysteryRoleID)
      await murdermysteryrole.delete()
      let findGamemode = gamemodes.find(function (gm) {
        return gm.modeId == guildData.modeId
      })
      if (!findGamemode) return console.error("FINDGAMEMODE NOT FOUND")
      //if (guildData.isMurderparty === 1) {
      if (guildData.modeId === 2) {
        await deleteGameChannel()
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
          bot.channels.get(guildData.defaultChannel).send({
            embed: new RichEmbed().setTitle("The evils have won, the town is dead").setColor(0xFF0000).setDescription("**Murderers**\n" + innocentes).setFooter("If they just say N/A, then ignore it.")
          })
        })

        await aaaaaaa()
        await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
        return
      }
      await deleteGameChannel()
      await aaaaaaa()
      await sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}' ORDER BY roleId ASC`).then(async (rows) => {
        await stopGameMsg(rows, "Innocents win! The town survived!", 0x00FF00, findGamemode)
      })
      await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
    }
    async function nonvict() {
      await deletgamesess()
      let murdermysteryrole = message.guild.roles.get(guildData.murdermysteryRoleID)
      await murdermysteryrole.delete()
      let findGamemode = gamemodes.find(function (gm) {
        return gm.modeId == guildData.modeId
      })
      await deleteGameChannel()
      await aaaaaaa()
      if (!findGamemode) return message.reply("**ERROR**")
      await sql.all(`SELECT * FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}' ORDER BY roleId ASC`).then(async (rows) => {
        await stopGameMsg(rows, "The town has lost. The evils have won.", 0xFF0000, findGamemode)
      })
      await sql.run(`DELETE FROM murderMysteryPlayers WHERE guildId ='${message.guild.id}'`);
    }

    function aaaaaaa() {
      sql.run(`DELETE FROM murderMysteryItems WHERE guildId = "${message.guild.id}"`)
      sql.run(`UPDATE murderMystery SET murderchannelid = 0, 
          murdergamechannelid = 0, 
          healchannelid = 0, 
          sheriffchannelid = 0,
          isDay = 0,
          isNight = 0,
          isStopcycle = ${guildData.isStopcycle = 1},
          gameStarted = ${guildData.gameStarted = 0},
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
      isstopcycle = 1
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
          message.channel.send(`**Shard Info**\n\`\`\`prolog\n${results.map(r =>`SHARD ${r[0]} ~> GUILDS: ${r[1]} | CHANNELS: ${r[2]} | USERS: ${r[3]}, | MEMORY: ${r[4]} | VOICE CHANNELS: ${r[5]} | ACTIVE GAMES: ${r[6]}`).join('\n')}\n\`\`\`\n**Total** (All Added)\n\`\`\`prolog\nSHARDS: ${bot.shard.count} | GUILDS: ${shards[0]} | CHANNELS: ${shards[1]} | USERS: ${shards[2]}, | MEMORY: ${shards[3]} | VOICE CHANNELS: ${shards[4]} | ACTIVE GAMES: ${shards[5]}\n\`\`\`\nCredit \`ohlookitsAugust#1793\` for the code`)
        });
      });
    }
    if (command === "invite") {
      message.channel.send(translate[guildData.lang].lookindms)
      message.author.send("https://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417").catch(e => {
        message.channel.send("https://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417")
      })
    }
    // then KEEL died and went to heaven
    // so one day they met and said hi
    if (command === 'eval') {
      if (message.author.id != '126119057232625664' && message.author.id != "553971625679126549" /*&& message.author.id != '280158289667555328' && message.author.id != '281397352177074177'*/ ) {
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
      let category = args[0]
      if (category == "old") {
        const embed = new RichEmbed()
          .setTitle(`${bot.user.username}'s stats`)
          .setDescription(`Uptime: ${hd(bot.uptime, {round: true})}`)
          .addField(`Misc >`, `**Guilds (size)**: ${bot.guilds.size} (Since this isnt valid, please type mm!shardinfo to see full info of shards + guilds)\n**Users/Bots**: ${bot.users.size} (Since this isnt valid, please type mm!shardinfo to see full info of shards + guilds)/${bot.users.filter(g => g.bot).size} (Since this isnt valid, please type mm!shardinfo to see full info of shards + guilds)\nPing: \`${bot.ping.toFixed(0)}ms\``, true)
          .addField(`VPS >`, `**VPS OS**: ${os.platform()}\n**Mem Usage**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\nNode.js Version: ${process.version}\nDiscord.js Version: v${require('discord.js').version}\nActive Games: ${gameid}\nMurder Mystery Bot Version: ${version}`, true)
          .setTimestamp()
        message.channel.send({
          embed
        });
      } else {
        const requests = [
          bot.shard.broadcastEval('this.guilds.size').then(v => v.reduce((a, b) => a + b, 0)),
          bot.shard.broadcastEval('this.users.size').then(v => v.reduce((a, b) => a + b, 0)),
          bot.shard.broadcastEval('this.users.filter(g => g.bot).size').then(v => v.reduce((a, b) => a + b, 0)),
          bot.shard.broadcastEval('(process.memoryUsage().heapTotal / 1024 / 1024)').then(v => v.reduce((a, b) => a + b, 0)),
          bot.shard.broadcastEval('this.gameid').then(v => v.reduce((a, b) => a + b, 0))
        ];
        Promise.all(requests).then(shards => {
          let guildCount = 0
          let userCount = 0
          let botUser = 0
          let mem = 0
          let gaemid = 0
            guildCount = shards[0]
            userCount = shards[1]
            botUser = shards[2]
            mem = parseInt(shards[3]).toFixed(2)


          const embed = new RichEmbed()
            .setTitle(`${bot.user.username}'s stats`)
            .setDescription(`Uptime: ${hd(bot.uptime, {round: true})}`)
            .addField(`Misc >`, `**Guilds (size)**: ${guildCount}\n**Users/Bots**: ${userCount}/${botUser}\nPing: \`${bot.ping.toFixed(0)}ms\``, true)
            .addField(`VPS >`, `**VPS OS**: ${os.platform()}\n**Mem Usage**: ${mem}MB\nNode.js Version: ${process.version}\nDiscord.js Version: v${require('discord.js').version}\nActive Games: ${shards[4]}\nMurder Mystery Bot Version: ${version}`, true)
            .setTimestamp()
            .setColor(0xFF0000)
          message.channel.send({
            embed
          });
        });
      }

    }
    if (command === "about") {
      let trans = translate[guildData.lang].about
      trans = trans.replace("%user%", bot.user.username)
      trans = trans.replaceAll("%prefix%", guildData.prefix)
      setTimeout(function () {
        message.channel.send(trans)
      }, 500)
    }
    if (command === 'exec') {
      if (message.author.id != '126119057232625664' && message.author.id != "553971625679126549" /*&& message.author.id != '280158289667555328' && message.author.id != '281397352177074177'*/ ) return message.reply("You need a permission: `Developer`")
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
})
// then KEEL KEELED all gods of KEEL and became god
