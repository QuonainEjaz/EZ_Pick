import axios from 'axios';

export const setStudents = students => {
  return {
    type: 'SET_STUDENTS',
    payload: students,
  };
};

export const toggleFirstLoad = () => {
  return {
    type: 'TOGGLE_FIRST_LOAD',
  };
};

export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api.example.com/students'); // Replace with your API URL

      if (response.data.success) {
        dispatch(setStudents(response.data.students));  // Passing the students array to Redux
      } else {
        console.error('Failed to fetch students:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
};