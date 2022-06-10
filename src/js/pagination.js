import { requestForMovie } from '../js/fetch/fetchByKey';
import { requestForPage } from '../js/fetch/trendingMovie';

const pageRefs = {
  paginationContainer: document.querySelector('.pagination__container'),
  pageBtn: document.querySelector('.pagination__button'),
  arrowLeft: document.querySelector('.arrow-left'),
  arrowRight: document.querySelector('.arrow-right'),
  page1Btn: document.querySelector('.startBtn'),
  pageArr: document.querySelectorAll('[data-index]'),
  lastPageBtn: document.querySelector('.pagination__button--last'),
  prevDots: document.querySelector('#previous'),
  afterDots: document.querySelector('#after'),
  input: document.querySelector('.search-field'),
};

let currentPage = 1;
let btns = document.querySelectorAll('.pagination__button');


const onPageBtnClick = e => {
  let lastPage = pageRefs.lastPageBtn.textContent;
  if (e.target.tagName === 'BUTTON') {
    if (Number(e.target.textContent)) {
      currentPage = Number(e.target.textContent);
    }
    if (pageRefs.pageBtn) {
      btns.forEach(btn => btn.classList.remove('pagination__button--current'));
      e.target.classList.add('pagination__button--current');
    }
    if (e.target === pageRefs.arrowRight && currentPage < Number(lastPage)) {
      pageRefs.pageArr.forEach(page => {
        page.textContent = Number(page.textContent) + 5;
      });
      currentPage = pageRefs.pageArr[0].textContent;
      pageRefs.pageArr[0].classList.add('pagination__button--current');
    }
    if (e.target === pageRefs.arrowLeft && currentPage >= 5) {
      pageRefs.pageArr.forEach(page => {
        page.textContent = Number(page.textContent) - 5;
      });
      currentPage = pageRefs.pageArr[0].textContent;
      pageRefs.pageArr[4].classList.add('pagination__button--current');
    }
    if (
      e.target === pageRefs.page1Btn ||
      e.target === pageRefs.pageArr[0].textContent
    ) {
      pageRefs.pageArr[0].textContent = 1;
      pageRefs.pageArr[1].textContent = 2;
      pageRefs.pageArr[2].textContent = 3;
      pageRefs.pageArr[3].textContent = 4;
      pageRefs.pageArr[4].textContent = 5;
      pageRefs.page1Btn.classList.add('pagination__button--current');
      pageRefs.pageArr[0].classList.add('pagination__button--current');
      currentPage = pageRefs.page1Btn.textContent;
      pageRefs.arrowLeft.hidden = true;
      pageRefs.prevDots.hidden = true;
      pageRefs.page1Btn.hidden = true;
    }
    if (e.target === pageRefs.lastPageBtn) {
      pageRefs.pageArr[0].textContent =
        Number(lastPage) - 4;
      pageRefs.pageArr[1].textContent =
        Number(lastPage) - 3;
      pageRefs.pageArr[2].textContent =
        Number(lastPage) - 2;
      pageRefs.pageArr[3].textContent =
        Number(lastPage) - 1;
      pageRefs.pageArr[4].textContent = lastPage;
      pageRefs.pageArr[4].classList.add('pagination__button--current');
      currentPage = pageRefs.pageArr[4].textContent;
      pageRefs.arrowRight.hidden = true;
      pageRefs.afterDots.hidden = true;
      pageRefs.lastPageBtn.hidden = true;
    }
    if (Number(currentPage) > 5) {
      pageRefs.arrowLeft.hidden = false;
      pageRefs.prevDots.hidden = false;
      pageRefs.page1Btn.hidden = false;
    }
    const lastRawPage = Number(lastPage) - 4;
    
    if (Number(currentPage) < lastRawPage) {
      pageRefs.arrowRight.hidden = false;
      pageRefs.afterDots.hidden = false;
      pageRefs.lastPageBtn.hidden = false;
    }
    if (Number(currentPage) >= lastRawPage) {
      pageRefs.arrowRight.hidden = true;
      pageRefs.afterDots.hidden = true;
      pageRefs.lastPageBtn.hidden = true;
    }
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pageRefs.input.value !== '') {
      console.log(pageRefs.input.value);
     
      requestForMovie();
    } else {
      requestForPage();
    }
  }
};
// let pageSize = 9;
// export const defineResultsPerPage = () => {
//   if (window.innerWidth >= 1024) {
//     pageSize = 9;
//   } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
//     pageSize = 8;
//   } else if (window.innerWidth < 768) {
//     pageSize = 4;
//   }
//   return pageSize;
// };

pageRefs.paginationContainer.addEventListener('click', onPageBtnClick);
export { currentPage, pageRefs };
