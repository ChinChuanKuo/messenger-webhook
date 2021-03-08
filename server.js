require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine';
import initialRouters from './routers/router';

const app = express().use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initialRouters(app);

let port = process.env.PORT || 1337;

app.listen(port, () => console.log(`webhook is listening to ${port}`));