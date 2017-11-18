// noob code xd
const discord = require('discord.js')
const bot = new discord.Client()
const snekfetch = require('snekfetch')
//const random = require('random-number-generator')
var gameid = 0

//var gamesession = []
var enablechat = 0
var debugmode = 1
const sql = require('sqlite')

const config = require('./config.json')

sql.open('./murdermystery.sqlite')
var version = "1.0.5b"
var botnames = ["Jake", "Jeff", "OhMan", "Noah", "William", "John", "Bob", "Ryan", "Logan", "Aiden", "Ross", "Mark", "Steve", "Landon", "Daniel", "Dan", "Charley", "Charles", "Mario", "Luigi", "Michael", "Yukko", "Luca", "Lucas", "Alfred", "Alex", "Mike", "Henry", "Jacob", "Emily", "Mio-chan", "Yumi", "Joshua", "Matthew", "Christopher", "Andrew", "Ethan", "Joseph", "Anthony", "David", "Alexander", "Madison", "Emma", "Olivia", "Hannah", "Abigail", "Isabella", "Samantha", "Elizabeth", "Ashley", "Alexis", "Sarah", "Sophia", "Amy", "Sora", "Alan", "Parker", "August", "Jason", "Aaron", "Jayden", "Kyle", "Alex", "Carlos", "Steven", "Cody", "Seth", "Blade", "Blake", "Wessel", "Nadeko", "An Unknown Person", "Mikan", "NobleShyGuy", "Etzer", "HtD", "FireMario211", "Krazyman50", "KyleMC1912", "JJking_1", "Sov", "Phase", "FaZe", "Anonymous", "FaZe_Banks", "oklookitsAugust", "Phineas", "AugustBoat"]
var botquotes = ["Hi guys", "Uh..", "LMAO", "Oh no...", "Rip", "Lol", "LOL", "Hmmm <:Thinkhung:320597771310727169>", "Its him!", "Its her!", "Im scared...", "Whos gonna die...?", "Im the Healer!", "Im the Detective!", "Im the Broadcaster!", "Ur ded", "first, oh wait... am i?", "when is time to scream?", "EVERYONE VOTEHANG HIM/HER!!!", "hey guys!", "how yer doin?", "Im the murderer! pls dont kill me ;(", "hi ;)", "hi....", "hello...?", "a-andrew...?", "lol", "rip you all", "where is andrew?", "where did i come from?", "im definetly not gonna die", "Your gonna die tonight :)", "Maybe I will die? xD", "Is it September or August?"]
var rarequotes = ["Hehehehehehhehehhehehe", "You know i have one spooky part in THIS movie ;)", "you cant find me", "wessel was here... >:)", "i bet fire is in this game he made us xdxdxdxdx", "i i KILL HUMANZ", "~~im on meth~~", "You better watch out ;)", "i know your secrets... ;) ;D", "OhMan on meth", "Noble hacked this bot ;) (not rly)", "I will find you and kill you ;)", "IM GOING TO KEEL YOU (define KEEL in DMS and you will be in the bot names. DM me FireMario211#2948) I'll tell you if you are right or wrong. You can only DM me once for that then thats it, so be wise... *use alts*)"]
/*
Hehehehehehhehehhehehe
Hi guys
Uh..
LMAO
Oh no
Rip
Lol
Hmmm :Thinkhung:
Its him!
Im scared
Whos gonna die
Im the healer!
Ur ded
EVERYONE VOTEHANG HIM
first
*/
const fs = require('fs')
var arr = [];
//var targetassassin = []
//let mmgame = JSON.parse(fs.readFileSync('./mmgame.json', 'utf8'));

//let mmplayers = JSON.parse(fs.readFileSync('./mmplayers.json', 'utf8'))
//let preventjoin = JSON.parse(fs.readFileSync('./preventjoin.json', 'utf8'))
let verifyt = JSON.parse(fs.readFileSync('./verificationids.json', 'utf8'));

let aaa = JSON.parse(fs.readFileSync('./aaa.json', 'utf8'));
var isAdmin = user_id => bot.guilds.get('319583713262436354').roles.get('322168622501855232').members.map(member => member.id).indexOf(user_id) > -1;
var isBugTrackers = user_id => bot.guilds.get('319583713262436354').roles.get('321430711473012736').members.map(member => member.id)
/*
let verifyid = Math.random().toString(36).substr(2, 5)

if (!verifyt[verifyid]) verifyt[verifyid] = {
  userid: "",
  verifycode: ""
};

//
let verifyData = verifyt[verifyid]
*/
bot.login(config.token)
//
//
function defgame() {
  snekfetch.post(`https://discordbots.org/api/bots/${bot.user.id}/stats`)
    .set('Authorization', 'DBL TOKEN')
    .send({
      server_count: bot.guilds.size,
      shard_count: 1,
      shard_id: bot.shard.id
    })
    .then(console.log('Updated dboats.org status.'))
    .catch(e => console.warn('dboats.org is daown spammmmm @olay'))

  bot.user.setPresence({
    game: {
      name: `${config.playing}${bot.guilds.size} servers [` + bot.shard.id + "] Shards",
      type: 0
    }
  });
}
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

bot.on("guildCreate", guild => {
  bot.channels.get(config.botlog_channelid).send({
    embed: new discord.RichEmbed().setTitle(':inbox_tray: New Server added!').setAuthor('Server Name: ' + guild.name + ' (' + guild.id + ')', guild.iconURL).addField('Server Owner ID:', guild.ownerID, true).addField('Member Count:', guild.memberCount, true).setThumbnail(guild.iconURL).setColor(0xFFDF00).setDescription('I am now in ' + bot.guilds.size + ' Servers!').setTimestamp()
  });

  console.log('Server Name: ' + guild.name + ' (' + guild.id + ')' + ' New Server added! ' + 'I am now in ' + bot.guilds.size + ' Servers!')
  defgame()
  //bot.user.setGame(config.playing + bot.guilds.size + " servers")

});

bot.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  if (guild.id === '264445053596991498') return;
  if (guild.id === '110373943822540800') return;
  if (!isAdmin(member.id) || !ownerids.includes(member.id)) return;
  if (ownerids.includes(member.id)) {
    guild.defaultChannel.send({
      embed: new discord.RichEmbed().setDescription("👑 The Bot Owner `" + member.tag + "` has joined your server! 👑")
    })
    return;
  }
  if (isAdmin(member.id)) {
    guild.defaultChannel.send({
      embed: new discord.RichEmbed().setDescription(":gear: A Bot Administrator `" + member.tag + "` has joined your server! :gear:")
    })
    return;
  }
})

bot.on('guildDelete', guild => {
  bot.channels.get(config.botlog_channelid).send({
    embed: new discord.RichEmbed().setTitle(':outbox_tray: Bot was removed from a server :(').setAuthor('Server Name: ' + guild.name + ' (' + guild.id + ')', guild.iconURL).setThumbnail(guild.iconURL).setColor(0xFFDF00).setDescription('I am now in ' + bot.guilds.size + ' Servers!').setTimestamp()
  });
  defgame()
})

/*
bot.on("guildDelete", guild => {
  //bot.channels.get(config.botlog_channelid).sendEmbed(new discord.RichEmbed().setTitle(':outbox_tray: Bot was removed from a server :(').setAuthor('Server Name: ' + guild.name + ' (' + guild.id + ')', guild.iconURL).setThumbnail(guild.iconURL).setColor(0xFFDF00).setDescription('I am now in ' + bot.guilds.size + ' Servers!').setTimestamp());

  console.log('Server Name: ' + guild.name + ' (' + guild.id + ')' + ' Bot was removed from a server :( ' + 'I am now in ' + bot.guilds.size + ' Servers!')
  
  bot.user.setPresence({
    game: {
      name: `${config.playing}${bot.guilds.size} servers`,
      type: 0
    }
  });
  */
//bot.user.setGame(config.playing + bot.guilds.size + " servers")

//start code
//stop code

//});
/*
bot.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (guild.id !== '319583713262436354') return;

  bot.channels.get('319590345052520448').send("<@" + member.user.id + "> Please check your DMS for a Verification code!")

  verifyData.userid = member.user.id
  verifyData.verifycode = verifyid

  member.user.send('Please follow these steps\nIn <#319589323894816789>, you will have to type this command:\nmm!verify `' + verifyid + "`\nThen you will be verified!")
  //member.guild.defaultChannel.sendEmbed(new discord.RichEmbed().setTitle('Welcome to ' + guild.name + '!').setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL).setThumbnail(guild.iconURL).setColor(0x00FF3C).setDescription('Hope you have a great time here!').setTimestamp());

  fs.writeFile('./verificationids.json', JSON.stringify(verifyt), (err) => {
    if (err) console.error(err)
  });

});
*/
/*
bot.on("guildMemberRemove", (member) => {
  const guild = member.guild;
	member.guild.defaultChannel.sendEmbed(new discord.RichEmbed().setTitle('Has left ' + guild.name + '!').setAuthor(member.user.username + '#' + member.user.discriminator, member.user.avatarURL).setThumbnail(guild.iconURL).setColor(0xFF0000).setDescription('Rest in pieces :(').setTimestamp());
});
*/

