const newTest = require("../bible/new-testament.json");
const oldTest = require("../bible/old-testament.json");
const mormon = require("../bible/book-of-mormon.json");
const pearl = require("../bible/pearl-of-great-price.json");
const doctrine = require("../bible/doctrine-and-covenants.json");

module.exports = async (msg, command) => {
  // if (command.length === 1)
  //   return msg.channel.send(
  //     `${process.env.PREFIX}bible <book> / <chapter number> / <verse number>\n${
  //       process.env.PREFIX
  //     }bible books`
  //   );
  // if (command[1] === "books") {
  //   await msg.channel.send(
  //     `**Old Testament: **\n${"```"}${oldTest.bookNames.join(" \n")}${"```"}`
  //   );
  //   await msg.channel.send(
  //     `**New Testament: **\n${"```"}${newTest.bookNames.join(" \n")}${"```"}`
  //   );
  //   await msg.channel.send(
  //     `**Book of Mormon: **\n${"```"}${mormon.bookNames.join(" \n")}${"```"}`
  //   );
  //   await msg.channel.send(
  //     `**Pearl of Great Price: **\n${"```"}${pearl.bookNames.join(
  //       " \n"
  //     )}${"```"}`
  //   );
  //   return msg.channel.send(
  //     `**Doctrine and Covenants: **\n${"```"}1, 2, 3, ..., 138${"```"}`
  //   );
  // }
  // const bookAndChapterAndVerse = command
  //   .slice(1)
  //   .join(" ")
  //   .split("/")
  //   .map(str => str.trim());
  // if (bookAndChapterAndVerse.length !== 3)
  //   return msg.channel.send(
  //     `${process.env.PREFIX}bible <book> / <chapter number> / <verse number>\n${
  //       process.env.PREFIX
  //     }bible books`
  //   );
  // const book = bookAndChapterAndVerse[0];
  // const chapter = bookAndChapterAndVerse[1];
  // const verse = bookAndChapterAndVerse[2];
  // if (!isNaN(book) || isNaN(chapter) || isNaN(verse))
  //   return msg.channel.send(
  //     `${process.env.PREFIX}bible <book> / <chapter number> / <verse number>\n${
  //       process.env.PREFIX
  //     }bible books`
  //   );
  // try {
  //   let response;
  //   if (
  //     oldTest.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     ) !== -1
  //   ) {
  //     const index = oldTest.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     );
  //     response =
  //       `**${oldTest.books[index].book} ${newProps[1]}:${newProps[2]}**\n` +
  //       oldTest.books[index].chapters[newProps[1] - 1].verses[newProps[2] - 1]
  //         .text;
  //   } else if (
  //     newTest.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     ) !== -1
  //   ) {
  //     const index = newTest.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     );
  //     response =
  //       `**${newTest.books[index].book} ${newProps[1]}:${newProps[2]}**\n` +
  //       newTest.books[index].chapters[newProps[1] - 1].verses[newProps[2] - 1]
  //         .text;
  //   } else if (
  //     mormon.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     ) !== -1
  //   ) {
  //     const index = mormon.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     );
  //     response =
  //       `**${mormon.books[index].book} ${newProps[1]}:${newProps[2]}**\n` +
  //       mormon.books[index].chapters[newProps[1] - 1].verses[newProps[2] - 1]
  //         .text;
  //   } else if (
  //     pearl.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     ) !== -1
  //   ) {
  //     const index = pearl.bookNames.findIndex(
  //       book => book.toLowerCase() === newProps[0].toLowerCase().trim()
  //     );
  //     response =
  //       `**${pearl.books[index].book} ${newProps[1]}:${newProps[2]}**\n` +
  //       pearl.books[index].chapters[newProps[1] - 1].verses[newProps[2] - 1]
  //         .text;
  //   } else if (doctrine.sections.length > newProps[0] && newProps[0] > 0) {
  //     if (
  //       doctrine.sections[newProps[0] - 1].verses.length > newProps[1] &&
  //       newProps[1] > 0
  //     )
  //       throw error;
  //     response =
  //       `**${newProps[0]}:${newProps[1]}**\n` +
  //       doctrine.sections[newProps[0] - 1].verses[newProps[1] - 1].text;
  //   } else throw error;
  //   await msg.channel.send(response);
  // } catch (error) {
  //   console.log(new Date().toTimeString());
  //   console.log(error);
  //   await msg.channel.send("Couldn't find book/chapter/verse");
  // }
};
