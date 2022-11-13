const LnurlAuth = require('passport-lnurl-auth');
const debug = require('./utils/debug');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const app = express();

const config = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 2121,
    url: null,
};

if (!config.url) {
    config.url = 'http://' + config.host + ':' + config.port;
}

app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({ credentials: true, origin: true }));

app.use(
    session({
        secret: '12345',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const map = {
    user: new Map(),
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, map.user.get(id) || null);
});

passport.use(
    new LnurlAuth.Strategy((linkingPublicKey, done) => {
        let user = map.user.get(linkingPublicKey);
        if (!user) {
            user = { id: linkingPublicKey };
            map.user.set(linkingPublicKey, user);
        }
        done(null, user);
    })
);

app.use(passport.authenticate('lnurl-auth'));

app.get('/', async (req, res) => {
    if (!req.user) {
        return res.render('index', { title: 'Login with Lightning!' });
    }
    console.log(req.user);
    // res.render('authenticated', { title: 'Logged in', userid: req.user.id });
    // res.send(`Health check! Server running on port ${config.port}!`);
});

app.get(
    '/login',
    function (req, res, next) {
        if (req.user) {
            // Already authenticated.
            return res.redirect('/');
        }
        next();
    },
    // new LnurlAuth.Middleware({
    //     callbackUrl: 'https://lightninglogin.live/login',
    //     cancelUrl: 'https://lightninglogin.live/',
    //     loginTemplateFilePath: path.join(__dirname, 'views', 'login.html'),
    // })
);

app.get('/logout', function (req, res, next) {
    if (req.user) {
        // Already authenticated.
        req.session.destroy();
        return res.redirect('/');
    }
    next();
});

const subscription = require('./api/subscription');
app.use('/v1/subscription', subscription);

app.listen(config.port, () => {
    debug.info(`API Server listening on http://127.0.0.1:${config.port}`);
});

process.on('uncaughtException', (error) => {
    console.error(error);
});

process.on('beforeExit', (code) => {
    try {
        server.close();
    } catch (error) {
        console.error(error);
    }
    process.exit(code);
});
