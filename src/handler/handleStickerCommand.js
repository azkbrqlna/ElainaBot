const handleStickerCommand = async (client, msg) => {
  try {
    await msg.react("⏳");

    let media;

    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      if (!quotedMsg.hasMedia) {
        await msg.react("❌");
      }
      media = await quotedMsg.downloadMedia();
    } else {
      media = await msg.downloadMedia();
    }

    if (media) {
      await client.sendMessage(msg.from, media, {
        sendMediaAsSticker: true,
        stickerAuthor: "@azkbrqlnaaa_",
      });
      await msg.react("✅");
    } else {
      await msg.react("❌");
    }
  } catch (error) {
    console.log("Error in handleStickerCommand:", error);
  }
};

module.exports = { handleStickerCommand };
