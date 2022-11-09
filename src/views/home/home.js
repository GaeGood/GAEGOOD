import { addCommas } from "/useful-functions.js";
import { main } from "/main.js";
const { loggedInUser } = await main();

const categoryWrap = document.getElementById("category__wrap");

const createCategory = (category) => {
  return `
        <li class="nav-item category">
          <a class="nav-link" draggable="false">${category.name}</a>
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
    const categoryLiList = document.querySelectorAll(".nav-item.category");
    categoryLiList.forEach((categoryLi) => {
      categoryLi.addEventListener("click", (event) => {
        categoryLiList.forEach((categoryLi) => {
          categoryLi.children[0].classList.remove("clicked");
        });
        categoryLi.children[0].classList.add("clicked");

        cards.textContent = "";

        const searchByCategoryProductList = [];

        productList.forEach((product) => {
          if (
            product.category.name === event.target.text ||
            event.target.text === "전체"
          ) {
            searchByCategoryProductList.push(product);
          }
        });

        if (searchByCategoryProductList.length === 0) {
          cards.classList.add("empty");
          cards.innerHTML = `
          <div></div>
            <div id="empty-product-list">상품이 없습니다.</div>
          `;
        } else {
          cards.classList.remove("empty");
          searchByCategoryProductList.forEach((product) => {
            const newCard = createCard(product);
            cards.innerHTML += newCard;
          });
        }
      });
    });
  })
  .catch((e) => {
    alert(e);
  });
