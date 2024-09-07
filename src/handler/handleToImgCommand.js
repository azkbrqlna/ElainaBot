const handleToImgCommand = async (client, msg) => {
  try {
    await msg.react("⏳");

    let media;

    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      if (quotedMsg.type !== "sticker") {
        await msg.react("❌");
      }
      media = await quotedMsg.downloadMedia();
    } else {
      media = await msg.downloadMedia();
    }

    await client.sendMessage(msg.from, media, { sendMediaAsSticker: false });

    await msg.react("✅");
  } catch (error) {
    console.log("Error in handleStickerToImageCommand:", error);
  }
};

module.exports = { handleToImgCommand };
