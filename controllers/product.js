const Product = require('../models/Product')

//Get All Product
exports.getProduct = async (req,res,next)=>{
	
	try{

		const products = await Product.find();

		return res.status(200).json({
			success:true,
			data:products
		})

	}catch(err){
		console.log(err);
		res.status(500).json({ err :'Server Failed'})
	}

}

//Get Product Details
exports.getProductDetails = async (req,res,next)=>{

	try{

		const product = await Product.findById(req.params.id)

		res.status(200).json({
			success:true,
			data:product
		})

	}catch(err){

		console.log(err);
		res.status(500).json({ err :'Server Failed'})
	}
}


//Add Product
exports.addProduct = async (req,res,next)=>{
	
	try{

		let body = {
		  title: req.body.title,
		  content: req.body.content,
		  price: req.body.price,
		  category: req.body.category,
		  img: req.file.filename
		}
		console.log(req.body)
		const products = await Product.create(body);

		return res.status(200).json({
			success:true,
			data:products
		})

	}catch(err){

		console.log(err.message);
		if(err.code === 11000){
			return res.status(400).json({
				error:'Store already exixst'
			})
		}
		res.status(500).json({ err :'Server Failed'})
	}

}

//Update Product
exports.updateProduct = async (req,res,next)=>{
	
	try{

		let products = await Product.findById(req.params.id);

		product = await Product.findByIdAndUpdate(req.params.id,req.body,{

			new:true,
			runValidators:true,
			useFindAndModify:false

		})

		return res.status(200).json({
			success:true,
			data:products
		})

	}catch(err){
		
		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}

}


//Delete Product
exports.deleteProduct = async(req,res,next)=>{
	try{

		const product = await Product.findById(req.params.id)

		await product.remove();

		return res.status(200).json({
			success:true,
			message:"Product deleted successfull"
		})
	}catch(err){

		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}
	
}