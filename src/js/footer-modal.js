const refs = {
  openBtn: document.querySelector('.js-open-modal'),
  closeBtn: document.querySelector('.footer-modal-close-btn'),
  modal: document.querySelector('.backdrop'),
};
export const openModal = () => {
  refs.modal.classList.remove('is-hidden');
};
export const closeModal = () => {
  refs.modal.classList.add('is-hidden');
};
refs.openBtn.addEventListener('click', openModal);
refs.closeBtn.addEventListener('click', closeModal);
