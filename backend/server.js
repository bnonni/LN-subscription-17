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
            'You are not authenticated. To login go <a href="/login">here</a>.'
        );
    }
    res.send('Logged-in');
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
    }
    // new LnurlAuth.Middleware({
    //     callbackUrl: 'https://lightninglogin.live/login',
    //     cancelUrl: 'https://lightninglogin.live/',
    //     loginTemplateFilePath: path.join(__dirname, 'views', 'login.html'),
    // })
);

app.get(
    '/login',
    function (req, res, next) {
        if (req.user) {
            return res.redirect('/');
        }
        next();
    },
    new LnurlAuth.Middleware({
        // The externally reachable URL for the lnurl-auth middleware.
        // It should resolve to THIS endpoint on your server.
        callbackUrl: 'https://lightninglogin.live/login',
        // The URL of the "Cancel" button on the login page.
        // When set to NULL or some other falsey value, the cancel button will be hidden.
        cancelUrl: 'https://lightninglogin.live/',
        // Instruction text shown below the title on the login page:
        instruction: 'Scan the QR code to login',
        // The file path to the login.html template:
        loginTemplateFilePath: path.join(
            path.dirname(require.main.path),
            'views',
            'login.html'
        ),
        // The number of seconds to wait before refreshing the login page:
        refreshSeconds: 5,
        // The title of the login page:
        title: 'Login with lnurl-auth',
        // The URI schema prefix used before the encoded LNURL.
        // e.g. "lightning:" or "LIGHTNING:" or "" (empty-string)
        uriSchemaPrefix: 'LIGHTNING:',
        // Options object passed to QRCode.toDataURL(data, options) - for further details:
        // https://github.com/soldair/node-qrcode/#qr-code-options
        qrcode: {
            errorCorrectionLevel: 'L',
            margin: 2,
            type: 'image/png',
        },
    })
);

// app.get('/logout', function (req, res, next) {
//     if (req.user) {
//         // Already authenticated.
//         req.session.destroy();
//         return res.redirect('/');
//     }
//     next();
// });

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
