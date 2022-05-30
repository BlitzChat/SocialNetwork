var mongoose = require("mongoose");

Schema = mongoose.Schema;

var userSchema = new Schema({
  nombre: { type: String },
  username: { type: String },
  password: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;