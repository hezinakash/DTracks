const Serach = require("../models/search");

const getTopTen = cb => {
  Serach.find({})
    .sort({ count: -1 })
    .limit(25)
    .select("-_id  query")
    .exec((err, data) => {
      if (err) {
        console.log(`Top 10 error: ${err}`);
        return cb(null);
      } else {
        return cb(data.map(item => item.query));
      }
    });
};

const add = (query, cb) => {
  const lowerCaseQuery = query.toLowerCase();
  Serach.findOneAndUpdate(
    { query: lowerCaseQuery },
    { $inc: { count: 1 } },
    { upsert: true },
    (err, res) => {
      if (err) {
        console.log(`Add or update error: ${err}`);
        return cb(false);
      } else {
        return cb(true);
      }
    }
  );
};

module.exports.getTopTen = getTopTen;
module.exports.add = add;
