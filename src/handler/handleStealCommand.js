const handleStealCommand = async (client, msg) => {
  try {
    const quotedMsg = await msg.getQuotedMessage();

    if (!quotedMsg || !quotedMsg.hasMedia) {
      return client.sendMessage(msg.from, "Reply media nya dong");
    }

    console.log("Stealing media ...");
    const media = await quotedMsg.downloadMedia();

    await client.sendMessage(msg.from, media, {
      caption: "nahloh terbuka 😆",
    });
  } catch (error) {
    console.error("Error in handleStealCommand:", error);
  }
};

module.exports = { handleStealCommand };
