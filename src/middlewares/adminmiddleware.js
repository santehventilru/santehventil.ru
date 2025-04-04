const { json } = require("body-parser");

function isAdmin(req, res, next) {  
    if (req.session.role === 'admin') {
        next();
    } else {
       
        res.status(403).end();
    }
}

module.exports = isAdmin;