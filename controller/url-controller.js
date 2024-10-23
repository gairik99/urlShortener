
const URL = require('../model/url-model')

const handleGenerateNewUrl = async (req, res) => {
    const body = req.body;
    if (!body.url)
        return res.status(400).json({ error: 'please add an url' });
    const { nanoid } = await import('nanoid');
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    return res.render('home', { id: shortID });
}
const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewUrl, handleGetAnalytics
}