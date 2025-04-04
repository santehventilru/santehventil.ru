function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).end()
        // res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = isAuthenticated;