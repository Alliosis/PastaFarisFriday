# Faris Discord Bot

A Discord bot that welcomes new members with Steins;Gate themed messages and posts weekly Friday tradition messages with random GIFs.

## Features

- **Welcome Messages**: Randomly selects from faris_welcome_messages.json and replaces {user} with member mention
- **Faris Friday**: Every Friday at 9 AM EST, posts a random message from faris_friday_tradition.json with a random GIF

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```

3. Make sure you have:
   - `faris_welcome_messages.json`
   - `faris_friday_tradition.json` 
   - `Faris Gif/` folder with GIF/image files

## Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the token to your `.env` file
5. Under "Privileged Gateway Intents", enable:
   - Server Members Intent
   - Message Content Intent

## Bot Permissions

The bot needs these permissions:
- Send Messages
- Attach Files
- Read Message History
- Use Slash Commands

## Deployment on Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variable: `DISCORD_TOKEN`
6. Deploy

## Running Locally

```bash
npm run dev
```

## File Structure

```
├── bot.js                          # Main bot file
├── package.json                    # Dependencies
├── faris_welcome_messages.json     # Welcome messages with {user} placeholder
├── faris_friday_tradition.json     # Friday tradition messages
├── Faris Gif/                      # Folder containing GIF files
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

The bot will automatically send Friday messages every Friday at 9 AM EST and welcome new members when they join.
