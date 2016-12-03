const TweetsApi = require('./app/api/tweetsapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [
  { method: 'GET', path: '/api/tweets',      config: TweetsApi.find },
  { method: 'GET', path: '/api/tweets/{id}', config: TweetsApi.findOne },

  { method: 'GET', path: '/api/users',       config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}',  config: UsersApi.findOne },
];
