const fs = require("fs");
const { parseAsync } = require("json2csv");
const schedule = require("node-schedule");
const Interaction = require("../../models/Interaction");
const Song = require("../../models/Song");

class Schedule {
  updateRecommendationData = () => {
    // run at 55th minute
    const rule = new schedule.RecurrenceRule();
    rule.minute = 55;
    rule.tz = "Asia/Ho_Chi_Minh";
    const job = schedule.scheduleJob(rule, (fireDate) => {
      const iPromise = Interaction.find({}, "user song playing -_id")
        .lean()
        .exec();
      const sPromise = Song.find({}, "_id title").lean().exec();
      Promise.all([iPromise, sPromise]).then((result) => {
        parseAsync(result[0]).then((csv) => {
          fs.writeFile(
            `${process.env.RECOMMEND_URI}/data/interactions.csv`,
            csv,
            (err) => {
              if (err) return console.log(err);
            }
          );
        });
        parseAsync(result[1])
          .then((csv) => {
            fs.writeFile(
              `${process.env.RECOMMEND_URI}/data/songs.csv`,
              csv,
              (err) => {
                if (err) return console.log(err);
              }
            );
          })

          .catch(console.log);
      });
      console.log(`Update recommendation data at ${fireDate}`);
    });
  };

  updateCountForChart = () => {
    // run at 23h55 in Sunday
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = 0;
    rule.dayOfWeek = 23;
    rule.minute = 55;
    rule.tz = "Asia/Ho_Chi_Minh";
    const job = schedule.scheduleJob(rule, (fireDate) => {
      Song.find({})
        .then((songs) => {
          for (let song of songs) {
            song.chartcount = song.playing - song.prevcount;
            song.prevcount = song.playing;
            song.save().catch(console.log);
          }
        })
        .catch(console.log);
      console.log(`Update count for chart at ${fireDate}`);
    });
  };
}

module.exports = new Schedule();
