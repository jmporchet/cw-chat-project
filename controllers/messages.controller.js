'use strict';

const Message = require('../models/message.js');
const Console = console;

const getMessages = async (ctx) => {
  ctx.body = await Message.find();
};

const getMessage = async (ctx) => {
  ctx.body = await Message.findOne({
    '_id': ctx.params.id
  });
};

const createMessage = async (ctx, next) => {
  const messageData = ctx.request.body;

  try {
    const data = await Message.create(messageData);

    Console.log('data', data);
    ctx.status = 201;
    next();
  } catch (e) {
    Console.error('err', e);
    ctx.status = 400;
  }
};

const updateMessage = async (ctx) => {
  const query = {
    '_id':ctx.params.id
  };
  Console.log(ctx.request.body);
  await Message.update(query, ctx.request.body);

  ctx.body = await Message.findOne(query);
};

const deleteMessage = async (ctx) => {
  try {
    const result = await Message.deleteOne({'_id': ctx.params.id});
    if (result.result['n'] === 0) {
      throw new Error('Message does not exist.');
    }
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      message: e.message
    };
  }
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage
};
