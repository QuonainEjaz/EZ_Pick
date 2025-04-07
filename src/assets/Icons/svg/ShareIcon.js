import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ShareButton = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F8AC16"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M15.826 8.933c.204-.174.305-.262.343-.365a.417.417 0 0 0 0-.282c-.038-.104-.14-.191-.343-.365L8.767 1.87c-.35-.301-.525-.451-.673-.455a.417.417 0 0 0-.334.153c-.093.115-.093.346-.093.807v3.58A8.055 8.055 0 0 0 1 13.886v.51a9.5 9.5 0 0 1 6.667-3.41v3.491c0 .461 0 .692.093.807.082.1.205.157.334.153.148-.003.323-.153.673-.454l7.06-6.05Z"
    />
  </Svg>
)
export default ShareButton;
