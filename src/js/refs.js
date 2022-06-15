export const refs = {
  home: {
    formEl: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
  },
  library: {
    btnQueue: document.querySelector('.btn--queue'),
    libraryGallery: document.querySelector('.gallery--library'),
    btnWatched: document.querySelector('.btn--watched'),
  },
  pagination: {
    paginationList: document.querySelector('.pagination-list'),
    input: document.querySelector('.search-field'),
    libraryGallery: document.querySelector('.gallery--library'),
  },
  theme: {
    body: document.querySelector('body'),
    toggle: document.querySelector('.theme-switch__toggle'),
    footerDarktheme: document.querySelector('.footer'),
    wrapper: document.querySelector('.main-wrapper'),
  },
  trailer: {
    videoplayerBackdrop: document.querySelector('.videoplayer-backdrop'),
    videoplayerContainer: document.querySelector('.videoplayer-container'),
  },
  auth: {
    signupForm: document.getElementById('signupForm'),
    loginForm: document.getElementById('loginForm'),
    signOutBtn: document.getElementById('signOut'),
    googleBtn: document.getElementById('googleBtn'),
    cardContainer: document.querySelector('.card-container'),
    btnSignup: document.querySelector('#btn-signup'),
    btnLogin: document.querySelector('#btn-login'),
    seePwdIcon: document.querySelector('.see-password'),
    pwdInput: document.querySelector('.group input'),
  },
  scroll: {
    rootElement: document.documentElement,
    scrolltop: document.createElement('a'),
  },
  footer: {
    openBtn: document.querySelector('.js-open-modal'),
    backdrop: document.querySelector('.backdrop'),
  },
};
