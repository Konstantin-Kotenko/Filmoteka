document?.addEventListener('DOMContentLoaded', event => {
  const rotateCard = () => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.classList.toggle('rotate');
  };

  const btnSignup = document.querySelector('#btn-signup'),
    btnLogin = document.querySelector('#btn-login');

  btnSignup?.addEventListener('click', rotateCard);
  btnLogin?.addEventListener('click', rotateCard);

  const seePassword = () => {
    const seePwdIcon = document.querySelector('.see-password'),
      pwdInput = document.querySelector('.group input');

    seePwdIcon?.addEventListener('mousedown', () => {
      pwdInput.type = 'text';
    });

    seePwdIcon?.addEventListener('mouseup', () => {
      pwdInput.type = 'password';
    });

    seePwdIcon?.addEventListener('mouseover', () => {
      pwdInput.type = 'password';
    });
  };

  seePassword();
});

const comebacks = document.getElementById('comebacks');

export const onHandleComebacksClick = () => {
  window.location.replace(
    'https://konstantin-kotenko.github.io/Filmoteka/index.html'
  );
};

comebacks?.addEventListener('click', onHandleComebacksClick);
