const express=require('express');
const { reportRegister, getReport } = require('../controller/report');
const app=express.Router();

app.post('/report',reportRegister)
app.get('/report',getReport)

module.exports=app;