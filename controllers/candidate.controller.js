const Candidate =require('../models/candidate.model.js');
// const { generateToken,jwtAuthMiddleware }= require('../middlewares/auth.js');
const User = require('../models/user.model.js');

// check if admin or not 

const checkAdmin= async (userId) => {
    try {
        const user= await User.findById(userId);
        return user.role === "admin";
    } catch (error) {
        return false
    }
}



// Register
const candidateRegister = async (req,res)=>{
   
   try{
//   check if admin role or not 
   if(! await checkAdmin(req.user.id)){
    return res.status(403).json({error:"User has not access to admin role"});
   }


    // getting data from the body
    const data = req.body



// creating a new candidate document using moongoose model
    const newCandidate = new Candidate(data);


    // now save this person in the database
    const response = await newCandidate.save();
    console.log("Saved", response);

    res.status(201).json({response:response})
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error while registering user"})
    
   }

}



// for candidate profile
const candidateProfile=async(req,res)=>{
    try {
        // we get user data from the decoded token  which we assign to the req.user
       const candidateDetails=req.candidate;
       const candidateId=candidateDetails.id;
       const candidate = await Candidate.findById(candidateId);
       res.status(200).json({candidate})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
}


const updateCandidate=async (req,res) => {
    try {
        //   check if admin role or not 
   if(!checkAdmin(req.user.id)){
    return res.status(403).json({error:"User has not access to admin role"});
   }

   const candidateId=req.params.id;
   const updateCandidateData= req.body;




   const response = await Candidate.findByIdAndUpdate(candidateId,updateCandidateData,{
    new:true,           // return the updated document 
    runValidators:true, // run mongoose validators
   })
   
   

   if(!response){
    return res.status(404).json({error:"Candidate not found"})
   }

   console.log("Data Updated successfully",response);
   res.status(200).json({message:"Updated Successfully",response:response})
   



    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error while updating candidate'})
        
    }
}


const deleteCandidate = async (req,res) => {
    try {
         //   check if admin role or not 
   if(!checkAdmin(req.user.id)){
    return res.status(403).json({error:"User has not access to admin role"});
   }

   const candidateId = req.params.id;// extract the id from the url parameter
   
   const response = await Candidate.findByIdAndDelete(candidateId)

   if(!response){
    return res.status(404).json({error:'Candidate not found to delete'});
   }


   res.status(200).json({success:"Deletion Successfull",response:response})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'})
        
    }
}


// voting controller
// no admin can vote 
//  user can vote only once

const voting=async(req,res)=>{
// first find candidate to vote 
// then user who will vote
// both of them get from body candidate from params and userfrom user.id

 candidateId=req.params.id;
 userId=req.user.id;

try {
    // finding candidate using his id 
    const candidate = await Candidate.findById(candidateId);
    if(!candidate){
        return res.status(404).json({message:"Candidate not found"})
    }
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    if(user.isVoted){
        return res.status(400).json({message:"User already Voted"})
    }
    if(user.role=='admin'){
        return res.status(400).json({message:"Admin Cannot Vote"})
    }

// update candidate document to record the vote
candidate.votes.push({user:userId})
candidate.voteCount++;
await candidate.save();

// now update user document 
user.isVoted=true;
user.save();

return res.status(200).json({message:"Voted Successfully"})

} catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong while doing voting",error:error})
    
}

}

const voteCount=async(req,res)=>{

    try {
        // first we find the candidate in sorted form in descending order
        const candidate=await Candidate.find().sort({voteCount:'desc'});
        
        // now we will only write the candidate name , candidate party, voteCount
        const voteRecord= candidate.map((item)=>{
            return {
                name:item.name,
                party:item.party,
                count:item.voteCount
            }
        });
        return res.status(200).json({voteRecord})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server while voteCount"})
        
    }
}



module.exports = {candidateRegister,updateCandidate,candidateProfile,deleteCandidate,voting,voteCount}