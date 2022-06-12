import { requestForMovie } from '../js/fetch/fetchByKey';
import { requestForPage } from '../js/fetch/trendingMovie';
import {refs} from './refs.js';


refs.paginationList.innerHTML ='';
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let totalPages = 1000;  

  const pagesArray = Array.apply(null, {
    length: totalPages ?? 0,
    })
    .map(Number.call, Number)
    .map((item) => item + 1);
function renderSpan(value) {
  return `<span data-value='${value}'>${value}</span>`; 
}
  async function onPaginationBtnClick(event) {
// footer.style.position = "fixed";
gallery.innerHTML = "";
if(event.target.nodeName !== "SPAN") {
 return;
}
  if (event.target.dataset.span === "prev") {
  currentPage -= 1;
    if(refs.input.value){requestForMovie()} else
  {requestForPage();}
    return;
  }
  if (event.target.dataset.span === "next") {
    currentPage += 1;
    if(refs.input.value){requestForMovie()}else
    {requestForPage();}
    return;
  }
  if (event.target.dataset.value === "dots") {
    if (event.target.nextElementSibling?.dataset?.span === "next")
    {
      currentPage += 1;
     if(refs.input.value){
      requestForMovie()}else
     {requestForPage();}
      return;
    }
    else {
      currentPage -= 1;
      if(refs.input.value){
        requestForMovie()}else
      {requestForPage();}
    return;
    }
  }
  currentPage = Number(event.target.textContent);
  renderingPaginationMarkup(currentPage);

  if(refs.input.value){
    requestForMovie();
  } else {requestForPage();
  }
}

 export async function renderingPaginationMarkup(currentPage) {
  let result = pagesArray.length <= 3
  ? pagesArray.map((item) => renderSpan(item))
  : pagesArray.map((item) => {
      if (
        // item === totalPages ||
        item === 1 ||
        item === currentPage - 1 ||
        item === currentPage + 1 ||
        item === currentPage - 2 ||
        item === currentPage + 2 ||
        item === currentPage
      )
      {
       
        return renderSpan(item);
      }
      if(item === currentPage - 3 || item === currentPage + 3) {
        return "<span class='dots' data-value='dots'>...</span>";
      }
      return "";
         
      }).join("");
      if (currentPage > 1) {
        result = "<span class='arrow-left' data-span='prev'></span>" + result;
      }
      // if(currentPage === totalPages){
      //   result = result + `<span data-value='${currentPage + 1}'>${currentPage + 1}</span>`;
      // }
      if (currentPage >= 1) {
        result = result + "<span class='arrow-right' data-span='next'></span>";
      }
     
  refs.paginationList.innerHTML = result;
  refs.paginationList.querySelectorAll("span").forEach(item => {
    if (item.innerHTML == currentPage) {
      item.classList.toggle("active");
    }
  });
}
renderingPaginationMarkup(currentPage);
refs.paginationList.addEventListener('click', onPaginationBtnClick);


export { currentPage};
