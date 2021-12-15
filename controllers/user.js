const User = require('../models/User')
const bcrypt = require('bcryptjs')
const isEmpty = require('validator/lib/isEmpty');
const isEmail = require('validator/lib/isEmail');
const equals =require('validator/lib/equals');
const jwt = require('jsonwebtoken');

//Get All Users
exports.getUser = async (req,res,next)=>{
	
	try{

		const users = await User.find();

		return res.status(200).json({
			success:true,
			data:users
		})

	}catch(err){
		console.log(err);
		res.status(500).json({ err :'Server Failed'})
	}

}

//Get User Details
exports.getUserDetails = async (req,res,next)=>{

	try{

		const users = await User.findById(req.params.id)

		res.status(200).json({
			success:true,
			data:users
		})

	}catch(err){

		console.log(err);
		res.status(500).json({ err :'Server Failed'})
	}
}


//Add User
exports.addUser = async (req,res,next)=>{
	
	try{	
		
		const { name, surname, phone, city, country, email, password,password2 } = req.body;

		let user = await User.findOne({email})

		if(user){

			return res.status(500).json({
				success:true,
				data:'User Already exist'
			})
		}
		else if(isEmpty(name) || isEmpty(surname) || isEmpty(email) || isEmpty(password))
		{
			res.status(401).json({
				msg:'All field is required'
			})
		}
		else if(!isEmail(email)){
			res.status(401).json({
				msg:'Email is invalid'
			})
		}
		else if(!equals(password,password2)){
			res.status(401).json({
				msg:'Password do not match'
			})
		}
		else{
			const hashedPass = await bcrypt.hash(password, 12)
			user = await User.create({
				name,
				surname,
				phone,
				city,
				country,
				email,
				password:hashedPass
			})

			return res.status(200).json({
				success:true,
				data:user
			})
		}
		


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

//Update User
exports.updateUser = async (req,res,next)=>{
	
	try{

		let users = await User.findById(req.params.id);

		users = await User.findByIdAndUpdate(req.params.id,req.body,{

			new:true,
			runValidators:true,
			useFindAndModify:false

		})

		return res.status(200).json({
			success:true,
			data:users
		})

	}catch(err){
		
		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}

}


//Delete User
exports.deleteUser = async(req,res,next)=>{
	try{

		const users = await User.findById(req.params.id)

		await users.remove();

		return res.status(200).json({
			success:true,
			message:"User deleted successfull"
		})
	}catch(err){

		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}
	
}
//Login User
exports.userLogin = async(req,res,next)=>{
	try{

		const {password, email} = req.body

		let user = await User.findOne({email})
		if(!user){
			return res.status(404).json({
				success:false,
				data:'User not found'
			})

		}
		else{
			const pass = await bcrypt.compare(password,user.password)

			if(pass){

				const payload = {
					email,
					password
				}

				const token = jwt.sign(payload,'sdgabdfhjrj',{expiresIn:3600 })

				return res.status(200).json({
					success:true,
					data:token
				})

			}
			else{
				return res.status(500).json({
					success:false,
					data:'Password wrong'
				})
			}


		}
	}catch(err){

		console.log(err.message);
		res.status(500).json({ err :'Server Failed'})
	}
	
}