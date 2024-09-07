const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { LocalAuth } = require("./config/config");
const { onReady, onQr, onMessageCreate } = require("./events/eventHandlers");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
});

client.on("ready", onReady);
client.on("qr", onQr);
client.on("message_create", (msg) => onMessageCreate(client, msg));

client.initialize();
