import path from 'path';
import express from "express";

let configViewEngine = (app) => {
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.set("views", path.resolve(__dirname, '../views'));
    app.engine('html', require('ejs').renderFile);
    app.set("view engine", "html");
};

module.exports = configViewEngine;