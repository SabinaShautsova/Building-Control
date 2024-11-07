import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchBuildingById, deleteBuilding } from '../api';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Typography variant="h4">{building.name}</Typography>
      <Typography variant="body1">Location: {building.location}</Typography>
      <Typography variant="body1">Current Temperature: {building.currentTemperature}°C</Typography>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        component={Link}
        to={`/edit-building/${building._id}`}
        style={{ marginTop: '10px', marginRight: '10px' }}
      >
        Edit
      </Button>
      
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        style={{ marginTop: '10px' }}
      >
        Back to List
      </Button>
      
      <Button
        variant="outlined"
        color="error"
        sx={{ minWidth: '250px' }}
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
        style={{ display: 'block', marginTop: '20px' }}
      >
        Delete
      </Button>
    </div>
  );
}

export default BuildingDetails;
