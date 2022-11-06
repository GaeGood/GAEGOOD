import { addCommas } from "/useful-functions.js";
import { main } from "/main.js";
const { loggedInUser } = await main();

const cards = document.querySelector(".cards");
const categories = document.querySelectorAll(".nav-item.category");

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

fetch("/api/products")
  .then((res) => {
    const addLi = document.createElement("li");
    addLi.className = "nav-item";
    if (document.cookie === "") {
      addLi.className += " login__btn";
      addLi.innerHTML += `<a class="nav-link active" data-bs-toggle="modal" data-bs-target="#modalLogin"
      aria-current="page" href="#none">로그인</a>`;
      navAddLogin.prepend(addLi);
    } else {
      addLi.className += " logout__btn";
      addLi.innerHTML += `<a class="nav-link active" href="#none">로그아웃</a>`;
      navAddLogin.prepend(addLi);

      const joinHtml = document.querySelector(".nav-item.join")
      joinHtml.remove()
      
      const mypageHtml = document.querySelector(".nav-item.mypage")
      mypageHtml.style.display = "";
    }
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
    return productList;
  }) //카테고리를 누르는것에 따라서 카테고리별 상품 이미지 띄우기
  .then((productList) => {
    categories.forEach((category) => {
      category.addEventListener("click", (event) => {
        cards.textContent = "";
        productList.forEach((product) => {
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
  });
