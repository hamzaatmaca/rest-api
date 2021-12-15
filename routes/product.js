const express = require('express');

const router = express.Router();
const { 
	getProduct,
	addProduct,
	updateProduct,
	deleteProduct,
	getProductDetails
} = require('../controllers/product')

router.route('/').get(getProduct).post(addProduct);

router.route('/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);



module.exports = router