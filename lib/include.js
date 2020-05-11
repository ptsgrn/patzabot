/*  
 *  =============================================
 *  @description: include require file
       this shound not expert any thing
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */
require('./discord.js')();
var path = require('path'); var scriptname = path.basename(__filename);

module.exports = function() {
    this.path = require('path');
    this.helper = function(){client.on('message', m => {
    if (m.content.toLowerCase() == '!bot status') {
        m.channel.send("`" + scriptname +': running`');
    }
});
client.login("NjY4MDQ0NDAxNDI3MzQ5NTE0.XiLlsw.v8fJNIfPmQkdA8OBOCLgGDKzKYs");
}
 }