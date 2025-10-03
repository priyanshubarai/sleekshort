const mongoose = require('mongoose')

const UrlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', UrlSchema);