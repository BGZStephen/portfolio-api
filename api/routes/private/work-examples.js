const mongoose = require('mongoose');
const winston = require('winston');
const WorkExample = mongoose.model('WorkExample');
const router = require('express').Router();
const rest = require('api/utils/rest');

async function load(req, res, next) {
	const id = req.params.id;
	const workExample = WorkExample.findById(id);

	if (!workExample) {
		return res.status(404).json({
			message: 'Work example not found',
		});
	}

	req.content.workExample = workExample;
	next();
}

async function getAll(req, res) {
	try {
		const workExamples = await WorkExample.find({});
		res.json(workExamples);
	} catch (error) {
		winston.error(error);
		res.status(500).json(error);
	}
}

async function create(req, res) {
	const workExample = new WorkExample({
		createdOn: new Date(),
		content: req.body.content,
		description: req.body.description,
		githubUrl: req.body.githubUrl,
		images: req.body.images,
		technologies: req.body.technologies,
		summary: req.body.summary,
		title: req.body.title,
		type: req.body.type,
		url: req.body.url,
	});

	try {
		workExample.save();
		res.json(workExample);
	} catch (error) {
		winston.error(error);
		res.status(500).json(error);
	}
}

async function deleteOne(req, res) {
	const workExample = req.context.workExample;

	try {
		await workExample.remove();
		res.sendStatus(200);
	} catch (error) {
		winston.error(error);
		res.status(500).json(error);
	}
}

async function update(req, res) {
	const workExample = req.context.workExample;
	const updatableFields =
		'content description githubUrl images technologies summary title type	url';
	const updateParams = buildUpdateObject(req.body, updatableFields);
	try {
		for (const param in updateParams) {
			workExample[param] = updateParams[param];
		}
		workExample.save();
		res.json(workExample);
	} catch (error) {
		winston.error(error);
		res.status(500).json(error);
	}
}

function buildUpdateObject(body, updatableFields) {
	const updateKeys = updatableFields.split(' ');
	let updateParams = {};
	for (const key in updateKeys) {
		if (body[key]) {
			updateParams[key] = body[key];
		}
	}
	return updateParams;
}

router.get('/', getAll);
router.post('/', create);
router.all('/:id*', rest.asyncwrap(load));
router.delete('/:id', rest.asyncwrap(deleteOne));
router.put('/:id', rest.asyncwrap(update));

module.exports = router;
