const mongoose = require('mongoose');
const Schema = require('mongoose');

const MessageSchema = new Schema({
    room:String,
    author:String,
    message:String,
    timestamp: {type: Date, default:Date.now}
})
module.exports= mongoose.model('Message',MessageSchema);