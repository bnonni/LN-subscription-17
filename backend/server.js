require('dotenv').config({ path: './.env' });

const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const debug = require('./utils/debug');
const LnurlAuth = require('passport-lnurl-auth');
const passport = require('passport');
const path = require('path');

const app = express();

const config = {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 2121,
        url: null,
    },
    sessionConfig = {
        secret: '12345',
        resave: false,
        saveUninitialized: true,
    },
    userMap = {
        user: new Map(),
    };

if (!config.url) config.url = 'http://' + config.host + ':' + config.port;

process.env.URL = config.url;

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, 'public')));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, userMap.user.get(id) || null);
});

passport.use(
    new LnurlAuth.Strategy((linkingPublicKey, done) => {
        let user = userMap.user.get(linkingPublicKey);
        if (!user) {
            user = { id: linkingPublicKey };
            userMap.user.set(linkingPublicKey, user);
        }
        done(null, user);
    })
);

app.use(passport.authenticate('lnurl-auth'));

app.get('/', async (req, res) => {
    if (!req.user) {
        return res.send(
            'You are not authenticated. To login go <a href="/v1/signup/lnurl">here</a>.'
        );
    }
    res.redirect('http://127.0.0.1:3000/dashboard');
});

app.use('/v1', require('./api'));

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
