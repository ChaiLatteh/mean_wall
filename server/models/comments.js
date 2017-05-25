let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CommentSchema = new Schema({
  comment: {type: String, required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

mongoose.model('Comment', CommentSchema);
