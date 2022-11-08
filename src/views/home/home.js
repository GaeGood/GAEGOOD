import { addCommas } from "/useful-functions.js";
import { main } from "/main.js";
const { loggedInUser } = await main();

const categoryWrap = document.getElementById("category__wrap");

const createCategory = (category) => {
  return `
        <li class="nav-item category">
          <button class="btn__${category.name}">
            <a class="nav-link" href="#">${category.name}</a>
          </button>
        </li>`;
};

const cards = document.querySelector(".cards");

const createCard = (item) => {
  return `<div class="card ${item.category.name}">
    <a href='/products/${item._id}'>
      <img src="${item.smallImageURL}" class="card-img-top" alt="${
    item.name
  }" />
      <div class="card-body ${item.category.name}">
      <div class="card-text card-text-title">${item.name}</div>
      <div class="card-text card-spec">${item.shortDesc}</div>
      <div class="card-text">${addCommas(item.price)}</div>
      </div>
    </a>
    </div>
  </div>`;
};

fetch("/api/categories")
  .then(async (res) => {
    const json = await res.json();

    if (res.ok) {
      return json;
    }

    return new Promise.reject(json);
  })
  .then((categoryList) => {
    categoryList.forEach((category) => {
      const categoryDiv = createCategory(category);
      categoryWrap.innerHTML += categoryDiv;
    });
  })
  .catch((e) => {
    alert(e);
  });

fetch("/api/products")
  .then(async (res) => {
    const json = await res.json();

    if (res.ok) {
      return json;
    }

    return Promise.reject(json);
  })
  .then((productList) => {
    productList.forEach((product) => {
      const newCard = createCard(product);
      cards.innerHTML += newCard;
    });
    return productList;
  }) //카테고리를 누르는것에 따라서 카테고리별 상품 이미지 띄우기
  .then((productList) => {
    const categoryList = document.querySelectorAll(".nav-item.category");
    console.log("categoryList");
    console.log(categoryList);
    categoryList.forEach((category) => {
      category.addEventListener("click", (event) => {
        cards.textContent = "";
        productList.forEach((product) => {
          console.log("product.category.name");
          console.log(product.category.name);
          console.log("event.target.text");
          console.log(event.target.text);
          console.log("event.target");
          console.log(event.target);
          if (product.category.name === event.target.text) {
            const newCard = createCard(product);
            cards.innerHTML += newCard;
          } else if (event.target.text === "전체") {
            const newCard = createCard(product);
            cards.innerHTML += newCard;
          }
        });
      });
    });
  })
  .catch((e) => {
    alert(e);
  });
