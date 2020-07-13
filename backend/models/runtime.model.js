const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    sort: {
        type: String,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    sortsize: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Posts', PostSchema);