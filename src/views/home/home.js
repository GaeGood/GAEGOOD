import { addCommas } from "/useful-functions.js";

const cards = document.querySelector(".cards");
const card = cards.querySelectorAll(".card");
const categories = document.querySelectorAll(".nav-item");

const createCard = (item) => {
  return `<div class="card ${item.category}">
  <a href='/products/detail/${item._id}'>
    <img src="${item.smallImageURL}" class="card-img-top" alt="${
    item.name
  }" />
    <div class="card-body">
    <div class="card-body">${item.category}</div>
    <div class="card-text card-text-title">${item.name}</div>
    <div class="card-text card-spec">${item.shortDesc}</div>
    <div class="card-text">${addCommas(item.price)}</div>
    </div>
  </a>
  </div>
</div>`;
};

fetch("/api/products")
  .then((res) => res.json())
  .then((productList) => {
    productList.forEach((product) => {
      const newCard = createCard(product);
      cards.innerHTML += newCard;
    });
    return productList;
  }) //카테고리를 누르는것에 따라서 카테고리별 상품 이미지 띄우기
  .then((productList) => {
    categories.forEach((category) => {
      category.addEventListener("click", (e) => {
        cards.textContent = "";
        productList.forEach((product) => {
          if (product.category === e.target.text) {
            const newCard = createCard(product);
            cards.innerHTML += newCard;
          } else if (e.target.text === "전체") {
            const newCard = createCard(product);
            cards.innerHTML += newCard;
          }
        });
      });
    });
  });
