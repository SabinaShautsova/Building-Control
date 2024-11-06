// src/components/BuildingDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBuildingById, deleteBuilding } from '../api';

function BuildingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBuilding = async () => {
      try {
        const data = await fetchBuildingById(id);
        setBuilding(data);
      } catch (err) {
        setError('Failed to fetch building details');
      } finally {
        setLoading(false);
      }
    };

    getBuilding();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBuilding(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete building');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!building) return null;

  return (
    <div>
      <h1>{building.name}</h1>
      <p>Location: {building.location}</p>
      <p>Current Temperature: {building.currentTemperature}°C</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/edit-building/${building._id}`}>Edit</Link>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default BuildingDetails;
