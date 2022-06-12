import { requestForMovie, totalPages } from '../js/fetch/fetchByKey';
import { requestForPage } from '../js/fetch/trendingMovie';

const refs = {
  paginationList: document.querySelector(".pagination-list"),
}
const gallery = document.querySelector('.gallery');

let maxPage = 1000;
let currentPage = 1;

const pagesArray = Array.apply(null, {
length: maxPage ?? 0,
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
    requestForPage();
    return;
  }
  if (event.target.dataset.span === "next") {
    currentPage += 1;
    requestForPage();
    return;
  }
  if (event.target.dataset.value === "dots") {
    if (Number(event.target.nextElementSibling?.dataset?.value) === maxPage)
    {
      currentPage += 1;
      requestForPage();
      console.log("max dots");
      return;
    }
    else {
      currentPage -= 1;
      requestForPage();
      console.log("min dots");
    return;
    }
  }
  currentPage = Number(event.target.textContent);
  renderingPaginationMarkup(currentPage);
  requestForPage();
}

export async function renderingPaginationMarkup(currentPage) {
  
  let result = pagesArray.length <= 3
  ? pagesArray.map((item) => renderSpan(item))
  : pagesArray.map((item) => {
      if (
        item === maxPage ||
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
      if (currentPage >= 1 && currentPage !== maxPage) {
        result = result + "<span class='arrow-right' data-span='next'></span>";
      }
  refs.paginationList.innerHTML = result;
 console.log(refs.paginationList.querySelectorAll("span"));
  refs.paginationList.querySelectorAll("span").forEach(item => {
    
    if (item.innerHTML == currentPage) {
      console.log(item);
      item.classList.toggle("active");
    }
  });
}

// renderingPaginationMarkup(1);

refs.paginationList.addEventListener('click', onPaginationBtnClick);

export { currentPage, maxPage };
