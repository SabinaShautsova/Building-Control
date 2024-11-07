const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));


const buildingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    currentTemperature: { type: Number, default: 22 },
    targetTemperature: { type: Number, default: 22 }
});

const Building = mongoose.model('Building', buildingSchema);

// Routes
app.get('/buildings', async (req, res) => {
    try {
        const buildings = await Building.find();
        res.json(buildings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve buildings' });
    }
});

app.get('/buildings/:id', async (req, res) => {
    try {
        const building = await Building.findById(req.params.id);
        if (!building) {
            return res.status(404).json({ error: 'Building not found' });
        }
        res.json(building);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve building' });
    }
});

app.post('/buildings', async (req, res) => {
    try {
        const newBuilding = new Building(req.body);
        await newBuilding.save();
        res.status(201).json({ message: "Building created successfully", data: newBuilding });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create building' });
    }
});

app.put('/buildings/:id', async (req, res) => {
    try {
        const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBuilding) {
            return res.status(404).json({ error: 'Building not found' });
        }
        res.json({ message: "Building updated successfully", data: updatedBuilding });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update building' });
    }
});

app.delete('/buildings/:id', async (req, res) => {
    try {
        const deletedBuilding = await Building.findByIdAndDelete(req.params.id);
        if (!deletedBuilding) {
            return res.status(404).json({ error: 'Building not found' });
        }
        res.json({ message: "Building deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete building' });
    }
});

app.patch('/buildings/:id/temperature', async (req, res) => {
    try {
        const building = await Building.findById(req.params.id);
        if (!building) {
            return res.status(404).json({ error: 'Building not found' });
        }
        building.currentTemperature = req.body.currentTemperature;
        await building.save();
        res.json({ message: "Temperature updated successfully", data: building });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update temperature' });
    }
});

app.get('/', (req, res) => {
    res.send("Hello, the server is running and connected to MongoDB!");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));