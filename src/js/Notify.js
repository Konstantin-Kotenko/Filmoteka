import { Notify } from 'notiflix';

Notify.init({
  width: '480px',
  position: 'center-center',
  distance: '0px',
  timeout: 1000,
  opacity: 1,
  fontSize: '20px',
  useIcon: false,
  fontAwesomeIconSize: '0px',
  failure: {
    background: 'transparent',
    textColor: '#FF001B',
  },
  warning: {
    background: '#dcdcdc',
    textColor: '#f61c0d',
  },
  info: {
    background: 'transparent',
    textColor: '#f61c0d',
  },
});

if (window.innerWidth < 768) {
  Notify.init({
    width: '270px',
    timeout: 1000,
    position: 'center-center',
    distance: '0px',
    fontSize: '18px',
    useIcon: false,
    fontAwesomeIconSize: '0px',
    cssAnimationStyle: 'fade',
    failure: {
      background: 'transparent',
      textColor: '#FF001B',
    },
    warning: {
      background: '#dcdcdc',
      textColor: '#f61c0d',
    },
    info: {
      background: 'transparent',
      textColor: '#f61c0d',
    },
  });
}

export const onChangeSize = () => {
  if (window.innerWidth < 768) {
    Notify.init({
      width: '300px',
      timeout: 1000,
      position: 'center-top',
      distance: '0px',
      fontSize: '12px',
      useIcon: false,
      fontAwesomeIconSize: '0px',
      failure: {
        background: 'transparent',
        textColor: '#FF001B',
      },
      warning: {
        background: '#edf5f5d0',
        textColor: '#ff6b08',
      },
      info: {
        background: '#ff6b08',
      },
    });
  } else {
    Notify.init({
      width: '550px',
      timeout: 1000,
      position: 'center-top',
      distance: '150px',
      opacity: 1,
      fontSize: '16px',
      useIcon: false,
      fontAwesomeIconSize: '0px',
      failure: {
        background: 'transparent',
        textColor: '#FF001B',
      },
      warning: {
        background: '#edf5f5d0',
        textColor: '#ff6b08',
      },
      info: {
        background: '#ff6b08',
      },
    });
  }
};
