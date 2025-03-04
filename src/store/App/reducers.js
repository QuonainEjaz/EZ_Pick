import {NotificationScreenIcons} from '../../assets/Icons/svg/NotificationScreenIcons';
const initialState = {
  isFirstLoad: true,
  students: [
    {
      id: '1',
      name: 'Jabir bin Hayan Albarsi',
      arabicName: 'جابر بن حيان',
      gender: 'Male',
      email: 'jabir@whetstonez.com',
      grade: 'Grade 7th',
      date: '01 Feb 2025',
      pickupTime: '12:30 PM',
      image:
        'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655477/Profile_Image_2_xqxfag.png',
      range: 'pickup_successful',
      status: 'Picked',
      timer: {
        hours: '00',
        minutes: '02',
        seconds: '00',
      },
      studentId: 'ST6562984',
      grade: '6A',
      requestBy: 'Driver',
      requestTime: '12:30 PM',
      responseTime: '12:32 PM',
      confirmTime: '12:38 PM',
      role: 'Driver',
    },
    {
      id: '2',
      name: 'Umar bin Alkufi',
      arabicName: 'عمر بن الكوفي',
      gender: 'Male',
      email: 'umar@whetstonez.com',
      grade: 'Grade 8th',
      date: '02 Jan 2024',
      pickupTime: '12:45 PM',
      image:
        'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655644/Profile_Image_3_h3fxlt.png',
      range: 'out_of_range',
      status: 'Pending',
      timer: {
        hours: '00',
        minutes: '03',
        seconds: '10',
      },
      studentId: 'ST7890234',
      requestBy: 'Parent',
      requestTime: '12:40 PM',
      responseTime: '12:42 PM',
      confirmTime: '12:48 PM',
      role: 'Brother',
    },
    {
      id: '3',
      name: 'Ali bin Abi Talib Albarsi',
      arabicName: 'علي بن أبي طالب',
      gender: 'Male',
      email: 'ali@whetstonez.com',
      grade: 'Grade 9th',
      date: '02 Jan 2024',
      pickupTime: '01:00 PM',
      image:
        'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655379/Profile_Image_1_qpmrhe.png',
      range: 'request_accepted',
      status: 'In Progress',
      timer: {
        hours: '00',
        minutes: '01',
        seconds: '20',
      },
      studentId: 'ST1548632',
      requestBy: 'Parent',
      requestTime: '12:55 PM',
      responseTime: '12:57 PM',
      confirmTime: '01:03 PM',
      role: 'Uncle',
    },
    {
      id: '4',
      name: 'Sara al Nasr',
      arabicName: 'سارة النصر',
      gender: 'Female',
      email: 'fatima@whetstonez.com',
      grade: 'Grade 6th',
      date: '02 Jan 2024',
      pickupTime: '01:15 PM',
      image:
        'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655665/Profile_Image_4_mf0fcq.png',
      range: 'ready_to_pickup',
      status: 'Picked',
      timer: {
        hours: '00',
        minutes: '00',
        seconds: '45',
      },
      studentId: 'ST9823475',
      requestBy: 'Driver',
      requestTime: '01:10 PM',
      responseTime: '01:12 PM',
      confirmTime: '01:18 PM',
      role: 'Guardian',
    },
    {
      id: '5',
      name: 'Rami al- Jabari',
      arabicName: 'رامي الجباري',
      gender: 'Male',
      email: 'hassan@whetstonez.com',
      grade: 'Grade 7th',
      date: '02 Jan 2024',
      pickupTime: '01:45 PM',
      image:
        'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655653/Profile_Image_5_at2qw9.png',
      range: 'request_sent',
      status: 'Pending',
      timer: {
        hours: '00',
        minutes: '04',
        seconds: '30',
      },
      studentId: 'ST2839401',
      requestBy: 'Parent',
      requestTime: '01:40 PM',
      responseTime: '01:42 PM',
      confirmTime: '01:47 PM',
      role: 'Brother',
    },
    {
      id: '6',
      name: 'Zaynab bin Ali',
      arabicName: 'زينب بنت علي',
      gender: 'Female',
      email: 'zaynab@whetstonez.com',
      grade: 'Grade 9th',
      date: '02 Jan 2024',
      pickupTime: '02:00 PM',
      image:
        'https://res.cloudinary.com/dgv3dpaa8/image/upload/v1740655665/Profile_Image_4_mf0fcq.png',
      range: 'in_range',
      status: 'In Progress',
      timer: {
        hours: '00',
        minutes: '00',
        seconds: '35',
      },
      studentId: 'ST7493018',
      requestBy: 'Driver',
      requestTime: '01:55 PM',
      responseTime: '01:57 PM',
      confirmTime: '02:03 PM',
      role: 'Uncle',
    },
  ],

  notifications: {
    TODAY: [
      {
        icon: <NotificationScreenIcons.WalletMinusIcon/>,
        title: "Hey, the pickup's off!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: <NotificationScreenIcons.WalletMinusIcon/>,
        title: 'Awesome! Your pickup is all set!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    YESTERDAY: [
      {
        icon: <NotificationScreenIcons.AddSquareIcon/>,
        title: "Here's what we've got for pickups today!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: <NotificationScreenIcons.WalletMinusIcon/>,
        title: 'Great news! Your pickup is confirmed!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    'October 2, 2024': [
      {
        icon: <NotificationScreenIcons.AddSquareIcon/>,
        title: "Check out today's pickup lineup!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: <NotificationScreenIcons.FrameIcon/>,
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
