const express = require('express')
const env = require('dotenv');
const bodyParser = require('body-parser')
const path = require("path");
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const passportSetup = require("./passport");

const app = express();

env.config();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
    cookie: {secure:false}
}));
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,'frontend/src')))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

mongoose.connect(
    `mongodb+srv://Prats:${process.env.MONGO_DB_PASSWORD}@cluster0.ciy0csz.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('database connected')
    });

app.get('/', (req, res, next) => {
    res.send('<a href="/auth/google">Authenticate with Google</a> <a href="/auth/logout">Log out</a>')
})

const authRoute = require("./routes/auth");
const reviewRoute = require("./routes/location_reviews");
const detailRoute = require("./routes/location_details");

app.use("/api/v1", authRoute)
app.use("/api/v1", reviewRoute);
app.use("/api/v1", detailRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('Server running at:', PORT);
});



// app.post('/data', (req, res, next) => {
//     res.status(200).json({
//         message : req.body
//     });
// })