import { requestForMovie } from './render/renderByKey';
import { requestForPage } from './render/renderPopularMovies';
import { refs } from './refs/refs';
import { getFromStorage } from '../js/localStorage/storage';
import { renderTopRated } from './render/renderTopRated';
import { renderUpComing } from './render/renderUpComing';

const {
  pagination: { paginationList, input, libraryGallery },
  home: { gallery },
} = refs;
let currentPage = 1;
function renderCollection(currentPage) {
  if (input.value.length) {
    requestForMovie(currentPage);
    return;
  } else {
    if (refs.filter.popularBtn.classList.contains('btn-tab-active')) {
      requestForPage(currentPage);
      return;
    }
    if (refs.filter.topRatedBtn.classList.contains('btn-tab-active')) {
      renderTopRated(currentPage);
      return;
    }
    if (refs.filter.upcomingBtn.classList.contains('btn-tab-active')) {
      renderUpComing(currentPage);
      return;
    }
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
            if (item === currentPage + 3) {
              return "<span class='dots' data-value='maxDots'>...</span>";
            }
            return '';
          })
          .join('');
  if (currentPage > 1) {
    result = "<span class='arrow-left' data-span='prev'></span>" + result;
  }
  if (currentPage >= 1 && currentPage !== maxPage) {
    result = result + "<span class='arrow-right' data-span='next'></span>";
  }
  paginationList.innerHTML = result;
  paginationList.querySelectorAll('span').forEach(item => {
    if (item.innerHTML == currentPage) {
      item.classList.toggle('active');
    }
  });
  paginationList?.addEventListener('click', onPaginationBtnClick);
}

function onPaginationBtnClick(event) {
  gallery.innerHTML = '';
  if (input?.value) {
    currentPage = Number(getFromStorage('active-search'));
  } else {
    if (refs.filter.popularBtn.classList.contains('btn-tab-active')) {
      currentPage = Number(getFromStorage('active-popular'));
    }
    if (refs.filter.upcomingBtn.classList.contains('btn-tab-active')) {
      currentPage = Number(getFromStorage('active-up'));
    }
    if (refs.filter.topRatedBtn.classList.contains('btn-tab-active')) {
      currentPage = Number(getFromStorage('active-top'));
    }
  }
  if (event.target.nodeName !== 'SPAN') {
    return;
  }
  if (event.target.dataset.span === 'prev') {
    currentPage -= 1;
    renderCollection(currentPage);
    return;
  }
  if (event.target.dataset.span === 'next') {
    currentPage += 1;
    renderCollection(currentPage);
    return;
  }
  if (event.target.dataset.value === 'maxDots') {
    currentPage += 1;
    renderCollection(currentPage);
    return;
  }
  if (event.target.dataset.value === 'minDots') {
    currentPage -= 1;
    renderCollection(currentPage);
    return;
  }
  currentPage = Number(event.target.textContent);
  renderCollection(currentPage);
}
