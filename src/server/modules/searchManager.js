const Serach = require("../models/search");

const getTopTen = cb => {
  Serach.find({}, (err, data) => {
    if (data && data.length <= 10) {
      return cb(getQueries(data));
    } else if (data && data.length > 10) {
      searches = getTen(data);
      return cb(getQueries(searches));
    } else {
      return cb(null);
    }
  });
};

const add = (query, cb) => {
  const lowerCaseQuery = query.toLowerCase();
  Serach.findOne({ query: lowerCaseQuery }, (err, res) => {
    if (res) {
      update(res, cb);
    } else {
      create(lowerCaseQuery, cb);
    }
  });
};

const getQueries = searches => {
  return searches.map(search => {
    return search.query;
  });
};

const getTen = searches => {
  return searches
    .sort((a, b) => {
      return a.count >= b.count ? a : b;
    })
    .splice(0, 9);
};

const update = (search, cb) => {
  search.count++;
  search.save().then(() => {
    return cb(!newSearch.isNew);
  });
};

const create = query => {
  const newSearch = new Serach({
    query: query,
    count: 1
  });

  newSearch.save().then(() => {
    return cb(!newSearch.isNew);
  });
};

module.exports.getTopTen = getTopTen;
module.exports.add = add;
