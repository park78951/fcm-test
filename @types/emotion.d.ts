import "@emotion/react";
import { css } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      bgColor: string;
      black1: string;
      grey1: string;
      grey2: string;
      grey3: string;
      grey4: string;
      grey5: string;
      grey6: string;
      grey7: string;
      grey8: string;
      grey9: string;
      grey10: string;
      grey11: string;
      grey12: string;
      linkColor: string;
      linkHoverColor: string;
      modalBackscreenBgColor: string;
      modalBg: string;
      orange1: string;
      white1: string;
      white2: string;
      primaryBlue1: stirng;
      primaryBlue2: stirng;
      primaryBlue3: stirng;
      primaryBlue4: string;
      primaryBlue5: string;
      pressedBlue: stirng;
      disabledGrey: stirng;
      disabledGrey1: stirng;
      disabledGrey2: stirng;
      disabledGrey3: stirng;
      disabledGrey4: stirng;
      pressedGrey: string;
      errorRed: string;
      naturalBlack: string;
    };
    breakpoints: {
      s: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      desktop: number;
      tablet: number;
      mobile: number;
    };
    functions: {
      convertPxToVw: (px: number, viewport: number) => number;
      centerVh: () => string;
      hideScrollbar: () => string;
    };
    media: {
      desktop: typeof css;
      tablet: typeof css;
      mobile: typeof css;
      s: typeof css;
      sm: typeof css;
      md: typeof css;
      lg: typeof css;
      xl: typeof css;
      desktop: typeof css;
      tablet: typeof css;
      mobile: typeof css;
    };
    typographies: {
      IZE_XSM: number;
      ONT_SIZE_SM: number;
      ONT_SIZE_MD: number;
      ONT_SIZE_LG: number;
      ONT_SIZE_XLG: number;
      ONT_SIZE_H1: number;
      ONT_SIZE_H2: number;
      ONT_SIZE_H3: number;
      ONT_SIZE_H4: number;
      ONT_SIZE_H5: number;
      ONT_SIZE_H6: number;
      fontSize: {
        xxxlg: string;
        xxlg: string;
        xlg: string;
        lg: string;
        md: string;
        sm: string;
        xsm: string;
      };
      LINE_HEIGHTS: {
        XXXXL: string;
        XXXL: string;
        XXL: string;
        XL: string;
        L: string;
        M: string;
        S: string;
        XS: string;
        XXS: string;
      };
      fontWeight: {
        regular: number;
        medium: number;
        bold: number;
      };
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      H2: StyledComponent;
    };
  }
}
