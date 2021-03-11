import path from 'path';

let defaultScreen = (req, res) => {
    let facebookAppId = process.env.FACEBOOK_APP_ID;
    return res.render("index.html", { facebookAppId: facebookAppId });
};

let profileScreen = (req, res) => {
    let facebookAppId = process.env.FACEBOOK_APP_ID;
    return res.render("profile.html", { facebookAppId: facebookAppId });
};

let orderScreen = (req, res) => {
    let facebookAppId = process.env.FACEBOOK_APP_ID;
    return res.render("order.html", { facebookAppId: facebookAppId });
};

let conversationScreen = (req, res) => {
    let pageId = process.env.PAGE_ID;
    return res.render("conversation.html", { pageId: pageId });
}

module.exports = {
    defaultScreen: defaultScreen,
    profileScreen: profileScreen,
    orderScreen: orderScreen,
    conversationScreen: conversationScreen,
};