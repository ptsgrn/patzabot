/*  
 *  =============================================
 *  @description: user config require file
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */
require('./mw.js')();
module.exports = function() { 
     this.mw = new bot({
    'protocol': 'https',
    'server': 'ไร้สาระนุกรม.com',
    'path': '',
    'debug': false,
    'username': 'PatzaBot',
    'password': 'manpatsagorn123'
});
}