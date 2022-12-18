import { createTheme, Palette, PaletteOptions, ThemeOptions } from '@mui/material';
import { ColorPartial, SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { PartialDeep } from 'type-fest';

type ExtraThemeProp = { [any: string]: string | ExtraThemeProp };
type ExtendedPaletteOptions = PartialDeep<Palette> & {
  extra?: ExtraThemeProp;
};

declare module '@mui/material' {
  interface TypographyVariants {
    body30MulishRegular: React.CSSProperties;

    body28MulishRegular: React.CSSProperties;
    body28MulishBold: React.CSSProperties;
    body28MulishBlack: React.CSSProperties;

    body26MulishRegular: React.CSSProperties;

    body24MulishRegular: React.CSSProperties;
    body24MulishBold: React.CSSProperties;
    body24MulishBlack: React.CSSProperties;

    body22MulishRegular: React.CSSProperties;
    body20MulishRegular: React.CSSProperties;

    body18MulishRegular: React.CSSProperties;
    body18MulishSemiBold: React.CSSProperties;
    body18MulishExtraBold: React.CSSProperties;

    body16MulishRegular: React.CSSProperties;
    body16MulishSemiBold: React.CSSProperties;
    body16MulishBold: React.CSSProperties;
    body16ExtraBold: React.CSSProperties;

    body14MulishRegular: React.CSSProperties;
    body14MulishSemiBold: React.CSSProperties;
    body14MulishBold: React.CSSProperties;

    body12MulishRegular: React.CSSProperties;
    body12MulishSemiBold: React.CSSProperties;
    body12MulishBold: React.CSSProperties;

    body10MulishRegular: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body30MulishRegular: React.CSSProperties;

    body28MulishRegular: React.CSSProperties;
    body28MulishBold: React.CSSProperties;
    body28MulishBlack: React.CSSProperties;

    body26MulishRegular: React.CSSProperties;

    body24MulishRegular: React.CSSProperties;
    body24MulishBold: React.CSSProperties;
    body24MulishBlack: React.CSSProperties;

    body22MulishRegular: React.CSSProperties;
    body20MulishRegular: React.CSSProperties;

    body18MulishRegular: React.CSSProperties;
    body18MulishSemiBold: React.CSSProperties;
    body18MulishExtraBold: React.CSSProperties;

    body16MulishRegular: React.CSSProperties;
    body16MulishSemiBold: React.CSSProperties;
    body16MulishBold: React.CSSProperties;
    body16ExtraBold: React.CSSProperties;

    body14MulishRegular: React.CSSProperties;
    body14MulishSemiBold: React.CSSProperties;
    body14MulishBold: React.CSSProperties;

    body12MulishRegular: React.CSSProperties;
    body12MulishSemiBold: React.CSSProperties;
    body12MulishBold: React.CSSProperties;

    body10MulishRegular: React.CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    blue: ColorPartial;
    green: ColorPartial;
    yellow: ColorPartial;
    red: ColorPartial;
    gray: ColorPartial;
    darkGreen: ColorPartial;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body30MulishRegular: true;

    body28MulishRegular: true;
    body28MulishBold: true;
    body28MulishBlack: true;

    body26MulishRegular: true;

    body24MulishRegular: true;
    body24MulishBold: true;
    body24MulishBlack: true;

    body22MulishRegular: true;
    body20MulishRegular: true;

    body18MulishRegular: true;
    body18MulishSemiBold: true;
    body18MulishExtraBold: true;

    body16MulishRegular: true;
    body16MulishSemiBold: true;
    body16MulishBold: true;
    body16ExtraBold: true;

    body14MulishRegular: true;
    body14MulishSemiBold: true;
    body14MulishBold: true;

    body12MulishRegular: true;
    body12MulishSemiBold: true;
    body12MulishBold: true;

    body10MulishRegular: true;
  }
}

export const lightPalette: ExtendedPaletteOptions = {
  mode: 'light',
  primary: {
    main: 'linear-gradient(180deg, #E8A639 0%, #EBB340 50.84%, #F2CA4C 100%)',
    light: '#ffc107',
    dark: '#FB8500',
  },
  secondary: {
    main: '#25273d',
    
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: '#7A858C',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  error: {
    main: '#EB5757',
  },
  warning: {
    main: 'rgba(255, 178, 55, 0.2)',
  },
  
};

export const darkPalette: ExtendedPaletteOptions = {
  mode: 'dark',
  blue: {
    '50': '#F7F7FB',
    '100': '#D8D8FE',
    '200': '#B3B3FD',
    '300': '#8484F8',
    '400': '#6E6EF7',
    '500': '#4040F2',
    '600': '#3333D1',
    '700': '#2323BE',
    '800': '#181894',
    '900': '#0D0D54',
  },
  green: {
    '50': '#F6FFF0',
    '100': '#E6FBD9',
    '200': '#C9F884',
    '300': '#A0EC8A',
    '400': '#79D969',
    '500': '#44C13C',
    '600': '#2BA52E',
    '700': '#1E8A29',
    '800': '#0F5B1D',
    '900': '#073E16',
  },
  yellow: {
    '50': '#FFFEEC',
    '100': '#FFF9CF',
    '200': '#FFF19F',
    '300': '#FFE86F',
    '400': '#FFDE4B',
    '500': '#FFCF0F',
    '600': '#DBAD0A',
    '700': '#B78D07',
    '800': '#7B5C03',
    '900': '#4F3903',
  },
  red: {
    '50': '#FFF4EC',
    '100': '#FFE8D7',
    '200': '#FFCCB0',
    '300': '#FFA988',
    '400': '#FF886B',
    '500': '#FF513A',
    '600': '#DB302A',
    '700': '#B71D23',
    '800': '#931222',
    '900': '#7A0B21',
  },
  gray: {
    '50': '#FAFAFA',
    '100': '#F1F1F1',
    '200': '#EAECEE',
    '300': '#D6DADE',
    '400': '#A8B0B9',
    '500': '#717A8D',
    '600': '#4F5B67',
    '700': '#373F47',
    '800': '#242D35',
    '900': '#0D1B21',
  },
  darkGreen: {
    '50': '#02B0B0',
    '100': '#029E9E',
    '200': '#017E7E',
    '300': '#016B6B',
    '400': '#015858',
    '500': '#014E4E',
    '600': '#004545',
    '700': '#003939',
    '800': '#013535',
    '900': '#012D2D',
  },
  warning: {
    main: '#FFB21E',
  },
  error: {
    main: '#F93232',
  },
  success: {
    main: '#2AC89F',
  },
  primary: {
    main: '#f0b90b',
    light: '#242D35',
    dark: '#081319',
  },
  secondary: {
    main: '#6803B8',
    light: '#9A6AFF',
  },
  background: {
    default: '#000E12',
    paper: '#fff',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#1b1b1b',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
};

const getComponentTheme = (basePalette: ExtendedPaletteOptions): ThemeOptions => {
  return {
    typography: {
      fontFamily: "'Mulish', sans-serif",

      body30MulishRegular: {
        fontSize: '3rem',
        fontWeight: '400',
        lineHeight: '100%',
      },

      body28MulishRegular: {
        fontSize: '2.8rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body28MulishBold: {
        fontSize: '2.8rem',
        fontWeight: '700',
        lineHeight: '100%',
      },
      body28MulishBlack: {
        fontSize: '2.8rem',
        fontWeight: '900',
        lineHeight: '100%',
      },

      body26MulishRegular: {
        fontSize: '2.6rem',
        fontWeight: '400',
        lineHeight: '100%',
      },

      body24MulishRegular: {
        fontSize: '2.4rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body24MulishBold: {
        fontSize: '2.4rem',
        fontWeight: '700',
        lineHeight: '100%',
      },
      body24MulishBlack: {
        fontSize: '2.4rem',
        fontWeight: '900',
        lineHeight: '100%',
      },

      body22MulishRegular: {
        fontSize: '2.2rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body20MulishRegular: {
        fontSize: '2rem',
        fontWeight: '400',
        lineHeight: '100%',
      },

      body18MulishRegular: {
        fontSize: '1.8rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body18MulishSemiBold: {
        fontSize: '1.8rem',
        fontWeight: '600',
        lineHeight: '100%',
      },
      body18MulishExtraBold: {
        fontSize: '1.8rem',
        fontWeight: '800',
        lineHeight: '100%',
      },

      body16MulishRegular: {
        fontSize: '1.6rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body16MulishSemiBold: {
        fontSize: '1.6rem',
        fontWeight: '600',
        lineHeight: '100%',
      },
      body16MulishBold: {
        fontSize: '1.6rem',
        fontWeight: '700',
        lineHeight: '100%',
      },
      body16ExtraBold: {
        fontSize: '1.6rem',
        fontWeight: '800',
        lineHeight: '100%',
      },

      body14MulishRegular: {
        fontSize: '1.4rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body14MulishSemiBold: {
        fontSize: '1.4rem',
        fontWeight: '600',
        lineHeight: '100%',
      },
      body14MulishBold: {
        fontSize: '1.4rem',
        fontWeight: '700',
        lineHeight: '100%',
      },

      body12MulishRegular: {
        fontSize: '1.2rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
      body12MulishSemiBold: {
        fontSize: '1.2rem',
        fontWeight: '600',
        lineHeight: '100%',
      },
      body12MulishBold: {
        fontSize: '1.2rem',
        fontWeight: '700',
        lineHeight: '100%',
      },

      body10MulishRegular: {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '100%',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: false,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'text',
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            fontStyle: 'normal',
            '&:hover': {
              opacity: '0.9',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            width: '100%',
            p: 1.5,
            borderRadius: '0',
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.24)',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
            '& .MuiTouchRipple-root': {
              color: (basePalette.primary as SimplePaletteColorOptions).main,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 },
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiPopover-paper': {
              backgroundImage: 'none',
              backgroundColor: '#0C1620',
              border: '1px solid #242D35',
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          color: 'text.primary',
        },
      },
      MuiStack: {
        defaultProps: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  } as ThemeOptions;
};

export const getTheme = (mode: 'light' | 'dark') => {
  if (mode === 'light')
    return createTheme({
      palette: lightPalette as any as PaletteOptions,
      ...(getComponentTheme(lightPalette) as any as ThemeOptions),
    });
  return createTheme({
    palette: darkPalette as any as PaletteOptions,
    ...(getComponentTheme(darkPalette) as any as ThemeOptions),
  });
};
