const mongoose = require('mongoose');

const dbConnect =  async () => {
  // Connect to the database
  try {
    await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Connected to the database')
  } catch (e) {
    console.error(`Couldn't connect to the database: ${e}`);
    process.exit(1);
  }
};

module.exports = dbConnect;