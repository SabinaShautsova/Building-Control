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
  const [sortOrder, setSortOrder] = useState('asc'); 

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

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
      <Typography variant="h4" gutterBottom sx={{padding: '11px'}}>Buildings</Typography>

      <IconButton sx={{padding: '11px'}} onClick={toggleSortOrder} aria-label="sort">
        <SortIcon />
        <Typography variant="body2" style={{ marginLeft: '5px' }}>
          Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </Typography>
      </IconButton>

      {sortedBuildings.map((building) => (
        <Card key={building._id} variant="outlined" style={{ marginBottom: '10px', marginLeft: '10px' }} sx={{ width: '700px' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '650px' }} >
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
                style={{ marginLeft: 'auto' }} >
                View Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box sx={{padding: '11px'}}>
      <Button
        component={Link}
        to="/add-building"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginTop: '5px' }} >
        Add New Building
      </Button>
      </Box>
    </div>
  );
}

export default BuildingList;