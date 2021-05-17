const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Area = require("../models/Area");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const Interaction = require("../models/Interaction");
const User = require("../models/User");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/music_rs_prod", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect DB successfully !!!");

    // // crawl and insert categorys
    // crawlCategory();

    // // create area
    // createArea();

    // // crawl and insert songs and artists
    // crawlSongAndArtist();

    // //create playlist
    // createPlaylist();

    // //create user
    // createUser();

    // //create interaction
    // createInteraction();

  } catch (error) {
    console.log("Connect DB failure !!!");
  }
}

async function crawlCategory() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.nhaccuatui.com/bai-hat/bai-hat-moi.html");

  const categories = await page.evaluate(() => {
    let items = document.querySelectorAll('a[pr][rel="dofollow"]');
    let cates = [];
    items.forEach((item) => {
      cates.push({
        name: item.innerText,
      });
    });
    return cates;
  });
  await Category.insertMany(categories)
    .then(console.log("Crawl category done!"))
    .catch((err) => console.log(`ERROR: ${err}`));
  await browser.close();
}

function createArea() {
  Category.find({}, "_id")
    .sort({ _id: 1 })
    .skip(21)
    // .limit(4)
    .then((cates) => {
      const area = new Area({ name: "Khác", category: cates });
      area.save(function (err) {
        if (err) return err;
        // saved!
      });
    })
    .then(console.log("DONE"))
    .catch(console.log);
}

async function crawlSongAndArtist() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  // need changing
  await page.goto("https://www.nhaccuatui.com/bai-hat/nhac-thai-moi.11.html");

  const songUrls = await page.evaluate(() => {
    let items = document.querySelectorAll(".avatar_song");
    let links = [];
    items.forEach((item) => {
      links.push({
        url: item.getAttribute("href"),
      });
    });
    return links;
  });

  let songs = [];
  let artistUrlList = [];
  for (let songUrl of songUrls) {
    await page.goto(songUrl.url);
    let songXml = await page.evaluate(() => {
      let songHtml = {};

      //get artist url
      artistItems = document
        .querySelector("h2.name-singer")
        .querySelectorAll("a");

      let artists = [];
      artistItems.forEach((artistItem) => {
        const artistUrl = artistItem.getAttribute("href");
        artists.push(artistUrl);
      });
      songHtml.artist = artists;

      //get lyrics
      let lyrics = document.querySelector("p.pd_lyric").innerHTML;
      if (lyrics.includes("Hiện chưa có lời bài hát nào cho")) lyrics = "";
      songHtml.lyrics = lyrics;

      let item = document.querySelector("div.flash_playing + script").innerText;
      songHtml.songUrl = item.slice(
        item.search("https://www.nhaccuatui.com/flash/xml"),
        item.search(
          '";\n' +
            "                                    player.peConfig.defaultIndex"
        )
      );
      return songHtml;
    });
    artistUrlList.push(...songXml.artist);

    await page.goto(songXml.songUrl);
    let songInfo = await page.evaluate(() => {
      let song = {};

      const titleXml = document.querySelector("title").innerHTML;
      song.title = titleXml.slice(
        titleXml.lastIndexOf("[") + 1,
        titleXml.indexOf("]")
      );

      const urlXml = document.querySelector("location").innerHTML;
      song.url = urlXml.slice(
        urlXml.lastIndexOf("[") + 1,
        urlXml.indexOf("?st=")
      );

      const imageXml = document.querySelector("coverimage").innerHTML;
      imagePath = imageXml.slice(
        imageXml.lastIndexOf("[") + 1,
        imageXml.indexOf("]")
      );
      if (imagePath) {
        song.image = imagePath;
      } else {
        song.image = "/images/song-image-default/default.jpg";
      }

      const artistXml = document.querySelector("creator").innerHTML;
      song.artist = artistXml
        .slice(artistXml.lastIndexOf("[") + 1, artistXml.indexOf("]"))
        .split(", ");

      return song;
    });
    songInfo.lyrics = songXml.lyrics;
    // need changing
    songInfo.category = "607e437e9d94f224bfdb57f5";
    songs.push(songInfo);
  }

  // insert list artist
  let artistList = [];
  for (let artistUrl of artistUrlList) {
    if (artistUrl.includes("tim-kiem?q")) {
      continue;
    }
    await page.goto(artistUrl);
    let artist = await page.evaluate(() => {
      let artistInfo = {};
      artistInfo.name = document.querySelector("h1.singer-name").innerText;
      artistInfo.image = document
        .querySelector('link[rel="image_src"]')
        .getAttribute("href");
      // need changing
      artistInfo.area = "607e440b83da9625bcd71758";
      return artistInfo;
    });
    artistList.push(artist);
  }
  for (let artist of artistList) {
    const artistCheck = await Artist.findOne({ name: artist.name }).exec();
    if (artistCheck) continue;
    await Artist.create(artist).then((artist) =>
      console.log(`Crawl artist: ${artist.name} done!`)
    );
  }

  //change artist's name to _id
  for (let song of songs) {
    let artistId = [];
    for (let artistName of song.artist) {
      const artistCheck = await Artist.findOne(
        { name: artistName },
        "_id"
      ).exec();
      if (artistCheck) {
        artistId.push(artistCheck);
      }
    }
    song.artist = artistId;
  }

  // insert song
  for (let song of songs) {
    if (song.artist.length === 0) continue;
    await Song.create(song).then((song) =>
      console.log(`Crawl song: ${song.title} done!`)
    );
  }
  await browser.close();
}

