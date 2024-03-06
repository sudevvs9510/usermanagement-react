const { findOneData,Compare } = require('../controllers/Functions');
const { createPayload } =require('../controllers/jwt');
const { Admin } = require("../model/adminSchema");
const {User} = require('../model/userSchema')

const login = async(req,res,next)=>{
    const {email,password}= req.body;
    console.log(email,password);
    const admin = await findOneData(Admin,{email:email});
    console.log("Admin"+admin);
    if(!admin){
        return res.status(202).json({status:true});
    }
    if(!Compare(password,admin.password)){
        return res.status(201).json({status:true});
    }

    const data={
        name:admin.name,
        _id:admin._id
    }

    const payload = await createPayload(data);
    return res.status(200).json({payload:payload});
}

const adminHome = async (req, res, next) => {
    try {
        const data = await User.find()
        res.status(200).json({ users: data })
    } catch (e) {
        console.error(e);
    }
}



const blockUser = async (req, res, next) => {
    try {
        const { id } = req.body
        let user = await User.findById(id)
        user.status = !user.status
        await user.save()
        res.status(200).json({ status: true })
    } catch (e) {
        console.error(e);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.body
        let user = await User.findById(id)
        if (user.admin) {
            await Admin.findOneAndDelete({ email: user.email })
        }
        await user.deleteOne()
        res.status(200).json({ status: true })
    } catch (e) {
        console.error(e);
    }
}

const makeAdmin = async (req, res, next) => {
    try {
        const { id } = req.body
        let user = await User.findById(id)
        if (!user.admin) await Admin.insertMany([user])
        else await Admin.deleteOne({ email: user.email })
        user.admin = !user.admin
        await user.save()
        res.status(200).json({status:true})
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    login,
    adminHome,
    blockUser,
    deleteUser,
    makeAdmin
}