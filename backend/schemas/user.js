var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  nombre: { type: String },
  username: { type: String },
  password: { type: String },
});

var postsSchema = new Schema({
    userid: {type: userid},
    texto: { type: String },
    audio: { type: String },
    video: { type: String },
  });

var chatSchema = new Schema({
userid: {type: userid},
mensaje: { type: String },
});


module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("Posts", postsSchema);
module.exports = mongoose.model("Chat", chatSchema);