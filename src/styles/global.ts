import { globalCss } from '.';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    outline: 0
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    fontFamily: 'Roboto Slab, serif',
    background: '#fff',
    color: '#000'
  },

  'h1, h2, h3, h4, h5, h6, strong': {
    fontWeight: 500
  },

  button: {
    cursor: 'pointer'
  }
});