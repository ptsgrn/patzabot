/*
 *  =============================================
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-3.0
 *  =============================================
 *
 */

require('dotenv').config();
const mwbot = require("nodemw");
const discord = require("discord.js");
const fs = require("fs");
var EventEmitter2 = require('eventemitter2');
var em = new EventEmitter2();
const bot = new discord.Client();
const helpers = {
    "moment": require("moment"),
    "log": require("./lib/report")
    }
let date = helpers.moment().format("HH[:]mm[:]ss, D MMMM y");
const version = require("./package").version;
var mw = new mwbot({
    "protocol": "https",
    "server": "ไร้สาระนุกรม.com",
    "path": "",
    "username": process.env.wiki_bot_username,
    "password": process.env.wiki_bot_password,
    "userAgent": "PatzaBot (android 8.1 arm64)",  
  });
var tasks = [];
// When bot ready
bot.on("ready", async () => {
  console.log(`${bot.user.username}:พร้อม `+new Date());
  bot.user.setActivity('มนุษย์คุยกัน หุ่นยนต์อย่างเราก็งงมนุษย์เค้าคุยอะไรกันนะ', { type: 'LISTENING', url: "https://ไร้สาระนุกรม.com/wiki/ผู้ใช้:PatzaBot"}).catch(helpers.log.error);
  bot.channels.fetch("719087386184908887").then(channel => { 
channel.send(`:rocket: ${date} Deployed v${version}`);
  });
});
// Load commands
bot.commands = new discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) helpers.log.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) return console.log("ไม่พบคำสั่งใดพร้อมใช้งาน");
  console.log(`กำลังโหลด ${jsfiles.length} คำสั่งที่พบ`);
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`/c ${f} loaded`);
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
  let prefix = process.env.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if (!command.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) {cmd.run(bot, message, args, mw, helpers)};
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
    authusersscript.watchRecentChanges(u, c, mw, bot);
});

setInterval(function(){
    mw.getRecentChanges(false,(e,d) =>{
        if (e) helpers.log.wikierror(e);
        for (let t = 0;t < d.length;t++){
            em.emit('onRecentchangeItem',d[t].user,d[t].comment);
        }
    });
}, 3000);

// Also working on tasks
fs.readdir("./tasks/", (err, files) => {
    if (err) helpers.log.warn(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("ไม่พบการทำงานที่ควรทำพร้อมใช้งาน");
    console.log(`กำลังโหลด ${jsfiles.length} การทำงานที่พบ`);
    jsfiles.forEach((f, i) => {
        let props = require(`./tasks/${f}`);
        console.log(`/t ${f} loaded`);
        tasks.push(props);
    });
});

if(process.env.run_tasks == "true"){
    for (let t = 0;t>tasks.length;t++) {
        tasks[t].run(bot, mw, process.env, others);
        console.log(`/r ${tasks[t]} running`);
    }
}

bot.login(process.env.discord_token);
