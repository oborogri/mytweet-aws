/**
 * Created by Grigore on 11/10/2016.
 */
const Assets = require('./app/controllers/assets');
const Accounts = require('./app/controllers/accounts');
const Tweets = require('./app/controllers/tweets');
const Admins = require('./app/controllers/admins');
const os = require('os');

module.exports = [

  { method: 'GET', path: '/',          config: Accounts.main },
  { method: 'GET', path: '/signup',    config: Accounts.signup },
  { method: 'GET', path: '/login',     config: Accounts.login },
  { method: 'GET', path: '/logout',    config: Accounts.logout },

  { method: 'POST', path: '/register',           config: Accounts.register },
  { method: 'POST', path: '/authenticate',       config: Accounts.authenticate },

  { method: 'GET', path: '/settings',         config: Accounts.viewSettings },
  { method: 'POST', path: '/update_settings', config: Accounts.updateSettings },

  { method: 'GET', path: '/home',           config: Tweets.home },
  { method: 'GET', path: '/timeline',       config: Tweets.timeline },
  { method: 'GET', path: '/newtweet',       config: Tweets.newtweet },
  { method: 'POST', path: '/user_timeline', config: Tweets.user_timeline },

  { method: 'POST', path: '/posttweet',           config: Tweets.posttweet },
  { method: 'POST', path: '/deleteTweetsAll',     config: Tweets.deleteTweetsAll },
  { method: 'POST', path: '/userDeleteTweetsAll', config: Tweets.userDeleteTweetsAll },
  { method: 'POST', path: '/deleteTweet',         config: Tweets.deleteTweet },

  { method: 'GET', path: '/admin_timeline',      config: Admins.admin_timeline },
  { method: 'GET', path: '/admin_signup',        config: Admins.admin_signup },
  { method: 'GET', path: '/admin_login',         config: Admins.admin_login },
  { method: 'GET', path: '/userslist',           config: Admins.userslist },
  { method: 'POST', path: '/adminUser_timeline',  config: Admins.adminUser_timeline },

  { method: 'POST', path: '/user_profile',       config: Admins.user_profile },

  { method: 'POST', path: '/admin_register',     config: Admins.admin_register },
  { method: 'POST', path: '/admin_authenticate',   config: Admins.admin_authenticate },
  { method: 'POST', path: '/adminDeleteTweet',     config: Admins.adminDeleteTweet },
  { method: 'POST', path: '/adminDeleteTweetsAll', config: Admins.adminDeleteTweetsAll },

  { method: 'POST', path: '/deleteUser',           config: Admins.deleteUser },
  { method: 'POST', path: '/deleteUsersAll',       config: Admins.deleteUsersAll },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

  {
    method: 'GET',
    path: '/testlb/{param}',
    config: { auth: false },
    handler: function (request, reply) {
      reply('Server: ' + os.hostname());
      console.log('testing: ' + request.params.param);
    },
  },

];
