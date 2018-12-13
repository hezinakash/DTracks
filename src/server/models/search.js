const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchSchema = new Schema(
  {
    query: String,
    count: Number
  },
  { versionKey: false }
);

const Search = mongoose.model("search", SearchSchema);

module.exports = Search;
