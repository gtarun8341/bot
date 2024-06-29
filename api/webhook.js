const express = require('express');
const router = express.Router();
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const fs = require('fs');

// Set your Telegram bot token from environment variables
const API_TOKEN = process.env.API_TOKEN;
const bot = new TelegramBot(API_TOKEN);

// Set the webhook URL for your bot
bot.setWebHook(`https://bot-liart-rho.vercel.app/api/webhook`); // Replace with your Vercel URL

// Log when a POST request is received
router.post('/', (req, res) => {
    console.log('Received POST request at /api/webhook:', req.body);
    
    // Process the update using the bot instance
    bot.processUpdate(req.body);
    
    // Respond with HTTP status 200 (OK)
    res.sendStatus(200);
});

// Command handler for /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Image filename in the same folder as your script
    const imageFilename = path.join(__dirname, 'photo_6332573238504308364_x.jpg'); // Replace with your image filename

    // Create inline keyboard with web app button and Telegram channel button
    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: "Let's go",
                    web_app: { url: `https://stash-mega-airdrop.vercel.app/?t=${Date.now()}` }
                }
            ],
            [
                {
                    text: "Join Our Channel",
                    url: 'https://t.me/Stash_Airdrop'
                }
            ]
        ]
    };

    // Read the image file and send photo with caption and keyboard
    const photo = fs.readFileSync(imageFilename);
    bot.sendPhoto(chatId, photo, {
        caption: '👋 Hey there! Welcome to the Stash Coin Airdrop! 🌟Ready to claim your $50 worth of free tokens? Click the link below to visit the airdrop website and secure your stash of Stash Coins! 🔗💰',
        reply_markup: keyboard
    });
});

module.exports = router;
