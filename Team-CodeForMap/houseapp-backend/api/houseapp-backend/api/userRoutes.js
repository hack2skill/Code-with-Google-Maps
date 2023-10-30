const e = require('express');
const User = require('../models/user');
const Room = require('../models/room');


// userRoutes.js
const express = require('express');
const router = express.Router();

// // Define your user-related routes
// router.get('/',(req,res)=>{
//     User.find().then(users =>{
//         res.status(200).json(users);
//     }).catch(err =>{
//         res.status(500).json({error: err.message})
//     })
// })

router.post('/register',async (req,res)=>{
    // console.log("test",await userExists(req.body.email))
    if(await userExists(req.body.email)){
        res.status(409).json({error:'Email already exists'})
    }else{
        const newUser = new User(req.body)
        newUser.save().then(user=>{
            res.status(201).json(user)
        }).catch(err=>{
            res.status(500).json({error: err.message})
        })
    }
    
})

// login
router.post('/login', (req, res) => {
  User.findOne({email:req.body.email, password: req.body.password}).then(user =>{
    if(user){
        res.status(200).json(user)
    }else{
        res.status(401).json({error: "Incorrect email or password"})
    }
  }).catch(err=>{
    res.status(500).json({error:err.message})
  })
});

// function for check user existance
const userExists = async (email)=>{
    const user = await User.findOne({email : email.toLowerCase().trim()})
    if(user){
        return true
    }else{
        return false
    }
}

// Create a new room
router.post('/rooms', async (req, res) => {
    try {
      const room = new Room(req.body);
      await room.save();
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get a list of all rooms
router.get('/', async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/rooms', async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/voice', (req, res) => {
  const voiceInput = req.body.input;

  // Process voice input and generate a response (e.g., search the database).
  const response = 'Hello, how can I assist you today?';

  res.json({ response });
});
 

// Add more routes as needed

module.exports = router;
