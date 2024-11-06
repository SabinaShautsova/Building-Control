const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  currentTemperature: { type: Number, default: 22 },
  targetTemperature: { type: Number, default: 22 }
});

module.exports = mongoose.model('Building', buildingSchema);
