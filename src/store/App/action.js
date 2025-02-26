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
