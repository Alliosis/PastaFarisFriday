require('dotenv').config();
const { Client, GatewayIntentBits, Events, AttachmentBuilder } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const welcomeMessages = JSON.parse(fs.readFileSync('./faris_welcome_messages.json', 'utf8'));
const fridayTraditions = JSON.parse(fs.readFileSync('./faris_friday_tradition.json', 'utf8'));

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomGif() {
    const gifFolder = './Faris Gif';
    if (!fs.existsSync(gifFolder)) {
        console.log('GIF folder not found');
        return null;
    }
    
    const files = fs.readdirSync(gifFolder).filter(file => 
        file.toLowerCase().endsWith('.gif') || 
        file.toLowerCase().endsWith('.png') || 
        file.toLowerCase().endsWith('.jpg') || 
        file.toLowerCase().endsWith('.jpeg') ||
        file.toLowerCase().endsWith('.webp')
    );
    
    if (files.length === 0) {
        console.log('No image files found in GIF folder');
        return null;
    }
    
    const randomFile = getRandomElement(files);
    return path.join(gifFolder, randomFile);
}

client.once(Events.Ready, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.GuildMemberAdd, member => {
    const welcomeChannel = member.guild.channels.cache.get(process.env.CHANNEL_ID);
    
    if (welcomeChannel) {
        const randomMessage = getRandomElement(welcomeMessages.faris_welcome_messages);
        const personalizedMessage = randomMessage.replace('{user}', `<@${member.id}>`);
        
        welcomeChannel.send(personalizedMessage);
    }
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
    
    const OWNER_ID = process.env.OWNER_ID;
    
    if (message.author.id === OWNER_ID) {
        if (message.content === '!test welcome') {
            const randomMessage = getRandomElement(welcomeMessages.faris_welcome_messages);
            const personalizedMessage = randomMessage.replace('{user}', `<@${message.author.id}>`);
            message.channel.send(personalizedMessage);
        }
        
        if (message.content === '!test friday') {
            const randomTradition = getRandomElement(fridayTraditions.faris_friday_tradition);
            const randomGifPath = getRandomGif();
            
            if (randomGifPath) {
                const attachment = new AttachmentBuilder(randomGifPath);
                await message.channel.send({
                    content: randomTradition,
                    files: [attachment]
                });
            } else {
                await message.channel.send(randomTradition);
            }
        }
    }
});

async function sendFridayTradition() {
    const guilds = client.guilds.cache;
    
    guilds.forEach(async (guild) => {
        const channel = guild.channels.cache.get(process.env.CHANNEL_ID);
        
        if (channel) {
            const randomTradition = getRandomElement(fridayTraditions.faris_friday_tradition);
            const randomGifPath = getRandomGif();
            
            if (randomGifPath) {
                const attachment = new AttachmentBuilder(randomGifPath);
                await channel.send({
                    content: randomTradition,
                    files: [attachment]
                });
            } else {
                await channel.send(randomTradition);
            }
        }
    });
}

function parseFridayTime(timeStr) {
    const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return { minute: 0, hour: 8 };
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'AM' && hour === 12) hour = 0;
    if (period === 'PM' && hour !== 12) hour += 12;
    return { minute, hour };
}

const { minute, hour } = parseFridayTime(process.env.FRIDAY_TIME || '8:00 AM');

cron.schedule(`${minute} ${hour} * * 5`, () => {
    console.log('Sending Friday tradition message...');
    sendFridayTradition();
}, {
    timezone: process.env.TIMEZONE || "America/Chicago"
});

client.login(process.env.DISCORD_TOKEN);
