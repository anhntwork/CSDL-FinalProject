const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  color: String,
  manufacturer: String,
  modelYear: Number,
  model: String,
  seats: { type: Number, required: true },
  yearsInUse: Number,
  lastMaintenanceDate: { type: Date, required: true },
  totalDistance: { type: Number, default: 0 }
});

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
