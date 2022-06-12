const loginText = document.querySelector('.title-text .login');
const loginForm = document.querySelector('form.login');
const loginBtn = document.querySelector('label.login');
const signupBtn = document.querySelector('label.signup');
const signupLink = document.querySelector('form .signup-link a');
const iconBack = document.querySelector('#iconBack');

const onHandleSignupBtn = () => {
  loginForm.style.marginLeft = '-50%';
  loginText.style.marginLeft = '-50%';
};

const onHandleloginBtn = () => {
  loginForm.style.marginLeft = '0%';
  loginText.style.marginLeft = '0%';
};

const onHandleSignupLink = () => {
  onHandleSignupBtn();
  return false;
};

const onHandleIconBack = () => {
  window.location.replace('index.html');
};

iconBack?.addEventListener('click', onHandleIconBack);
signupBtn?.addEventListener('click', onHandleSignupBtn);
loginBtn?.addEventListener('click', onHandleloginBtn);
signupLink?.addEventListener('click', onHandleSignupLink);
