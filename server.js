const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));

// Define a Mongoose schema and model for a building
const buildingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    currentTemperature: { type: Number, default: 22 },
    targetTemperature: { type: Number, default: 22 }
});

const Building = mongoose.model('Building', buildingSchema);

// Routes

// GET: Retrieve all buildings
app.get('/buildings', async (req, res) => {
    try {
        const buildings = await Building.find();
        res.json(buildings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve buildings' });
    }
});

// GET: Retrieve a single building by ID
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

// POST: Create a new building
app.post('/buildings', async (req, res) => {
    try {
        const newBuilding = new Building(req.body);
        await newBuilding.save();
        res.status(201).json({ message: "Building created successfully", data: newBuilding });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create building' });
    }
});

// PUT: Update an existing building by ID
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

// DELETE: Remove a building by ID
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

// PATCH: Update only the temperature of a building by ID
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

// Root route for health check
app.get('/', (req, res) => {
    res.send("Hello, the server is running and connected to MongoDB!");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));