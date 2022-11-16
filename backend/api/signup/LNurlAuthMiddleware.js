
const LNurlAuthLoginSignup = async (req, res, next) => {
    if (req.user) return res.redirect('/');
    next();
};

const LNurlAuthLogout = async (req, res, next) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect('/');
    }
    next();
}

module.exports = { LNurlAuthLoginSignup, LNurlAuthLogout };
