const btn = document.querySelector(".click");
const content = document.querySelector(".loader");

btn.addEventListener("click", btnClick);

function btnClick() {

  if (content.classList.contains("is-hiden")) {

  }

  content.classList.toggle("loader");
}