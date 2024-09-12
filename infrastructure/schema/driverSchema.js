const mongoose = require('mongoose');
const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cmt: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  licenseType: String,
  address: String,
  dateOfBirth: Date,
  experienceYears: Number
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;