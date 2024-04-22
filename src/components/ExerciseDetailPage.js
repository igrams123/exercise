import React from 'react';
import './styles/global.css'; // Import global styles

const ExerciseDetailPage = ({ exercise }) => {
  return (
    <div className="container">
      <h2>Exercise Detail</h2>
      <div className="exercise-detail">
        <h3>{exercise.name}</h3>
        <p>Target Muscle: {exercise.targetMuscle}</p>
        <p>Equipment: {exercise.equipment}</p>
        {/* Add more exercise details as needed */}
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
