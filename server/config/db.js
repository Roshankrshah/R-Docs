const mongoose = require('mongoose');

const connectDB = async (url)=>{
    try{
        await mongoose.connect(url);
        console.log('DB connected');
    }catch(error){
        console.log('Error in connecting to DB',error);
    }
};

module.exports = connectDB;