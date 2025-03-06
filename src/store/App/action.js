
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
export const setToken = () => {
  return {
    type: 'Set_TOKEN',
  };
};