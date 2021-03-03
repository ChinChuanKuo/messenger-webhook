import path from 'path';
import express from 'express';
import webhook from '../controllers/webhookController';

const sourcePath = path.resolve(__dirname, '../views');

let router = express.Router();

let initRouters = app => {
    router.get('/', (req, res) => res.sendFile(path.join(`${sourcePath}/index.html`)));
    router.post('/webhook', webhook.postWebhook);
    router.get('/webhook', webhook.getWebhook);
    return app.use("/", router);
};

module.exports = initRouters;