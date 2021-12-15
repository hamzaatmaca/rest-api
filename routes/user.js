const express = require('express');
const router = express.Router();
const { 
	getUser,
	addUser,
	updateUser,
	deleteUser,
	getUserDetails,
	userLogin
} = require('../controllers/user')



router.route('/').get(getUser).post(addUser);

router.route('/:id').put(updateUser).delete(deleteUser).get(getUserDetails).post(userLogin);



module.exports = router