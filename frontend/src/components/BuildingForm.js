// src/components/BuildingForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBuilding, updateBuilding, fetchBuildingById } from '../api';

function BuildingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const getBuilding = async () => {
        try {
          const data = await fetchBuildingById(id);
          setName(data.name);
          setLocation(data.location);
        } catch (err) {
          setError('Failed to load building details');
        }
      };

      getBuilding();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const buildingData = { name, location };

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
      <h1>{isEditing ? 'Edit Building' : 'Add Building'}</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Building Name"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Building</button>
      </form>
    </div>
  );
}

export default BuildingForm;
