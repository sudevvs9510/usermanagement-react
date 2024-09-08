const bcrypt = require('bcrypt');



const findOneData = async (db, query) => {
   const data = await db.findOne(query)
   return data
}

const Insert = async (db, insert) => {
   const data = await db.insertMany([insert])
   return data[0]
}

const Hash = async (password) => {
   try {
      console.log('Password:', password);
      const hashed = await bcrypt.hash(password || '', 10)
      return hashed
   } catch (error) {
      console.log("Error in hashing a password: ", error);
      throw error;
   }
}

const findUsingId = async (db, id) => {
   const data = await db.findById(id)
   return data
}

const Compare = async (password, hashed) => {
   return await bcrypt.compare(password, hashed)
}

const findByAndUpdate = async (db, query, update) => {
   await db.findByIdAndUpdate(query, update)
}

// Compare('Sudev@123','$2b$10$djFyaYiSjz2QjAIM0TUzDuX1ktTKzp8MBtUOzP./LUq075tSERHyu').then(res => console.log(res))

module.exports = {
   findOneData,
   Insert,
   Hash,
   findUsingId,
   Compare,
   findByAndUpdate
} 


// Hash("Sudev@123").then((value)=>console.log(`Hashed Password: ${value}`))
// .catch((err)=>{console.log("Error while hashing the password", err)})