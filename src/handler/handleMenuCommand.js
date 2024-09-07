const handleMenuCommand = async (msg) => {
  try {
    return msg.reply(`
*Silahkan dapat memilih menu di bawah:*
created by @azkbrqlnaaa_

*>>>MENU ATMINT GRUB<<<*
💠.hidetag = tag semua member

*>>>MENU TORAM ONNLINE<<<*
💠.buff = menampilkan kode buff

*>>MENU MEDIA<<<*
💠.steal = antiprivat
💠.stiker = bikin stiker
💠.toimg = stiker ke image
`);
  } catch (error) {
    console.error("Error in menuHandlerCommand:", error);
  }
};

module.exports = { handleMenuCommand };
