const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'redacted';
var prefix = '!t';
var triggered = false;
//var warnReason = 'no reason specified';

client.on('ready', () =>{
    console.log('Thunderhead is online!');
});

client.on('message', message =>{
    if (message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.startsWith(prefix) || message.author.bot){
        triggered = true;
        console.log("triggered");
    }

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    console.log(args);
    console.log(command);

    if(message.guild === null){
        console.log("ghosting a psychopath");
    } else {
        if (message.member.roles.get('714576375528292413')){
            if (command === "ban"){
                // Easy way to get member object though mentions.
                var member = message.mentions.members.first();
                // Kick
                member.ban().then((member) => {
                // Successmessage
                message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
            });//.catch(() => {
                // Failmessage
                //message.channel.send("Access Denied");
                //});
            } else if (command === "mute"){
                let muteRole = message.guild.roles.get("714223668288552961");
                var member = message.mentions.members.first();
                member.addRole(muteRole).catch(console.error);
                message.channel.send(member+ ' has been muted.');
            } else if (command === "warn"){
                var member = message.mentions.members.first();
                var warnReason = args.slice(1).join(' ');
                client.users.get(member.id).send("you have been warned for: "+ warnReason);//reminder to go back and make the warnReason argument
                message.channel.send(member + ' has been warned. The reason for this warn being: '+ warnReason);
            } else if (command === "unban"){
                message.guild.fetchBans().then(bans => {
                    bans.forEach(user => {
                        console.log(user.username + '#' + user.tag);
                        message.guild.unban(user);
                        message.channel.send('User '+ user.username +' has been unbanned!');
                    });
                });
            } else if (command === "unmute"){
                let muteRole = message.guild.roles.get("714223668288552961");
                var member = message.mentions.members.first();
                member.removeRole(muteRole);
                message.channel.send(member+ ' has been unmuted.');
            }
        } else {
            if (triggered === true){
                message.channel.send('Sir, you may not do that!');
            } else if (triggered === false){
                console.log('doing nothing');
            }
        } 
    }
});

client.on("guildMemberAdd" ,(message) => {
    client.channels.get("713848928306462723").send("Welcome to PegasAI Laboratories! Make sure to check out #terms-and-conditions as well as #rules.");
    client.channels.get("713848928306462723").send('Are you a developer and want to help? Check out #apply');
    client.channels.get("713848928306462723").send("Are you an investor? Check out pegasai.net ");
    client.channels.get("713848928306462723").send("Have questions? You can dm any of the staff and they will redirect you to where you can be informed.");
});

client.login(token);