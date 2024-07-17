const mongoose = require('mongoose');
const Schema = require('mongoose');

const MessageSchema = new Schema({
    room: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    });
module.exports= mongoose.model('Message',MessageSchema);