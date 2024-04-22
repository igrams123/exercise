import axios from 'axios';

// Define your RapidAPI key and host
const RAPIDAPI_KEY = 'd7d387b235mshe561c5d00c0ddebp188ccajsn1eb63d4c9e04';
const RAPIDAPI_HOST = 'exercisedb.p.rapidapi.com';

const ExerciseService = {
  getAllExercises: async (bodyPart, limit = 10, offset = 0) => {
    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        },
        params: {
          bodyPart,
          limit,
          offset
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  },
  getExerciseById: async (id) => {
    try {
      const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/${id}`, {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching exercise by ID:', error);
      throw error;
    }
  }
};

export default ExerciseService;
