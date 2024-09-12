const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  assistantDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  passengers: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
