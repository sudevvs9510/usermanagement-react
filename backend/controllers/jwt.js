const jwt = require('jsonwebtoken')
require('dotenv').config()


const createPayload = async (data) =>{
   const payload = jwt.sign(data,process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
   return payload
}

const verifyPayload = async (req,res, next) =>{
   try{
      const { payload } = req.body

      if(!payload) return res.status(201).json({ status: true })
      
      jwt.verify(payload, process.env.JWT_SECRET, (error, success) =>{
         if(error){
            if(error.name === 'TokenExpiredError'){
               return res.status(202).json({ status: true })
            } else {
               return res.status(203).json({ status: true})
            }
         }
         req.user = success
         next();
      })
   } catch(error){
      console.log(err);
      res.status(500).json({ status: false, error: 'Internal Server Error'})
   }
};


const verifyAdmin = async (req,res, next)=>{
   try{
      const {payload} = req.body
      if(!payload) return res.status(204).json({ status: true })
      jwt.verify(payload, process.env.JWT_SECRET, (error, success)=>{
         if(error){
            if(error.name === 'TokenExpiredError'){
               return res.status(202).json({ status: true })
            } else {
               return res.status(203).json({ status: true })
            }
         }
         req.admin = success
         next() 
      })
   }catch(e){
      res.status(404).json({ status: true })
   }
}


module.exports = {
   createPayload,
   verifyPayload,
   verifyAdmin

}