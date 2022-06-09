import {fetchfilmsByKey, filmsParams, onSearch} from '../js/fetch/fetchByKey';
import {fetchPopularMovie, renderMovie, start} from '../js/fetch/trendingMovie';

 const pageRefs = {
    paginationContainer: document.querySelector('.pagination__container'),
    pageBtn: document.querySelector('.pagination__button'),
    arrowLeftBtn: document.querySelector('.arrow-left'),
    arrowRightBtn: document.querySelector('.arrow-right'),
    page1Btn: document.querySelector('.startBtn'),
    showedPageArr: document.querySelectorAll('[data-index]'),
    lastPageBtn: document.querySelector('.pagination__button--last'),
    prevDotsPage: document.querySelector('#previous'),
    afterDotsPage: document.querySelector('#after'),
    input: document.querySelector('.search-field'),
}

let currentPage = 1; 
let btns = document.querySelectorAll('.pagination__button');

pageRefs.arrowLeftBtn.hidden = true;
pageRefs.prevDotsPage.hidden = true;
pageRefs.page1Btn.hidden = true;

const onPageBtnClick = e => {
    if(e.target.tagName === 'BUTTON'){
    if(Number(e.target.textContent)){
      currentPage = Number(e.target.textContent);
}
if(pageRefs.pageBtn){
    btns.forEach(btn => btn.classList.remove('pagination__button--current'));
    e.target.classList.add('pagination__button--current');
}
if(e.target === pageRefs.arrowRightBtn && currentPage < 1000){
    pageRefs.showedPageArr[0].hidden = false;
    pageRefs.showedPageArr.forEach(page => {page.textContent = Number(page.textContent) + 5});
    btns.forEach(btn => btn.classList.remove('pagination__button--current'));
    currentPage = pageRefs.showedPageArr[0].textContent;
    pageRefs.showedPageArr[0].classList.add('pagination__button--current');
}
 if(e.target === pageRefs.arrowLeftBtn && currentPage >= 5){
    pageRefs.showedPageArr.forEach(page => {page.textContent = Number(page.textContent) - 5});
    btns.forEach(btn => btn.classList.remove('pagination__button--current'));
    currentPage = pageRefs.showedPageArr[0].textContent;
    pageRefs.showedPageArr[4].classList.add('pagination__button--current');
    pageRefs.arrowLeftBtn.hidden = true;
    pageRefs.prevDotsPage.hidden = true;
    pageRefs.page1Btn.hidden = true;
}
if (e.target === pageRefs.page1Btn || e.target === pageRefs.showedPageArr[0].textContent) {
    btns.forEach(el => el.classList.remove('pagination__button--current'));
    pageRefs.showedPageArr[0].textContent = 1;
    pageRefs.showedPageArr[1].textContent = 2;
    pageRefs.showedPageArr[2].textContent = 3;
    pageRefs.showedPageArr[3].textContent = 4;
    pageRefs.showedPageArr[4].textContent = 5;
    pageRefs.page1Btn.classList.add('pagination__button--current');
    pageRefs.showedPageArr[0].classList.add('pagination__button--current');
    currentPage = pageRefs.page1Btn.textContent;
    pageRefs.arrowLeftBtn.hidden = true;
    pageRefs.prevDotsPage.hidden = true;
    pageRefs.page1Btn.hidden = true;
  }
if(e.target === pageRefs.lastPageBtn){
    pageRefs.showedPageArr[0].hidden = false;
    btns.forEach(btn => btn.classList.remove('pagination__button--current'));
    pageRefs.showedPageArr[0].textContent = Number(pageRefs.lastPageBtn.textContent) - 4;
    pageRefs.showedPageArr[1].textContent = Number(pageRefs.lastPageBtn.textContent) - 3;
    pageRefs.showedPageArr[2].textContent = Number(pageRefs.lastPageBtn.textContent) - 2;
    pageRefs.showedPageArr[3].textContent = Number(pageRefs.lastPageBtn.textContent) - 1;
    pageRefs.showedPageArr[4].textContent = pageRefs.lastPageBtn.textContent;
    pageRefs.showedPageArr[4].classList.add('pagination__button--current');
    currentPage = pageRefs.showedPageArr[4].textContent;
    pageRefs.arrowRightBtn.hidden = true;
    pageRefs.afterDotsPage.hidden = true;
    pageRefs.lastPageBtn.hidden = true;
}
if (Number(currentPage) > 5) {
    pageRefs.arrowLeftBtn.hidden = false;
    pageRefs.prevDotsPage.hidden = false;
    pageRefs.page1Btn.hidden = false;
 }
 if (Number(currentPage) < 996) {
    pageRefs.arrowRightBtn.hidden = false;
    pageRefs.afterDotsPage.hidden = false;
    pageRefs.lastPageBtn.hidden = false;
  }
  if (Number(currentPage) >= 996) {
    pageRefs.arrowRightBtn.hidden = true;
    pageRefs.afterDotsPage.hidden = true;
    pageRefs.lastPageBtn.hidden = true;
  }

  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
window.scrollTo({ top: 0, behavior: 'smooth' });
if (pageRefs.input.value !== '') {
  fetchfilmsByKey(filmsParams);
} else {
  fetchPopularMovie(currentPage);
}
}

}
let pageSize = 9;
export const defineResultsPerPage = () => {
  if (window.innerWidth >= 1024) {
    pageSize = 9;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    pageSize = 8;
  } else if (window.innerWidth < 768) {
    pageSize = 4;
  }
  return pageSize;
}

pageRefs.paginationContainer.addEventListener('click', onPageBtnClick);
export { currentPage };