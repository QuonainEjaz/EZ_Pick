const initialState = {
  isFirstLoad: true,
  students: [
    {
      id: '1',
      name: 'Jabir bin Hayan Albarsi',
      grade: 'Grade 7th',
      date: '02 Jan 2024',
      pickupTime: '12:30 PM',
      image:
        'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
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
      date: '02 Jan 2024',
      requestTime: '12:30 PM',
      responseTime: '12:32 PM',
      confirmTime: '12:38 PM',
    },
    {
      id: '2',
      name: 'Umar bin Alkufi',
      grade: 'Grade 8th',
      date: '02 Jan 2024',
      pickupTime: '12:45 PM',
      image:
        'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
      range: 'out_of_range',
      status: 'Pending',
      timer: {
        hours: '00',
        minutes: '03',
        seconds: '10',
      },
      studentId: 'ST7890234',
      grade: '7B',
      requestBy: 'Parent',
      date: '02 Jan 2024',
      requestTime: '12:40 PM',
      responseTime: '12:42 PM',
      confirmTime: '12:48 PM',
    },
    {
      id: '3',
      name: 'Ali bin Abi Talib Albarsi',
      grade: 'Grade 9th',
      date: '02 Jan 2024',
      pickupTime: '01:00 PM',
      image:
        'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
      range: 'request_accepted',
      status: 'In Progress',
      timer: {
        hours: '00',
        minutes: '01',
        seconds: '20',
      },
      studentId: 'ST1548632',
      grade: '6C',
      requestBy: 'Parent',
      date: '02 Jan 2024',
      requestTime: '12:55 PM',
      responseTime: '12:57 PM',
      confirmTime: '01:03 PM',
    },
    {
      id: '4',
      name: 'Fatima bin Muhammad',
      grade: 'Grade 6th',
      date: '02 Jan 2024',
      pickupTime: '01:15 PM',
      image:
        'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
      range: 'ready_to_pickup',
      status: 'Picked',
      timer: {
        hours: '00',
        minutes: '00',
        seconds: '45',
      },
      studentId: 'ST9823475',
      grade: '8A',
      requestBy: 'Driver',
      date: '02 Jan 2024',
      requestTime: '01:10 PM',
      responseTime: '01:12 PM',
      confirmTime: '01:18 PM',
    },
    {
      id: '5',
      name: 'Hassan bin Ali',
      grade: 'Grade 7th',
      date: '02 Jan 2024',
      pickupTime: '01:45 PM',
      image:
        'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
      range: 'request_sent',
      status: 'Pending',
      timer: {
        hours: '00',
        minutes: '04',
        seconds: '30',
      },
      studentId: 'ST2839401',
      grade: '6B',
      requestBy: 'Parent',
      date: '02 Jan 2024',
      requestTime: '01:40 PM',
      responseTime: '01:42 PM',
      confirmTime: '01:47 PM',
    },
    {
      id: '6',
      name: 'Zaynab bin Ali',
      grade: 'Grade 9th',
      date: '02 Jan 2024',
      pickupTime: '02:00 PM',
      image:
        'https://th.bing.com/th/id/R.29b9abf79392b775503a4c001d62c6b6?rik=ZNrA1V2yiKFI8A&riu=http%3a%2f%2fmantraya.org%2fwp-content%2fuploads%2f2018%2f06%2fPassport-Size.jpg&ehk=ICOC3izvQ2e2mFkTFjJG0jefCqcsUS17n%2f1kjq7uIzI%3d&risl=&pid=ImgRaw&r=0',
      range: 'in_range',
      status: 'In Progress',
      timer: {
        hours: '00',
        minutes: '00',
        seconds: '35',
      },
      studentId: 'ST7493018',
      grade: '8B',
      requestBy: 'Driver',
      date: '02 Jan 2024',
      requestTime: '01:55 PM',
      responseTime: '01:57 PM',
      confirmTime: '02:03 PM',
    },
  ],
  notifications: {
    TODAY: [
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica.png',
        title: "Hey, the pickup's off!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-2.png',
        title: 'Awesome! Your pickup is all set!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    YESTERDAY: [
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-3.png',
        title: "Here's what we've got for pickups today!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-4.png',
        title: 'Great news! Your pickup is confirmed!',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
    'October 2, 2024': [
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-5.png',
        title: "Check out today's pickup lineup!",
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: 'https://dashboard.codeparrot.ai/api/image/Z7cMKf3atcswnotk/notifica-6.png',
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
