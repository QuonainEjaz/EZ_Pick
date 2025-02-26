import * as React from "react";
import {Svg,Rect,Path} from "react-native-svg";

const Export = ({ width = 28, height = 28, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#212529"
      d="M10.288 3.712a5.25 5.25 0 0 1 7.424 0l6.576 6.576a5.25 5.25 0 0 1 0 7.424l-6.576 6.576a5.25 5.25 0 0 1-7.424 0l-6.576-6.576a5.25 5.25 0 0 1 0-7.424l6.576-6.576Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.5 17.5v-.613c0-1.47 0-2.205.286-2.766a2.625 2.625 0 0 1 1.147-1.147c.562-.287 1.297-.287 2.767-.287h2.8m0 0-2.188 2.188m2.188-2.188L15.312 10.5"
    />
  </Svg>
);

export default Export;
