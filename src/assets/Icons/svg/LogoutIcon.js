import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const LogoutIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={78}
    height={77}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#F8AC16"
        d="M65.042 64.55c14.387-14.387 14.387-37.713 0-52.1s-37.713-14.387-52.1 0-14.387 37.713 0 52.1 37.713 14.387 52.1 0Z"
      />
      <Path
        fill="#D08D06"
        fillRule="evenodd"
        d="M21.713 55.653 41.33 75.27c18.407-1.15 33.15-15.812 34.424-34.185L56.017 21.348H21.713v34.305Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M51.51 51.141H26.227V25.86H51.51v4.45h4.507v-8.961H21.713v34.305h34.304V46.69H51.51v4.45Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m45.899 33.893 2.42 2.42H33.666v4.511H48.32l-2.42 2.42 3.191 3.192 7.865-7.867-7.865-7.866-3.191 3.19Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h77v77H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default LogoutIcon;
