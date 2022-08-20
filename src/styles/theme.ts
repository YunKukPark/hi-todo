import { DefaultTheme } from 'styled-components';

const fontFamilies = {
  main: 'Noto Sans KR, sans-serif',
};

const fontSizes = {
  // font size 같은걸로 연산을 하지 않으니 string 으로 설정
  xxs: '12px',
  xs: '13px',
  sm: '14px',
  base: '16px',
  md: '18px',
  lg: '24px',
};

const lineHeights = {
  xxs: '16px',
  xs: '20px',
  sm: '24px',
  base: '24px',
  md: '28px',
  lg: '34px',
};

const letterSpacings = {
  xxs: '-0.005em',
  xs: '-0.01em',
  sm: '-0.01em',
  base: '-0.01em',
  md: '-0.02em',
  lg: '-0.01em',
};

/* TODO: palette 만들기
 * color는 semantic 하게 이름 짓는게 좋을까? ex) text, border, background ...etc
 * 색깔 그대로 scale로 적는게 좋을까? ex) CR50 or dark, white, black ...etc
 * palette에서 scale을 관리 하고 color에서 semantic 하게 이름을 준다.
 */
const colors = {
  black: '#000',
  text: '#333333',
  border: '#DDDDDD',
  gray: '#8c8d96',
  lightGray: '#b2b3b9',
  background: '#EDEEF0',
  wallpaper: '#FAFAFA',
  white: '#FFF',

  primary: {
    light: '#92DDF6',
    base: '#34C5F0',
    dark: '#009FCE',
  },

  semantic: {
    success: '#60B527',
    error: '#ff3932',
    warning: '#f79009',
  },
};

const theme: DefaultTheme = {
  fontFamilies,
  fontSizes,
  lineHeights,
  letterSpacings,
  colors,
};

export default theme;
