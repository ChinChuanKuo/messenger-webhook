import express from 'express';
import screen from '../controllers/screenController';
import message from '../controllers/messageController';
import profile from '../controllers/profileController';

let router = express.Router();

let initialRouters = app => {
    router.get('/', screen.defaultScreen);
    router.get('/profile', screen.profileScreen)
    router.get('/message', message.handleGetMessage);
    router.post('/message', message.handlePostMessage);
    router.post('/set_up_profile', profile.handleSetupProfile);
    return app.use("/", router);
};

module.exports = initialRouters;