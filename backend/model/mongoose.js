const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB)
   .then(() => console.log("mongodb connected"))
   .catch(err => console.error(err))

const db = mongoose.connection;



module.exports = db