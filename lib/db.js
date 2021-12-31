const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectMongo;
