const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Area = require("../models/Area");
const Artist = require("../models/Artist");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const Interaction = require("../models/Interaction");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/music_rs_prod", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect DB successfully !!!");

    // crawl and insert categorys
    // crawlCategory();

    //create area
    //createArea();

    //crawl and insert songs and artists
    // crawlSongAndArtist();

    //create playlist
    // createPlaylist();
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
  await page.goto("https://www.nhaccuatui.com/bai-hat/nhac-hoa-moi.4.html");

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
        song.image = "./images/song-image-default/default.jpg";
      }

      const artistXml = document.querySelector("creator").innerHTML;
      song.artist = artistXml
        .slice(artistXml.lastIndexOf("[") + 1, artistXml.indexOf("]"))
        .split(", ");

      return song;
    });
    songInfo.lyrics = songXml.lyrics;
    // need changing
    songInfo.category = "607e437e9d94f224bfdb57f3";
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
  Category.find({}, "_id").then((res) => {
    res.map((category) => {
      const titlePromise = Category.findById(category._id, "name -_id").exec();
      const songPromise = Song.aggregate([
        {
          $match: {
            category: category._id,
          },
        },
        { $project: { _id: true } },
        { $sample: { size: 10 } },
      ]).exec();
      const imagePromise = Song.findOne(
        { category: category._id },
        "image -_id"
      ).exec();
      const areaPromise = Area.find(
        {
          category: mongoose.Types.ObjectId(category._id),
        },
        "_id"
      );
      Promise.all([titlePromise, songPromise, imagePromise, areaPromise])
        .then((res) => {
          const playlist = new Playlist({
            title: `Những bài hát ${res[0].name.toLowerCase()} mới`,
            song: res[1],
            image: res[2].image,
            area: res[3][0],
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
  });
}

connect();
