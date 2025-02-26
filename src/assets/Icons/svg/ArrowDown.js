import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArrowDown = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#6C757D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15 7.5-5 5-5-5"
    />
  </Svg>
);
export default ArrowDown;
