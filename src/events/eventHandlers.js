const qrcode = require("qrcode-terminal");
const {
  handleMenuCommand,
  handleStickerCommand,
  handleStealCommand,
  handleHideTagCommand,
  handleToImgCommand,
  handleBuffCommand,
} = require("../utils/index");

const onReady = () => {
  console.log("Client is ready!");
};

const onQr = (qr) => {
  qrcode.generate(qr, { small: true });
};

const onMessageCreate = async (client, msg) => {
  try {
    if (msg.body === ".steal") {
      await handleStealCommand(client, msg);
    } else if (msg.body === ".hidetag") {
      await handleHideTagCommand(client, msg);
    } else if (
      msg.body.startsWith(".stiker") &&
      (msg.hasQuotedMsg || msg.type === "image")
    ) {
      await handleStickerCommand(client, msg);
    } else if (msg.body === ".menu") {
      await handleMenuCommand(msg);
    } else if (msg.body === ".toimg") {
      await handleToImgCommand(client, msg);
    } else if (msg.body === ".buff") {
      await handleBuffCommand(msg);
    }
  } catch (error) {
    console.error("Error handling message: ", error);
    await client.sendMessage(msg.from, "Maaf ada kesalahan. Coba lagi nanti");
  }
};

module.exports = {
  onReady,
  onQr,
  onMessageCreate,
};
