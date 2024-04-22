import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import HomePage from './components/HomePage';
import ExerciseListPage from './components/ExerciseListPage';
import ExerciseDetailPage from './components/ExerciseDetailPage';

const App = () => {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseListPage />} />
        <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
