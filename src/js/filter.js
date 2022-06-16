import {requestForPage} from './render/renderPopularMovies';
import {renderUpComing} from './render/renderUpComing';
import {renderTopRated} from './render/renderTopRated';
import {refs} from '../js/refs/refs.js'

 let page = 1;
 const filter = () => {
refs.filter.topRatedBtn.addEventListener('click', onClickTopRatedBtn);
refs.filter.popularBtn.addEventListener('click', onClickPopularBtn);
refs.filter.upcomingBtn.addEventListener('click', onClicUpcomingBtn);

function onClickTopRatedBtn() {
  refs.pagination.input.value = '';
  refs.home.gallery.innerHTML ='';
  refs.filter.topRatedBtn.classList.add('btn-tab-active');
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
  renderTopRated(page);
}
function onClicUpcomingBtn() {
  refs.home.gallery.innerHTML ='';
  refs.pagination.input.value = '';
  refs.filter.upcomingBtn.classList.add('btn-tab-active');
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  renderUpComing(page);
}

function onClickPopularBtn() {
  refs.home.gallery.innerHTML ='';
  refs.pagination.input.value = '';
  refs.filter.popularBtn.classList.add('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
  refs.filter.upcomingBtn.classList.remove('btn-tab-active');
requestForPage(page);
refs.pagination.paginationList.innerHTML = '';
}
}
if (document.title === 'Home') {
    filter();
  }
