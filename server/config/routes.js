var controller = require('../controllers/controller');

module.exports = app => {
  app.post('/api/login', controller.loginReg);
  app.get('/api/users', controller.getUsers);
  app.get('/api/messages', controller.getMessages);
  app.post('/api/messages', controller.createMessage);
  app.delete('/api/messages/delete/:message_id', controller.deleteMessage);
  app.post('/api/comments/:message_id', controller.createComment);
  app.get('/api/current', controller.getCurrentUser);
}
