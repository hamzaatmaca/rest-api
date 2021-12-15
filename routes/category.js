const express = require('express');
const router = express.Router();
const { 
	getCategory,
	addCategory,
	updateCategory,
	deleteCategory,
	getCategoryDetails 
} = require('../controllers/category');

router.route('/').get(getCategory).post(addCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory).get(getCategoryDetails);

module.exports = router