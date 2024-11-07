import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBuilding, updateBuilding, fetchBuildingById } from '../api';
import { Button, Slider, Typography } from '@mui/material';

function BuildingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [targetTemperature, setTargetTemperature] = useState(22);
  const [error, setError] = useState(null);
  const isEditing = Boolean(id);

  const valuetext = (value) => `${value}°C`;
  
  useEffect(() => {
    if (isEditing) {
      const getBuilding = async () => {
        try {
          const data = await fetchBuildingById(id);
          setName(data.name);
          setLocation(data.location);
          setTargetTemperature(data.targetTemperature || 22);
        } catch (err) {
          setError('Failed to load building details');
        }
      };
      getBuilding();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buildingData = { name, location, targetTemperature };

    try {
      if (isEditing) {
        await updateBuilding(id, buildingData);
      } else {
        await createBuilding(buildingData);
      }
      navigate('/');
    } catch (err) {
      setError('Failed to save building');
    }
  };

  return (
    <div>
      <Typography variant="h4">{id ? 'Edit Building' : 'Add Building'}</Typography>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Building Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <Typography gutterBottom>Adjust Temperature</Typography>
          <Slider
            aria-label="Temperature Slider"
            value={targetTemperature}
            onChange={(e, newValue) => setTargetTemperature(newValue)} // Update state on slider change
            getAriaValueText={valuetext} // Use `valuetext` function here
            min={0}
            max={50}
            step={1}
            valueLabelDisplay="on"
            style={{ width: '250px' }}
          />
          <Typography>Target Temperature: {targetTemperature}°C</Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '20px' }}
        >
          {id ? 'Update Building' : 'Add Building'}
        </Button>
      </form>
    </div>
  );
}

export default BuildingForm; 