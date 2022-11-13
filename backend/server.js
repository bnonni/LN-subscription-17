const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 2121;
const debug = require('./utils/debug');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(
    express.text({
        type: () => {
            return { text: 'text' };
        },
    })
);

app.get('/', async (req, res) => {
    res.send(`Health check! Server running on port ${PORT}!`);
});

const subscription = require('./api/subscription');
app.use('/v1/subscription', subscription);

app.listen(PORT, () => {
    debug.info(`API Server listening on http://127.0.0.1:${PORT}`);
});
