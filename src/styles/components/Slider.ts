import { styled } from '../index';

export const Container = styled('div', {
  width: '90%',
  height: '546px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  '#slider': {
    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    scrollBehavior: 'smooth',

    '&::-webkit-scrollbar': {
      display: 'none'
    },

    '.card': {
      position: 'relative',
      padding: '20px',
      width: '500px',
      height: '500px',
      boxShadow: '5px 5px 5px rgb(182, 192, 209, 0.5)',
      background: '#FFF',
      borderRadius: '20px',
      display: 'inline-block',
      margin: '0 5px',
      overflowY: 'auto',
      overflowWrap: 'break-word',
      whiteSpace: 'normal',

      h3: {
        fontWeight: 'bold'
      },

      p: {
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: 1.6,
        fontWeight: 'bold',
      }

    }
  },

  '.slider-icon': {
    background: '#FFF',
    borderRadius: '100%',
    position: 'absolute',
    cursor: 'pointer',
    opacity: '0.5',
    transition: 'opacity 0.2s',

    '&.left': {
      left: 0,
      color: '#FFF',
      zIndex: '1'
    },

    '&.right': {
      right: 0,
      color: '#FFF'
    },

    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.2s'
    },
  },

  

})