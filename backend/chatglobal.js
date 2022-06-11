var mongoose = require("mongoose");

Schema = mongoose.Schema;

var chatSchema = new Schema({
    username : { type: String },
    text: { type: String },
    createdAt: { type: Date, default: Date.now }
});


