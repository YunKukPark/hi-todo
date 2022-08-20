import 'styled-components';

declare module 'styled-components' {
  export type TypographyScale = 'xxs' | 'xs' | 'sm' | 'base' | 'md' | 'lg';
  type SemanticColor = 'success' | 'error' | 'warning';
  type ColorScale = 'light' | 'base' | 'dark';

  export interface DefaultTheme {
    fontFamilies: {
      main: string;
    };

    fontSizes: {
      [K in TypographyScale]: string;
    };

    lineHeights: {
      [K in TypographyScale]: string;
    };

    letterSpacings: {
      [K in TypographyScale]: string;
    };

    colors: {
      black: string;
      text: string;
      border: string;
      background: string;
      wallpaper: string;
      gray: string;
      lightGray: string;
      white: string;

      primary: {
        [K in ColorScale]: string;
      };

      semantic: {
        [K in SemanticColor]: string;
      };
    };
  }
}
