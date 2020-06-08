/*
 *  =============================================
 *  @description: delete the authorited antry from
 *                authdata.json
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */
const fs = require('fs');
const fileName = './data/authdata.json';
module.exports.run = async (b, m, a, mw) => {
	fs.readFile(fileName, 'utf8', function(err, content) {
		const data = JSON.parse(content);
		if (a[0]) {
			if (a[0].toString() == 'yes') {
				m.channel.send('ผมว่าคุณคงรู้ว่ากำลังทำอะไร...');
				const id = m.author.id.toString();
				const username = data['username'][id];
				data.list.id.splice(data.list.id.indexOf(id), 1);
				delete data['username'][id];
				m.reply('ลบการจับคู่บัญชีของคุณ กับผู้ใช้:'+username+'เรียบร้อยแล้ว');
			} else {
				const delid = m.content.match(/\d{18}/)[0];
			}
		}
	});
};

module.exports.meta = {
	'command': 'unauth',
	'title': 'ลบการยืนยันตัวตน',
	'description': 'ยืนยันชื่อผู้ใช้บนวิกิ และให้สถานะผู้ใช้ยืนยันแล้ว',
};
