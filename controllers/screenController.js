import path from 'path';

const sourcePath = path.resolve(__dirname, '../views');

let defaultScreen = (req, res) => res.sendFile(path.join(`${sourcePath}/index.html`));

module.exports = {
    defaultScreen: defaultScreen
};