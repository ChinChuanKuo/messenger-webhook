import express from 'express';
import bodyParser from 'body-parser';
import initRouters from './routers/router';

const app = express().use(bodyParser.json());

initRouters(app);

let port = process.env.PORT || 1337;

app.listen(port, () => console.log("webhook is listening"));