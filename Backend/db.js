const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Database connected!');
})

db.on('disconnected', () => {
    console.log('Database disconnected!');      
})

db.on('error', () => {
    console.log('We are facing some error, please try again later!');    
})

module.exports = db;