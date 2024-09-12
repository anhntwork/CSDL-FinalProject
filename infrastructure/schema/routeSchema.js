const mongoose = require('mongoose');
const routeSchema = new mongoose.Schema({
  startPoint: { type: String, required: true },
  endPoint: { type: String, required: true },
  distance: { type: Number, required: true },
  complexity: { type: Number, required: true, enum: [1, 2, 3] }
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;