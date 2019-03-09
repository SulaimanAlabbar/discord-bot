const title = require("title");

const newTest = require("../bible/new-testament.json");
const oldTest = require("../bible/old-testament.json");
const mormon = require("../bible/book-of-mormon.json");
const pearl = require("../bible/pearl-of-great-price.json");
const doctrine = require("../bible/doctrine-and-covenants.json");

module.exports = async (msg, command) => {
  const badInput = () =>
    msg.channel.send(
      `${msg.member}
      ${"```"}Usage: ${
        process.env.PREFIX
      }bible <book> / <chapter number> / <verse number>\n${
        process.env.PREFIX
      }bible books
      ${"```"}`
    );

  if (command.length === 1) return badInput();

  if (command[1] === "books") {
    await msg.channel.send(
      `**Old Testament: **\n${"```"}${oldTest.bookNames.join(", ")}${"```"}`
    );
    await msg.channel.send(
      `**New Testament: **\n${"```"}${newTest.bookNames.join(", ")}${"```"}`
    );
    await msg.channel.send(
      `**Book of Mormon: **\n${"```"}${mormon.bookNames.join(", ")}${"```"}`
    );
    await msg.channel.send(
      `**Pearl of Great Price: **\n${"```"}${pearl.bookNames.join(
        ", "
      )}${"```"}`
    );
    return msg.channel.send(
      `**Doctrine and Covenants: **\n${"```"}1, 2, 3, ..., 138${"```"}`
    );
  }

  const bookAndChapterAndVerse = command
    .slice(1)
    .join(" ")
    .toLowerCase()
    .split("/")
    .map(str => str.trim());

  let verseText;

  try {
    if (bookAndChapterAndVerse.length === 2) {
      if (isNaN(bookAndChapterAndVerse[0])) return badInput();

      verseText =
        doctrine.sections[bookAndChapterAndVerse[0]] &&
        doctrine.sections[bookAndChapterAndVerse[0] - 1].verses[
          bookAndChapterAndVerse[1] - 1
        ] &&
        doctrine.sections[bookAndChapterAndVerse[0] - 1].verses[
          bookAndChapterAndVerse[1] - 1
        ].text;

      if (verseText === undefined)
        throw { name: "customError", message: "Couldn't find section/verse" };

      msg.channel.send(
        `${"**"}Bible [${bookAndChapterAndVerse[0]}:${
          bookAndChapterAndVerse[1]
        }]${"**"}\n${verseText}`
      );

      return;
    }

    if (bookAndChapterAndVerse.length !== 3) badInput();

    const book = title(bookAndChapterAndVerse[0]);
    const chapter = bookAndChapterAndVerse[1];
    const verse = bookAndChapterAndVerse[2];

    if (oldTest.bookNames.includes(book)) {
      const indexOfBook = oldTest.bookNames.indexOf(book);

      verseText =
        oldTest.books[indexOfBook] &&
        oldTest.books[indexOfBook].chapters[chapter - 1] &&
        oldTest.books[indexOfBook].chapters[chapter - 1].verses[verse - 1] &&
        oldTest.books[indexOfBook].chapters[chapter - 1].verses[verse - 1].text;
    } else if (newTest.bookNames.includes(book)) {
      const indexOfBook = newTest.bookNames.indexOf(book);

      verseText =
        newTest.books[indexOfBook] &&
        newTest.books[indexOfBook].chapters[chapter - 1] &&
        newTest.books[indexOfBook].chapters[chapter - 1].verses[verse - 1] &&
        newTest.books[indexOfBook].chapters[chapter - 1].verses[verse - 1].text;
    } else if (mormon.bookNames.includes(book)) {
      const indexOfBook = mormon.bookNames.indexOf(book);

      verseText =
        mormon.books[indexOfBook] &&
        mormon.books[indexOfBook].chapters[chapter - 1] &&
        mormon.books[indexOfBook].chapters[chapter - 1].verses[verse - 1] &&
        mormon.books[indexOfBook].chapters[chapter - 1].verses[verse - 1].text;
    } else if (pearl.bookNames.includes(book)) {
      const indexOfBook = pearl.bookNames.indexOf(book);

      verseText =
        pearl.books[indexOfBook] &&
        pearl.books[indexOfBook].chapters[chapter - 1] &&
        pearl.books[indexOfBook].chapters[chapter - 1].verses[verse - 1] &&
        pearl.books[indexOfBook].chapters[chapter - 1].verses[verse - 1].text;
    }

    if (verseText === undefined)
      throw {
        name: "customError",
        message: "Couldn't find book/chapter/verse"
      };

    msg.channel.send(
      `${"**"}Bible [${book}:${chapter}:${verse}]${"**"}\n${verseText}`
    );
  } catch (error) {
    console.log(new Date().toTimeString());
    console.log(error);
    if (error.name === "customError") msg.channel.send(error.message);
  }
};
