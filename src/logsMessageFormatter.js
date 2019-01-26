module.exports = async msg => {
  try {
    const date = msg.createdAt;
    const timestamp = `${date.getFullYear()}/${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }/${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    }`;

    const name = msg.author.username;
    let message = msg.content;
    const userIdsInMessage = message.match(/<(@|@!)[0-9]*>/g);
    const channelIdsInMessage = message.match(/<#[0-9]*>/g);

    if (userIdsInMessage) {
      for (userId of userIdsInMessage) {
        const user = msg.client.users.get(userId.replace(/[<>@#!]/g, ""));
        if (user) message = message.replace(userId, `@${user.username}`);
      }
    }

    if (channelIdsInMessage) {
      for (channelId of channelIdsInMessage) {
        const channel = msg.client.channels.get(
          channelId.replace(/[<>@#!]/g, "")
        );
        if (channel) message = message.replace(channelId, `#${channel.name}`);
      }
    }

    return `${timestamp} | ${name}: ${message}\n`;
  } catch (error) {
    console.error(error);
  }
};
