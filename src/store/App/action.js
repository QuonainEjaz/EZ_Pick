export const SET_PARENT = parent => {
  return {
    type: 'SET_PARENT',
    payload: parent,
  };
};
export const SET_GUARDIAN = guardian => {
  return {
    type: 'SET_GUARDIAN',
    payload: guardian,
  };
};
export const SET_loginData = loginData => {
  return {
    type: 'SET_loginData',
    payload: loginData,
  };
};
export const setStudents = students => {
  return {
    type: 'SET_STUDENTS',
    payload: students,
  };
};
export const setSmartLogin = status => ({
  type: 'SET_SMART_LOGIN',
  payload: status,
});
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
export const setSchools = schools => {
  return {
    type: 'SET_Schools',
    payload: schools,
  };
};
export const setLanguage = language => {
  return {
    type: 'SET_LANGUAGE',
    payload: language,
  };
};
export const Set_Notifications = notifications => {
  return {
    type: 'FETCH_NOTIFICATIONS_SUCCESS',
    payload: notifications,
  };
};

export const UPDATE_STUDENT_ProfileUrl = ({ studentId, profileUrl }) => ({
  type: 'UPDATE_STUDENT_ProfileUrl',
  payload: { studentId, profileUrl },
});