bot.on('message', message => {
  if (message.channel.type === "dm") return message.author.send("Sorry but you may not DM Murder Mystery Bot.")
  
  if (enablechat === 1) {
    if (message.guild.id !== "264445053596991498" || message.guild.id !== "349147966038212609" || message.guild.id !== "347175421449863177") {
      console.log("[CHAT]" + message.author.tag + "(" + message.author.id + ") - " + message.content + " on " + message.guild.name + " (" + message.guild.id)
    }
  }

  function roleupdate(playerid, roleid, checkforcedrole) {
    if (checkforcedrole === 1) return;
    var playeridz = playerid
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {

        message.channel.send("Error Code 498 at roleupdate")
        throw new Error("Error Code 498 at roleupdate")
      } else {
        if (roleid === 1) {
          sql.run(`UPDATE murderMysteryPlayers SET isMurderer = ${row.isMurderer = 1} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)

          return;
        }
        if (roleid === 2) {
          sql.run(`UPDATE murderMysteryPlayers SET isSheriff = ${row.isSheriff = 1} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
          return;
        }
        if (roleid === 3) {
          sql.run(`UPDATE murderMysteryPlayers SET isHealer = ${row.isHealer = 1} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
          return;
        }
        if (roleid === 4) {
          sql.run(`UPDATE murderMysteryPlayers SET isRadioPerson = ${row.isRadioPerson = 1} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
          return;
        }
        if (roleid === 5) {
          sql.run(`UPDATE murderMysteryPlayers SET isAssassin = ${row.isAssassin = 1} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
          return;
        }
        if (roleid === 6) {
          sql.run(`UPDATE murderMysteryPlayers SET isJailor = ${row.isJailor = 1} WHERE playerid = '${playeridz}' AND guildId = '${message.guild.id}'`)
          return;
        }
        message.reply("`ERROR` " + `Role ID not found PID: ${playerid} RID: ${roleid}`)
        throw new Error(`Role ID not found PID: ${playerid} RID: ${roleid}`)





      }
    })
  }

  if (message.author.bot) {
    if (message.author.id !== bot.user.id) return;
  }

  //if (message.channel.type === 'dm') return message.author.send("You cannot use commands in DMs! Please use it on a server!")


  var mm = {
    msgs: {
      errors: {
        roleexisting: "That role doesn't exist!",
        hostrole: "You have not either put the host role in the database OR you deleted it!",
        hostrolenotfound: "Error...\nHost Role Not Found!",
        mmrolenotfound: "Error...\nMurder Mystery Role Not Found!",
        startcmd: "You haven't started the game yet! Type `mm!game start` to start the game!"
      },
      success: {

      },
      normal: {

      }
    }
  }

  function randomnamechooser() {
    return botnames[Math.floor(Math.random() * botnames.length)];
  }

  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  console.log(message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ') did the command: ' + command + " on " + message.guild.name + " (" + message.guild.id + ")");

  let args = message.content.split(" ").slice(1);


  if (command === "updates") {
    if (message.guild.id !== "319583713262436354") return;
    let updatesrole = bot.guilds.get('319583713262436354').roles.find('name', 'Updates').id
    if (!updatesrole) return message.channel.send("`ERROR` Updates role not found!")
    let guildmember = message.guild.member(message.author)
    if (guildmember.roles.has(updatesrole)) {
      guildmember.addRoles(updatesrole)
      message.channel.send("**Removed the** `" + updatesrole.name + "` **role!**")
    } else {
      guildmember.removeRoles(updatesrole)
      message.channel.send("**Added the** `" + updatesrole.name + "` **role!**")
    }
  }

  if (command === "beeplesspizza") {
    message.channel.send("Beepless Pizza Script\n*calls*\nHey I would like to place a order\nYea?\nI would like a.......\n**BEEPLESS PIZZA** wit uh 666L of coke\nA what kinda pizza? also we got 1L\nI said I want my pizza to be **BEEPLESS**\nHow can a pizza be beepless? theres no swearing or talking in the pizza\nlook dude just give me my pizza bruh,\nyou dont put the buzzer in the pizza, is **BEEPLESS**\nson what school you go to\njust give me my pizza dude, thats all I want it **BEEPLESS**")
  }
  if (command === "defgame") {
    defgame()
    //bot.user.setGame(config.playing + bot.guilds.size + " servers")
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
  if (command === "gay") {
    message.channel.send("...")
  }
  if (command === "fuckyou") {
    message.channel.send("What did I even do to you?")
  }
  if (command === "mmbo") {
    message.channel.send("Success! You have gotten Administrator!")
  }
  if (command === "olay") {
    message.channel.send("dboats.org is daown spammmmm @olay")
  }

  function dmassassin(type, user) {
    var wewew = 1
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE isAssassin ='${wewew}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        throw new Error("User isn't in the game")
      } else {
        if (type === 1) {
          bot.users.get(row.userId).send("The **Murderer** has killed your target! You have gained $3!\nYou have no new Targets.")
          return;
        }
        if (type === 2) {
          bot.users.get(row.userId).send("The **Jailor** has killed your target! You have gained $3!\nYou have no new Targets.")
          return
        }
        if (type === 3) {
          bot.users.get(row.userId).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
          return
        }
        if (type === 4) {
          bot.users.get(row.userId).send("Your target is " + bot.users.get(user) + ".")
        }
        if (type === 5) {
          bot.users.get(row.userId).send("Your target has been killed! You have gained $3!\nYou have no new Targets.")
          return
        }

      }
    })
  }

  function targetassassin(user, type) {
    let users = bot.users.get(user)
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")
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

      }

    })
  }

  if (command === "game") {
    //return message.reply("Sorry, but this command is in maintanance.")

    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }

    let category = args[0]

    if (category === "dev") {
      if (message.author.id !== "126119057232625664") return
      let ccc = args[1]
      if (ccc === "setupsql") {
        message.channel.send("setting up")

      }
    } else



    if (category === "fixgame") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {
          let roledata = bot.guilds.get(message.guild.id).roles.get(row.hostRoleID)
          //let murdermysterydataa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)
          if (!roledata) return message.reply(mm.msgs.errors.hostrole)
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply("You do not have permission to use this command!\nYou need the Game Hoster role!")
          }
          message.reply("Attempting to fix the game... (Make sure you deleted all the channels Murder Mystery Bot made, also the role as well)").then(m => {
            setTimeout(function () {
              aaaaaaa()
              deleteallplayerz()
              m.edit("Successfully fixed the game! hopefully it works now ._.")
            }, 2000)
          })

        }
      })
    }

    /**
    function looprandomidz(){
      randomizeids()
    }

                                      function randomizeids() {
                                        var ccc = Math.floor(Math.random() * 8) + 1
                                        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${ccc}' AND guildId ='${message.guild.id}'`).then(row1 => {
                                          if(!row){
                                            sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row.playerid = ccc} WHERE userId = ${message.author.id} AND guildId = '${message.guild.id}'`);
                                            
                                          } else {
                                            if(ccc === row1.playerid) return looprandomidz();
                                          }
                                          })
                                      }
    **/
    function insertbot(playerid) {
      if (debugmode === 1) {
        console.log("[DEBUG] INSERT BOT ID " + playerid)
      }

      var playeridzz = playerid
      var tenant_id_count = parseInt(playeridzz, 10);
      if (isNaN(tenant_id_count)) return new Error("Player ID isn't an Integer!")
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playeridzz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {
          sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, bot.user.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, randomnamechooser(), 0, 0, 0, 0, 0, 0, playeridzz]);

          //arr.push(message.author.id)
          //message.guild.member(bot.user).addRole(murdermysterydataa)

          //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = } WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
          //message.reply("SETUP!")
        } else {

          message.reply("`ERROR` Bot is already in the game!")
          throw new Error("Bot is already in the game!")


        }
      })
    }

    function addplayer() {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Error 404 Data not found.")
        } else {
          sql.run(`UPDATE murderMystery SET players = ${row.players + 1} WHERE guildId = '${message.guild.id}'`);
        }
      })
    }

    function insertplayer(playercount, mmroleid, msgid) {

      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          return message.reply("Error 404 Data not found.")
        } else {

          var playeridzz = playercount
          var tenant_id_count = parseInt(playeridzz, 10);
          var playeridz = tenant_id_count + 1
          console.log(playeridz)
          if (isNaN(tenant_id_count)) return new Error("Player ID isn't an Integer!")
          //if (row.isOneVOne === 1) {
          if (row.modeId === 3) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                //addplayer()

                if (playeridz === 1) {
                  sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                  roleupdate(1, 1)
                  console.log("one one")
                }
                if (playeridz === 2) {
                  sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                  roleupdate(2, 2)
                }
                //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz]);

                let murdermysterydataa = bot.guilds.get(message.guild.id).roles.get(mmroleid)

                if (!murdermysterydataa) return message.reply("Error...")
                arr.push(message.author.id)
                message.guild.member(message.author).addRole(murdermysterydataa)

                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + " You have been succesfully joined the game! Please wait while other players join in...")
                })

                //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = } WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
                //message.reply("SETUP!")
              } else {

                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + " You are already in the game")
                })

              }
            })
            return
          }
          //if (row.isMurderparty === 1) {
          if (row.modeId === 2) {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                //addplayer()

                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);


                //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);

                let murdermysterydataa = bot.guilds.get(message.guild.id).roles.get(mmroleid)

                if (!murdermysterydataa) return message.reply("Error...")
                arr.push(message.author.id)
                message.guild.member(message.author).addRole(murdermysterydataa)

                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + " You have been succesfully joined the game! Please wait while other players join in...")
                })

                //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = } WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
                //message.reply("SETUP!")
              } else {

                message.channel.fetchMessage(msgid).then(m => {
                  m.edit(message.author + " You are already in the game")
                })

              }
            })
            return;
          }
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
            if (!row1) {
              //addplayer()

              if (playeridz === 1) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                roleupdate(1, 1)
                console.log("one one")
              }
              if (playeridz === 2) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                roleupdate(2, 2)
              }
              if (playeridz === 3) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                roleupdate(3, 3)
              }
              if (playeridz === 4) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                roleupdate(4, 4)
              }
              if (playeridz === 5) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                roleupdate(5, 5)
              }
              if (playeridz === 6) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);
                roleupdate(6, 6)
              }
              if (playeridz > 6) {
                sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);

              }
              //sql.run('INSERT INTO murderMysteryPlayers (guildId, userId, isMurderer, isSheriff, isHealer, isRadioPerson, isAssassin, isJailor, isReady, isDead, voted, lastwill, actioned, isenter, assigned, isjailed, hasjailed, beenassigned, playerid, hasVoted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, playeridz, 0]);

              let murdermysterydataa = bot.guilds.get(message.guild.id).roles.get(mmroleid)

              if (!murdermysterydataa) return message.reply("Error...")
              arr.push(message.author.id)
              message.guild.member(message.author).addRole(murdermysterydataa)

              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + " You have been succesfully joined the game! Please wait while other players join in...")
              })

              //sql.run(`UPDATE murderMysteryPlayers SET playerid = ${row1.playerid = 1www} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);
              //message.reply("SETUP!")
            } else {

              message.channel.fetchMessage(msgid).then(m => {
                m.edit(message.author + " You are already in the game")
              })

            }
          })
        }
      })
    }


    // IDEA: ak
    /**
    if(category === "murdermysteryrole"){
      let staff = message.guild.member(message.author).permissions.has('KICK_MEMBERS')

      if(!staff) return message.reply("You do not have permission to add a host role! You need the KICK_MEMBERS permission")
      let rolename = args.splice(1).join(' ')
      let roledata = bot.guilds.get(message.guild.id).roles.find('name', rolename)
      if(!roledata) return message.reply(mm.msgs.errors.roleexisting)
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if(!row){
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")

          return;
        } else {
          let aaaa = bot.guilds.get(message.guild.id).roles.find('name', rolename);
          sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = aaaa.id} WHERE guildId = '${message.guild.id}'`);
          message.reply("Successfully put the role '" + rolename + "' into the Database! You can now play games!")
        }
      })
    }
**/
    if (category === "addhostrole") {
      let staff = message.guild.member(message.author).permissions.has('MANAGE_ROLES')

      if (!staff) return message.reply("You do not have permission to add a host role! You need the `MANAGE_ROLES` permission")
      let rolename = args.splice(1).join(' ')
      let roledata = bot.guilds.get(message.guild.id).roles.find('name', rolename)
      if (!roledata) return message.reply(mm.msgs.errors.roleexisting)
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")

          return;
        } else {
          let aaaa = bot.guilds.get(message.guild.id).roles.find('name', rolename);
          sql.run(`UPDATE murderMystery SET hostRoleID = ${row.hostRoleID = aaaa.id} WHERE guildId = '${message.guild.id}'`);
          message.reply("Successfully put the role '" + rolename + "' into the Database! ")
        }
      })
    } else
    if (category === "setupdata") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          sql.run('INSERT INTO murderMystery (guildId, hostRoleID, rank, murderWins, innocentWins, murderchannelid, healchannelid, sheriffchannelid, murdergamechannelid, radiochannelid, host, gameStarted, spectatorchannelid, isDay, isNight, isStopcycle, murdermysteryRoleID, jailorchannelid, jailchannelid, players, modeId, startcmd, gameid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [message.guild.id, "0", "0", 0, 0, "0", "0", "0", "0", "0", "0", 0, "0", "0", "0", 0, 0, 0, 0, 0, 0, 0, 0]);

          message.reply("Successfully put your server into the database!")


        } else {

          //sql.run(`UPDATE guildLogs SET balance = ${row.balance + 1000} WHERE userId = ${message.author.id}`);
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
          if (row.gameStarted === 1) return message.reply("Sorry but the game has already started!")
          if (row.startcmd === 0) return message.reply("The game hasn't been started!")
          //if (row.isMurderparty === 1) return message.reply("Sorry but you can't change roles in `Murder Party` Mode!")
          if (row.modeId === 2) return message.reply("Sorry but you can't change roles in `Murder Party` Mode!")
          if (row.modeId === 3) return message.reply("Sorry but you can't change roles in `1v1` Mode!")
          //if (row.isOneVOne === 1) return message.reply("Sorry but you can't change roles in `1v1` Mode!")

          let user = message.mentions.users.first();
          if (!args[0]) return message.reply("Please mention a user.")
          if (!user) return message.reply("That is an invalid user!")
          let role = args[1]
          if (!role) return message.reply("Please type in a role you want to pick.\n**List of roles:**\n```\nmurderer\ndetective\nhealer\nbroadcaster\nassassin\njailor")
          if (role === "murderer") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user hasn't joined the game!")
              } else {
                roleupdate(row1.playerId, 1)
              }
            })
            return;
          }
          if (role === "detective") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user hasn't joined the game!")
              } else {
                roleupdate(row1.playerId, 2)
              }
            })
            return;
          }
          if (role === "healer") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user hasn't joined the game!")
              } else {
                roleupdate(row1.playerId, 3)
              }
            })
            return;
          }
          if (role === "broadcaster") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user hasn't joined the game!")
              } else {
                roleupdate(row1.playerId, 4)
              }
            })

            return;
          }
          if (role === "assassin") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user hasn't joined the game!")
              } else {
                roleupdate(row1.playerId, 5)
              }
            })

            return;
          }
          if (role === "jailor") {
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user hasn't joined the game!")
              } else {
                roleupdate(row1.playerId, 6)
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
          //if(preventjoinData.start === 1) return message.reply("There is already a game going on in another server")
          let roledata = bot.guilds.get(message.guild.id).roles.get(row.hostRoleID)
          //let murdermysterydataa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)
          if (!roledata) return message.reply(mm.msgs.errors.hostrole)

          if (!message.guild.member(bot.user).permissions.has('MANAGE_ROLES')) return message.reply("Please give me the permission `MANAGE_ROLES` so you can play Murder Mystery!")
          if (!message.guild.member(bot.user).permissions.has('MANAGE_CHANNELS')) return message.reply("Please give me the permission `MANAGE_CHANNELS` so you can play Murder Mystery!")
          //if (!murdermysterydataa) return message.reply("You have not either put the Murder Mystery role in the database OR you deleted it!")

          /**
              if(category === "murdermysteryrole"){
                let staff = message.guild.member(message.author).permissions.has('KICK_MEMBERS')

                if(!staff) return message.reply("You do not have permission to add a host role! You need the KICK_MEMBERS permission")
                let rolename = args.splice(1).join(' ')
                let roledata = bot.guilds.get(message.guild.id).roles.find('name', rolename)
                if(!roledata) return message.reply(mm.msgs.errors.roleexisting)
                sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
                  if(!row){
                    message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")

                    return;
                  } else {
                    let aaaa = bot.guilds.get(message.guild.id).roles.find('name', rolename);
                    sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = aaaa.id} WHERE guildId = '${message.guild.id}'`);
                    message.reply("Successfully put the role '" + rolename + "' into the Database! You can now play games!")
                  }
                })
              }
           **/

          let categorya = args[1]
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply("You do not have permission to use this command!\nYou need the Game Hoster role!")
          }

          if (row.startcmd === 1) return message.reply("You have already started the game")


          if (categorya === "murderparty") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Murder Party)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))


            //return message.reply("That mode hasn't even been added yet...")
            gameid++;
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
            })
            */
            bot.channels.get('351461628635774978').send({
              embed: new discord.RichEmbed()
                .setTitle("Murder Mystery Bot Game Logs")
                .setDescription("A game has been started")
                .addField("Guild ID", message.guild.id)
                .addField("Channel ID", message.channel.id)
                .addField("Game ID", gameid)
                .addField("Host", message.author.tag)
                .addField("Host (User ID)", message.author.id)
                .addField("Type", categorya)
            })
            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

            //sql.run(`UPDATE murderMystery SET isMurderparty = ${row.isMurderparty = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 2} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            message.channel.send(message.author + " has setup a **Murder Party** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            return;
          }

          if (categorya === "fastermode") {
            return message.reply("This mode has been added but it has been put as a development build due to bugs and stuff. If you want to test out this build, you must be staff on our server.")
            message.guild.createRole({
              name: 'Playing Murder Mystery (Faster Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))


            //return message.reply("That mode hasn't even been added yet...")

            sql.run(`UPDATE murderMystery SET isFasterMode = ${row.isFasterMode = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            message.channel.send(message.author + " has setup a **Faster Mode** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            //         fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //   	if (err) console.error(err)
            // });
            return;
          }
          if (categorya === "1v1") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (1v1 Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))


            //return message.reply("That mode hasn't even been added yet...")
            //preventjoinData.isOneVOne = 1

            //preventjoinData.guildID = message.guild.id
            gameid++;
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
            })
            */
            bot.channels.get('351461628635774978').send({
              embed: new discord.RichEmbed()
                .setTitle("Murder Mystery Bot Game Logs")
                .setDescription("A game has been started")
                .addField("Guild ID", message.guild.id)
                .addField("Channel ID", message.channel.id)
                .addField("Game ID", gameid)
                .addField("Host", message.author.tag)
                .addField("Host (User ID)", message.author.id)
                .addField("Type", categorya)
            })

            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

            //preventjoinData.start = 1
            //sql.run(`UPDATE murderMystery SET isOneVOne = ${row.isOneVOne = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 3} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            message.reply("has setup a **1v1 Mode** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")


            //            fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //      	if (err) console.error(err)
            //    });
            return;
          }

          if (categorya === "killermode") {
            return message.reply("That mode hasn't even been added yet...")

            sql.run(`UPDATE murderMystery SET isKillermode = ${row.isKillermode = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);

            message.channel.send(message.author + " has setup a **Killer Mode** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")


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
            bot.channels.get('351461628635774978').send({
              embed: new discord.RichEmbed()
                .setTitle("Murder Mystery Bot Game Logs")
                .setDescription("A game has been started")
                .addField("Guild ID", message.guild.id)
                .addField("Channel ID", message.channel.id)
                .addField("Game ID", gameid)
                .addField("Host", message.author.tag)
                .addField("Host (User ID)", message.author.id)
                .addField("Type", categorya)
            })
            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

            //preventjoinData.start = 1
            //sql.run(`UPDATE murderMystery SET isHumansvsbots = ${row.isHumansvsbots = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 4} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);
            message.reply("has setup a **Humans VS Bots** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")


            //            fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //      	if (err) console.error(err)
            //    });
            return;
          }
          if (categorya === "unlimitedmode") {
            message.guild.createRole({
              name: 'Playing Murder Mystery (Unlimited Players Mode)'
            }).then(role => sql.run(`UPDATE murderMystery SET murdermysteryRoleID = ${row.murdermysteryRoleID = role.id} WHERE guildId = '${message.guild.id}'`))

            sql.run(`UPDATE murderMystery SET host = ${row.host = message.author.id} WHERE guildId = '${message.guild.id}'`)

            gameid++;
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
            bot.channels.get('351461628635774978').send({
              embed: new discord.RichEmbed()
                .setTitle("Murder Mystery Bot Game Logs")
                .setDescription("A game has been started")
                .addField("Guild ID", message.guild.id)
                .addField("Channel ID", message.channel.id)
                .addField("Game ID", gameid)
                .addField("Host", message.author.tag)
                .addField("Host (User ID)", message.author.id)
                .addField("Type", categorya)
            })
            message.channel.send(message.author + " has setup a **Regular** (Unlimited Players Mode) Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

            //preventjoinData.guildID = message.guild.id
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 5} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);


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
            bot.channels.get('351461628635774978').send({
              embed: new discord.RichEmbed()
                .setTitle("Murder Mystery Bot Game Logs")
                .setDescription("A game has been started")
                .addField("Guild ID", message.guild.id)
                .addField("Channel ID", message.channel.id)
                .addField("Game ID", gameid)
                .addField("Host", message.author.tag)
                .addField("Host (User ID)", message.author.id)
                .addField("Type", categorya)
            })
            message.channel.send(message.author + " has setup a **Regular** Murder Mystery Game! If you want to join, type\n" + config.prefix + "game join\nTo join the match!")
            sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = gameid} WHERE guildId = '${message.guild.id}'`);

            //preventjoinData.guildID = message.guild.id
            sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 1} WHERE guildId = '${message.guild.id}'`);
            sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 1} WHERE guildId = '${message.guild.id}'`);


            //fs.writeFile('./preventjoin.json', JSON.stringify(preventjoin), (err) => {
            //if (err) console.error(err)
            // });

          } else
            message.reply("That mode doesn't exist!\nPlease use these categories:\n```md\nRegular - Classic Murder Mystery! (regular)\n\nMurder Party - Everyone is a murderer! (murderparty)\n\nHumans VS Bots - Added extra bots (not added yet)\n\nKiller Mode - There is one Detective and Everyone is a murderer (not added yet)\n\nSpecialist Town - Everyone is either Murderer, dective, healer, etc (not added yet)\n\n5050 - 50 murderers, 50 detectives (not added yet)\n\n2 birds 1 stone - 2 murds 1 detect Or 2 detect 1 murd (not added yet)\nFaster mode - Classic murder mystery but the time is quicker (fastermode)\n\nTime mode - In the day time, the Murderer can attack, but in the night they cant. (not added yet)\n\n1v1 Mode - 1 Detective and 1 Murderer, ONLY 2 People can do this mode. (1v1)\n\nBot Murder Mode - At night the bot types mm!kill (random) (not added yet)\n\nRejected Roles Mode - A mode that contains (most of) the rejected roles (not added yet)\n\nRobbery - 1-5 (varietied by server number) people are dressed in Robber clothing. Then Cops (act like detective) will try to apprehend them. The rest are Shop keepers. (innocents) They are managed to keep the store without being robbed.\nIf Robber/Murderer kills the Shop Keeper or gets detected by camera (camera has 3 seconds before detection) The Cops will get detected on where a robber is at\n(The Town varies around how much there is in the server)\n\n(Small Town: 1-5 People in Server)\n\n(Medium Town: 7-max People in server)\n(Big Town 8+ people in server) (not added yet)\n\nUnlimted Players Mode - Have more than 8 people? this is the mode for you! You can have an unlimited amount of players! (unlimitedmode)\n\nThats all the modes\n```")
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
          let roledata = bot.guilds.get(message.guild.id).roles.get(row.hostRoleID)

          if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)

          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply("You do not have permission to use this command!\nYou need the Game Hoster role!")
          }
          if (row.startcmd === 0) return message.reply("There is no game going on!")
          message.reply("Successfully (or not) stopped the game!")
          if (row.gameStarted === 0) {
            let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
            murdermysteryrole.delete()
            /**
                    //fs.writeFile('./mmplayers.json', '{}', 'utf8')
                    fs.writeFile('./mmgame.json', '{}', 'utf8')

                    fs.writeFile('./preventjoin.json', '{}', 'utf8')
            **/
            message.guild.defaultChannel.sendMessage("The game has been stopped by `" + message.author.tag + "`!")
            setTimeout(aaaaaaa, 1500)
            setTimeout(deleteallplayerz, 2000)
            return
          }
          //if (row.isMurderparty === 1) {
          if (row.modeId === 2) {


            let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
            murdermysteryrole.delete()
            /**
                    //fs.writeFile('./mmplayers.json', '{}', 'utf8')
                    fs.writeFile('./mmgame.json', '{}', 'utf8')

                    fs.writeFile('./preventjoin.json', '{}', 'utf8')
            **/
            bot.channels.get(row.murdergamechannelid).delete()
            bot.channels.get(row.murderchannelid).delete()
            message.guild.defaultChannel.sendMessage("The game has been stopped by `" + message.author.tag + "`!")
            setTimeout(aaaaaaa, 1500)
            setTimeout(deleteallplayerz, 2000)


            return
          }

          //if (row.isOneVOne === 1) {
          if (row.modeId === 3) {
            /**
                    fs.writeFile('./mmplayers.json', '{}', 'utf8')
                    fs.writeFile('./mmgame.json', '{}', 'utf8')

                    fs.writeFile('./preventjoin.json', '{}', 'utf8')
            **/

            let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
            murdermysteryrole.delete()
            bot.channels.get(row.murdergamechannelid).delete()
            bot.channels.get(row.sheriffchannelid).delete()
            bot.channels.get(row.murderchannelid).delete()
            //bot.channels.get(row.radiochannelid).delete()
            setTimeout(aaaaaaa, 1500)
            setTimeout(deleteallplayerz, 1000, 1)





            message.guild.defaultChannel.sendMessage("The game has been stopped by `" + message.author.tag + "`!")

            return
          }

          fs.writeFile('./mmplayers.json', '{}', 'utf8')
          fs.writeFile('./mmgame.json', '{}', 'utf8')

          fs.writeFile('./preventjoin.json', '{}', 'utf8')


          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()



          let channela = bot.channels.get(row.healchannelid)
          let channelab = bot.channels.get(row.sheriffchannelid)
          let channelac = bot.channels.get(row.murderchannelid)
          let channelad = bot.channels.get(row.radiochannelid)
          let channeladd = bot.channels.get(row.jailchannelid)
          let channelaee = bot.channels.get(row.jailorchannelid)
          let channelazz = bot.channels.get(row.murdergamechannelid)
          if (!channelazz) {
            message.channel.send("`ERROR` Murder Game Channel not found!")
          }
          if (channelazz) {
            channelazz.delete()
          }
          if (!channelaee) {
            message.channel.send("`ERROR` Jailor Channel not found!")
          }
          if (channelaee) {
            channeladd.delete()
          }
          if (!channeladd) {
            message.channel.send("`ERROR` Jail Channel not found!")
          }
          if (channeladd) {
            channeladd.delete()
          }
          if (!channela) {
            message.channel.send("`ERROR` Healer Channel not found!")
          }
          if (channela) {
            channela.delete()
          }
          if (!channelab) {
            message.channel.send("`ERROR` Detective Channel not found!")
          }
          if (channelab) {
            channelab.delete()
          }
          if (!channelac) {
            message.channel.send("`ERROR` Murderer Channel not found!")
          }
          if (channelac) {
            channelac.delete()
          }
          if (!channelad) {
            message.channel.send("`ERROR` Radio Channel not found!")
          }
          if (channelad) {
            channelad.delete()
          }
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz, 1000, 0)




          message.guild.defaultChannel.sendMessage("The game has been stopped by `" + message.author.tag + "`!")


        }

      })
    } else

      //
    function aaaa() {
      process.exit()
    }

    function murderchannelidz(id) {

      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("ERR, WHAT THE HELL JUST HAPPENED? 824-6815")
        } else {

          sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = id} WHERE guildId = '${message.guild.id}'`)
        }
      })
    }

    function detectivechannelidz(id) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("ERR, WHAT THE HELL JUST HAPPENED? 824-6815")
        } else {



          sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = id} WHERE guildId = '${message.guild.id}'`)
        }
      })
    }

    function jailchannelidz(id) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("ERR, WHAT THE HELL JUST HAPPENED? 824-6815")
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] Jail Channel ID set")
          }
          sql.run(`UPDATE murderMystery SET jailchannelid = ${row.jailchannelid = id} WHERE guildId = '${message.guild.id}'`)
        }

      })


    }

    function jailorchannelidz(id) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("ERR, WHAT THE HELL JUST HAPPENED? 824-6815")
        } else {
          sql.run(`UPDATE murderMystery SET jailorchannelid = ${row.jailorchannelid = id} WHERE guildId = '${message.guild.id}'`)
        }

      })
    }

    function radiochannelidz(id) {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("ERR, WHAT THE HELL JUST HAPPENED? 824-6815")
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] Radio Channel ID set")
          }

          sql.run(`UPDATE murderMystery SET radiochannelid = ${row.sheriffchannelid = id} WHERE guildId = '${message.guild.id}'`)
        }

      })
    }

    function healerchannelidz(id) {

      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("ERR, WHAT THE HELL JUST HAPPENED? 824-6815")
        } else {

          if (debugmode === 1) {
            console.log("[DEBUG] Healer Channel ID set")
          }

          sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = id} WHERE guildId = '${message.guild.id}'`)
        }
      })


    }

    function createhealerchannel() {
      //var playeridz = 3
      var ishealer = 1
      //sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE isHealer ='${ishealer}' AND guildId ='${message.guild.id}'`).then(row1 => {

        if (!row1) {

          message.channel.send("Error Code 497 at createhealerchannel")
          throw new Error("Error Code 497 at createhealerchannel")
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
            c.sendMessage("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")
            /**
                        if(arr.length === 7){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                        }
                        if(arr.length === 8){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                        }

                        if(arr.length === 6){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                        }
            **/
            healerchannelidz(c.id)

          })
        }
      })
    }

    function createdetectivechannel(isHumansvsbots) {
      //var playeridz = 2
      var isdetective = 1
      //var aaa = 1
      /*
      if (isHumansvsbots === 1) {
        var playeridzz = 4
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridzz}' AND guildId ='${message.guild.id}'`).then(row1 => {
          //sql.get(`SELECT * FROM murderMysteryPlayers WHERE isSheriff ='${aaa}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {

            message.channel.send("Error Code 496 at createdetectivechannel")
            throw new Error("Error Code 496 at createdetectivechannel")
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

              c.sendMessage("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
              /**
                          //if(arr.length === 7){
                            //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                          //}
                          //if(arr.length === 8){
                            c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                          }

                          if(arr.length === 6){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                          }
                          if(arr.length === 5){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
              **/
      /*
                    detectivechannelidz(c.id)


                  })
                }
              })

              return;
            }
        */
      //sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE isSheriff ='${isdetective}' AND guildId ='${message.guild.id}'`).then(row1 => {

        //sql.get(`SELECT * FROM murderMysteryPlayers WHERE isSheriff ='${aaa}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {

          message.channel.send("Error Code 496 at createdetectivechannel")
          throw new Error("Error Code 496 at createdetectivechannel")
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

            c.sendMessage("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
            /**
                        //if(arr.length === 7){
                          //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                        //}
                        //if(arr.length === 8){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                        }

                        if(arr.length === 6){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                        }
                        if(arr.length === 5){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
            **/

            detectivechannelidz(c.id)


          })
        }
      })
    }

    function doRandomquotez() {

      return botquotes[Math.floor(Math.random() * botquotes.length)];
    }

    function dorandomstuffdejefw() {
      var rand = [2, 3, 4, 5, 6, 7, 8, 9]
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

    function botchangename(playercount) {
      if (debugmode === 1) {
        console.log("[DEBUG] BOT CHANGE NAME " + playercount)
      }
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
        })
        return;
      }


    }



    function random(number) {
      return Math.random() * number
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
            checkjfwfj.send(doRandomquotez())
            setTimeout(botquotesa, randomtimesses())
            return;
          }
          if (row.isNight === 1) {
            var oneee = 1
            //murder attack
            sql.get(`SELECT * FROM murderMysteryPlayers WHERE isMurderer ='${oneee}' AND userId ='${bot.user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

              /*
                            roleupdate(1, 3)
                            roleupdate(2, 5)
                            roleupdate(3, 1)
                            roleupdate(4, 2)
                            roleupdate(5, 4)
                            roleupdate(6, 6)
              */
              let userz = random(9)
              if (userz === 3) {
                if (debugmode === 1) {
                  console.log("[DEBUG] BOT DISABLE KILL")
                }

              } else setTimeout(function () {
                sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${userz}' AND guildId ='${message.guild.id}'`).then(row2 => {
                  if (!row) {
                    //message.reply("ERROR")
                    throw new Error("USER NOT FOUND")
                    //nochannelfound()
                    return;
                  }
                  if (debugmode === 1) {
                    console.log("[DEBUG] MURDER")
                  }
                  let users = bot.users.get(row2.userId)
                  if (debugmode === 1) {
                    console.log("[DEBUG] BOT Kill " + users.id + " IN (" + message.guild.id + ")")
                  }
                  if (row2.isDead === 1) return new Error("That person is already dead!")

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
                  sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${users.id}'`)
                  //actioned(userid)
                  //message.reply("You have stabbed `" + users.tag + "`! But remember....He might be revived by the healer...")
                })
              }, 2000)
            })
          }



        }
      })
    }

    function getassassin() {
      let wew = 1
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE isAssassin ='${wew}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row) {
          message.channel.send("`ERROR` Assassin not found!")
        } else {
          return row.userId
        }
      })
    }

    function createmurderchannel(ismurderparty, mmroleidd) {
      var playeridz = 1;

      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) return message.reply("Err - data")
        //if (row.isHumansvsbots === 1) {
        if (row.modeId === 4) {
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
              c.sendMessage("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that **actually there isnt cuz of murderparty**, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
              c.sendMessage("@everyone is the murderer.")
              murderchannelidz(c.id)
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

            //the number says it
            c.sendMessage("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
            c.sendMessage("<@" + getassassin() + "> is the Assassin AND\n<@" + row1.userId + ">, **YOU** are the murderer. ;)")

            //let sheriffthang = arr[0]
            //if(arr.length === 7){
            //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
            //}
            //if(arr.length === 8){
            //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
            //}

            //if(arr.length === 6){
            //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
            //}
            //if(arr.length === 5){
            //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)

            //sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
            //sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murdererid = sheriffthang} WHERE guildId = '${message.guild.id}'`)
            murderchannelidz(c.id)
          })
        }
      })
    }




    function createradiochannel() {

      var playeridz = 4
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {

          message.channel.send("Error Code 502 at createradiochannel")
          throw new Error("Error Code 502 at createradiochannel")
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
            c.sendMessage("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
            radiochannelidz(c.id)

          })


        }
      })
    }

    function createjailorchannel() {
      var playeridz = 6
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {

          message.channel.send("Error Code 501 at createjailorchannel")
          throw new Error("Error Code 501 at createjailorchannel")

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
            //let sheriffthang = arr[5]

            c.sendMessage("Hello there, You are the **Jailor**, You will jail people every night and ask them questions. If you think the person is the murderer, feel free to type \n**" + config.prefix + "execute**\nTo execute the person, If you want to jail the person, type\n" + config.prefix + "jail `@user`\nTo jail the person you want to interrogate someone, OR you can type\n" + config.prefix + "jailnumber `id`\nTo jail the user but in a list that will be shown below, If you execute someone, Then it will be announced in the #murdergame, Hope you find out who the murderer is!")
            /**
                        //if(arr.length === 7){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                        }
                        if(arr.length === 8){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                        }

                        if(arr.length === 6){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                        }
            **/

            jailorchannelidz(c.id)
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
            c.sendMessage("Hello, Welcome to **Jail**, this is where you have jailed people and you interrogate them by answering some questions, Also hello jailed person! Welcome to jail, If the Jailor thinks your suspicious, then you probably are going to be executed, If you murder the person, They might have a last will and then it will show the public chat the will and show who they jailed. Anyways, Don't try to get executed or else you'll end up like Shadow where he had his head cut off. Anyways, Hope you try to not get executed!")

            jailchannelidz(c.id)

          })


        }
      })
    }

    function assassinDM() {
      var playeridz = 5
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
        if (!row1) {

          message.channel.send("Error Code 500 at assassinDM")
          throw new Error("Error Code 500 at assassinDM")

        } else {
          bot.users.get(row1.userId).send("Hello there, You are an **Assassin**, You are a person that is trying to get your target killed, if your target is killed you earn $3 and you will get a new target to kill... Your main goal is to kill your target, The murderer will know who the Assassin is, but you do not know who the Murderer is, You will be DM'd on what your next target is. Make sure the murderer can assign a target AND can kill once per night (Money system coming soon)")
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
          if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)
          if (debugmode === 1) {
            console.log("[DEBUG] Host Role CHECK")
          }
          if (!message.guild.member(message.author).roles.has(roledata.id)) {
            return message.reply("You do not have permission to use this command!\nYou need the Game Hoster role!")
          }
          if (row.startcmd === 0) {
            message.reply(mm.msgs.errors.startcmd)
            return;
          }
          if (row.gameStarted === 1) {
            message.reply("There is already a game going on!")
            return;
          }
          let murdermysterydataa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)
          if (!murdermysterydataa) return message.reply(mm.msgs.errors.mmrolenotfound)
          if (debugmode === 1) {
            console.log("[DEBUG] MM Role CHECK")
          }





          //if(preventjoinData.isOneVOne === 1){
          //if (row.isOneVOne === 1) {
          if (row.modeId === 3) {
            if (debugmode === 1) {
              console.log("[DEBUG] 1v1 Mode")
            }
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
            if (row.players > 2) return message.reply("You can't have more then 2 people.")
            if (row.players < 2) return message.reply("You need more than 0+ people.")
            if (debugmode === 1) {
              console.log("[DEBUG] 2 Players")
            }

            sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 1} WHERE guildId = '${message.guild.id}'`)
            /*
            var gamesess = gamesession.find(function (rolez) {
              return rolez.gameid === row.gameid
            });
            if (gamesess === undefined) {
              message.reply("**There was an error!** - Game Session not found\nThis issue keeps on repeating? Type `mm!bug 41829 - Game Session`")
              stop()
            }
*/
            //gamesess.players = row.players
            //gamesess.startedgame = true

            /**

                                              //function shuffle(array) {
                                                //var currentIndex = array.length, temporaryValue, randomIndex;

                                                // While there remain elements to shuffle...
                                                //while (0 !== currentIndex) {

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
            if (debugmode === 1) {
              console.log("[DEBUG] CREATING CHANNELS")
            }
            sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)
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

            //let mmplayersDataheal2 = mmplayers['128296384200835073']
            //mmplayersDataheal2.isMurderer = 1

            //let mmplayersDatadetect = mmplayers['281397352177074177']
            //mmplayersDatadetect.isSheriff = 1

            //let mmplayersDataheal = mmplayers['275722540981288960']
            //mmplayersDataheal.isHealer = 1
            /**
                                    message.guild.createChannel('murderer', 'text').then(c => {
                                    c.overwritePermissions(message.guild.id, {
                                      READ_MESSAGES: false
                                    })
                                    c.overwritePermissions(arr[0], {
                                     READ_MESSAGES: true
                                    })
                                    c.sendMessage("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")

                                    //let sheriffthang = arr[0]


                                    sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                                    //sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murdererid = sheriffthang} WHERE guildId = '${message.guild.id}'`)



                                    })
            **/
            createmurderchannel(0, 0)
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE MURDERER CHANNEL")
            }
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE DETECTIVE CHANNEL")
            }
            createdetectivechannel(0)

            /**
                                    message.guild.createChannel('detective', 'text').then(c => {
                                    c.overwritePermissions(message.guild.id, {
                                      READ_MESSAGES: false
                                    })
                                    c.overwritePermissions(arr[1], {
                                     READ_MESSAGES: true
                                    })

                                    //let sheriffthang = arr[1]

                                    c.sendMessage("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can't see any channel except the #murdergame channel! You cannot chat in the public chat because you are dead of course.\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
                                    //sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                                    })
            **/


            message.guild.createChannel('murdergame', 'text').then(c => {
              if (debugmode === 1) {
                console.log("[DEBUG] CREATE MURDER GAME CHANNEL")
              }
              c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false
              })

              c.overwritePermissions(murdermysterydataa.id, {
                READ_MESSAGES: true
              })

              c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/gcaf7d\nOnce the user has put in their Last Will it will probably be announced to the server, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
              if (debugmode === 1) {
                console.log("[DEBUG] MURDER GAME Channel ID set")
              }

              sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })

            message.reply("Game has started! GL (if you see a error, pls stop the game - if the game is buggy, contact FireMario211 by going on his server (mm!server))")
            if (debugmode === 1) {
              console.log("[DEBUG] SEND GAME STARTED, GOOD LUCK")
            }

            /**
                                          fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                                        if (err) console.error(err)
                                      });
            **/
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
            sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 1} WHERE guildId = '${message.guild.id}'`)

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
            sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)


            //let mmplayersDataheal2 = mmplayers[arr[0]]
            //mmplayersDataheal2.isMurderer = 1
            roleupdate(1, 1)

            //let mmplayersDatadetect = mmplayers[arr[1]]
            //mmplayersDatadetect.isSheriff = 1
            roleupdate(2, 2)
            //let mmplayersDataheal = mmplayers[arr[2]]
            //mmplayersDataheal.isHealer = 1
            roleupdate(3, 3)
            //let mmplayersDataaa = mmplayers[arr[3]]
            //mmplayersDataaa.isRadioPerson = 1
            roleupdate(4, 4)



            //let mmplayersDataheal2 = mmplayers['128296384200835073']
            //mmplayersDataheal2.isMurderer = 1

            //let mmplayersDatadetect = mmplayers['281397352177074177']
            //mmplayersDatadetect.isSheriff = 1

            //let mmplayersDataheal = mmplayers['275722540981288960']
            //mmplayersDataheal.isHealer = 1
            createmurderchannel(0, 0)
            createdetectivechannel(0)
            /**
            message.guild.createChannel('detective', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[1], {
             READ_MESSAGES: true
            })

            let sheriffthang = arr[1]

            c.sendMessage("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)! You cannot chat in the public chat because you are dead of course.\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")

/**
            //if(arr.length === 7){
              //c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
            //}
            //if(arr.length === 8){
              c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
            }

            if(arr.length === 6){
            c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
            }
            if(arr.length === 5){
            c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
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
              c.sendMessage("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
              sql.run(`UPDATE murderMystery SET radiochannelid = ${row.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)

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

              let healerida = arr[2]
              c.sendMessage("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")

              if (arr.length === 7) {
                c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
              }
              if (arr.length === 8) {
                c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
              }

              if (arr.length === 6) {
                c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
              }
              if (arr.length === 5) {
                c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag)
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
              c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
              sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })

            /**
                      message.guild.createChannel('murderer-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                      c.overwritePermissions(message.guild.id, {
                        READ_MESSAGES: false
                      })
                      c.overwritePermissions(bot.users.get(arr[1]), {
                       READ_MESSAGES: true
                      })
                    c.sendMessage("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")

                    let sheriffthang = arr[1]


                    sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.murderchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
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

                    c.sendMessage("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")
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
                    c.sendMessage("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")
                    sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
                    sql.run(`UPDATE murderMystery SET healerid = ${row.healerid = healerida} WHERE guildId = '${message.guild.id}'`)
                      })

                      message.guild.createChannel('murdergame-' + Math.random().toString(36).substr(2, 5), 'text').then(c => {
                    c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
                    sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

                  })
            **/
            message.reply("Game has started! GL (if you see a error, pls stop the game - if the game is buggy, contact FireMario211 by going on his server (mm!server))")

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
            if (row.players < 2) return message.reply("You don't have enough players! You need 2+ people in order to play")
            message.reply("Randomizing... (actually I dont need to randomize because there are no roles to pick except murderer)\nCreating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)

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
            sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 1} WHERE guildId = '${message.guild.id}'`)
            /**
  message.guild.createChannel('murderer', 'text').then(c => {
    c.overwritePermissions(message.guild.id, {
      READ_MESSAGES: false
    })

    c.overwritePermissions(murdermysterydataa.id, {
      READ_MESSAGES: true
    })

  c.sendMessage("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
  sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
  })
**/
            createmurderchannel(1, murdermysterydataa.id)
            if (debugmode === 1) {
              console.log("[DEBUG] CREATE MURDER CHANNEl")
            }

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

              c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **" + mmgameData.enterid + "** Murderer(s)...wait why is there **" + mmgameData.enterid + "** Murderer(s)...There is suppose to be one...OH I remember! We are playing Murder Party Mode! That means EVERYONE is a murderer, and you should not trust ANYONE If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, then it doesn't matter because everyone is a murderer\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game!~~Hope Innocents Win!~~")
              sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)
            })
            message.reply("Game has started! GL (if you see a error, pls stop the game - if the game is buggy, contact FireMario211 by going on his server (mm!server))")
            fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
            });
            setTimeout(isDay, 6000)
            return;


            //end

          }
          //if (row.isHumansvsbots === 1) {
          if (row.modeId === 4) {

            //call 911 now!!! lol
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")



            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            if (row.players < 1) return message.reply("You don't have enough players! You need 1+ people in order to play")
            if (row.players > 8) return message.reply("You cant have higher than 8 people!")
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
            sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 1} WHERE guildId = '${message.guild.id}'`)
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
              sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)

              roleupdate(1, 3)
              roleupdate(2, 5)
              roleupdate(3, 1)
              roleupdate(4, 2)
              roleupdate(5, 4)
              roleupdate(6, 6)

              //assassinDM() --------------- Disabled due to bots not allowing to DM self idk
              createmurderchannel(0, 0)
              createjailorchannel()
              createdetectivechannel(1)
              createhealerchannel()
              createradiochannel()
              message.reply("Game has started! GL \\;) (if you see a error, pls stop the game - if the game is buggy, contact FireMario211 by going on his server (mm!server))")

              setTimeout(isDay, 10000)
              if (debugmode === 1) {
                console.log("[DEBUG] IS DAY TIMER set")
              }

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
                c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
                sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

              })

              //end
            }, 2000)
            return;

          }
          //-------------------------------------------------------------------------------------------------------------------------------
          if (row.modeId === 5) {
            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            if (row.players < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 1} WHERE guildId = '${message.guild.id}'`)

            message.reply("Creating Channels...")
            sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)
            assassinDM()
            createmurderchannel(0, 0)
            createjailorchannel()
            createdetectivechannel(0)
            createhealerchannel()
            createradiochannel()
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
              c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
              sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })

            message.reply("Game has started! GL (if you see a error, pls stop the game - if the game is buggy, contact FireMario211 by going on his server (mm!server))")
            setTimeout(isDay, 10000)
          }
          if (row.modeId === 1) {




            //call 911 now!!! lol
            //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")



            //if(mmgameData.enterid < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
            if (row.players < 6) return message.reply("You don't have enough players! You need 6+ people in order to play")
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
            sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 1} WHERE guildId = '${message.guild.id}'`)
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
            sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 0} WHERE guildId = '${message.guild.id}'`)
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

            //bot.users.get(arr[4]).sendMessage("Hello there, You are an **Assassin**, You are a person that is trying to get your target killed, if your target is killed you earn $3 and you will get a new target to kill... Your main goal is to kill your target, The murderer will know who the Assassin is, but you do not know who the Murderer is, You will be DM'd on what your next target is. Make sure the murderer can assign a target AND can kill once per night (Money system coming soon)")
            assassinDM()
            createmurderchannel(0, 0)
            createjailorchannel()
            createdetectivechannel(0)
            createhealerchannel()
            createradiochannel()
            /**
            message.guild.createChannel('murderer', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[0], {
             READ_MESSAGES: true
            })
            c.sendMessage("Hello there, You are a **Murderer**, You will try to kill as many people as you can! But remember, do not get caught! The Detective will try to find out who the Murderer is! There is also a Healer that can heal other people, so beware of that, the recommended thing to do is find the Detective and kill him/her. You can murder people by typing\n" + config.prefix + "kill `@user`\nThen someone will be murdered! But remember, it will be logged! It wont show your name though, remember not to talk in the public chat or else people will know who the murderer is! If you die, its game over! If you win, you win! Good luck murdering people... ;)")
            let sheriffthang = arr[0]


            sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = c.id} WHERE guildId = '${message.guild.id}'`)
            sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murdererid = sheriffthang} WHERE guildId = '${message.guild.id}'`)



            })
            **/
            /**
            message.guild.createChannel('jailor', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[5], {
             READ_MESSAGES: true
            })

            let sheriffthang = arr[5]

            c.sendMessage("Hello there, You are the **Jailor**, You will jail people every night and ask them questions. If you think the person is the murderer, feel free to type \n**" + config.prefix + "execute**\nTo execute the person, If you want to jail the person, type\n" + config.prefix + "jail `@user`\nTo jail the person you want to interrogate someone, OR you can type\n" + config.prefix + "jailnumber `id`\nTo jail the user but in a list that will be shown below, If you execute someone, Then it will be announced in the #murdergame, Hope you find out who the murderer is!")

                        if(arr.length === 7){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                        }
                        if(arr.length === 8){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                        }

                        if(arr.length === 6){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                        }

            sql.run(`UPDATE murderMystery SET jailorchannelid = ${row.jailorchannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })

            message.guild.createChannel('jail', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[5], {
             READ_MESSAGES: true
            })

            c.sendMessage("Hello, Welcome to **Jail**, this is where you have jailed people and you interrogate them by answering some questions, Also hello jailed person! Welcome to jail, If the Jailor thinks your suspicious, then you probably are going to be executed, If you murder the person, They might have a last will and then it will show the public chat the will and show who they jailed. Anyways, Don't try to get executed or else you'll end up like Shadow where he had his head cut off. Anyways, Hope you try to not get executed!")

            sql.run(`UPDATE murderMystery SET jailchannelid = ${row.jailchannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })
            **/

            /**
            message.guild.createChannel('detective', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[1], {
             READ_MESSAGES: true
            })

            let sheriffthang = arr[1]

            c.sendMessage("Hello there, You are a **Detective**, You will try to find out who the Murderer is! The best option is to not trust anyone, Be sure to try your best to find out who the Murderer is, If you die, then there may be a new Detective, If you shoot someone, you cannot get your gun back, You've messed up buddy. If you die that means you can chat in the #general (or the main chat) (if the owner/admin has setup a thing where players with murder mystery role cant chat)\nIn order to search someone to see if they are murderer, Type mm!search `@user`\n(or mm!searchnumber `(playerid)`)\nTo shoot someone, type mm!shoot `@user`\n(or mm!shootnumber `(playerid)`)\nBut don't abuse your gun!\nThats all, hope you find out who the murderer is!")

                        if(arr.length === 7){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                        }
                        if(arr.length === 8){
                          c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                        }

                        if(arr.length === 6){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                        }


            sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })

            **/
            /**
            message.guild.createChannel('radio', 'text').then(c => {
            c.overwritePermissions(message.guild.id, {
              READ_MESSAGES: false
            })
            c.overwritePermissions(arr[3], {
             READ_MESSAGES: true
            })

            c.sendMessage("Hello! You are a **Radio Person** and you have the power to annonomously say to the public chat what YOU want to say. If you dont want to say anything, its fine buddy. If you want to broadcast to the public chat, Type\n" + config.prefix + "broadcast (message)\nTo send a message to the #murdergame!")
            sql.run(`UPDATE murderMystery SET radiochannelid = ${row.sheriffchannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })
            **/

            /**

          message.guild.createChannel('healer', 'text').then(c => {
          c.overwritePermissions(message.guild.id, {
            READ_MESSAGES: false
          })
          c.overwritePermissions(arr[2], {
           READ_MESSAGES: true
          })
          let healerida = arr[2]
          c.sendMessage("Hello there, You are a **Healer**, You are a person that heals people that are dead! If you die, you cannot heal anyone anymore, Quick tip is try to not talk and say anything about your role. If you want to heal someone, just type\n" + config.prefix + "heal `@user`\nand you will be able to heal someone! Hope you avoid being murdered! Have a great game!")

                      if(arr.length === 7){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag)
                      }
                      if(arr.length === 8){
                        c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag + '\n7. ' + bot.users.get(arr[6]).tag + '\n8. ' + bot.users.get(arr[7]).tag)
                      }

                      if(arr.length === 6){
                      c.sendMessage('List of numbers:\n\n1. ' + bot.users.get(arr[0]).tag + '\n2. ' + bot.users.get(arr[1]).tag + '\n3. ' + bot.users.get(arr[2]).tag + '\n4. ' + bot.users.get(arr[3]).tag + '\n5. ' + bot.users.get(arr[4]).tag + '\n6. ' + bot.users.get(arr[5]).tag)
                      }

          sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = c.id} WHERE guildId = '${message.guild.id}'`)

          })
**/
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
              c.sendMessage("Hello everyone! Lets play a game of Murder Mystery shall we? Lets find out who the murderer is! There is **1** Detective(s) and **1** Healer(s) AND **1** Murderer. If you died, you will be DM'd this:\nhttp://prntscr.com/ffad0j\nOnce the user has put in their Last Will it will probably be announced to the server, where there will be dead players in the chat, if some admin is on the game and has the permission Administrator, Then that'll be cheating! (unless if they dont check the other channels ya mean?)\nIf you want to vote to kill someone, type mm!votehang and they will be voted to die!\nThat is the game! Hope Innocents Win!")
              sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = c.id} WHERE guildId = '${message.guild.id}'`)

            })

            message.reply("Game has started! GL (if you see a error, pls stop the game - if the game is buggy, contact FireMario211 by going on his server (mm!server))")
            /**
                  fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                if (err) console.error(err)
              });
            **/
            setTimeout(isDay, 10000)
          }
        }
      })
    } else



    if (category === "leave") {
      sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
          return
        } else {

          if (row.startcmd === 0) return message.reply("The game hasn't been started!")

          if (row.gameStarted === 1) return message.reply("The game has already started!")

          message.channel.send("**Leaving...**").then(m => {
            sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
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

          if (row.startcmd === 0) return message.reply("The game hasn't been started!")

          if (row.gameStarted === 1) return message.reply("The game has already started!")

          if (row.modeId !== 5) {
            if (row.players > 8) return message.reply("There are already enough players! (You can go on another server if you have like 17 people or somethin, or play unlimited players mode or 5050.)")
          }

          //if(preventjoinData.isOneVOne === 1){
          //if(mmplayersData.enterid === 2) return message.reply("There is already enough players!")
          //}


          //if(mmplayersData.isenter === 1) return message.reply("You're already in the game!")



          //mmplayersData.isenter = 1
          //mmplayersData.guildID = row.guildId

          sql.run(`UPDATE murderMystery SET players = ${row.players + 1} WHERE guildId = '${message.guild.id}'`);

          message.channel.send("**Inserting player...**").then(m => {
            setTimeout(insertplayer, 1000, row.players, row.murdermysteryRoleID, m.id)
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
        embed: new discord.RichEmbed().setDescription("***RULES OF MURDER MYSTERY***\n**These are the game rules of Murder Mystery, You must follow them or else you will get a punishment! (if your playing it on the MMBO server)**\n\n:one: **Look at a channel if you have the permission Administrator** If you aren't playing the game, thats fine, but if you are playing and your an administrator and show people who the murderer is, you will get a punishment\n**Punishment:** Warning if once, if twice then Timeout - 5 minutes\n:two: **Gamethrowing** Gamethrowing isn't fun, If you get caught gamethrowing, like show that your detective and show who the murderer is, Also same as if you have an Administrator Permission.\n**Punishment:** No warning, Timeout for 10 minutes\n:three: **Cheating** If some how you exploited the bot, it isn't really fair to be cheating from the bot, if you crash the bot or somehow found away to get by the permissions, its a big no no. Another way of cheating is using a \"Selfbot\" to see the channel permissions\n**Punishment:** Permanant Ban from the Game.").setColor(0xFF0000)
      })
    } else if (category === "howtoplay") {
      message.channel.send("a")
    } else

    if (!category) {
      message.channel.send({
        embed: new discord.RichEmbed().setDescription("**Welcome to Murder Mystery! This is a game here YOU as the player has to try to find out who the murderer is!\n\nThere are 6 special roles!\n\nOne is the Murderer, what the Murderer does is kill a person each night. But becareful, The Detective can search/shoot the Murderer OR If you murder someone in jail and you attack the person, the Jailor will know who attacked the Prisoner, Which you have to be very careful on who you kill. If someone asks your role, say that you are an Innocent or some other role, I do not recommend you say that your Radio Person, because people will say to prove that your Radio Person by broadcasting the message they said. I also don't recommend you say that your a Detective or Jailor, that will send some alarms that they will shoot/execute you, If someone asks your role, say your Innocent, If you say a role like Healer then the Detective might search you, Becareful for that. You also have a partner, which is the Assassin, only YOU can assign who should be targetted, then the Assassin will try their best to get them killed. You cannot kill the Assassin and you will know who the Assassin is, but the Assassin doesn't know who the Murderer is.**\n\n**Two is the Detective, where he will try to search and shoot the murderer, BUT you cannot shoot/search people that are in jail, if you shoot someone in jail the jailor will know that the person was going to be shot (it will say they were killed so the jailor thinks you are the murderer/detective) if you search the jailor wont know you searched BUT it will say this: \"You tried to search the person but he/she is in jail!\" Not intirely sure it will say that but okay.**").setColor(0xFF0000)
      })
      message.channel.send({
        embed: new discord.RichEmbed().setDescription("**Three is a Healer which will heal the person if they were stabbed/shot by the Murderer/Detective, They cannot heal people in jail.\n\nFour is the Radio Person which will broadcast in the chat at night only\n\nFive is the Assassin which will try to get their target stabbed/shot/lynched, if the target is stabbed/shot/executed/lynched then the Assassin will gain $3, You are the Murderer's Partner, You wont know who the Murderer is, but the Murderer will know who you are. The Murderer cannot kill you but the Detective/Jailor can.\n\nSix is the Jailor which will jail people and ask them questions. If they think the prisoner is suspicious, They can execute the person and it will reveal their role to the whole intire chat.\n\nThere must be more than 6+ people, if there are none, then get some players!\nIf you haven't played Murder Mystery before, it is a game where there is one murderer and one detective, the detective has to find out who is the murderer.** As always...Good luck...\n\nNOTE: If you need any help or found a bug, please contact <@126119057232625664> or <@281397352177074177> and we will try our best to fix it as possible!\n**If you want to join our server, type mm!server\n\n:warning: ***PLEASE READ*** :warning:\n**If the game ends, be sure to remove the 'Murder Mytery' Roles from everyone that has participated in the game, else someone could get in the game randomly and glitch out the game or somethin, You could either remove the roles from everyone that participated once the game is done OR you can delete the role and recreate it and type mm!game murdermysteryrole or somethin.**\n\n***Beware of Selfbots***\n**People can use selfbots to see the channel permissions and cheat, they can use an eval and then tell who the exact murderer is, If you encounter this, please remove the person from the game from voting them to die.**\n\n***If you want to see the rules of the game, please type mm!game rules***").setColor(0xFF0000)
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
        if (row.host === "0") return message.reply("There is no game going on!")


        message.guild.defaultChannel.send("The game has been forcefully stopped by a **Murder Mystery Administrator**")

        fs.writeFile('./mmplayers.json', '{}', 'utf8')
        fs.writeFile('./mmgame.json', '{}', 'utf8')

        fs.writeFile('./preventjoin.json', '{}', 'utf8')


        deletgamesess()



        bot.channels.get(row.murdergamechannelid).delete()
        bot.channels.get(row.healchannelid).delete()
        bot.channels.get(row.sheriffchannelid).delete()
        bot.channels.get(row.murderchannelid).delete()
        bot.channels.get(row.radiochannelid).delete()
        message.channel.sendMessage(message.author + " has stopped the match!")


        setTimeout(aaaa, 1000)


        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET host = ${row.host = 0} WHERE guildId = '${message.guild.id}'`)
        }, 1500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 2000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 2500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 3000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 3500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isDay = ${row.isDay = 0} WHERE guildId = '${message.guild.id}'`)
        }, 4000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isNight = ${row.isNight = 0} WHERE guildId = '${message.guild.id}'`)
        }, 4500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 1} WHERE guildId = '${message.guild.id}'`)
        }, 5000)
      }
    })

  }

  function unjail(users, eroigjreg) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("ERR!")
        throw new Error("Player doesn't exist!")
        nochannelfound()

      } else {
        let user = bot.users.get(users)
        if (!user) return;
        bot.channels.get(eroigjreg).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        unaction()
      }
    })

  }


  function jail(users, userid, eroigjreg, playerid) {
    if (playerid !== "") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("That user isn't in the game!")

        } else {
          let user = bot.users.get(row.userId)
          if (!user) return;
          if (row.isDead === 1) return message.reply("That person is dead!")
          if (row.isjailed === 1) return message.reply("That person is already in jail!")
          var somettt = isactioned()
          if (somettt === true) return;
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

            if (row1.actioned === 1) {
              return;
            }

          })
          sql.run(`UPDATE murderMysteryPlayers SET isjailed = ${row.isjailed = 1} WHERE userId = '${playerid}' AND guildId = '${message.guild.id}'`);
          message.reply(user + " has been jailed! Try and interrigate him, if he sounds suspicious, you can execute them by typing mm!execute " + user)
          hasjailed()
          bot.channels.get(eroigjreg).overwritePermissions(user, {
            READ_MESSAGES: true
          })
          setTimeout(unjail, 20000, row.userId, eroigjreg)

        }

      })
      return;
    }
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")

      } else {
        console.log("YES")
        let user = bot.users.get(users)
        if (!user) return;
        if (row.isDead === 1) return message.reply("That person is dead!")
        if (row.isjailed === 1) return message.reply("That person is already in jail!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        sql.run(`UPDATE murderMysteryPlayers SET isjailed = ${row.isjailed = 1} WHERE userId = '${users}' AND guildId = '${message.guild.id}'`);
        message.reply(user + " has been jailed! Try and interrigate him, if he sounds suspicious, you can execute them by typing mm!execute " + user)
        bot.channels.get(eroigjreg).overwritePermissions(user, {
          READ_MESSAGES: true
        })
        setTimeout(unjail, 20000, users, eroigjreg)

      }

    })
  }

  function hasjailedcheck() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        console.log("YES")
        if (row.hasjailed === 1) return message.reply("You have already jailed someone!");
      }
    })
  }


  function hasjailed() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET hasjailed = ${row.hasjailed = 1} WHERE userId = '${message.author.id}' AND guildId = '${message.guild.id}'`);

      }
    })
  }


  if (command === "assignid") {
    message.channel.send("**Error**")
    'augu im too lazy to do dis .-.'
  }
  if (command === "assign") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        return message.reply("Sorry but this command is in development.")


        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.murderchannelid) return;


        ///if (mmplayersData.isDead === 1) return
        deadcheck()
        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        var egegerg = checkassigned()
        if (egegerg === true) return message.reply("You have already assigned someone!")
        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")

        if (user.id === message.author.id) return message.reply("You can't assign yourself.")
        var oewew = checkpartner(user.id)
        if (oewew === true) return message.reply("You cannot assign your partner!")
        //if (user.id === arr[4]) return message.reply("You cannot assign your partner!")


        //let mmplayersDataa = mmplayers[user.id]

        let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)
        assigns(user.id)
        //if (!mmplayersDataa) return message.reply("That user isn't in the game!")

        if (mmplayersDataa.isDead === 1) return message.reply("That person is dead!")
        mmplayersData.assigned = 1
        user.send(":fearful: You feel like you have been assigned... :cold_sweat:")

        //targetassassin = [user.id]
        bot.users.get(arr[4]).sendMessage("Your target is " + user + ".")

        /*
                  fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                    if (err) console.error(err)
                  });
        */
      }
    })
  }


  function execute(users, murdergame, userid) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")

      } else {
        let user = bot.users.get(users)
        if (row.isDead === 1) return message.reply("That person is already dead!")
        if (row.isjailed === 0) return message.reply("That person isn't in jail!");
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${users}'`)

        if (row.isMurderer === 1) {
          message.reply("You have executed " + user + " and he/she was the **Murderer**!")

          bot.channels.get(murdergame).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were the **Murderer**")

          setTimeout(victory, 1500)

          return
        }
        if (row.isSheriff === 1) {
          /*
                    if (targetassassin[0] === user.id) {
                      bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
            
                      return
                    }
                    */
          targetassassin(user.id, 2)
          message.reply("You have executed " + user + " and he/she was a **Detective**!")
          bot.channels.get(murdergame).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Detective**")





          return;
        }
        if (row.isHealer === 1) {
          /*
                    if (targetassassin[0] === user.id) {
                      bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
            
                      return
                    }
                    */

          message.reply("You have executed " + user + " and he/she was a **Healer**!")
          bot.channels.get(murdergame).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Healer**")


          targetassassin(user.id, 2)


          return;
        }
        if (row.isRadioPerson === 1) {
          /*
                    if (targetassassin[0] === user.id) {
                      bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
            
                      return
                    }
          */
          message.reply("You have executed " + user + " and he/she was a **Radio Person**!")
          bot.channels.get(murdergame).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Radio Person**")

          targetassassin(user.id, 2)
          return;

        }
        if (row.isAssassin === 1) {
          message.reply("You have executed " + user + " and he/she was an **Assassin**!")
          bot.channels.get(murdergame).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were an **Assassin**")

          return;
        }
        message.reply("You have executed " + user + " and he/she was **Innocent**!")
        bot.channels.get(murdergame).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were **Innocent**")




        //mmplayersDataa.isDead = 1
        actioned(userid)
        //mmplayersData.actioned = 1



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

  if (command === "execute") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        //if(message.channel.id !== row.murderchannelid) return message.reply("a");


        //if (mmplayersData.isDead === 1) return
        deadcheck()
        if (row.isDay === 1) return message.reply("You cannot do this during the day time.")

        //if (mmplayersData.actioned === 1) return message.reply("You have already executed someone!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return message.reply("You have already executed someone!");
          }

        })

        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")

        if (user.id === message.author.id) return message.reply("You can't execute yourself")

        //let mmplayersDataa = mmplayers[user.id]
        execute(user.id, row.murdergamechannelid, message.author.id)
        setTimeout(unaction, 20000)
        let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)
        /*
                if (!mmplayersDataa) return message.reply("That user isn't in the game!")

                if (mmplayersDataa.isDead === 1) return message.reply("That person is already dead!")
        */
        /*
                if (mmplayersDataa.isjailed !== 0) {

          return message.reply("That person isn't in jail!");
        }
        */
        //mmplayersDataa.isDead = 1
        user.send(":skull: You have been executed by the **Jailor** :skull:")

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
        sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
        /*
        if (targetassassin[0] === user.id) {
          bot.users.get(arr[4]).send("The **Jailor** has killed your target! You have gained $3!\nYou have no new Targets.")

        }
        */
        /*
        if (mmplayersDataa.isMurderer === 1) {
          message.reply("You have executed " + user + " and he/she was the **Murderer**!")
          bot.channels.get(row.murdergamechannelid).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were the **Murderer**")

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
          bot.channels.get(row.murdergamechannelid).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Healer**")



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
          bot.channels.get(row.murdergamechannelid).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were a **Radio Person**")

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
          bot.channels.get(row.murdergamechannelid).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were an **Assassin**")

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

        bot.channels.get(row.murdergamechannelid).sendMessage(":cop: :dagger: :mask: " + user + " has been executed by the **Jailor** and they were **Innocent**")




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

  function actioned(useridz) {

    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${useridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] ACTIONED [" + useridz + "]")
        }
        sql.run(`UPDATE murderMysteryPlayers SET actioned = ${row.actioned = 1} WHERE userId ='${useridz}' AND guildId ='${message.guild.id}'`)
        //setTimeout(actioned, 30000)
      }
    })


  }


  function deletgamesess() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        throw new Error("no data found")
        message.channel.send("`ERROR` 404 Data not found!")
        return
      } else {
        gameid--;
        /*
        var worldzseach = gamesession.find(function (rolez) {
          return rolez.gameid === row.gameid
        });
        //if (useridcheck.server === "") return message.channel.send("You aren't in a server! Please join a server in order to leave!")
        gamesession.splice(gamesession.indexOf(worldzseach), 1);
        */
      }
    })
  }

  function nochannelfound() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        throw new Error("no data found")
        message.channel.send("`ERROR` 404 Data not found!")
        return
      } else {
        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        let roledata = bot.guilds.get(message.guild.id).roles.get(row.hostRoleID)

        if (!roledata) return message.reply(mm.msgs.errors.hostrolenotfound)

        if (!message.guild.member(message.author).roles.has(roledata.id)) {
          return message.reply("You do not have permission to use this command!\nYou need the Game Hoster role!")
        }
        if (row.gamestart === 0) return message.reply("There is no game going on!")
        deletgamesess()
        //if (row.isMurderparty === 1) {
        if (row.modeId === 2) {

          bot.channels.get(row.murdergamechannelid).delete()
          bot.channels.get(row.murderchannelid).delete()
          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()
          /**
                  //fs.writeFile('./mmplayers.json', '{}', 'utf8')
                  fs.writeFile('./mmgame.json', '{}', 'utf8')

                  fs.writeFile('./preventjoin.json', '{}', 'utf8')
          **/
          message.guild.defaultChannel.sendMessage("Sorry to interrupt! But the game has been stopped because I couldn't find a certain channel!\nThink this is a mistake? Contact the Bot Developer to fix this issue!")
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz)
          return
        }

        //if (row.isOneVOne === 1) {
        if (row.modeId === 3) {
          /**
                  fs.writeFile('./mmplayers.json', '{}', 'utf8')
                  fs.writeFile('./mmgame.json', '{}', 'utf8')

                  fs.writeFile('./preventjoin.json', '{}', 'utf8')
          **/

          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()
          bot.channels.get(row.murdergamechannelid).delete()
          bot.channels.get(row.sheriffchannelid).delete()
          bot.channels.get(row.murderchannelid).delete()
          //bot.channels.get(row.radiochannelid).delete()
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz, 1000, 1)





          message.guild.defaultChannel.sendMessage("Sorry to interrupt! But the game has been stopped because I couldn't find a certain channel!\nThink this is a mistake? Contact the Bot Developer to fix this issue!")

          return
        }

        fs.writeFile('./mmplayers.json', '{}', 'utf8')
        fs.writeFile('./mmgame.json', '{}', 'utf8')

        fs.writeFile('./preventjoin.json', '{}', 'utf8')


        let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
        murdermysteryrole.delete()


        bot.channels.get(row.murdergamechannelid).delete()
        bot.channels.get(row.healchannelid).delete()
        bot.channels.get(row.sheriffchannelid).delete()
        bot.channels.get(row.murderchannelid).delete()
        bot.channels.get(row.radiochannelid).delete()
        bot.channels.get(row.jailchannelid).delete()
        bot.channels.get(row.jailorchannelid).delete()


        setTimeout(aaaaaaa, 1500)
        setTimeout(deleteallplayerz, 1000, 0)




        message.guild.defaultChannel.sendMessage("Sorry to interrupt! But the game has been stopped because I couldn't find a certain channel!\nThink this is a mistake? Contact the Bot Developer to fix this issue!")


      }

    })

  }

  function unaction() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET actioned = ${row.actioned = 0} WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`)
      }
    })
  }

  function hasvotedcheck() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.hasvoted === 1) return message.reply("You have already voted!");
      }
    })
  }


  function deadcheck() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.isDead === 1) return;
      }
    })
  }

  function murderactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.actioned === 1) return message.reply("You have already murdered someone!");
      }
    })
  }

  function executeactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.actioned === 1) return message.reply("You have already executed someone!");
      }
    })
  }

  function sheriffactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.actioned === 1) return message.reply("You have already searched someone!");
      }
    })
  }

  function isactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
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
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.beenassigned === 1) {
          return true
        } else {
          return false
        }
      }
    })
  }

  function checkassignedid(userid) {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.beenassigned === 1) {
          return true
        } else {
          return false
        }
      }
    })
  }

  function stabbedbymurder(user, checkc, ldwdewdw) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] GET USER (stabbedbymurder)")
        }
        if (checkc === 1) {
          if (debugmode === 1) {
            console.log("[DEBUG] BROADCAST STAB [BOT]")
          }
          bot.channels.get(row.murdergamechannelid).sendMessage(":dagger: " + ldwdewdw + " has been stabbed by the **Murderer**! :dagger:")
        }

        let users = bot.users.get(user)
        if (debugmode === 1) {
          console.log("[DEBUG] BROADCAST STAB")
        }
        bot.channels.get(row.murdergamechannelid).sendMessage(":dagger: " + users.tag + " has been stabbed by the **Murderer**! :dagger:")
      }
    })
  }

  function kill(user, userid, thing, playeridcheck) {
    if (playeridcheck === 1) {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${thing}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("That user isn't in the game!")
        } else {
          if (debugmode === 1) {
            console.log("[DEBUG] Kill " + thing + " IN (" + message.guild.id + ")")
          }
          if (row.isDead === 1) return message.reply("That person is already dead!")
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

            if (row1.actioned === 1) {
              return;
            }

          })
          if (row.isjailed === 1) {
            if (debugmode === 1) {
              console.log("[DEBUG] CANNOT ATTACK (in jail)")
            }
            users.send(":angry::dagger: :arrow_up_down: :fearful::cop: A murderer tried to attack you! But you were in jail!")
            message.reply("You attack but the person is in cages, they might be in jail...")
            actioned(userid)
            return;
          }
          if (row.isMurderer === 1) return message.reply("You can't kill yourself...Are you trying to commit suicide?")
          if (row.isAssassin === 1) return message.reply("That person is your partner!")

          users.send(":skull: You have been stabbed by the **Murderer** :skull:")
          if (debugmode === 1) {
            console.log("[DEBUG] DM USER")
          }

          //if (targetassassin[0] === user.id) {
          //bot.users.get(arr[4]).send("The **Murderer** has killed your target! You have gained $3!\nYou have no new Targets.")
          //}
          nopermstoanychannel(row.playerId)
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${thing}'`)

          stabbedbymurder(thing)

          actioned(userid)
          message.reply("You have stabbed `" + users.tag + "`! But remember....He might be revived by the healer...")
          targetassassin(thing, 1)
        }
      })
    }
    let users = bot.users.get(user)
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] Kill " + user + " IN (" + message.guild.id + ")")
        }
        if (row.isDead === 1) return message.reply("That person is already dead!")
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        if (row.isjailed === 1) {
          if (debugmode === 1) {
            console.log("[DEBUG] CANNOT ATTACK (in jail)")
          }
          users.send(":angry::dagger: :arrow_up_down: :fearful::cop: A murderer tried to attack you! But you were in jail!")
          message.reply("You attack but the person is in cages, they might be in jail...")
          actioned(userid)
          return;
        }
        if (row.isMurderer === 1) return message.reply("You can't kill yourself...Are you trying to commit suicide?")
        if (row.isAssassin === 1) return message.reply("That person is your partner!")

        users.send(":skull: You have been stabbed by the **Murderer** :skull:")
        if (debugmode === 1) {
          console.log("[DEBUG] DM USER")
        }

        //if (targetassassin[0] === user.id) {
        //bot.users.get(arr[4]).send("The **Murderer** has killed your target! You have gained $3!\nYou have no new Targets.")
        //}
        nopermstoanychannel(row.playerId)
        stabbedbymurder(user)
        sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${users.id}'`)
        actioned(userid)
        message.reply("You have stabbed `" + users.tag + "`! But remember....He might be revived by the healer...")
        targetassassin(users.id, 1)
      }
    })
  }

  function nopermstoanychannel(playerid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMystery WHERE playerId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row) return new Error("Player ID does not exist!")
          let user = bot.users.get(row1.userid)
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })

          bot.channels.get(row.healchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
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
          bot.channels.get(row.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
        })
      }

    })
  }
  if (command === "jailid") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {

        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")

        if (message.channel.id !== row.jailorchannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        hasjailedcheck()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        let user = args[0]
        if (!user) return message.reply("Please enter a user id!")
        //if (user.id === "6") return message.reply("You can't jail yourself.")
        if (user === message.author.id) return message.reply("You can't jail yourself.")
        jail(0, message.author.id, row.jailchannelid, user)
        setTimeout(unaction, 20000)
        //let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

        //mmplayersDataa.isjailed = 1
        //mmplayersData.hasjailed = 1


        /*
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                  if (err) console.error(err)
                });
        */
      }
    })
  }
  if (command === "jail") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {

        console.log("jail")

        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")

        if (message.channel.id !== row.jailorchannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        hasjailedcheck()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")

        if (user.id === message.author.id) return message.reply("You can't jail yourself.")
        jail(user.id, message.author.id, row.jailchannelid, "")
        setTimeout(unaction, 20000)
        //let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

        //mmplayersDataa.isjailed = 1
        //mmplayersData.hasjailed = 1
        hasjailed()

        /*
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                  if (err) console.error(err)
                });
        */
      }
    })
  }
  if (command === "killid") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        //if (row.isMurderparty === 1) {
        if (row.modeId === 2) {
          return message.reply("Sorry but you cant use this command in `Murder Party`!")
        }


        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        //if(message.channel.id !== row.murderchannelid) return message.reply("a");


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        murderactioned()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        let user = args[0]

        //if (user === "1") return message.reply("You can't stab yourself")
        if (user === message.author.id) return message.reply("You can't stab yourself")
        //if (user.id === arr[4]) return message.reply("You cant kill your own partner.")

        //let mmplayersDataa = mmplayers[user.id]

        let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

        kill(0, message.author.id, user, 1)
        setTimeout(unaction, 20000)

        //message.guild.member(user).removeRole(aaaaaaaa.id)
        //if (row.isOneVOne === 1) {//
        if (row.modeId === 3) {
          let checkjfwfj = bot.channels.get(row.murdergamechannelid)
          let checkjoegf = bot.channels.get(row.murderchannelid)
          let jgoergqwww = bot.channels.get(row.sheriffchannelid)
          if (!checkjfwfj) return nochannelfound()
          if (!checkjoegf) return nochannelfound()
          if (!jgoergqwww) return nochannelfound()

          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
          return;
        }

        let checkjfwfj = bot.channels.get(row.murdergamechannelid)
        let checkjoegf = bot.channels.get(row.murderchannelid)
        let jgoergqwww = bot.channels.get(row.sheriffchannelid)
        let jgoergqwwwa = bot.channels.get(row.radiochannelid)
        let jgoergqwwwb = bot.channels.get(row.jailorchannelid)
        let jgoergqwwwc = bot.channels.get(row.jailchannelid)
        if (!checkjfwfj) return nochannelfound()
        if (!checkjoegf) return nochannelfound()
        if (!jgoergqwww) return nochannelfound()
        if (!jgoergqwwwa) return nochannelfound()
        if (!jgoergqwwwb) return nochannelfound()
        if (!jgoergqwwwc) return nochannelfound()
        nopermstoanychannel(args[0])
        sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
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

  if (command === "kill") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        //if(message.channel.id !== row.murderchannelid) return message.reply("a");


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        murderactioned()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return message.reply("You have already murderered someone!");
          }

        })

        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")

        if (user.id === message.author.id) return message.reply("You can't stab yourself")

        //if (user.id === arr[4]) return message.reply("You cant kill your own partner.")

        //let mmplayersDataa = mmplayers[user.id]

        let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

        kill(user.id, message.author.id, "", 0)
        setTimeout(unaction, 20000)

        //message.guild.member(user).removeRole(aaaaaaaa.id)
        //if (row.isOneVOne === 1) {
        if (row.modeId === 3) {
          let checkjfwfj = bot.channels.get(row.murdergamechannelid)
          let checkjoegf = bot.channels.get(row.murderchannelid)
          let jgoergqwww = bot.channels.get(row.sheriffchannelid)
          if (!checkjfwfj) return nochannelfound()
          if (!checkjoegf) return nochannelfound()
          if (!jgoergqwww) return nochannelfound()

          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: false
          })
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: false
          })
          sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
          nonvict()
          return;
        }

        let checkjfwfj = bot.channels.get(row.murdergamechannelid)
        let checkjoegf = bot.channels.get(row.murderchannelid)
        let jgoergqwww = bot.channels.get(row.sheriffchannelid)
        let jgoergqwwwa = bot.channels.get(row.radiochannelid)
        let jgoergqwwwb = bot.channels.get(row.jailorchannelid)
        let jgoergqwwwc = bot.channels.get(row.jailchannelid)
        if (!checkjfwfj) return nochannelfound()
        if (!checkjoegf) return nochannelfound()
        if (!jgoergqwww) return nochannelfound()
        if (!jgoergqwwwa) return nochannelfound()
        if (!jgoergqwwwb) return nochannelfound()
        if (!jgoergqwwwc) return nochannelfound()
        /*
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
        bot.channels.get(row.jailorchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        bot.channels.get(row.jailchannelid).overwritePermissions(user, {
          READ_MESSAGES: false
        })
        */
        sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
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

  function search(user, userid, playerid) {
    if (playerid !== "") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("That user isn't in the game!")

        } else {
          let users = bot.users.get(playerid)

          if (row.isDead === 1) return message.reply("That person is already dead!")
          var somettt = isactioned()
          if (somettt === true) return;
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

            if (row1.actioned === 1) {
              return message.reply("You have already searched someone!");
            }

          })
          if (row.isMurderer === 1) {

            message.reply(users + " is the **Murderer**!")
            actioned(userid)
            return
          }

          if (row.isHealer === 1) {
            message.reply(users + " is not the **Murderer** but they have a **Role**!")
            actioned(userid)
            return
          }
          if (row.isRadioPerson === 1) {
            message.reply(users + " is not the **Murderer** but they have a **Role**!")
            actioned(userid)
            return
          }
          if (row.isAssassin === 1) {
            message.reply(users + " is not the **Murderer** but they have a **Role**!")
            actioned(userid)
            return
          }
          message.reply(user + " is not the **Murderer**.")

          actioned(userid)
        }
      })
      return;
    }
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")

      } else {
        let users = bot.users.get(user)

        if (row.isDead === 1) return message.reply("That person is already dead!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        if (row.isMurderer === 1) {

          message.reply(users + " is the **Murderer**!")
          actioned(userid)
          return
        }

        if (row.isHealer === 1) {
          message.reply(users + " is not the **Murderer** but they have a **Role**!")
          actioned(userid)
          return
        }
        if (row.isRadioPerson === 1) {
          message.reply(users + " is not the **Murderer** but they have a **Role**!")
          actioned(userid)
          return
        }
        if (row.isAssassin === 1) {
          message.reply(users + " is not the **Murderer** but they have a **Role**!")
          actioned(userid)
          return
        }
        message.reply(user + " is not the **Murderer**.")

        actioned(userid)
      }
    })
  }


  if (command === "searchid") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.sheriffchannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")
        sheriffactioned()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        let playerid = args[0]

        if (playerid === message.author.id) return message.reply("You are a **Detective** wait what?")

        search(0, message.author.id, playerid)
        setTimeout(unaction, 20000)


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
      }
    })
  }
  if (command === "search") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.sheriffchannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")
        sheriffactioned()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")

        if (user.id === message.author.id) return message.reply("You are a **Detective** wait what?")

        search(user.id, message.author.id, "")
        setTimeout(unaction, 20000)


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
      }
    })
  }


  //IDEA: idea


  function broadcastactioned() {

    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.actioned === 1) return message.reply("You have already broadcasted!")
      }
    })

  }

  if (command === "broadcast") {


    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {

        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.radiochannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        broadcastactioned()
        var somettt = isactioned()
        if (isactioned() === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        message.reply("You have sent a global message to the news! Everyone has saw what you said!\n\nOn TV - SHOCKING/REGULAR NEWS\nHello there, I'm your host " + message.author.username + ", and today we are talking about something that happened!\n" + "```\n" + args.join(" ") + "\n```")
        bot.channels.get(row.murdergamechannelid).send({
          embed: new discord.RichEmbed().addField("A Radio Person has broadcasted!", args.join(" ")).setColor(0x00FF00)
        }).then(m => {
          m.pin()
        })
        setTimeout(unaction, 20000)
        actioned(message.author.id)

        /**
            fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
          if (err) console.error(err)
          });

        **/
      }
    })


  }

  function wasmurdershoot(user) {

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {

        bot.channels.get(row.murdergamechannelid).sendMessage(":gun: " + user + " was shot by the **Detective** and he/she was the **Murderer**! :gun: ")

      }
    })
  }

  function washealershoot(user) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {
        bot.channels.get(row.murdergamechannelid).sendMessage(":gun: " + user + " was shot by the **Detective** and he/she was a **Healer**! :gun:")
      }
    })
  }

  function wasjailorshoot(user) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {
        bot.channels.get(row.murdergamechannelid).sendMessage(":gun: " + user + " was shot by the **Detective** and he/she was a **Jailor**! :gun:")
      }
    })
  }

  function assigns(users, userid) {
    //if (!mmplayersDataa) return message.reply("That user isn't in the game!")
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${users}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")

      } else {
        let user = bot.users.get(users)
        if (row.isDead === 1) return message.reply("That person is dead!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        //mmplayersData.assigned = 1

        sql.run(`UPDATE murderMysteryPlayers SET assigned = ${row.assigned = 1} WHERE userId ='${users}' AND guildId ='${message.guild.id}'`)

        user.send(":fearful: You feel like you have been assigned... :cold_sweat:")

        //targetassassin = [user.id]
        //bot.users.get(arr[4]).sendMessage("Your target is " + user + ".")
        dmassassin(4, user.id)
      }
    })
  }

  function shoot(user, userid, murdergame, playerid) {
    if (playerid !== "") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("That user isn't in the game!")

        } else {
          let users = bot.users.get(row.userId)

          if (row.isDead === 1) return message.reply("That person is already dead!")
          var somettt = isactioned()
          if (somettt === true) return;
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

            if (row1.actioned === 1) {
              return;
            }

          })
          nopermstoanychannel(row.playerId)
          if (row.isMurderer === 1) {
            message.reply("You have shot " + users + " and he/she was the **Murderer**!")
            wasmurdershoot(users)
            users.sendMessage(":skull: You have been shot by a **Detective**! :skull:")
            sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`)

            setTimeout(victory, 1500)
            return
          }
          if (row.isHealer === 1) {
            /*
                      if (targetassassin[0] === user.id) {
                        bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
  
                        return
                      }
                      */
            message.reply("You have shot " + users + " and they were a **Healer**!")
            washealershoot(users)
            users.send(":skull: You have been shot by a **Detective**! :skull:")
            sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`)
            targetassassin(users.id, 3)
            return;
          }
          if (row.isJailor === 1) {
            message.reply("You have shot " + users + " and they were a **Jailor**!")
            wasjailorshoot(users)
            users.send(":skull: You have been shot by a **Detective**! :skull:")
            sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`)
            targetassassin(users.id, 3)
            return;
          }
          if (row.isRadioPerson === 1) {
            /*
            if (targetassassin[0] === user.id) {
              bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")
  
              return
            }
            */


            message.reply("You have shot " + users + " and he/she was a **Radio Person**!")
            bot.channels.get(murdergame).sendMessage(":gun: " + users + " was shot by the **Detective** and he/she was a **Radio Person** :gun: ")
            users.send(":skull: You have been shot by a **Detective**! :skull:")
            sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`)
            targetassassin(users.id, 3)
            return;

          }
          if (row.isAssassin === 1) {
            message.reply("You have shot " + users + " and he/she was an **Assassin**!")
            bot.channels.get(murdergame).sendMessage(":gun: " + users + " was shot by the **Detective** and he/she was a **Assassin** :gun: ")
            users.send(":skull: You have been shot by a **Detective**! :skull:")
            sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`)
            return;
          }

          message.reply("You have shot " + users + " and he/she was **Innocent**!")
          bot.channels.get(murdergame).sendMessage(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun: ")


          user.send(":skull: You have been shot by a **Detective**! :skull:")


          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`)
          targetassassin(users.id, 3)
          actioned(userid)



        }
      })
      'strict rule'
      return;
    }

    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")

      } else {
        let users = bot.users.get(user)

        if (row.isDead === 1) return message.reply("That person is already dead!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        if (row.isMurderer === 1) {
          message.reply("You have shot " + users + " and he/she was the **Murderer**!")
          wasmurdershoot(users)
          users.sendMessage(":skull: You have been shot by a **Detective**! :skull:")
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)

          setTimeout(victory, 1500)
          return
        }
        if (row.isHealer === 1) {
          /*
                    if (targetassassin[0] === user.id) {
                      bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")

                      return
                    }
                    */
          message.reply("You have shot " + users + " and they were a **Healer**!")
          washealershoot(users)
          users.send(":skull: You have been shot by a **Detective**! :skull:")
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
          targetassassin(users.id, 3)
          return;
        }
        if (row.isJailor === 1) {
          message.reply("You have shot " + users + " and they were a **Jailor**!")
          wasjailorshoot(users)
          users.send(":skull: You have been shot by a **Detective**! :skull:")
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
          targetassassin(users.id, 3)
          return;
        }
        if (row.isRadioPerson === 1) {
          /*
          if (targetassassin[0] === user.id) {
            bot.users.get(arr[4]).send("The **Detective** has killed your target! You have gained $3!\nYou have no new Targets.")

            return
          }
          */


          message.reply("You have shot " + users + " and he/she was a **Radio Person**!")
          bot.channels.get(murdergame).sendMessage(":gun: " + users + " was shot by the **Detective** and he/she was a **Radio Person** :gun: ")
          users.send(":skull: You have been shot by a **Detective**! :skull:")
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
          targetassassin(users.id, 3)
          return;

        }
        if (row.isAssassin === 1) {
          message.reply("You have shot " + users + " and he/she was an **Assassin**!")
          bot.channels.get(murdergame).sendMessage(":gun: " + users + " was shot by the **Detective** and he/she was a **Assassin** :gun: ")
          users.send(":skull: You have been shot by a **Detective**! :skull:")
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
          return;
        }

        message.reply("You have shot " + users + " and he/she was **Innocent**!")
        bot.channels.get(murdergame).sendMessage(":gun: " + users + " was shot by the **Detective** and he/she was **Innocent**! :gun: ")


        user.send(":skull: You have been shot by a **Detective**! :skull:")


        sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 1} WHERE userId ='${user}' AND guildId ='${message.guild.id}'`)
        targetassassin(users.id, 3)
        actioned(userid)



      }
    })
  }

  function shootactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.actioned === 1) return message.reply("You have already shot someone!");
      }
    })
  }

  if (command === "players") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {

        message.channel.send(`**You have around **${row.players}** on your game!**`)
      }
    })
  }
  if (command === "playerids") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        if (row.gameStarted === 0) return message.reply("The game hasn't started!")
        let string = "**Player IDS**:\n"
        let one = 1
        let two = 2
        let three = 3
        let four = 4
        let five = 5
        let six = 6
        let seven = 7
        let eight = 8
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${one}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `1. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `1. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${two}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `2. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `2. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${three}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `3. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `3. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${four}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `4. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `4. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${five}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `5. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `5. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${six}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `6. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `6. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${seven}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `7. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `7. None\n`
          }

        })
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${eight}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (row) {
            string += `8. <@${row1.userId}>\n`
          }
          if (!row) {
            string += `8. None\n`
          }

        })



        message.channel.send("**Here are the player ids! This will make it easier for people to well, I guess not mention? well here it is!\n\n" + `${string}`)
      }
    })
  }
  if (command === "server") {
    message.channel.send({
      embed: new discord.RichEmbed().setDescription("**So you want to join our Offical server? Here is the invite: https://discord.gg/Hh5ttkf**").setURL("https://discord.gg/Hh5ttkf").setFooter("Murder Mystery Offical Server").setColor(0xFF0000).setThumbnail("https://images-ext-1.discordapp.net/external/cSTR-tL78BoeH1EawDv8VAL4CCqWDfcNslhJeIMbanU/https/cdn.discordapp.com/icons/319583713262436354/60606acaadea629293d2d6f38c4fbfd4.jpg?width=80&height=80")
    })
  }
  /*
    if (command === "testserver") {
      message.channel.send({
        embed: new discord.RichEmbed().setDescription("**So you want to join our Offical server? Here is the invite: https://discord.gg/Jh5Yh3w**").setURL("https://discord.gg/Jh5Yh3w").setFooter("Murder Mystery Offical Server").setColor(0xFF0000).setThumbnail("https://images-ext-1.discordapp.net/external/QhSE8qhUufw8M3t9tr6l6GiCD0X6vH-fYRBdFH9nxCg/https/cdn.discordapp.com/icons/320365660066676736/afa77c36d9a1bf2b3317022a34345366.jpg?width=80&height=80")
      })
    }
  */
  if (command === "shootid") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.sheriffchannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        shootactioned()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        let playerid = args[0]
        if (!playerid) return message.reply("Please put in a user id!")
        if (playerid === message.author.id) return message.reply("You cannot shoot yourself :thinking:")
        setTimeout(function () {


          shoot(0, message.author.id, row.murdergamechannelid, playerid)
          setTimeout(unaction, 20000)
          let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

          //message.guild.member(user).removeRole(aaaaaaaa.id)
        }, 2000)
        //if (row.isOneVOne === 1) {
        if (row.modeId === 3) {
          sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
          victory()
          return;
        }
        nopermstoanychannel(args[0])

        /**
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
              });
        **/
      }
    })
  }
  if (command === "shoot") {
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.sheriffchannelid) return;


        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        shootactioned()
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return message.reply("You have already shot someone");
          }

        })
        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")

        if (user.id === message.author.id) return message.reply("You cannot shoot yourself :thinking:")
        setTimeout(function () {


          shoot(user.id, message.author.id, row.murdergamechannelid, "")
          setTimeout(unaction, 20000)
          let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

          //message.guild.member(user).removeRole(aaaaaaaa.id)
        }, 2000)
        //if (row.isOneVOne === 1) {
        if (row.modeId === 3) {
          sql.run(`UPDATE murderMystery SET players = ${row.players - 1} WHERE guildId = '${message.guild.id}'`);
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

  function healedactioned() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.actioned === 1) return message.reply("You have already healed someone!");
      }
    })
  }

  function heal(user, murdergameid, userid, playerid) {
    if (playerid !== "") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          message.reply("That user isn't in the game!")

        } else {

          let users = bot.users.get(row.userId)
          if (row.isDead === 0) return message.reply("That person isn't dead!")
          var somettt = isactioned()
          if (somettt === true) return;

          healedactioned()
          sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${userid}' AND guildId ='${message.guild.id}'`).then(row1 => {

            if (row1.actioned === 1) {
              return;
            }

          })
          message.reply("You have healed " + users + "!\nHe will be alive in the morning!")
          bot.channels.get(murdergameid).send(":angel: " + user + " has been revived by a **Healer** :angel:")

          users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
          sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 0} WHERE userId = ${playerid}`);



        }

      })

      return;
    }
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That user isn't in the game!")

      } else {

        let users = bot.users.get(user)
        if (row.isDead === 0) return message.reply("That person isn't dead!")
        var somettt = isactioned()
        if (somettt === true) return;

        healedactioned()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })
        message.reply("You have healed " + users + "!\nHe will be alive in the morning!")
        bot.channels.get(murdergameid).send(":angel: " + user + " has been revived by a **Healer** :angel:")

        users.send(":angel: You have been revived by a **Healer**! You will be alive tomorrow morning. :angel:")
        sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row.isDead = 0} WHERE userId = ${user}`);



      }

    })
  }

  function checkrole(user, playerid) {
    if (playerid !== "") {
      sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row => {
        if (!row) {
          new Error("Murder Mystery - Player not found.")
        } else {
          if (row.isMurderer === 1) {
            return 1
          }
          if (row.isSheriff === 1) {
            return 2
          }
          if (row.isHealer === 1) {
            return 3
          }
          if (row.isRadioPerson === 1) {
            return 4
          }
          if (row.isAssassin === 1) {
            return 5
          }
          if (row.isJailor === 1) {
            return 6
          }
        }
      })
      return
    }
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${user}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        if (row.isMurderer === 1) {
          return 1
        }
        if (row.isSheriff === 1) {
          return 2
        }
        if (row.isHealer === 1) {
          return 3
        }
        if (row.isRadioPerson === 1) {
          return 4
        }
        if (row.isAssassin === 1) {
          return 5
        }
        if (row.isJailor === 1) {
          return 6
        }
      }
    })
  }

  function healnumber(playerid) {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerId ='${playerid}' AND guildId ='${message.guild.id}'`).then(row1 => {
          if (!row1) {
            return;
          }
          let user = bot.users.get(row1.userId)
          var checkrolee = checkrole(0, playerid)
          if (checkrolee === 1) {
            bot.channels.get(row.murderchannelid).overwritePermissions(user, {
              READ_MESSAGES: true
            })
          }
          if (checkrolee === 2) {
            bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
              READ_MESSAGES: true
            })
          }
          if (checkrolee === 4) {
            bot.channels.get(row.radiochannelid).overwritePermissions(user, {
              READ_MESSAGES: true
            })
          }
          if (checkrolee === 6) {
            bot.channels.get(row.jailorchannelid).overwritePermissions(user, {
              READ_MESSAGES: true
            })
            bot.channels.get(row.jailchannelid).overwritePermissions(user, {
              READ_MESSAGES: true
            })
          }
          bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
            SEND_MESSAGES: null
          })

        })
      }
    })
  }

  if (command === "healid") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.healchannelid) return;

        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        let users = args[0]
        if (!users) return message.reply("Please enter a user id!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        if (users === message.author.id) return message.reply("You realize that you healed yourself, You have successfully wasted a first-aid kit. How terrible, heres another one *gives another one* Now dont use it on yourself!")
        var checkrolee = checkrole(0, user)
        heal(0, row.murdergamechannelid, message.author.id, user)

        //if(mmplayersDataa.isDead === 0) return message.reply("That person isn't dead!")


        let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)
        healnumber(user)








        sql.run(`UPDATE murderMystery SET players = ${row.players + 1} WHERE guildId = '${message.guild.id}'`);
        /**
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
              });
        **/
      }
    })
  }
  if (command === "heal") {
    if (message.channel.type === 'dm') {
      message.author.send("I cannot respond with this command in DMS.")
      return;
    }

    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {



        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")


        if (message.channel.id !== row.healchannelid) return;

        deadcheck()

        if (row.isDay === 1) return message.reply("You cannot do this in the day time.")

        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")
        var somettt = isactioned()
        if (somettt === true) return;
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId ='${message.guild.id}'`).then(row1 => {

          if (row1.actioned === 1) {
            return;
          }

        })

        if (user.id === message.author.id) return message.reply("You realize that you healed yourself, You have successfully wasted a first-aid kit. How terrible, heres another one *gives another one* Now dont use it on yourself!")
        var checkrolee = checkrole(user.id)
        heal(user.id, row.murdergamechannelid, message.author.id, "")

        //if(mmplayersDataa.isDead === 0) return message.reply("That person isn't dead!")


        let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

        message.guild.member(user).addRole(aaaaaaaa.id)
        if (checkrolee === 1) {
          bot.channels.get(row.murderchannelid).overwritePermissions(user, {
            READ_MESSAGES: true
          })
        }
        if (checkrolee === 2) {
          bot.channels.get(row.sheriffchannelid).overwritePermissions(user, {
            READ_MESSAGES: true
          })
        }
        if (checkrolee === 4) {
          bot.channels.get(row.radiochannelid).overwritePermissions(user, {
            READ_MESSAGES: true
          })
        }
        if (checkrolee === 6) {
          bot.channels.get(row.jailorchannelid).overwritePermissions(user, {
            READ_MESSAGES: true
          })
          bot.channels.get(row.jailchannelid).overwritePermissions(user, {
            READ_MESSAGES: true
          })

        }







        bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
          SEND_MESSAGES: null
        })
        sql.run(`UPDATE murderMystery SET players = ${row.players + 1} WHERE guildId = '${message.guild.id}'`);
        /**
                fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
              if (err) console.error(err)
              });
        **/
      }
    })
  }

  function checkassassindead() {
    let dewd = 1
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE isAssassin = '${dewd}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {

        if (row.isDead === 1) {
          return 1;
        } else {
          return 0;
        }

      }
    })
  }

  function playeridthingssss() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {
        let assassinded = checkassassindead()
        if (assassinded === 1) {
          if (row.players === 1) {
            return nonvict()
          }
        } else {
          if (row.players === 2) {
            return nonvict()
          }
        }


      }
    })
  }

  function checkmurderdead() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) return;
      if (row.gameStarted === 0) return;
    })

    var playeridz = 1
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE isMurderer ='${playeridz}' AND guildId ='${message.guild.id}'`).then(row1 => {
      if (!row1) {
        //message.reply("ERR, WHAT THE HELL EHHH HEH, HEHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH, I DONT EVEN KNOW WHAT ERROR TO PUT BUT `row1` WASNT EVEN FREKIN DEFINED OK? GUD, WANNA HEAR A SONG?\n\n```css\nSomebody once told me the world was gonna roll me\nI ain't the sharpnest tool in the shed\nShe was looking kind of dumb with her finger and her thumb\nIn the shape of an \"L\" on her forehead\n\n\nWell, the years start coming and they don't stop coming\nFed to the rules and I hit the ground running\nDidn't make sense not to live for fun\nYour brain gets smart but your head gets dumb\nSo much to do, so much to see\nSo what's wrong with taking the backstreets?\nYou'll never know if you don't go\nYou'll never shine if you don't glow\n\n\nHey now you're an All Star get your game on, go play\nHey now you're a Rock Star get the show on, get paid\nAnd all that glitters is gold\nOnly shooting stars break the mold")
        //message.channel.send("Error Code 499 at checkmurderdead")
        throw new Error("Error Code 499 at checkmurderdead")

      } else {

        if (row1.isDead === 0) {

          playeridthingssss()


        } else {
          return victory()
        }
      }
    })
  }

  function isDay() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        throw new Error("Murder Mystery - ERR.")
        return
      } else {
        if (debugmode === 1) {
          console.log("[DEBUG] isDay")
        }

        //if (row.isHumansvsbots === 1) {
        if (row.modeId === 4) {
          setTimeout(botquotesa, 2000)
        }
        if (row.modeId === 2) {

        }
        //if (row.isMurderparty === 0) {



        //}
        //if (row.isMurderparty === 1) {
        if (row.modeId === 2) {
          if (row.players === 1) {
            return victory()
          }
        }
        checkmurderdead()


        sql.run(`UPDATE murderMystery SET isNight = ${row.isNight = 0} WHERE guildId = '${message.guild.id}'`)

        sql.run(`UPDATE murderMystery SET isDay = ${row.isDay = 1} WHERE guildId = '${message.guild.id}'`)
        //mmplayersData.hasvoted = 0
        //mmplayersData.actioned = 0
        /**
          fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
          if (err) console.error(err)
          });
        **/

        if (row.isStopcycle === 1) return;

        bot.channels.get(row.murdergamechannelid).send("Good morning!\nTo vote to kill you must type mm!votehang `@user`\nThe morning will go on for a minute.\nPlease chat if you are a specific role or chat whatever you'd like to get your action back!")

        bot.channels.get(row.murdergamechannelid).overwritePermissions(message.guild.id, {
          SEND_MESSAGES: true
        })

        //if (row.isFasterMode === 1) {
        if (row.modeId === 6) {
          setTimeout(isnaught, 10000)
          return;
        }

        setTimeout(isnaught, 60000)
      }
    })
  }

  function isnaught() {
    message.guild.member(bot.user).setNickname("Murder Mystery Bot")
    if (debugmode === 1) {
      console.log("[DEBUG] CHANGE NAME")
    }
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
        return
      } else {

        sql.run(`UPDATE murderMystery SET isDay = ${row.isDay = 0} WHERE guildId = '${message.guild.id}'`)
        sql.run(`UPDATE murderMystery SET isNight = ${row.isNight = 1} WHERE guildId = '${message.guild.id}'`)


        if (row.isStopcycle === 1) return;
        bot.channels.get(row.murdergamechannelid).send("Good night...")

        bot.channels.get(row.murdergamechannelid).overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        })
        //if (row.isFasterMode === 1) {
        if (row.modeId === 6) {
          setTimeout(isDay, 30000)
          return;
        }
        setTimeout(isDay, 55000)

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
        sql.run(`UPDATE murderMysteryPlayers SET voted = ${row.voted + 1} WHERE userId ='${useridz}' AND guildId = '${message.guild.id}'`)


      }
    })
  }

  function hasvoteremoved() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That player isn't in the game!")
        return
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET hasvoted = ${row.hasvoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)


      }
    })
  }

  function hasvoteadd() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("That player isn't in the game!")
        return
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET hasvoted = ${row.hasvoted = 1} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)


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
        new Error("Murder Mystery - Player not found.")
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

  if (command === "votehang") {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("You have not put your data in the database! Please type " + config.prefix + "game setupdata\nto insert your data into the database!")
        return
      } else {
        return message.reply("This command isn't made yet...")




        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")

        if (message.channel.id !== row.murdergamechannelid) return message.reply("You cannot vote in your private channel!");

        if (row.isNight === 1) return message.reply("You cannot do this in the night!")
        unaction()
        //mmplayersData.actioned = 0

        let user = message.mentions.users.first();
        if (!user) return message.reply("That user doesn't exist!")
        hasvotedcheck()
        sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${message.author.id}' AND guildId ='${message.guild.id}'`).then(row2 => {
          if (!row2) {
            message.reply("You aren't in the game!")
          } else {


            sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId = '${user.id}' AND guildId ='${message.guild.id}'`).then(row1 => {
              if (!row1) {
                message.reply("That user isn't in the game!")
              } else {


                //if(mmplayersData.hasvoted === 1) return message.reply("You have already voted!")
                if (row2.hasVoted === 1) return message.reply("You have already voted!")
                //if (row.isMurderparty === 1) {
                if (row.modeId === 3) {
                  return message.reply("Votehang is disabled on this mode.")
                }
                if (row.modeId === 2) {
                  return message.reply("Votehang is disabled on this mode.")
                  //let mmplayersDataa = mmplayers[user.id]

                  //if(!mmplayersDataa) return message.reply("That user isn't in the game!")

                  if (user.id === message.author.id) return message.reply("You cannot vote yourself!")
                  votemp(user.id)

                  //mmplayersDataa.voted++;
                  sql.run(`UPDATE murderMysteryPlayers SET voted = ${row1.voted + 1} WHERE userId ='${user.id}' AND guildId = '${message.guild.id}'`)
                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 1} WHERE userId ='${user.id}' AND guildId = '${message.guild.id}'`)

                  //mmplayersData.hasvoted = 1

                  if (row1.voted === 5) {

                    message.reply(user + " has been voted, and has around 5 votes, He will now be killed...")
                    user.send(":skull: You have died! :skull:")
                    let aaaaaaaa = bot.guilds.get(message.guild.id).roles.get(row.murdermysteryRoleID)

                    function diedbeingkilled() {
                      bot.channels.get(row.murdergamechannelid).send(user + " has been hung :skull:")
                    }



                    //message.guild.member(user).removeRole(aaaaaaaa.id)
                    bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                      SEND_MESSAGES: false
                    })
                    setTimeout(diedbeingkilled, 500)

                    willcheck(user.id, 1, row.murdergamechannelid)
                    /**
                                if(mmplayersDataa.lastwill === ""){

                                }
                                if(mmplayersDataa.lastwill !== ""){
                                  setTimeout(haswill, 1000)

                                  setTimeout(hisrole, 2000, 1, row.murdergamechannelid)
                                  return;
                                }
                    **/

                    return
                  }



                  if (mmplayersDataa.voted === 1) {
                    message.reply(user + " has been voted, " + "**2**" + " more votes needed until he dies.")

                  }
                  if (mmplayersDataa.voted === 2) {
                    message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                  }
                  //message.reply(user + " has been voted, " + mmplayersDataa.voted / 3 + " votes needed until he dies.")

                  /**

                            fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                          if (err) console.error(err)
                          });
                        **/
                  return;
                }




                /// thing thing ting thing thigng




                if (row.modeId === 1) {
                  if (user.id === message.author.id) return message.reply("You cannot vote yourself!")

                  let checkassignedd = checkassignedid(user.id)

                  //mmplayersDataa.voted++;

                  //mmplayersData.hasvoted = 1
                  sql.run(`UPDATE murderMysteryPlayers SET voted = ${row1.voted + 1} WHERE userId ='${user.id}' AND guildId = '${message.guild.id}'`)
                  sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 1} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                  function diedbeingkilled() {
                    bot.channels.get(row.murdergamechannelid).send(user + " has been hung :skull:")
                  }

                  function nowill() {
                    bot.channels.get(row.murdergamechannelid).send("There were no last wills to be found...")
                  }

                  function haswill() {
                    bot.channels.get(row.murdergamechannelid).send(user + " Had a last will!\nHis will reads:\n```\n" + row1.lastwill + "\n```")
                  }

                  function hisrole() {
                    if (row1.isMurderer === 1) {
                      bot.channels.get(row.murdergamechannelid).send(user + " was the **Murderer**")
                      sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                      setTimeout(victory, 2000)
                      return
                    }
                    if (row1.isSheriff === 1) {
                      if (checkassignedd === 1) {
                        bot.channels.get(row.murdergamechannelid).send(user + " was a **Detective** and the **Assassin** gained $3 for killing his target!")
                        sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)


                        //bot.users.get(arr[4]).send("You have gained $3!\nYou have no new Targets.")
                        dmassassin(5)
                        return
                      }
                      bot.channels.get(row.murdergamechannelid).send(user + " was a **Detective**")
                      sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                      return;
                    }
                    if (row1.isHealer === 1) {

                      if (checkassignedd === 1) {
                        bot.channels.get(row.murdergamechannelid).send(user + " was a **Healer** and the **Assassin** gained $3 for killing his target!")
                        sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)


                        dmassassin(5)


                        return
                      }

                      bot.channels.get(row.murdergamechannelid).send(user + " was a **Healer**")
                      sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                      return
                    }
                    if (row1.isRadioPerson === 1) {
                      if (checkassignedd === 1) {
                        bot.channels.get(row.murdergamechannelid).send(user + " was a **Radio Person** and the **Assassin** gained $3 for killing his target!")

                        dmassassin(5)

                        sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                        return
                      }
                      bot.channels.get(row.murdergamechannelid).send(user + " was a **Radio Person**")
                      sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                      return;
                    }
                    if (row1.isJailor === 1) {
                      if (checkassignedd === 1) {
                        bot.channels.get(row.murdergamechannelid).send(user + " was a **Jailor** and the **Assassin** gained $3 for killing his target!")

                        dmassassin(5)

                        sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                        return
                      }
                      bot.channels.get(row.murdergamechannelid).send(user + " was a **Jailor**")
                      sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                      return;
                    }
                    if (row1.isAssassin === 1) {
                      bot.channels.get(row.murdergamechannelid).send(user + " was an **Assassin**")
                      sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

                      return
                    }
                    bot.channels.get(row.murdergamechannelid).send(user + " was **Innocent**")


                    sql.run(`UPDATE murderMysteryPlayers SET hasVoted = ${row2.hasVoted = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)


                  }

                  if (row.players >= 8) {
                    if (row1.voted === 7) {
                      message.reply(user + " has been voted, and has around 7 votes, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })

                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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


                      return
                    }


                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, " + "**6**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 2) {
                      message.reply(user + " has been voted, " + "**5**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 3) {
                      message.reply(user + " has been voted, " + "**4**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 4) {
                      message.reply(user + " has been voted, " + "**3**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 5) {
                      message.reply(user + " has been voted, " + "**2**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 6) {
                      message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                    }
                  }
                  if (row.players === 7) {
                    if (row1.voted === 6) {
                      message.reply(user + " has been voted, and has around 6 votes, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })
                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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
                      return
                    }
                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, " + "**5**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 2) {
                      message.reply(user + " has been voted, " + "**4**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 3) {
                      message.reply(user + " has been voted, " + "**3**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 4) {
                      message.reply(user + " has been voted, " + "**2**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 5) {
                      message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                    }
                  }
                  if (row.players === 2) {
                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, and has around 1 vote, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })
                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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
                      return
                    }
                  }
                  if (row.players === 3) {
                    if (row1.voted === 2) {
                      message.reply(user + " has been voted, and has around 2 votes, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })
                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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
                      return
                    }
                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                    }
                  }
                  if (row.players === 4) {
                    if (row1.voted === 3) {
                      message.reply(user + " has been voted, and has around 3 votes, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })
                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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
                      return
                    }
                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, " + "**2**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 2) {
                      message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                    }
                  }
                  if (row.players === 5) {
                    if (row1.voted === 4) {
                      message.reply(user + " has been voted, and has around 4 votes, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })
                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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
                      return
                    }
                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, " + "**3**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 2) {
                      message.reply(user + " has been voted, " + "**2**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 3) {
                      message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                    }
                  }
                  if (row.players === 6) {
                    if (row1.voted === 5) {
                      message.reply(user + " has been voted, and has around 5 votes, He will now be killed...")
                      user.send(":skull: You have died! :skull:")
                      bot.channels.get(row.murdergamechannelid).overwritePermissions(user, {
                        SEND_MESSAGES: false
                      })
                      nopermstoanychannel(row.playerId)
                      sql.run(`UPDATE murderMysteryPlayers SET isDead = ${row1.isDead = 1} WHERE guildId ='${message.guild.id}' AND userId ='${user.id}'`)
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
                      return
                    }
                    if (row1.voted === 1) {
                      message.reply(user + " has been voted, " + "**4**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 2) {
                      message.reply(user + " has been voted, " + "**3**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 3) {
                      message.reply(user + " has been voted, " + "**2**" + " more votes needed until he dies.")

                    }
                    if (row1.voted === 4) {
                      message.reply(user + " has been voted, " + "**1**" + " more vote needed until he dies.")

                    }
                  }
                  //message.reply(user + " has been voted, " + mmplayersDataa.voted / 3 + " votes needed until he dies.")


                  /** 
                          fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
                            if (err) console.error(err)
                          });
                  **/
                }

              }
            })
          }
        })
      }

    })

  }

  function unactionpp() {
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("Murder Mystery - Player not found.")
      } else {
        sql.run(`UPDATE murderMysteryPlayers SET actioned = ${row.actioned = 0} WHERE userId ='${message.author.id}' AND guildId = '${message.guild.id}'`)

      }
    })
  }

  function unactionz() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {

        return
      } else {



        if (row.isNight === 1) return
        unactionpp()
        /**
    fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
  if (err) console.error(err)
  });
**/
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
        //if(message.guild.id !== preventjoinData.guildID) return message.reply("That is not your game!")
        //if(preventjoinData.start === 0) return message.reply("The game hasn't started yet!")
        if (row.gameStarted === 0) return message.reply("The game hasn't started yet!")

        if (!args[0]) {
          return message.author.send("Please type in a last will!")
        }



        //mmplayersData.lastwill = args.join(" ")

        message.author.send("Success! Your will is now:\n```\n" + mmplayersData.lastwill + "\n```")
        /**
              fs.writeFile('./mmplayers.json', JSON.stringify(mmplayers), (err) => {
            if (err) console.error(err)
            });
              **/
      }
    })

  }







  //

  if (command === "help") {
    message.channel.send("`Help Command`\n\n***Regular Commands***\n**mm!invite** - Invite Murder Mystery Bot to your server!\n**mm!server** - Shows you the invite to the Offical Murder Mystery Bot Server!\n\n***Game Commands***\n**mm!game** - Shows the detail of the game and how to play I guess\n**mm!game rules** - Shows you the rules of the game!\n**mm!game start** - Start a game!\n**mm!game fixgame** - Attempts to fix the game.\n**mm!game join** - Join a game!\n**mm!game setupdata** - Add your guild data in our database!\n**mm!game addhostrole <role name>** - Add your host role to the database!\n**mm!game leave** - Leave the game!\n**mm!game gamestart** - Start the game which will create all channels and setup roles, etc...\n**mm!game stop** - Stop the game!\n\n***Ingame Commands***\n**mm!kill <@user>** - Kill a user! (Murderer Permission Needed)\n**mm!search <@user>** - Search the user to see if they are the murderer!\n**mm!shoot <@user>** - Shoot a user if you think they are the murderer!\n**mm!broadcast** - Broadcast a global message to the news!\n**mm!votehang <@user>** - Vote to kill the person if you think they are suspicious!\n**mm!jail <@user>** - Jail a person to interrigate them\n**mm!execute <@user>** - Execute the user if they are suspicious...\n**mm!heal <@user>** - Bring the user back from the dead!\n**mm!lastwill <will>** - When you die or get hung, there will be a lastwill message to all the users to see before you actually die.\n\n***Bot made by FireMario211***\nVersion " + version + "\nPlease note that there may be bugs, if you see any, please type mm!bug (message)")
  }

  if (command === "bug") {
    if (!args[0]) return message.reply("Please state your bug")
    if (message.guild.id === "264445053596991498") return message.reply("Bug reports aren't allowed in Discord Bot Lists")
    bot.channels.get('349993166788886537').send("**New Bug!**\n**Bug report by **`" + message.author.tag + "` (" + message.author.id + ") in " + message.guild.name + ` (${message.guild.id}) - Channel ID (${message.channel.id})\nThe bug is\n` + "```\n" + args.join(" ") + "\n```")
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
        embed: new discord.RichEmbed().setAuthor(user.tag + " was warned!", user.avatarURL).addField("Username:", user.tag).addField("Action:", "Warning").addField("Staff:", message.author.tag).setFooter("Murder Mystery Bot 2017").setColor(0xFFFF00)
      })
      message.reply("Successfully warned!")

    }

    if (category === "timeout") {
      let user = message.mentions.users.first();
      if (!user) return message.reply("Please mention a user.")
      let reason = args.splice(1).join(' ')
      if (reason.length < 1) return message.reply("Please enter a reason.")
      bot.channels.get('322168099220750338').send({
        embed: new discord.RichEmbed().setAuthor(user.tag + " was warned!", user.avatarURL).addField("Username:", user.tag).addField("Action:", "Timeout").addField("Timeout for:", "").addField("Staff:", message.author.tag).setFooter("Murder Mystery Bot 2017").setColor(0xFFA500)
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
              message.channel.send(`**Restarting...**`);

              collector.stop();
              console.log(message.author.tag + " has restarted the bot!")
              setTimeout(function () {
                process.exit()
              }, 1000)


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
      if (!reason.length < 1) return message.reply("Please put in a reason!")
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
          m.edit(message.author + " You have successfully left the game!")
        })
      }
    })
  }

  function deleteallplayerz(check) {
    var playeridz = 1
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      deleteallplayerztwo(check)

    })
  }

  function deleteallplayerztwo(check) {
    var playeridz = 2
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      if (check === 1) return;
      deleteallplayerzthree()

    })
  }

  function deleteallplayerzthree() {
    var playeridz = 3
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      deleteallplayerzfour()

    })
  }

  function deleteallplayerzfour() {
    var playeridz = 4
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      deleteallplayerzfive()

    })
  }

  function deleteallplayerzfive() {
    var playeridz = 5
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      deleteallplayerzsix()

    })
  }

  function deleteallplayerzsix() {
    var playeridz = 6
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      deleteallplayerzseven()

    })
  }

  function deleteallplayerzseven() {
    var playeridz = 7
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);
      deleteallplayerzeight()

    })
  }

  function deleteallplayerzeight() {
    var playeridz = 8
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);

    })
  }

  function deleteallplayerznine() {
    var playeridz = 9
    sql.get(`SELECT * FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        new Error("MurderMysteryError - Player ID does not exist (prob not humans vs bots mode)")
      }
      sql.run(`DELETE FROM murderMysteryPlayers WHERE playerid = '${playeridz}' AND guildId ='${message.guild.id}'`);

    })
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
        //if (row.isMurderparty === 1) {
        if (row.modeId === 2) {

          bot.channels.get(row.murdergamechannelid).delete()
          bot.channels.get(row.murderchannelid).delete()
          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()
          /**
                  //fs.writeFile('./mmplayers.json', '{}', 'utf8')
                  fs.writeFile('./mmgame.json', '{}', 'utf8')

                  fs.writeFile('./preventjoin.json', '{}', 'utf8')
          **/
          message.guild.defaultChannel.sendMessage("The murderer has won, the town is dead")
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz)
          return
        }

        //if (row.isOneVOne === 1) {
        if (row.modeId === 3) {
          /**
                    fs.writeFile('./mmplayers.json', '{}', 'utf8')
                    fs.writeFile('./mmgame.json', '{}', 'utf8')

                    fs.writeFile('./preventjoin.json', '{}', 'utf8')
            **/

          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()
          bot.channels.get(row.murdergamechannelid).delete()
          bot.channels.get(row.sheriffchannelid).delete()
          bot.channels.get(row.murderchannelid).delete()
          //bot.channels.get(row.radiochannelid).delete()
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz, 1000, 1)





          message.guild.defaultChannel.sendMessage("Innocents win! The town survived!")

          return
        }

        fs.writeFile('./mmplayers.json', '{}', 'utf8')
        fs.writeFile('./mmgame.json', '{}', 'utf8')

        fs.writeFile('./preventjoin.json', '{}', 'utf8')


        let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
        murdermysteryrole.delete()


        bot.channels.get(row.murdergamechannelid).delete()
        bot.channels.get(row.healchannelid).delete()
        bot.channels.get(row.sheriffchannelid).delete()
        bot.channels.get(row.murderchannelid).delete()
        bot.channels.get(row.radiochannelid).delete()
        bot.channels.get(row.jailchannelid).delete()
        bot.channels.get(row.jailorchannelid).delete()


        setTimeout(aaaaaaa, 1500)
        setTimeout(deleteallplayerz, 1000, 0)




        message.guild.defaultChannel.sendMessage("Innocents win! The town survived!")



      }
    })
  }

  function aaaaaaa() {
    sql.get(`SELECT * FROM murderMystery WHERE guildId ='${message.guild.id}'`).then(row => {
      if (!row) {
        message.reply("ERR!")
        return
      } else {
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET host = ${row.host = 0} WHERE guildId = '${message.guild.id}'`)
        }, 1500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET murderchannelid = ${row.murderchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 2000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET murdergamechannelid = ${row.murdergamechannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 2500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET healchannelid = ${row.healchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 3000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET sheriffchannelid = ${row.sheriffchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 3500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isDay = ${row.isDay = 0} WHERE guildId = '${message.guild.id}'`)
        }, 4000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isNight = ${row.isNight = 0} WHERE guildId = '${message.guild.id}'`)
        }, 4500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isStopcycle = ${row.isStopcycle = 1} WHERE guildId = '${message.guild.id}'`)
        }, 5000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET gameStarted = ${row.gameStarted = 0} WHERE guildId = '${message.guild.id}'`)
        }, 5500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET startcmd = ${row.startcmd = 0} WHERE guildId = '${message.guild.id}'`)
        }, 6000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET players = ${row.players = 0} WHERE guildId = '${message.guild.id}'`)
        }, 6500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET jailorchannelid = ${row.jailorchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 7000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET jailchannelid = ${row.jailchannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 7500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET radiochannelid = ${row.radiochannelid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET modeId = ${row.modeId = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET gameid = ${row.gameid = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8500)
        /*

        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isMurderparty = ${row.isMurderparty = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8500)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isHumansvsbots = ${row.isHumansvsbots = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isKillermode = ${row.isKillermode = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isSpecialistTown = ${row.isSpecialistTown = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isFiftyfifty = ${row.isFiftyfifty = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8000)
        setTimeout(function () {
          sql.run(`UPDATE murderMystery SET isOneVOne = ${row.isOneVOne = 0} WHERE guildId = '${message.guild.id}'`)
        }, 8500)
*/
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
        if (row.modeId === 3) {

          let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
          murdermysteryrole.delete()
          fs.writeFile('./mmplayers.json', '{}', 'utf8')
          fs.writeFile('./mmgame.json', '{}', 'utf8')

          fs.writeFile('./preventjoin.json', '{}', 'utf8')






          bot.channels.get(row.murdergamechannelid).delete()
          bot.channels.get(row.sheriffchannelid).delete()
          bot.channels.get(row.murderchannelid).delete()
          bot.channels.get(row.radiochannelid)
          setTimeout(aaaaaaa, 1500)
          setTimeout(deleteallplayerz, 2000)





          message.guild.defaultChannel.sendMessage("The town has died. The murderer and assassin won.")

          return
        }
        let murdermysteryrole = message.guild.roles.get(row.murdermysteryRoleID)
        murdermysteryrole.delete()
        fs.writeFile('./mmplayers.json', '{}', 'utf8')
        fs.writeFile('./mmgame.json', '{}', 'utf8')

        fs.writeFile('./preventjoin.json', '{}', 'utf8')





        bot.channels.get(row.murdergamechannelid).delete()
        bot.channels.get(row.healchannelid).delete()
        bot.channels.get(row.sheriffchannelid).delete()
        bot.channels.get(row.murderchannelid).delete()
        bot.channels.get(row.radiochannelid).delete()
        setTimeout(aaaaaaa, 1500)
        setTimeout(deleteallplayerz, 2000)


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
      bot.channels.get('319590345052520448').sendMessage(message.author + " has verified with the code `" + args[0] + "`!")

      fs.writeFile('./verificationids.json', JSON.stringify(verifyt), (err) => {
        if (err) console.error(err)
      });

    }
    */
  if (command === "invite") {

    message.channel.send("Please look in DMs!")
    message.author.send("https://discordapp.com/oauth2/authorize?client_id=319204121393496064&scope=bot&permissions=336055417")

  }

  /*
     if (command === 'eval') {
      if (message.author.id != '126119057232625664' && message.author.id != '280158289667555328' && message.author.id != '281397352177074177') {
          return message.reply('Not a dev! :(');
      } else {
        try {
          const result = eval(args.join(' '));
          
          if (typeof result != 'string') {
            require('util').inspect(result, {
               depth: 3,
               maxArray: 2048
            });
          }
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
          msg.channel.send(result, { code: 'js'});
        } catch(e) {
          msg.channel.send(result, { code: 'js'});   
        }
      }
    }
  */


  if (command === "evalf") {
    function clean(text) {
      if (typeof (text) === "string") {
        text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        text.replace(bot.token, "Sneaky Sneaky...");
        return
      } else
        return text;
    }
    if (message.author.id != '126119057232625664' && message.author.id != '280158289667555328' && message.author.id != '281397352177074177') {
      return message.reply('Not a dev! :(');
    }
    if (message.channel.type === 'dm') {
      message.author.sendMessage("I cannot respond with this command in DMS.")
      return;
    }
    // this is for fires fixed eval
    //var str = args.join(" ");
    //var patt = new RegExp("token");
    //var res = patt.test(str);
    //if (res === true) return message.reply("nope")
    try {
      var code = args.join(" ");
      var evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send({
        embed: new discord.RichEmbed().addField("Javascript Eval:", "Success!").addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```").addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```").setColor(0xFF0000)
      })
    } catch (err) {

      message.channel.send({
        embed: new discord.RichEmbed().addField("Javascript Eval ERROR:", "There was a problem with the code your trying to run!").addField("Error", "```" + clean(err) + "```").setColor(0xFF0000)
      })
    }
  }
  if (command === 'eval') {
    if (message.author.id != '126119057232625664' && message.author.id != '280158289667555328' && message.author.id != '281397352177074177') {
      return;
    }
    if (args.join(" ").length < 1) return message.reply("`ERROR` Please eval something!")
    try {
      const result = eval(args.join(' '));

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
        message.channel.send(":white_check_mark: Went successful!\n```js\n" + result + "\n```")
      }
    } catch (e) {
      message.channel.send(":x: Something went wrong! Error details: ```js\n" + e + "\n```")
    }
  }

  const hd = require('humanize-duration');
  const os = require('os');
  if (command === "stats") {
    const embed = new discord.RichEmbed()
      .setTitle(`${bot.user.username}'s stats`)
      .setDescription(`Uptime: ${hd(bot.uptime, {round: true})}`)
      .addField(`Misc >`, `**Guilds (size)**: ${bot.guilds.size}\n**Users/Bots**: ${bot.users.size}/${bot.users.filter(g => g.bot).size}\nPing: \`${bot.ping.toFixed(0)}ms\``, true)
      .addField(`VPS >`, `**VPS OS**: ${os.platform()}\n**Mem Usage**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\nNode.js Version: ${process.version}\nDiscord.js Version: v${discord.version}\nActive Games: ${gameid}\nMurder Mystery Bot Version: ${version}`, true)
      .setTimestamp()
    message.channel.send({
      embed
    });
  }
  if (command === "about") {
    message.channel.send(`Hello! I am ${bot.user.username} developed by <@126119057232625664> & <@280158289667555328>!\nI was based on the Hypixel game "Murder Mystery"; I was being private for 2 months and 30 days (So long...) but I am public as of August 24th, 2017!\nIf you need help, Do **mm!help** or if you need my stats? Use **mm!stats**, Is there a bug? Use **mm!bug [report]** to report a bug!`)
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
