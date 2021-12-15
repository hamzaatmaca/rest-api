const mongoose = require('mongoose');

const CategorySchema= new mongoose.Schema({

	title:{
		type:String,
		require:[true, 'Please Enter Category Title']
	},
	createdAt:{
		type:Date,
		default:Date.now
	}

})

module.exports = mongoose.model('Category',CategorySchema)