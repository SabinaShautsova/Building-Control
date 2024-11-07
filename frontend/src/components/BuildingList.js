import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBuildings } from '../api';
import { Button, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add'

function BuildingList() {
  const [buildings, setBuildings] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    const getBuildings = async () => {
      try {
        const data = await fetchBuildings();
        setBuildings(data);
      } catch (err) {
        setError('Failed to fetch buildings');
      }
    };
    getBuildings();
  }, []);

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Sorting buildings by name 
  const sortedBuildings = [...buildings].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Buildings</Typography>

      <IconButton onClick={toggleSortOrder} aria-label="sort">
        <SortIcon />
        <Typography variant="body2" style={{ marginLeft: '5px' }}>
          Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </Typography>
      </IconButton>

      {sortedBuildings.map((building) => (
        <Card key={building._id} variant="outlined" style={{ marginBottom: '10px' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <div>
                <Typography variant="h6">
                  <HomeIcon style={{ marginRight: '5px' }} />
                  {building.name}
                </Typography>
                <Typography variant="body2">Location: {building.location}</Typography>
                <Typography variant="body2">Target Temperature: {building.targetTemperature || 'N/A'}°C</Typography>
              </div>
              <Button
                component={Link}
                to={`/buildings/${building._id}`}
                variant="contained"
                color="primary"
                style={{ marginLeft: 'auto' }}
              >
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Button
        component={Link}
        to="/add-building"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginTop: '15px' }}
      >
        Add New Building
      </Button>
    </div>
  );
}

export default BuildingList;