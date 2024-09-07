const handleHideTagCommand = async (client, msg) => {
  try {
    const chat = await msg.getChat();
    if (!chat.isGroup) {
      return msg.reply("Hanya bisa digunakan di grub");
    }

    const senderId = msg.author || msg.from;
    const isAdmin = chat.participants.some(
      (participant) =>
        participant.id._serialized === senderId && participant.isAdmin
    );

    if (!isAdmin) {
      return msg.reply("Hanya Atmint yang bisa Nyahahaha");
    }

    let messageContent = "Summon penghuni grub!";
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      if (quotedMsg) {
        messageContent = quotedMsg.body;
      }
    }

    const mentions = chat.participants.map((p) => p.id._serialized);

    await chat.sendMessage(messageContent, { mentions });
  } catch (error) {
    console.error("Error in handleHideTagCommand:", error);
  }
};

module.exports = { handleHideTagCommand };
