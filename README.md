# Faris Discord Bot

A Discord bot that welcomes new members with Steins;Gate themed messages and posts weekly Friday tradition messages with random GIFs.

## Features

- **Welcome Messages**: Randomly selects from faris_welcome_messages.json and replaces {user} with member mention
- **Faris Friday**: Posts a random message from faris_friday_tradition.json with a random GIF on a schedule you choose

---

## Quick Start

### 1. Install Node.js

Make sure you have [Node.js](https://nodejs.org/) installed (v16 or higher). You can check by opening a terminal and running:
```
node --version
```
If you don't have it, download and install it from https://nodejs.org/

### 2. Install Dependencies

Double-click **`install.bat`** or run this in a terminal inside the bot folder:
```bash
npm install
```

### 3. Set Up Your `.env` File

Copy `.env.example` and rename it to `.env`, then fill in your values:

```
DISCORD_TOKEN=your_bot_token_here
OWNER_ID=your_discord_user_id_here
CHANNEL_ID=your_channel_id_here
FRIDAY_TIME=8:00 AM
TIMEZONE=America/Chicago
```

Here's what each line means:

| Setting | What to put | How to find it |
|---|---|---|
| `DISCORD_TOKEN` | Your bot's token | Discord Developer Portal → Your App → Bot → Token |
| `OWNER_ID` | Your Discord user ID | Enable Developer Mode in Discord settings, then right-click your name → Copy User ID |
| `CHANNEL_ID` | The channel ID where the bot sends messages | Right-click the channel → Copy Channel ID |
| `FRIDAY_TIME` | What time the Friday message should be sent | Just type a normal time like `8:00 AM` or `2:30 PM` |
| `TIMEZONE` | Your timezone | Pick one from the list below |

#### Pick Your Timezone

| If you live in... | Use this |
|---|---|
| US Eastern (New York, Florida, etc.) | `America/New_York` |
| US Central (Chicago, Texas, etc.) | `America/Chicago` |
| US Mountain (Denver, Arizona, etc.) | `America/Denver` |
| US Pacific (Los Angeles, Seattle, etc.) | `America/Los_Angeles` |
| UK | `Europe/London` |
| Japan | `Asia/Tokyo` |

### 4. Set Up the Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application and go to the **Bot** section
3. Copy the token and paste it into your `.env` file
4. Under **Privileged Gateway Intents**, enable:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
5. Go to **OAuth2 → URL Generator**:
   - Check **bot** under Scopes
   - Check these permissions: Send Messages, Attach Files, Read Message History
   - Copy the generated URL and open it to invite the bot to your server

### 5. Run the Bot

Double-click **`run.bat`** or run in a terminal:
```bash
node bot.js
```

You should see:
```
Logged in as YourBotName#1234!
```

### 6. Test It

In the channel you set, type:
- `!test welcome` — sends a random welcome message
- `!test friday` — sends a random Friday tradition message with a GIF

Only the user matching your `OWNER_ID` can use these test commands.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Bot doesn't respond | Make sure `CHANNEL_ID` is correct and the bot has permissions in that channel |
| "Cannot find module" error | Run `install.bat` again |
| Bot goes offline | The terminal running it was closed — the bot only runs while the terminal is open |
| No GIFs showing up | Make sure the `Faris Gif/` folder has .gif, .png, .jpg, or .jpeg files |

## File Structure

```
├── bot.js                          # Main bot file
├── install.bat                     # Double-click to install dependencies
├── run.bat                         # Double-click to start the bot
├── package.json                    # Dependencies
├── faris_welcome_messages.json     # Welcome messages with {user} placeholder
├── faris_friday_tradition.json     # Friday tradition messages
├── Faris Gif/                      # Folder containing GIF files
├── .env.example                    # Environment variables template
└── README.md                       # This file
```
