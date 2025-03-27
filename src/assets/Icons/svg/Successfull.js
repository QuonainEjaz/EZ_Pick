import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Success = ({ width = 36, height = 36, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}   // Now uses prop value
    height={height} // Now uses prop value
    viewBox="0 0 36 36"  // Added viewBox for proper scaling
    fill="none"
    {...props}
  >
    <Circle cx={18} cy={18} r={16.5} fill="#F8AC16" />
    <Path
      stroke="#FEEFD2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m11.25 18 4.5 4.5 9-9M33 18c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C3 9.716 9.716 3 18 3c8.284 0 15 6.716 15 15Z"
    />
  </Svg>
);

export default Success;