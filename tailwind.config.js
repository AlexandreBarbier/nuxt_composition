const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    colors: {
      black: {
        200: '#DFE2E4',
        300: '#C0C5C9',
        400: '#A0A7AE',
        500: '#808A93',
        600: '#606D77',
        700: '#41505C',
        800: '#213241',
        900: '#011526'
      },
      blue: {
        200: '#E4EBEE',
        300: '#CAD7DC',
        400: '#AFC3CB',
        500: '#94AFB9',
        600: '#799AA8',
        700: '#5F8696',
        800: '#447285',
        900: '#295E73'
      },
      ab_error: {
        200: '#FDE7E7',
        300: '#FAD0CE',
        400: '#F8B8B6',
        500: '#F5A19E',
        600: '#F38985',
        700: '#F0716D',
        800: '#EE5A54',
        900: '#EB423C'
      },
      selected: {
        200: '#E2F3F2',
        300: '#C6E7E4',
        400: '#A9DBD7',
        500: '#8CCFC9',
        600: '#6FC2BC',
        700: '#53B6AE',
        800: '#36AAA1',
        900: '#199E93'
      },
      transparent: defaultTheme.colors.transparent,
      ab_gray: '#9FB3BF',
      white: defaultTheme.colors.white
    }
  }
}
