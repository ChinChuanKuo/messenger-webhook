import express from 'express';
import screen from '../controllers/screenController';
import webhook from '../controllers/webhookController';

let router = express.Router();

let initialRouters = app => {
    router.get('/', screen.defaultScreen);
    router.post('/webhook', webhook.postWebhook);
    router.get('/webhook', webhook.getWebhook);
    return app.use("/", router);
};

module.exports = initialRouters;