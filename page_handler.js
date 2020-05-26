/*
 *  =============================================
 *  @description: [[]] & {{}} handler
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-3.0
 *  =============================================
 *
 */

require('dotenv').config();
const discord = require('discord.js');
const bot = new discord.Client();
bot.on('ready',()=>{
  console.log('Logged in...');
});
bot.on('message', (m) => {
  const patt1 = /\[{2,}(.*?)\]{2,}?/gm;
  const patt2 = /\{{2}.*\|?\}{2}/gm;
  if (patt1.test(m.content)) {
    const conmatch = m.content.match(patt1);
    let text = 'ลิงก์:';
    for (let i = 0; i < conmatch.length; i++) {
      const conp = conmatch[i].slice(2, -2).split('|')[0].replace(/\s/g, '_');
      if ( !/\[{2,}\]{2,}?/g.test(conmatch[i])) {
        text += '\n• https://th.uncyclopedia.info/wiki/' + conp;
      }
    }
    m.channel.send(text);
  }
  if (patt2.test(m.content)) {
    const conmatch = m.content.match(patt2);
    let text = 'ลิงก์แม่แบบ:';
    for (let i = 0; i < conmatch.length; i++) {
      const conp = conmatch[i].slice(2, -2).split('|')[0].replace(/\s/g, '_');
      const ddd = /\{{2}.*\|?\}{2}/g.test(conmatch[i]);
      if ( ddd ) {
        text += '\n• https://th.uncyclopedia.info/wiki/แม่แบบ:' + conp;
      }
    }
    m.channel.send(text);
  }
});
bot.login(process.env.discord_token);
