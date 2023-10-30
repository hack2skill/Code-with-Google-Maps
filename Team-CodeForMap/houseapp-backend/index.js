require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3000;

// Routes
const userRoutes = require('./api/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

// Use the userRoutes as middlewar
app.use('/users', userRoutes);
const uri = "mongodb+srv://ankushkothiyal2012:kcGkZMFdKuOeq0OT@cluster0.agvnxsg.mongodb.net/?retryWrites=true&w=majority"

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to DB");

    }catch(error){
        console.error(error);
    }
}
connect();
app.listen(port, () => {
    console.log('App running');
  });
