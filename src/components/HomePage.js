import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faBars, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import './styles/global.css'; // Import global styles
import './styles/homepage.css'; // Import custom styles for the homepage

const HomePage = () => {
  const [bodyPart, setBodyPart] = useState('back');
  const [exercises, setExercises] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchExercisesByBodyPart = async () => {
      try {
        const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
          headers: {
            'X-RapidAPI-Key': 'd7d387b235mshe561c5d00c0ddebp188ccajsn1eb63d4c9e04',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          },
          params: {
            limit: 10,
            offset: 0
          }
        });
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises by body part:', error);
      }
    };

    fetchExercisesByBodyPart();
  }, [bodyPart]);

  const handleBodyPartChange = (selectedBodyPart) => {
    setBodyPart(selectedBodyPart);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToFavorites = (exerciseId) => {
    const exerciseToAdd = exercises.find(exercise => exercise.id === exerciseId);
    setFavorites(prevFavorites => [...prevFavorites, exerciseToAdd]);
    setNotification(`${exerciseToAdd.name} has been added to favorites.`);
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('sidebar') || event.target.classList.contains('menu-icon')) {
      return;
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  }, [notification]);

  return (
    <div className="homepage">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <h2>Sidebar</h2>
        <p>Sidebar content goes here</p>
      </div>
      <div className="content">
        <header className="header">
          <div className="top-bar">
            <div className="menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Fitness Zone</h1>
            <div className="top-bar-icons">
              <a href="#"><FontAwesomeIcon icon={faBell} /></a>
              <a href="#"><FontAwesomeIcon icon={faUser} /></a>
              <a href="#"><FontAwesomeIcon icon={faShoppingCart} /></a>
            </div>
          </div>
          <div className="tabs">
            <button onClick={() => setShowFavorites(true)}>My Favorites</button>
            <button>Women</button>
            <button>Men</button>
            <button>Kids</button>
          </div>
        </header>
        <div className="container">
          <div className="body-part-selector">
            <h2>Select Body Part</h2>
            <select value={bodyPart} onChange={(e) => handleBodyPartChange(e.target.value)}>
              <option value="back">Back</option>
              <option value="cardio">Cardio</option>
              <option value="chest">Chest</option>
              <option value="lower arms">Lower Arms</option>
              <option value="lower legs">Lower Legs</option>
              <option value="neck">Neck</option>
              <option value="shoulders">Shoulders</option>
              <option value="upper arms">Upper Arms</option>
              <option value="upper legs">Upper Legs</option>
              <option value="waist">Waist</option>
            </select>
          </div>
          <div className="featured-exercises">
            {exercises.map(exercise => (
              <div key={exercise.id} className="exercise-card">
                <h3>{exercise.name}</h3>
                <img src={exercise.gifUrl} alt={exercise.name} />
                <div className="exercise-details">
                  <p><strong>Equipment:</strong> {exercise.equipment}</p>
                  <p><strong>Target:</strong> {exercise.target}</p>
                </div>
                <div className="favorite-icon" onClick={() => addToFavorites(exercise.id)}>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            ))}
          </div>
          {notification && <div className="notification">{notification}</div>}
          {showFavorites && (
            <div className="favorites">
              <h2>My Favorites</h2>
              {favorites.map(favorite => (
                <div key={favorite.id} className="favorite-card">
                  <h3>{favorite.name}</h3>
                  <img src={favorite.gifUrl} alt={favorite.name} />
                  <div className="exercise-details">
                    <p><strong>Equipment:</strong> {favorite.equipment}</p>
                    <p><strong>Target:</strong> {favorite.target}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <footer className="footer">
          <p>&copy; 2024 Billy Obunde | Contact: 0114443998</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
