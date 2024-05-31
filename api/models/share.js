const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShareSchema = new Schema({
    share: String,
    code: { type: String }
});

const ShareModel = mongoose.model('Share', ShareSchema);

module.exports = ShareModel;