import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArrowLeft = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    focusable="true"
    {...props}>
    <Path
      stroke="#6C757D"
      strokeLinecap="round"
      strokeWidth={2.2}
      d="m8 15.5 4.389-4.389a1.571 1.571 0 0 0 0-2.222L8 4.5"
    />
  </Svg>
);
export default ArrowLeft;
