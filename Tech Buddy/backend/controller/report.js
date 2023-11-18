const Report = require('../models/reportModel');
const nodemailer = require("nodemailer");

const reportRegister = async (req, res) => {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        try{const { longitude, latitude, icon, desc, title } = req.body;
        // console.log(req.user)
        if(!longitude || !latitude ||!icon || !desc){
            return res.status(400).json({msg: "Please fill all fields"})
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jamarcus.conn99@ethereal.email',
                pass: 'QpNWpQGS1yfw5Jj6H6'
            }
        });

        const info = await transporter.sendMail({
            from: `"RoadSafety!" <${req.user._id}>`, // sender address
            to: "municipal@gamil.com", // list of receivers
            subject: "Reporting an Issue", // Subject line
            text: `${desc}`, // plain text body
            html: `<div>${desc}<div><br/><div>Image Link - <a href='${icon}'>Link</a></div>`, // html body
          });
        const newReport =await new Report({
            longitude: longitude, latitude: latitude, icon: icon, description: desc, title: title,userId:req.user._id
        })
        await newReport.save();
        res.status(200).json(newReport);
        }
        catch{
            res.status(400).json("not created")
        }
    }
    else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
}
const getReport=async(req,res)=>{
    try{
        const reports = await Report.find();
        res.status(200).json(reports);
    }
    catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = { reportRegister, getReport};