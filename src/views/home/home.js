import { addCommas } from "/useful-functions.js";
import { verifyToken } from "/verify-token.js";

// verifyToken : 브라우저가 갖고 있는 JWT토큰을 서버로부터 검증 받는 함수
// 검증 성공 시 => { verifySucceed: true, loggedInUser } 을 반환
// 검증 실패 시 => { verifySucceed: false } 을 반환
const verifyResult = await verifyToken();
console.log("verifyResult");
console.log(verifyResult);

const { loggedInUser } = verifyResult;
console.log("-------------------- 토큰 검증 종료 -------------------------");

const cards = document.querySelector(".cards");
const categories = document.querySelectorAll(".nav-item");
const navAddLogin = document.querySelector(".navbar-nav");

const modalLogin = document.querySelector("#modalLogin");

const loginFormSubmit = document.querySelector(".login__submit__btn");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const addLi = document.createElement("li");
addLi.className = "nav-item";
if (document.cookie === "") {
  addLi.className += " login__btn";
  addLi.innerHTML += `<a class="nav-link active" data-bs-toggle="modal" data-bs-target="#modalLogin"
      aria-current="page" href="#none">로그인</a>`;
  navAddLogin.prepend(addLi);
} else {
  addLi.className += " logout__btn";
  addLi.innerHTML += `<a class="nav-link active" data-bs-toggle="modal" data-bs-target="#modalLogin"
      aria-current="page" href="#none">로그아웃</a>`;
  navAddLogin.prepend(addLi);
}

loginFormSubmit.addEventListener("click", (event) => {
  event.preventDefault;
  alert(
    `입력한 이메일과 비밀번호입니다\nemail: ${email.value}\npassword: ${password.value}`
  );
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const resultMassage = data.resMsg.msg;
      if (data.resCode === "200") {
        //모달창이 닫히는 기능
        document.getElementsByTagName("body")[0].className = "";
        document.getElementsByTagName("body")[0].style = "none";
        document.querySelector("#modalLogin").style = "display: none";
        document.querySelector(".modal-backdrop").remove();

        // 로그인 버튼 삭제
        removeLoginLi();

        // 로그아웃 버튼 보이게
        renderLogoutLi();
      }
      alert(resultMassage);
    });
});

const createCard = (item) => {
  return `<div class="card ${item.category.name}">
    <a href='/products/detail/${item._id}'>
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
    return res.json();
  })
  .then((productList) => {
<<<<<<< HEAD
=======
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
>>>>>>> a8e1144 (update: product detail 1차)
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
