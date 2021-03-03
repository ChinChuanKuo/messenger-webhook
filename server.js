import express from 'express';
import bodyParser from 'body-parser';
import initialRouters from './routers/router';

const app = express().use(bodyParser.json());

initialRouters(app);

let port = process.env.PORT || 1337;

app.listen(port, () => console.log(`webhook is listening to ${port}`));