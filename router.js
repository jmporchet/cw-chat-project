const Router = require('koa-router');
const messagesController = require('./controllers/messages.controller');

const router = new Router();

router
  .get('/messages', messagesController.getMessages)
  .get('/messages/:id', messagesController.getMessage)
  .post('/messages', messagesController.createMessage)
  .put('/messages/:id', messagesController.updateMessage)
  .delete('/messages/:id', messagesController.deleteMessage);


module.exports = router;
