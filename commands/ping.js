/*
 *  =============================================
 *  @description: Calculate and send values of 
 *                ping
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */

module.exports.run = async (b, m, a, mw) => {
	var resMsg = await m.channel.send('กำลังคำนวน... :bar_chart:');
	resMsg.edit('Ping: ' + b.ws.ping);
};

module.exports.meta = {
	'command': 'ping',
	'title': 'คำนวนปิง',
	'description': 'คำนวนค่าปิงจากเซิร์ฟเวอร์บอต',
};


