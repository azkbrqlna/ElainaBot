const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message_create", async (msg) => {
  try {
    if (msg.body === ".steal") {
      const quotedMsg = await msg.getQuotedMessage();

      if (quotedMsg.hasMedia) {
        console.log("stealing media ...");
        const media = await quotedMsg.downloadMedia();

        await client.sendMessage(msg.from, media, {
          caption: "nahloh terbuka 😆",
        });
      } else {
        console.log("Media tidak ditemukan");
        await client.sendMessage(
          msg.from,
          "Media tidak ditemukan. Coba kirim pesan orangnya"
        );
      }
    } else if (msg.body.startsWith(".stiker") && msg.type === "image") {
      client.sendMessage(msg.from, "⏳ tunggu sebentar...");
      try {
        const media = await msg.downloadMedia();
        client.sendMessage(msg.from, media, {
          sendMediaAsSticker: true,
          stickerAuthor: "@azkbrqlnaaa_",
        });
      } catch (error) {
        console.log(err);
        client.sendMessage(msg.from, "❌ maaf stiker gagal diproses");
      }
    } else if (msg.body === ".gambar") {
      const media = MessageMedia.fromFilePath("./src/images/Elaina.jpg");
      await client.sendMessage(msg.from, media, {
        caption: "ini gambar Elaina",
      });
    }
  } catch (error) {
    console.error("Error handling message: ", error);
    await client.sendMessage(
      msg.from,
      "An error occurred. Please try again later."
    );
  }
});

client.initialize();
