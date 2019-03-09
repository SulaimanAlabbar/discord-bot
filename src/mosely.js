module.exports = msg => {
  const messageContent = msg.content.toLowerCase().replace(/[^a-zA-Z]/g, "");
  if (
    messageContent.includes("nigger") ||
    messageContent.includes("niggers") ||
    messageContent.includes("coon") ||
    messageContent.includes("monkey") ||
    messageContent.includes("chimp")
  )
    msg.react("🥀");
};
