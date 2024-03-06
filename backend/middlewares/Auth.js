const { findUsingId } = require('../controllers/Functions')
const { User } = require('../model/userSchema')
const { Admin }  = require('../model/adminSchema')


const userAuth = async (req,res, next)=>{
   try{
      const data = req.user 
      const user = await findUsingId(User, data._id)
      console.log("User Auth: " + user);
      if(!user){
         return res.status(204).json({ status: true})
      }
      if(!user.status){
         return res.status(205).json({ status: true})
      }

      const details = {
         _id: user._id,
         email: user.email,
         name: user.name,
         image: user.profile?`http://localhost:5000/Profile/${user.profile}`: `http://localhost:5000/Profile/download.jpg`,
         gender: user.gender,
         age: user.age,
         username: user.username
      }
      return res.status(200).json({ user: details })
   } catch (err){
      console.error(err);
      res.status(400).json({ status: true})
   }
}

const adminAuth = async(req,res,next) =>{
   const data = req.admin
   const admin = await findUsingId(Admin, data._id)
   if(!admin) return res.status(201).json({ status: true})
   const details = { name: admin.name, email: admin.email, user:admin.user }
   return res.status(200).json({ admin: details })
}


module.exports = {
   userAuth,
   adminAuth

}