import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Approved = ({ size = 20 }) => {
  const strokeWidth = size * 0.08; // Dynamic stroke width (around 1.667 for size 20)
  const circleRadius = size * 0.4; // Dynamic radius (8.75 for size 20)

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Background Circle */}
      <Circle cx={size / 1.9} cy={size / 2.1} r={circleRadius} fill="#F8AC16" />

      {/* Tick Mark */}
      <Path
        d={`M${size * 0.3125} ${size * 0.5} L${size * 0.4375} ${size * 0.625} L${size * 0.75} ${size * 0.375}`}
        stroke="white"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Approved;

