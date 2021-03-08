import path from 'path';

const
    sourcePath = path.resolve(__dirname, '../views');

let defaultScreen = (req, res) => res.sendFile(path.join(`${sourcePath}/index.html`));

let profileScreen = (req, res) => res.sendFile(path.join(`${sourcePath}/profile.html`));

let orderScreen = (req, res) => {
    let facebookAppid = process.env.FACEBOOK_APP_ID;
    return res.sendFile(path.join(`${sourcePath}/order.html`), { facebookAppid: facebookAppid });
};

module.exports = {
    defaultScreen: defaultScreen,
    profileScreen: profileScreen,
    orderScreen: orderScreen
};