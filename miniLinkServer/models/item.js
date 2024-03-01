const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {type:String},
  age: {type:String},
  // location:String,
  // school: String,
});

module.exports = mongoose.model("item", itemSchema);
//item is changed to items which is collection name