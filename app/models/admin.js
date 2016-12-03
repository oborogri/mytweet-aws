/**
 * Created by Grigore on 03/11/2016.
 */
'use strict';

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
