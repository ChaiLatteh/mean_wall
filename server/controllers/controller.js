var mongoose = require('mongoose');

var User = mongoose.model("User");
var Message = mongoose.model("Message");
var Comment = mongoose.model("Comment");

module.exports = {
  loginReg: (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if(user == null){
        let newUser = new User(req.body);
        newUser.save( (err, savedUser) =>{
          if(err){
            console.log(err);
            return res.sendStatus(500);
          }
          else{
            req.session.user = savedUser;
            return res.json(savedUser);
          }
        })
      }
      else{
        req.session.user = user;
        return res.json(user);
      }
      console.log(req.session.user);
    })
  },
  getUsers: (req, res) => {
    User.find({}).populate('users').exec((err,users)=>{
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      else{
        return res.json(users);
      }
    })
  },
  getMessages: (req, res) =>{
    Message.find({}).populate('_user').populate({path:'comments', populate: {path: '_user'}}).exec( (err, messages) => {
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      else{
        return res.json(messages);
      }
    })
  },
  createMessage: (req, res) => {
    if(!req.session.user){
      return res.sendStatus(401);
    }
    let message = new Message(req.body);
    message._user = req.session.user._id;
    message.save((err, newMessage) => {
      if(err){
        console.log(err);
      }
      else{
        res.json(newMessage);
      }
    })
  },
  createComment: (req, res) => {
    if(!req.session.user){
      return res.sendStatus(401);
    }
    Message.findOne({_id: req.params.message_id}, (err, message) => {
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      else{
        let comment = new Comment(req.body);
        comment._user = req.session.user._id;
        comment.save( (err, savedComment) => {
          if(err){
            console.log(err);
            return;
          }
          else{
            message.comments.push(savedComment);
            message.save( (err, savedMessage) => {
              if(err){
                console.log(err);
                return;
              }
              else{
                return res.json(savedMessage);
              }
            })
          }
        })
      }
    })
  },
  getCurrentUser: (req, res) => {
    if(!req.session.user){
      return res.status(401).send("No user in session");
    }
    else{
      return res.json(req.session.user);
    }
  },
  deleteMessage: (req, res) =>{
    if(!req.session.user){
      return res.status(401).send("No user in session");
    }
    Message.remove({_id: req.params.message_id}, (err, data) =>{
      if(err){
        console.log(err);
        return res.status(500).send("Error deleting message");
      }
      else{
        return res.json(data);
      }
    })
  },
  // new method
}
