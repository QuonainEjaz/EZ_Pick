import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

export const AddIcon = props => (
  <Svg width="32" height="32" viewBox="0 0 32 32" {...props}>
    {/* <Rect width={32} height={32} fill="#FEF6E6" rx={10} /> */}
    <Rect width={16} height={16} x={8} y={8} fill="none" stroke="#6C757D" strokeWidth={2} rx={3} />
    <Path
      stroke="#6C757D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M16.333 13v6.667M13 16.333h6.667"
    />
  </Svg>
);
export const FocusedAddIcon = props => (
  <Svg width="32" height="32" viewBox="0 0 32 32" {...props}>
    <Rect width={32} height={32} fill="#FEF6E6" rx={10} />
    <Rect width={16} height={16} x={8} y={8} fill="#F8AC16" rx={3} />
    <Path
      stroke="#FFFFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M16.333 13v6.667M13 16.333h6.667"
    />
  </Svg>
);
