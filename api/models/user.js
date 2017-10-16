const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	createdOn: Date,
	email: {
		type: String,
		unique: true
	},
	firstName: String,
	lastName: String,
	password: String,
});

module.exports = mongoose.model('User', UserSchema);
