const User = require('../models/User');
const bcrypt = require('bcryptjs')

exports.setSession = async (req, res, next) => {

    
   
    const { email,password } = req.body
    const user = await User.findOne({email});
    
    if(!user){
        return res.status(500).json({
            success:false,
            data:'Server Error'
        })

    }

    else{
        const pass = await bcrypt.compare(password,user.password)

        if(pass){

            req.session.isAuth = true;

            return res.status(200).json({
                success:true,
                data:req.body
            })

        }
        else{
            return res.status(500).json({
                success:false,
                data:'Server Error'
            })
        }

        
    }

    

    
}