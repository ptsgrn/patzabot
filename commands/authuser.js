/*  
 *  =============================================
 *  @description: auth and pair user between wiki
 *                and discord
 *  @author: Patzagorn Y?
 *  @license: CC-BY-SA-2.0
 *  =============================================
 *
 */
const fs = require("fs");
var fileName = "./data/authdata.json";
module.exports.run = async (b, m, a, mw) => {
    var id = m.author.id;
    fs.readFile(fileName, "utf8", function(err, content) { 
    if (err) throw err; 
    let data = JSON.parse(content);
    if (data.list.id.indexOf(id)!=-1){
        let username = data.username[id];
        m.reply("คุณได้ยืนยันตัวตนว่าเป็นผู้ใช้:" + username+" ไปแล้ว");
        return;
    }
    if (data.waiting.id.indexOf(id) > -1){
        m.reply("อ่านข้อความส่วนตัว");
        m.author.send("คุณได้เริ่มการยืนยันตัวตนแล้วแต่ยังไม่สมบูรณ์ ทำต่อด้วยข้อความก่อนหน้า!");
        return;
    }
    let authid = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
    data["waiting"][authid] = id;
    data["waiting"]["id"].push(authid.toString());
    data["waiting"]["id"].push(id.toString());
    fs.writeFile(fileName, JSON.stringify(data, null, 4), function(err) {
        if (err) throw err; 
        fs.readFile(fileName, "utf8", function(err, content) {
            if (err) throw err;
            let data = JSON.parse(content);
            m.author.send("สวัสดีครับ ผม PatzaBot จะเริ่มการยืนยันตัวตนให้นะครับ");
            m.author.send("**วิธีการ**: แก้ไขหน้าใดก็ได้ แล้วใส่คำอธิบายการแก้ไข (ช่องกรอกข้อมูลที่อยู่เหนือ `[ ] เป็นการแก้ไขเล็กน้อย`) แล้วใส่รหัส `auth:" + authid + "` ลงไป กดบันทึก เรียบร้อย!");
            m.author.send("หรือง่ายกว่านั้น กดที่ลิงก์นี้ https://xn--12c1czafac9b9bq7dxgrc.com/index.php?title=User:PatzaBot/auth&oldid=272109&action=edit&miner=1&summary=auth:" + authid);
        });
    });
});
};

module.exports.watchRecentChanges = async (user, summary, mw, hook)=>{
    let authidfromsummary = summary.match(/\d{8}/)[0].toString();
    fs.readFile(fileName, "utf8", function(err, content) { 
        let data = JSON.parse(content);
        if (data.waiting.id.indexOf(authidfromsummary) == -1) return;
        let id = data["waiting"][authidfromsummary];
        if (!id) return;
        //Process!
        data["username"][id] = user;
        data["list"]["id"].push(id);
        delete data["waiting"][authidfromsummary];
        data.waiting.id.splice(data.waiting.id.indexOf(id), 1);
        data.waiting.id.splice(data.waiting.id.indexOf(authidfromsummary), 1);
        fs.writeFile(fileName, JSON.stringify(data, null, 4), function(err) {
            if (err) throw err;
            hook.send("<@" + id + "> ได้รับการยืนยันว่าเป็นผู้ใช้:" + user + " เรียบร้อยแล้ว"); 
        });
    });
};

module.exports.meta = {
  "command": "auth",
  "title": "ยืนยันตัวตน",
  "description": "ยืนยันชื่อผู้ใช้กับบนวิกิ"
};
