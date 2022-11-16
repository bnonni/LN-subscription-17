
const lnurlAuthIn = async (req, res, next) => {
    if (req.user) return res.redirect('/');
    next();
};

const lnurlAuthOut = async (req, res, next) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect('/');
    }
    next();
}

module.exports = { lnurlAuthIn, lnurlAuthOut };
