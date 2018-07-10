const mongoose = require('mongoose');

const WorkExampleSchema = mongoose.Schema({
	createdOn: Date,
	description: Array,
	content: [],
	githubUrl: String,
	images: Array,
	technologies: [{type: String, ref: 'Technology'}],
	title: String,
	type: String,
	url: String
});

module.exports = mongoose.model('WorkExample', WorkExampleSchema);
