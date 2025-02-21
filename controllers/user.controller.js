const User =require('../models/user.model.js');
const { generateToken,jwtAuthMiddleware }= require('../middlewares/auth.js');

// Register
const userRegister = async (req,res)=>{
   
   try{
    // getting data from the body
    const data = req.body



// creating a new user document using moongoose model
    const newUser = new User(data);


    // now save this person in the database
    const response = await newUser.save();
    console.log("Saved", response);

    // generating payload for jwt authentication
    const payload ={ id:response.id}

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token is: ",token);

    res.status(201).json({response:response, token:token})
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error while registering user"})
    
   }

}


// Login
const userLogin = async (req,res) => {
    try {
        
        // extract user details from body
    const {aadharNumber,password} = req.body;

//  find user by its aadhar card
    const user= await User.findOne({aadharNumber: aadharNumber});
    
    // if user not exists or password not matched then error return

    if(!user || !(await user.isPasswordCorrect(password))){
        return res.status(401).json({error:"Invalid Aadhar Number or Password"})
    }

    // if user exists then generate token for user
    const payload ={ id: user.id }

    const token = generateToken(payload);

    // now return token as response 
    res.json({token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error while logging in user"})
        
    }
}


// for user profile
const userProfile=async(req,res)=>{
    try {
        // we get user data from the decoded token  which we assign to the req.user
       const userDetail=req.user;
       const userId=userDetail.id;
       const user = await User.findById(userId);
       res.status(200).json({user})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
}



module.exports = {userRegister,userLogin,userProfile}