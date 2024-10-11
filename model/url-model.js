const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: { type: String, unique: true, required: true },
    redirectUrl: { type: String, required: true },
    visitHistory: [{ typeStamp: { type: Number } }]
},
    { timestamps: true }
);



const URL = mongoose.model('url', urlSchema);

module.exports = URL;