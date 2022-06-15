import { refs } from './refs';

document?.addEventListener('DOMContentLoaded', event => {
  const rotateCard = () => {
    refs.auth.cardContainer.classList.toggle('rotate');
  };

  refs.auth.btnSignup?.addEventListener('click', rotateCard);
  refs.auth.btnLogin?.addEventListener('click', rotateCard);

  const seePassword = () => {
    refs.auth.seePwdIcon?.addEventListener('mousedown', () => {
      pwdInput.type = 'text';
    });

    refs.auth.seePwdIcon?.addEventListener('mouseup', () => {
      pwdInput.type = 'password';
    });

    refs.auth.seePwdIcon?.addEventListener('mouseover', () => {
      pwdInput.type = 'password';
    });
  };

  seePassword();
});
