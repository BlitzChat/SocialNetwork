var mongoose = require("mongoose");

Schema = mongoose.Schema;

var postSchema = new Schema({
  text: { type: String },
  imagen: { type: String },
  audio: { type: String },
  video: { type: String }
});

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;