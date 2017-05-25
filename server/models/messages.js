let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MessageSchema = new Schema({
  message: {type: String, required:true},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
}, {timestamps: true});

mongoose.model('Message', MessageSchema);
