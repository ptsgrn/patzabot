
/*  
 *  =============================================
 *  @description: start command
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */

require("./lib/mw.js")();
const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
var EventEmitter2 = require('eventemitter2');
var em = new EventEmitter2();
const bot = new discord.Client();
var mw = new mwbot({
    "protocol": config.mw.protocal,
    "server": config.mw.wikiurl,
    "path": config.mw.scriptpath,
    "username": config.mw.username,
    "password": config.mw.password,
    "userAgent": "patzaBot by <@655456388058710034> on discord",  
  });
const authChannel = new discord.WebhookClient(config.authChannel.id, config.authChannel.token);
const logChannel = new discord.WebhookClient("709246065873780787","9jQo_oZcWj9gkyVClWLRf7OueZHiM_ISfqjEG6SEp_CCNGYNb7zoM3jYAz_KApUa0W_Q");

// When bot ready
bot.on("ready", async () => {
  console.log(`${bot.user.username}:พร้อม `+new Date());
  bot.user.setActivity("ใช้ `"+config.prefix+"` เป็น Prefix");
});

// Load commands
bot.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if (jsfiles.length <= 0) return console.log("ไม่พบคำสั่งใดพร้อมใช้งาน");

  console.log(`กำลังโหลด ${jsfiles.length} คำสั่งที่พบ`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} โหลดเรียบร้อย`);
    if (typeof props.meta.command === 'object'){
        for (let e=0;e<props.meta.command.length;e++){
            bot.commands.set(props.meta.command[e], props);
        }
    } else {
        bot.commands.set(props.meta.command, props);
    }
  });
});

// Message event
bot.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if (!command.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) {cmd.run(bot, message, args, mw, logChannel)};
});

// *** [[Page]] handler
bot.on('message', m => {
    let patt1 = /\[{2,}(.*?)\]{2,}?/gm;
    let patt2 = /\{{2}.*\|?\}{2}/gm;
    if (patt1.test(m.content)) {
        let conmatch = m.content.match(patt1);
        let text = "ลิงก์:";
        for (let i = 0; i < conmatch.length; i++) {
            let conp = conmatch[i].slice(2, -2).split("|")[0].replace(/\s/g, "_");
                if ( !/\[{2,}\]{2,}?/g.test(conmatch[i])){
                     text += "\n• https://th.uncyclopedia.info/wiki/" + conp; 
                }
        }
        m.channel.send(text);
    }
    if (patt2.test(m.content)) {
        let conmatch = m.content.match(patt2);
        let text = "ลิงก์แม่แบบ:";
        for (let i = 0; i < conmatch.length; i++) {
            let conp = conmatch[i].slice(2, -2).split("|")[0].replace(/\s/g, "_");
                let ddd = /\{{2}.*\|?\}{2}/g.test(conmatch[i]);
                if ( ddd ){
                     text += "\n• https://th.uncyclopedia.info/wiki/แม่แบบ:" + conp; 
                }
        }
        m.channel.send(text);
    }
});

em.on('onRecentchangeItem',(u,c)=>{
    let tester = /\d{8}/.test(c);
    if (!tester || u == "PatzaBot"){
        return;
    }
    let authusersscript = bot.commands.get("auth");
    authusersscript.watchRecentChanges(u, c, mw, authChannel);
});

setInterval(function(){
    mw.getRecentChanges(false,(e,d) =>{
        if (e) throw e;
        for (let t = 0;t < d.length;t++){
            em.emit('onRecentchangeItem',d[t].user,d[t].comment);
        }
    });
}, 3000);

bot.login(config.token);