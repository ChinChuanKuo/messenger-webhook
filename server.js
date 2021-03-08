require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import initialRouters from './routers/router';

const app = express().use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
initialRouters(app);

let port = process.env.PORT || 1337;

app.listen(port, () => console.log(`webhook is listening to ${port}`));