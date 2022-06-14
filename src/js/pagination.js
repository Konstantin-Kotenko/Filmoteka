import { requestForMovie } from '../js/fetch/fetchByKey';
import { requestForPage } from '../js/fetch/trendingMovie';
import { requestForWatched } from './watched';

const refs = {
  paginationList: document.querySelector('.pagination-list'),
  input: document.querySelector('.search-field'),
  libraryGallery: document.querySelector('.gallery--library'),
};
const gallery = document.querySelector('.gallery');
function renderCollection (page) {
  if(!refs.input.value.length){
    gallery.innerHTML = '';
    requestForPage(page);
    return;
  } 
  if (refs.input.value.length) {
    refs.paginationList.innerHTML = '';
    gallery.innerHTML = '';
    requestForMovie(page);
  }
  if(refs.libraryGallery?.innerHTML){
    refs.paginationList.innerHTML = '';
    refs.libraryGallery.innerHTML = '';
    requestForWatched();
  }
}

function renderSpan(value) {
  return `<span data-value='${value}'>${value}</span>`;
}

export function renderingPaginationMarkup(currentPage, maxPage) {
  const pagesArray = Array.apply(null, {
    length: maxPage ?? 0,
  })
    .map(Number.call, Number)
    .map(item => item + 1);
  let result =
    pagesArray.length <= 3
      ? pagesArray.map(item => renderSpan(item))
      : pagesArray
          .map(item => {
            if (
              item === maxPage ||
              item === 1 ||
              item === currentPage - 1 ||
              item === currentPage + 1 ||
              item === currentPage - 2 ||
              item === currentPage + 2 ||
              item === currentPage
            ) {
              return renderSpan(item);
            }
            if (item === currentPage - 3) {
              return "<span class='dots' data-value='minDots'>...</span>";
            } 
            if (item === currentPage + 3) {return "<span class='dots' data-value='maxDots'>...</span>";}
            return '';
          })
          .join('');
  if (currentPage > 1) {
    result = "<span class='arrow-left' data-span='prev'></span>" + result;
  }
  if (currentPage >= 1 && currentPage !== maxPage) {
    result = result + "<span class='arrow-right' data-span='next'></span>";
  }
  refs.paginationList.innerHTML = result;
  console.log(refs.paginationList.querySelectorAll('span'));
  refs.paginationList.querySelectorAll('span').forEach(item => {
    if (item.innerHTML == currentPage) {
      console.log(item);
      item.classList.toggle('active');
    }
  });
  refs.paginationList?.addEventListener('click', onPaginationBtnClick); 
}

function onPaginationBtnClick(event) {
  // event.preventDefault();
  gallery.innerHTML = '';
  currentPage = Number(event.target.textContent);
  if (event.target.nodeName !== 'SPAN') {
    
    return;
  }
  if (event.target.dataset.span === 'prev') {
    currentPage -= 1;
    renderCollection (currentPage);
    return;
  }
  if (event.target.dataset.span === 'next') {
    currentPage += 1;
    renderCollection (currentPage);
    return;
  }
  if (event.target.dataset.value === 'maxDots') {
    currentPage += 1;
      renderCollection (currentPage);
      return;
    } 
    if (event.target.dataset.value === 'minDots') {
      currentPage -= 1;
      renderCollection (currentPage);
      return;
    }
    renderCollection(currentPage)
} 





