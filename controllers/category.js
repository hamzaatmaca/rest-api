const Category = require('../models/Category')
const Product = require('../models/Product')

exports.getCategory= async (req,res,next)=>{
	
	try{
		
		const category = await Category.find();

		return res.status(200).json({
			success:true,
			data:category
		})

	}catch(err){
		console.log(err);
		res.status(500).json({ err :'Server Failed'})
	}

}

//Get Product from Category Details
exports.getCategoryDetails = async (req,res,next)=>{

	try{

		
		const categoryId = await Category.findById(req.params.id)

		const products = await Product.find({
			category:categoryId.title
		})

		res.status(200).json({
			success:true,
			data:categoryId.title,
			product:products
		})

	}catch(err){

		console.log(err);
		res.status(500).json({ err :'Server Failed'})
	}
}


//Add Category
exports.addCategory = async (req,res,next)=>{
	
	try{

		const category = await Category.create(req.body);

		return res.status(200).json({
			success:true,
			data:category
		})

	}catch(err){

		console.log(err.message);
		if(err.code === 11000){
			return res.status(400).json({
				error:'Category already exixst'
			})
		}
		res.status(500).json({ err :'Server Failed'})
	}

}

//Update Product
exports.updateCategory = async (req,res,next)=>{
	
	try{

		let category = await Category.findById(req.params.id);

		category = await Category.findByIdAndUpdate(req.params.id,req.body,{

			new:true,
			runValidators:true,
			useFindAndModify:false

		})

		return res.status(200).json({
			success:true,
			data:category
		})

	}catch(err){
		
		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}

}

//Delete Category
exports.deleteCategory= async(req,res,next)=>{
	try{

		const category = await Category.findById(req.params.id)

		await category.remove();

		return res.status(200).json({
			success:true,
			message:"Category deleted successfull"
		})
	}catch(err){

		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}
	
}