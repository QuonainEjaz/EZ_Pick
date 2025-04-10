const initialState = {
  selectedLanguage: 'English',
  isFirstLoad: true,
  baseUrl: 'https://api.ezpick.co',
  loginData: {},
  parent: {},
  guardian: [],
  students: [],
  schools: [],
  token: null,
  smartLoginEnabled: false,
  notifications: {},
  scannedUserId: null,
  range: {
    1: 'pickup_successful',
    2: 'out_of_range',
    3: 'request_accepted',
    4: 'ready_to_pickup',
    5: 'request_sent',
    6: 'in_range',
  },
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FIRST_LOAD':
      return {
        ...state,
        isFirstLoad: !state.isFirstLoad,
      };
    case 'SET_loginData':
      return {
        ...state,
        loginData: action.payload,
      };
    case 'SET_SMART_LOGIN':
      return {...state, smartLoginEnabled: action.payload};
    case 'SET_PARENT':
      return {
        ...state,
        parent: action.payload,
      };
      case 'SET_GUARDIAN':
      return {
        ...state,
        guardian: action.payload,
        loading: false,
      }
    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_SCHOOLS':
      return {
        ...state,
        schools: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        selectedLanguage: action.payload,
      };
      case 'UPDATE_STUDENT_ProfileUrl':
        return {
          ...state,
          students: state.students.map(student =>
            student.id === action.payload.studentId
              ? { ...student, profileUrl: action.payload.profileUrl }
              : student,
          ),
        };
    case 'SET_SCANNED_USER_ID':
      return {
        ...state,
        scannedUserId: action.payload,
      };
    case 'FETCH_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};

export default studentsReducer;
