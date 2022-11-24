
const lnurlAuthIn = async (req, res, next) => {
    if (req.user) return res.redirect('/');
    next();
};

const lnurlAuthOut = async (req, res, next) => {
    if (req.user) {
        req.session.destroy();
        return res.redirect('http://127.0.0.1:3000/');
    }
    next();
}

module.exports = { lnurlAuthIn, lnurlAuthOut };
