// src/components/BuildingList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBuildings } from '../api';

function BuildingList() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBuildings = async () => {
      try {
        const data = await fetchBuildings();
        setBuildings(data);
      } catch (err) {
        setError('Failed to fetch buildings');
      } finally {
        setLoading(false);
      }
    };

    getBuildings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Buildings</h1>
      <ul>
        {buildings.map((building) => (
          <li key={building._id}>
            <Link to={`/buildings/${building._id}`}>{building.name}</Link> - {building.location}
          </li>
        ))}
      </ul>
      <Link to="/add-building">Add New Building</Link>
    </div>
  );
}

export default BuildingList;
