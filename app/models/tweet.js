/**
 * Created by Grigore on 19/10/2016.
 */
const mongoose = require('mongoose');
const User = require('../models/user');

const tweetSchema = mongoose.Schema({
  text:    String,
  subject: String,
  date:    String,

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