function createPlaylist() {
  Category.find({}, "_id")
    .then((res) => {
      res.map((category) => {
        const titlePromise = Category.findById(
          category._id,
          "name -_id"
        ).exec();
        const songPromise = Song.aggregate([
          {
            $match: {
              category: category._id,
            },
          },
          { $project: { _id: true } },
          { $sample: { size: 10 } },
        ]).exec();
        const areaPromise = Area.find(
          {
            category: mongoose.Types.ObjectId(category._id),
          },
          "_id"
        ).exec();
        Promise.all([titlePromise, songPromise, areaPromise])
          .then((res) => {
            const playlist = new Playlist({
              title: `Những bài hát ${res[0].name.toLowerCase()} mới`,
              song: res[1],
              area: res[2][0],
            });
            playlist.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("Success!");
              }
            });
          })
          .catch((err) => console.log(err));
      });
    })
    .then(() => {
      Playlist.find({})
        .then((res) => {
          res.map((playlist) => {
            Song.findById(playlist.song[0]).then((res) => {
              playlist.image = res.image;
              playlist.save();
            });
          });
        })
        .then(() => console.log("DONE"));
    });
}

function createUser() {
  let users = [];
  for (let i = 1001; i <= 1040; i++) {
    users.push({
      username: `user${i}`,
      password: "123456",
      email: `user${i}@gmail.com`,
      role: "user",
    });
  }
  User.insertMany(users, function (err) {
    if (err) console.log(err);
    else console.log("DONE");
  });
}

function createInteraction() {
  const userPromise = User.find({ role: "user" }, "_id").exec();
  const categoryPromise = Category.find({}, "_id").exec();

  Promise.all([userPromise, categoryPromise])
    .then((result) => {
      const users = result[0];
      const categories = result[1];
      for (let cIndex = 0; cIndex < categories.length; cIndex++) {
        Song.find(
          { category: mongoose.Types.ObjectId(categories[cIndex]._id) },
          "_id"
        ).then((songs) => {
          for (let sIndex = 0; sIndex < songs.length; sIndex++) {
            for (
              let uIndex = 40 * cIndex;
              uIndex < 40 * (cIndex + 1);
              uIndex++
            ) {
              Interaction.create({
                user: users[uIndex]._id,
                song: songs[sIndex]._id,
                playing: Math.floor(Math.random() * 80 + 20),
              });
            }
          }
        });
      }
    })
    .then(() => console.log("DONE"))
    .catch((err) => console.log(err));
}

connect();
