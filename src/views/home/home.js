import { addCommas } from "/useful-functions.js";
import { main } from "/main.js";
const { loggedInUser } = await main();

const categoryWrap = document.getElementById("category__wrap");

const createCategory = (category) => {
  return `
        <li class="nav-item category">
          <a class="nav-link" href="#">${category.name}</a>
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
  })
  .catch((e) => {
    alert(e);
  });

const joinFormSubmit = document.querySelector(".join__submit__btn");
const joinUserName = document.querySelector("#join__user__name");
const joinEmail = document.querySelector("#join__email");
const joinPassword = document.querySelector("#join__password");
const joinPasswordCheck = document.querySelector("#join__password__check");

joinFormSubmit.addEventListener("click", (event) => {
  if (joinPassword.value !== joinPasswordCheck.value) {
    alert("입력하신 두 비밀번호가 일치하지 않습니다.");
  } else {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: joinUserName.value,
        email: joinEmail.value,
        password: joinPassword.value,
      }),
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((user) => {
        alert(`${user.name}님, 환영합니다.`);

        document.getElementsByTagName("body")[0].className = "";
        document.getElementsByTagName("body")[0].style = "none";
        document.querySelector("#modalJoin").style = "display: none";
        document.querySelector(".modal-backdrop").remove();
        location.reload();
      })
      .catch((error) => alert(error));
  }
});
