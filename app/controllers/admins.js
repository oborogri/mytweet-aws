'use strict';

const Admin = require('../models/admin');
const User     = require('../models/user');
const Tweet    = require('../models/tweet');
const Joi = require('joi');
var dateFormat = require('dateformat');
var now        = null;

//renders admin login page
exports.admin_login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('admin_login', { title: 'Log in as Administrator' });
  },
};

//renders specific users timeline in admin
exports.adminUser_timeline = {
  handler: function (request, reply) {
    const userEmail = request.payload.user;
    User.findOne({ email: userEmail }).then(user => {
      const userId = user.id;
      return Tweet.find({ sender: userId }).populate('sender');
    }).then(allTweets => {
      reply.view('adminUser_timeline', {
        title: 'User Timeline',
        tweets: allTweets,
        _id: 'user_timeline',
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//renders user profile view
exports.user_profile = {
  handler: function (request, reply) {
    const userEmail = request.payload.userEmail;
    User.findOne({ email: userEmail }).then(user => {
      reply.view('user_profile',
          { title: 'User Profile',
            user: user,
            _id: 'userslist', });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//renders admin signup page
exports.admin_signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('admin_signup', { title: 'Create MyTweet admin account' });
  },
};

//register new administrator
exports.admin_register = {
  auth: false,
  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('admin_signup', {
        title: 'Sign up error',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },
  },
  handler: function (request, reply) {
    const admin = new Admin(request.payload);
    admin.save().then(newAdmin => {
      reply.redirect('/admin_login');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//admin authentication
exports.admin_authenticate = {
  auth: false,

  validate: {

    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('admin_login', {
        title: 'Login error',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },
  },
  handler: function (request, reply) {
    const admin = request.payload;
    Admin.findOne({ email: admin.email }).then(foundAdmin => {
      if (foundAdmin && foundAdmin.password === admin.password) {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInUser: admin.email,
        });
        reply.redirect('/admin_timeline');
      } else {
        reply.redirect('/admin_signup');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//renders global admin timeline
exports.admin_timeline = {
  handler: function (request, reply) {
    Tweet.find({}).populate('sender').then(allTweets => {
      reply.view('admin_timeline', {
        title: 'MyTweet Timeline',
        tweets: allTweets,
        _id: 'timeline',
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//facilitates admin deleting a specific tweet
exports.adminDeleteTweet = {
  handler: function (request, reply) {
    const tweetId = request.payload.user;
    Tweet.remove({ _id: { $in: tweetId } }).then(allTweets => {
      reply.redirect('/admin_timeline');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//facilitates deleting all tweets
exports.adminDeleteTweetsAll = {
  handler: function (request, reply) {
    User.find({}).then(allUsers => {
      allUsers.forEach(user => {
        user.posts = 0;
      });
      return user.save();
    });
    Tweet.remove(function (err, p) {
      if (err) {
        throw err;
      } else {
        console.log('No Of Tweets deleted:' + p);
      }
    }).then(allTweets => {
      reply.view('admin_timeline', {
        title: 'MyTweet Timeline',
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//renders all users list
exports.userslist = {
  handler: function (request, reply) {
    User.find({}).populate('user').then(allUsers => {
      reply.view('userslist', {
        title: 'MyTweet Users',
        users: allUsers,
        _id: 'userslist',
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//facilitates deleting a specific user
exports.deleteUser = {
  handler: function (request, reply) {
    let id = null;
    id = request.payload.user;
    User.remove({ _id: { $in: id } }).then(newUser => {
      reply.redirect('/userslist');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//facilitates deleting all users
exports.deleteUsersAll = {
  handler: function (request, reply) {
    User.remove(function (err, p) {
      if (err) {
        throw err;
      } else {
        console.log('No Of Users deleted:' + p);
      }
    }).then(allTweets => {
      reply.view('userslist', {
        title: 'MyTweet Users',
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
