const {
    sendStatus
} = require("express/lib/response");
const async = require("hbs/lib/async");
const Session = require("../model/session.model");
const User = require("../model/user.model");
const isLogin = async (req, res, next) => {
    try {
        if (!req.cookies.session) {
            return res.sendStatus(401);
        }



        const session = await Session.findOne({
            session: req.cookies.session
        }).populate("user", "_id role isActive");
        if (!session) {
            return res.sendStatus(401);
        }
        req.user = session.user;
        return next();


    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }


}


module.exports = isLogin;