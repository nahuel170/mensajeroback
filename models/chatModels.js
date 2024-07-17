const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    room:String,
    author:String,
    message:String,
    timestamp: {type: Date, default:Date.now}
})
const Message = model('Message',messageSchema);