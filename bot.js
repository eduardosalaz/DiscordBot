const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
client.on('ready', () => {
    console.log('Yeah perdonen');
});

const muertes ={1: " went up in flames",
                2: " burned to death",
                3: " tried to swim in lava",
                4: " suffocated in a wall",
                5: " drowned",
                6: " starved to death",
                7: " was pricked to death",
                8: " hit the ground too hard",
                9: " fell out of the world",
                10: " died",
                11: " blew up",
                12: " was killed by magic",
};
const matar ={1: " was slain by ",
              2: " was shot by ",
              3: " was fireballed by ",
              4: " was pummeled by ",
              5: " was killed by ",
              6: " was brutally murdered by ",
              7: " was spared gracefully from death by "

};
const keys = Object.keys(muertes);
const llaves = Object.keys(matar);

const rulesURL = 'http://vignette1.wikia.nocookie.net/fairlyoddparents/images/e/e7/Cosmo_Rules_Pic_2.jpg/revision/latest?cb=20101205143836&path-prefix=en';
const defURL = 'http://pm1.narvii.com/7121/de25e052da2ef153422aa603650490f5e0cf9e8br1-1060-1060v2_uhq.jpg';
const gifURL = 'https://media.giphy.com/media/10bv4HhibS9nZC/giphy.gif';
const videoURL = 'https://www.youtube.com/watch?v=U-n4hWNewiE'

client.on("message", (message) => {
    if (message.content.startsWith('¡')) {
        process(message);
    } 
});

function process(message){
    var texto = message.content.toLowerCase();
    var channel = message.channel;
    if(texto.includes('help') || texto.includes('ayuda') || texto.includes('rules')){
        const e = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('QUE PUEDES HACER?')
        .setDescription('LOS COMANDOS DEL BOT')
        .addFields(
            { name: 'YEAH PERDONEN', value: 'EL HIMNO' },
            { name: 'COIN/MONEDA/FLIP', value: 'LANZA UNA MONEDA' },
            { name: 'DIE', value: 'Game endeas' },
            { name: 'KILL', value: 'Game end a alguien' },
            { name: 'NOMBRE/POBLACIÓN', value: 'INFO DEL SERVER' },
            { name: 'DEFINICION', value: 'SI' },
        )
        .setImage(rulesURL)
        .setTimestamp()
        .setFooter('Footer creo');
        channel.send(e);
    }else if(texto.includes('josé')){
        var cumple = new Date("May 12, 2020 01:00:00").getTime();
        var now = new Date().getTime();
        var delta = cumple - now;
        var days = Math.floor(delta/ (1000 * 60 * 60 * 24));
        var hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((delta % (1000 * 60)) / 1000);
        var felicidad = 'Faltan '+ days + ' días ' + hours + ' horas ' +  + minutes + ' minutos ' + seconds +  ' segundos ' + ' para tu cumpleaños';
        channel.send(felicidad);
        channel.send('feliz cumpleaños :)');
    }else if(texto.includes('kick')){
        const taggedUser = message.mentions .users.first();
        const objetivo = taggedUser.username;
        const userName = message.author.username;
        channel.send('Estás seguro que quieres decirle adios a? ' + objetivo);
    }
    else if(texto.includes('definicion')){
        const e = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Observa')
        .setImage(defURL);
        channel.send(e);
    }else if (texto.includes('yeah') || texto.includes('perdonen')){
        const canalVoz = message.member.voice.channel;
        if(!canalVoz){
            return channel.send('Unete a un canal de voz primero');
        }
        canalVoz.join().then(connection => {
            channel.send('ATENTO AL HIMNO DEL DISCORD');
            const stream = ytdl(videoURL, { filter: 'audioonly'});
            const dispatcher = connection.play(stream);
            dispatcher.on('end', () => canalVoz.leave())
        });
    }else if (texto.includes('nombre')){
        var nombre = message.guild.name;
        channel.send('El nombre de este server es: ' + nombre);
    }else if (texto.includes('ping')){
        channel.send('pong');
    }else if (texto.includes('pong')){
        channel.send('ping');
    }else if (texto.includes('poblacion') || texto.includes('población')){
        var pop = message.guild.memberCount;
        channel.send('Habitantes del server: ' + pop);
    }else if (texto.includes('die')){
        var random = Math.floor(Math.random() * 12 ) + 1;
        for (const key in keys){
            if(key == random){
                var respuesta = muertes[key]
                var userName = message.author.username;
                channel.send(userName + respuesta);
            }
        }
    }else if (texto.includes('kill')){
        const taggedUser = message.mentions .users.first();
        const objetivo = taggedUser.username;
        var random = Math.floor(Math.random() * 7 ) + 1;
        for (const key in llaves){
            if(key == random){
                var respuesta = matar[key]
                var userName = message.author.username;
                channel.send(objetivo + respuesta + userName);
            }
        }
    }else if (texto.includes('coin') || texto.includes('flip') || texto.includes('moneda')){
        const e = new Discord.MessageEmbed()
        .setColor('0099ff')
        .setTitle('TOSS A COIN TO YOUR WITCHER')
        .setImage(gifURL)
        channel.send(e);
        var moneda = Math.floor(Math.random() * 2) + 1;
        var resultado = "";
        if(moneda == 1){
            resultado = "Cara";
        }
        else if (moneda == 2){
            resultado = "Cruz"
        }
        else{
            resultado = "Wtf"
        }
        channel.send("La moneda cayó en: " + resultado);
    }else if(texto.includes('hola')){
        channel.send('hola como estás')
    }else if (texto.includes('bien') || texto.includes('mal')){
        channel.send('didnt ask tbh');
    }else{
        channel.send("no te entendí")
    }    
}
/*client.on('guildMemberAdd', async member => {
    channel = 'general';
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});
*/
const fs = require('fs');
const token = fs.readFileSync('token.txt').toString().trim();
client.login(token);