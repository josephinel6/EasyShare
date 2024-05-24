const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoxSchema = new Schema({
    name: String,
    code: { type: String, unique: true },
    shares: [String],
    owner: String
});

const BoxModel = mongoose.model('Box', BoxSchema);

module.exports = BoxModel;