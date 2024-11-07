const Building = require('../../models/Building');

exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) return res.status(404).json({ error: 'Building not found' });
    res.json(building);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.createBuilding = async (req, res) => {
  try {
    const newBuilding = new Building(req.body);
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBuilding) return res.status(404).json({ error: 'Building not found' });
    res.json(updatedBuilding);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    await Building.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

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
