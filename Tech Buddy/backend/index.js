require('dotenv').config();
const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const app = express();
const reportRouter=require('./routes/report')




const port = process.env.port
const connect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO);
        console.log("connected");
    }
    catch (err) {
        console.log("Error in connecting to the database", err);
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb is Disconnected");
})
mongoose.connection.on("connected", () => {
    console.log("MongoDb is Connected");
})

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello")
})
app.use(authRouter);
app.use(reportRouter)
app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
    connect();
})