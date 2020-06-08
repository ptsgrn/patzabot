// Author: Patsagorn Y.
// License: CC-BY-SA-3.0

require('dotenv').config();
const discord = require("discord.js");
const moment = require("moment");
moment.locale('th'); // use Thai (th)
const bot = new discord.Client();

module.exports = {
  "info": function(text){
    let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:blue_circle: ${date}: ${text.message}` );});
  },
  "error": function(text){
    let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
     bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:red_circle: ${date}: ${text.message}` );});
  },
  "warn": function(text){
    let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:yellow_circle: ${date}: ${text.message}` );});
  },
  "wikierror": function(text){
    let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:red_square: ${date}: ${text.message}` );});
  },
  "wikiwarn": function(text){
    let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:yellow_square: ${date}: ${text.message}` );});
  },
  "wikigreen": function(text){
    let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:green_square: ${date}: ${text.message}` );});
  }
}

bot.login(process.env.discord_token);
