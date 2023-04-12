import { Palette, PaletteColor } from '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tertiary: PaletteColor;
  }
  interface PaletteColor {
    [key: number]: string;
  }
}