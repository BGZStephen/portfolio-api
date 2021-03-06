import { Request, Response, NextFunction } from "../../interfaces";
import { Router } from 'express';
import { UserModel } from "../../interfaces";
import rest from '../../utils/rest';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

const User = mongoose.model<UserModel>('User');
const ObjectId = mongoose.Types.ObjectId;
const router = Router();

async function load(req: Request, res: Response, next: NextFunction): Promise<any> {
	const userId = req.params.id;
	if (!userId) {
		return res.error({message: 'No User ID provided', statusCode: 400});
	}

	const user = await User.findById(userId);
	if (!user) {
		return res.error({message: 'User not found', statusCode: 404});
	}

	req.context.user = user;
	next();
}

function get(req: Request, res: Response): void {
	const user = req.context.user;
	res.json(user);
}

async function index(req: Request, res: Response): Promise<any> {
	const users = await User.find();
	res.json(users);
}

async function update(req: Request, res: Response): Promise<any> {
	let user = req.context.user;
  const updatableFields = ['email', 'firstName', 'lastName'];

	if (req.body.newPassword && !req.body.currentPassword) {
    return res.error({message: 'Please provide current password when trying to update your password', statusCode: 400});
  }

  if (req.body.newPassword && req.body.currentPassword) {
		if (!user.passwordsMatch(req.body.currentPassword)) {
			return res.error({message: 'Current password does not match stored password', statusCode: 400});
		}
		user.password = req.body.newPassword;
	}

	const duplicateUser = await User.findOne({ email: req.body.email });

	if (duplicateUser && !ObjectId(duplicateUser._id).equals(user._id)) {
		return res.error({message: 'Email address already in use', statusCode: 400});
	}

	user = _.assign(user, _.pick(req.body, updatableFields));

	await user.save();
	res.json(user);
}

router.get('/', rest.asyncwrap(index));
router.all('/:id*', rest.asyncwrap(load));
router.get('/:id', get);
router.put('/:id', rest.asyncwrap(update));

export default router;
