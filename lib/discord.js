/*  
 *  =============================================
 *  @description: discord require file
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */

module.exports = function() { 
     this.Discord = require('discord.js');
     this.client = new Discord.Client();
     this.embed = new Discord.RichEmbed();
}