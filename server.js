const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()),
    initRouters = require('./routers/router');

initRouters(app);

let port = process.env.PORT || 1337;

app.listen(port, () => console.log("webhook is listening"));