import path from 'path';

const sourcePath = path.resolve(__dirname, '../views');

let defaultScreen = (req, res) => res.sendFile(path.join(`${sourcePath}/index.html`));

let profileScreen = (req, res) => res.sendFile(path.join(`${sourcePath}/profile.html`));

module.exports = {
    defaultScreen: defaultScreen,
    profileScreen: profileScreen
};