import * as React from "react"
import Svg, { Path } from "react-native-svg"
const GoogleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#4285F4"
      d="M6.273 19.942v-8.114L3.756 9.526 1.5 8.249v10.26c0 .793.642 1.433 1.432 1.433h3.34Z"
    />
    <Path
      fill="#34A853"
      d="M17.727 19.942h3.341c.792 0 1.432-.642 1.432-1.432V8.249l-2.556 1.463-2.217 2.116v8.114Z"
    />
    <Path
      fill="#EA4335"
      d="m6.273 11.828-.343-3.17.343-3.034L12 9.919l5.727-4.295.383 2.87-.383 3.334L12 16.124l-5.727-4.296Z"
    />
    <Path
      fill="#FBBC04"
      d="M17.727 5.623v6.205l4.773-3.58V6.34c0-1.77-2.021-2.78-3.436-1.718l-1.337 1.002Z"
    />
    <Path
      fill="#C5221F"
      d="m1.5 8.248 2.195 1.647 2.578 1.933V5.623L4.936 4.621C3.52 3.56 1.5 4.57 1.5 6.34v1.91Z"
    />
  </Svg>
)
export default GoogleIcon
