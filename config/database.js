const mongoose = require('mongoose');

const db = async ()=>{
	try{

		const conn = await mongoose.connect('mongodb+srv://xxxxxxxxxxxxxxxxxxxxxxxxxxxxe-commerce.7i2mk.mongodb.net/e-commerce?retryWrites=true&w=majority',{

			useNewUrlParser:true,
			useUnifiedTopology:true

		});

		console.log(`MongoDB Connection is very Successfull`)

	}catch(err){
		console.log(err)
		process.exit(1);

	}
}

module.exports= db
