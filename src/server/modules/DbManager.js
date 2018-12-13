const monogoose = require("mongoose");

const connectToDB = cb => {
  monogoose.connect("mongodb://localhost/ituns");
  monogoose.connection
    .once("open", () => {
      return cb(true);
    })
    .on("error", error => {
      console.log(`DB connection error: ${error}`);
    });
};

module.exports.connectToDB = connectToDB;
