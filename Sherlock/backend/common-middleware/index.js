const passport = require("passport");

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: true, message: 'Not authorized' });
}

module.exports = isAuthenticated;