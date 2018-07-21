import config from "./config/config.json";
import { User, Product } from "./models";
import Importer from "./importer/Importer.js";
import DirWatcher from './dirwatcher/DirWatcher.js';
import router from './routes/router.js';
const express = require('express');
import cookieParser from './middlewares/cookieParser.js';
import queryParser from './middlewares/queryParser.js'
const cookieParserImp = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParserImp());
app.use(bodyParser());
app.use(function (req, res, next) {
  req
  cookieParser(req);
  next()
},
function (req, res, next) {
 queryParser(req);
  next()
},
)
app.use('/', router);
export default app




