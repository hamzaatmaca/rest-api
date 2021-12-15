const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true, 'Please add name']

	},
	surname:{
		type: String,
		required:[true, 'Please add surname']
	},
	email:{
		type:String,
		required:[true,'Please add email']
	},
	phone:{
		type:String,
		required:[true,'Please add phone']
	},
	city:{
		type:String,
		required:[true,'Please add city']
	},
	country:{
		type:String,
		required:[true,'Please add an country']
	},
	password:{
		type:String,
		required:[true,'Please add an password']
	},
	createdAt:{
		type:Date,
		default:Date.now
	}


})


module.exports = mongoose.model('User',UserSchema);