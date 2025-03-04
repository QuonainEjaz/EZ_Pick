import { NotificationScreenIcons } from '../../assets/Icons/svg/NotificationScreenIcons';

const initialState = {
  isFirstLoad: true,
  students: [],
  notifications: {
    TODAY: [
      {
        icon: <NotificationScreenIcons.WalletMinusIcon />,
        title: "Hey, the pickup's off!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: <NotificationScreenIcons.WalletMinusIcon />,
        title: 'Awesome! Your pickup is all set!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    YESTERDAY: [
      {
        icon: <NotificationScreenIcons.AddSquareIcon />,
        title: "Here's what we've got for pickups today!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: <NotificationScreenIcons.WalletMinusIcon />,
        title: 'Great news! Your pickup is confirmed!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    'October 2, 2024': [
      {
        icon: <NotificationScreenIcons.AddSquareIcon />,
        title: "Check out today's pickup lineup!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: <NotificationScreenIcons.FrameIcon />,
        title: "You're all set up with your account!",
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
  },
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FIRST_LOAD':
      return {
        ...state,
        isFirstLoad: !state.isFirstLoad,
      };
    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.payload,
      };

    default:
      return state;
  }
};

export default studentsReducer;
