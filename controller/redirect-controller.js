const URL = require('../model/url-model')

const handleRedirection = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { typeStamp: Date.now() }
        }
    })
    res.redirect(entry.redirectUrl);
}

module.exports = { handleRedirection };