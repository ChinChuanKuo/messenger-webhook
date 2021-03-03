const
    path = require('path'),
    express = require('express'),
    sourcePath = path.resolve(__dirname, '../views'),
    webhook = require('../controllers/webhookController');

let router = express.Router();

let initRouters = app => {
    console.log(sourcePath);
    router.get('/', (req, res) => res.sendFile(path.join(`${sourcePath}/index.html`)));
    router.post('/webhook', webhook.postWebhook);
    router.get('/webhook', webhook.getWebhook);
    return app.use("/", router);
};

module.exports = initRouters;