import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const QRIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#212529"
        d="M3.833 3.333h5v5h-5v-5Zm13.334 0v5h-5v-5h5Zm-5 9.167h1.666v-1.667h-1.666V9.167h1.666v1.666H15.5V9.167h1.667v1.666H15.5V12.5h1.667V15H15.5v1.667h-1.667V15h-2.5v1.667H9.667v-3.334h2.5V12.5Zm1.666 0V15H15.5v-2.5h-1.667Zm-10 4.167v-5h5v5h-5ZM5.5 5v1.667h1.667V5H5.5Zm8.333 0v1.667H15.5V5h-1.667ZM5.5 13.333V15h1.667v-1.667H5.5ZM3.833 9.167H5.5v1.666H3.833V9.167Zm4.167 0h3.333V12.5H9.667v-1.667H8V9.167ZM9.667 5h1.666v3.333H9.667V5Zm-7.5-3.333V5H.5V1.667A1.667 1.667 0 0 1 2.167 0H5.5v1.667H2.167ZM18.833 0A1.666 1.666 0 0 1 20.5 1.667V5h-1.667V1.667H15.5V0h3.333ZM2.167 15v3.333H5.5V20H2.167A1.667 1.667 0 0 1 .5 18.333V15h1.667Zm16.666 3.333V15H20.5v3.333A1.666 1.666 0 0 1 18.833 20H15.5v-1.667h3.333Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default QRIcon
