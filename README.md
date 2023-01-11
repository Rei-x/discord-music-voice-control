# Discord Alexa Bot

Speech recognition bot for playing music, imitates Amazon Alexa.

## Installation

1. Clone this repo and cd into it

```sh
git clone https://github.com/Rei-x/discord-alexa
cd discord-alexa
```

2. Create `config.json` file with bot token (check `config.json.example`)
3. Install dependencies

```sh
npm install
```

## Bot setup
You need to enable message content for bot, so it can react to messages in chat (like `?join`).

![](https://i.imgur.com/06doHXE.png)

## How to run it?

```sh
npm start
```

You should see "Ready!" in the console, if everything went correctly.
Enter voice channel and type `?join` in text channel and bot should join.

Try to say `Alexa play despacito` and bot will play music!

To skip music say `Alexa skip`
