import { addCommas } from "/useful-functions.js";

const cards = document.querySelector(".cards");

fetch("/api/products")
  .then((res) => {
    return res.json();
  })
  .then((productList) => {
    const createCard = (item) => {
      return `<div class="card ${item.category}">
      <a href='/products/detail/${item._id}'>
        <img src="elice-rabbit.png" class="card-img-top" alt="..." />
        <div class="card-body"></div>
        <div class="card-text card-text-title">${item.name}</div>
        <div class="card-text card-spec">
          ${item.shortDesc}
        </div>
        <div class="card-text">${addCommas(item.price)}</div>
      </a>
    </div>`;
    };
    productList.forEach((product) => {
      const newCard = createCard(product);
      cards.innerHTML += newCard;
    });
  });
