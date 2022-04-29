const { GuildMember, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member) {
        const { guild } = member;

        Canvas.registerFont('./Fonts/XiaoWei.ttf', { family: 'XiaoWei' })
        
        const canvas = Canvas.createCanvas(800,250);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("./Images/MemberJoin.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 40;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px XiaoWei`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };

        ctx.textAlign = "center";
        ctx.font = '30px XiaoWei'
        ctx.fillText(`Welcome to Aurora Gaming`, canvas.width / 2.100, canvas.height / 1.5);  
        ctx.font = applyText(canvas, member.displayName);
        ctx.fillStyle = "#000000";
        ctx.fillText(`${member.displayName}`, canvas.width / 2.100, canvas.height / 1.25);  

        ctx.beginPath();
        ctx.arc(canvas.width / 2.125, canvas.height / 3, 45, 0, Math.PI *2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "jpg"}));
        ctx.drawImage(avatar, (canvas.width / 2.125) - 50, (canvas.height / 3) -50, 100, 100);
        const attachement = new MessageAttachment(canvas.toBuffer(), "memberjoin.png");

        // To add a channel link using the channel ID do <#ID>
        await guild.systemChannel.send({content: `<@${member.id}>\n欢迎各位来到Aurora Gaming北美陪玩公会，很荣幸能在此与您相遇!\n目前正在招募陪玩，入职/下单/送礼可联系 <@&929957733615165500>\n有关充值及下单流程可移步到 <#924558928916930601> 及 <#924560106488758343> 进行查看\n自助点单可移步到 <#924550175228317697>\n十分欢迎大家的来临并在此与我们共度欢乐时光 <#924559072353726495>\n希望各位能在Aurora度过愉快的时光，Aurora永远是您的港湾!!`,files: [attachement]}).catch((err) => console.log(err));
        
        member.send({content: "欢迎各位来到Aurora Gaming北美陪玩公会，很荣幸能在此与您相遇!\n目前正在招募陪玩，入职/下单/送礼可联系 @客服 •ᴥ•入职/下单/充值/送礼\n有关充值及下单流程可移步到 <#924558928916930601> 及 <#924560106488758343> 进行查看\n自助点单可移步到 <#924550175228317697>\n十分欢迎大家的来临并在此与我们共度欢乐时光 <#924559072353726495>\n希望各位能在Aurora度过愉快的时光，Aurora永远是您的港湾!!"}).catch((err) => console.log(""))
    }
}
