import React, { useState, useEffect } from 'react';
import ExerciseService from '../services/exerciseService'; // Adjust the path as needed
import './styles/global.css'; // Import global styles

const ExerciseListPage = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await ExerciseService.getAllExercises();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="container">
      <h2>Exercise List</h2>
      <div className="exercise-list">
        {exercises.map(exercise => (
          <div key={exercise.id} className="exercise-card">
            <h3>{exercise.name}</h3>
            <p>Target Muscle: {exercise.target}</p>
            {/* Display other exercise details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseListPage;
