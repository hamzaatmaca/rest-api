const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	title:{
		type:String,
		required:[true, 'Please add title']

	},
	content:{
		type:String,
		required:[true,'Please add content']
	},
	category:{
		type:String,
		required:[true,'Please add category']
	},
	price:{
		type:String,
		required:[true,'Please add content']
	},
	img:{
		type:String,
		//required:[true,'Please add content']
	},
	createdAt:{
		type:Date,
		default:Date.now
	}


})


module.exports = mongoose.model('Product',ProductSchema);