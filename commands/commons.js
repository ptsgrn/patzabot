/*
 *  =============================================
 *  @description: stream cross-wiki upload to 
 *                to this channel.
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */

module.exports.run = async (b, m, a, mw, h) => {
   h.wcc.listen(function(c) {
      if (c.comment.indexOf('th.wik') == -1) return;
      h.log.commons(`${c.user} อัปโหลด ${c.pageUrl}`);
   });
};

module.exports.meta = {
	'command': 'runcom',
	'title': 'เริ่มสตรีม',
	'description': 'เริ่มสตรีมการอัปโหลด cross-wiki จาก th.wikipedia.org',
};
