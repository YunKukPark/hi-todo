import { css, TypographyScale } from 'styled-components';
import theme from 'styles/theme';

export function textStyle(size: TypographyScale) {
  return css`
    font-size: ${theme.fontSizes[size]};
    line-height: ${theme.lineHeights[size]};
    letter-spacing: ${theme.letterSpacings[size]};
  `;
}
