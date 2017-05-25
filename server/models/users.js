let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  username: {type: String, required:true},
}, {timestamps: true});

mongoose.model('User', UserSchema);
