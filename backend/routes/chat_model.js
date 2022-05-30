var mongoose = require("mongoose");

Schema = mongoose.Schema;

var chatSchema = new Schema({
    userid: {type: userid},
    mensaje: { type: String },
    imagen: {type: String}
}); 

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;