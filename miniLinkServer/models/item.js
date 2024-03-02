const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  longURL: {type:String},
  miniLink: {type:String},
  // location:String,
  // school: String,
});

module.exports = mongoose.model("item", itemSchema);
//item is changed to items which is collection name