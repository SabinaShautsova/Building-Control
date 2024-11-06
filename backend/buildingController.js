const Building = require('../models/Building');

// GET all buildings
exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    console.error("Detailed error retrieving buildings:", error.message);
    res.status(500).json({ error: 'Failed to retrieve buildings', details: error.message });
  }
};


// GET building by ID
exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) return res.status(404).json({ error: 'Building not found' });
    res.json(building);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST create new building
exports.createBuilding = async (req, res) => {
  try {
    const newBuilding = new Building(req.body);
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT update building
exports.updateBuilding = async (req, res) => {
  try {
    const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBuilding) return res.status(404).json({ error: 'Building not found' });
    res.json(updatedBuilding);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE building
exports.deleteBuilding = async (req, res) => {
  try {
    await Building.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PATCH update temperature
exports.updateTemperature = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) return res.status(404).json({ error: 'Building not found' });

    building.currentTemperature = req.body.currentTemperature;
    await building.save();

    res.json(building);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
