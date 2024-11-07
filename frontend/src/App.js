import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuildingList from './components/BuildingList';
import BuildingDetails from './components/BuildingDetails';
import BuildingForm from './components/BuildingForm';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<BuildingList />} />
          <Route path="/buildings/:id" element={<BuildingDetails />} />
          <Route path="/add-building" element={<BuildingForm />} />
          <Route path="/edit-building/:id" element={<BuildingForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
