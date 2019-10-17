module.exports = level => {
  const emojiNumbers = [
    ":zero:",
    ":one:",
    ":two:",
    ":three:",
    ":four:",
    ":five:",
    ":six:",
    ":seven:",
    ":eight:",
    ":nine:"
  ];

  let levelEmoji = "";
  level
    .toString()
    .split("")
    .forEach(el => {
      levelEmoji = levelEmoji.concat(emojiNumbers[Number(el)]);
    });

  return `:regional_indicator_l::regional_indicator_e::regional_indicator_v::regional_indicator_e::regional_indicator_l:${levelEmoji}`;
};
