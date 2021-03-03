const
    path = require('path'),
    express = require('express'),
    webhook = require('../controllers/webhookController');

let router = express.Router();

let initRouters = app => {
    router.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/views/index.html`)));
    router.post('/webhook', webhook.postWebhook);
    router.get('/webhook', webhook.getWebhook);
    return app.use("/", router);
};

module.exports = initRouters;