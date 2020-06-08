// Author: Patsagorn Y.
// License: CC-BY-SA-3.0

require('dotenv').config();
const discord = require("discord.js");
const moment = require("moment");
moment.locale('th'); // use Thai (th)
let date = moment().format("HH[:]mm[:]ss, D MMMM y"); 
const bot = new discord.Client();

module.exports = {
  "info": function(text){
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:blue_circle: ${date}: ${text}` );});
  },
  "error": function(text){
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:red_circle: ${date}: ${text}` );});
  },
  "warn": function(text){
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:yellow_circle: ${date}: ${text}` );});
  },
  "wikierror": function(text){
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:red_square: ${date}: ${text}` );});
  },
  "wikiwarn": function(text){
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:yellow_square: ${date}: ${text}` );});
  },
  "wikigreen": function(text){
    bot.channels.fetch("719087386184908887").then(channel => { channel.send(`:green_square: ${date}: ${text}` );});
  }
}

bot.login(process.env.discord_token);
