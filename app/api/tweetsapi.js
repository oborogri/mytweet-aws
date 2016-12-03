'use strict';

const Tweet = require('../models/tweet');
const Boom = require('boom');

exports.find = {

  auth: false,

  handler: function (request, reply) {
    Tweet.find({}).exec().then(tweets => {
      reply(tweets);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};
exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    Tweet.findOne({ _id: request.params.id }).then(tweet => {
      reply(tweet);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },
};
