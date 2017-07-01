'use strict';

const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const db = require('./db.js');
const router = require('./router.js');

app
  .use(serve('./public'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
