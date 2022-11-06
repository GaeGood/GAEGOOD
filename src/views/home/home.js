import { addCommas } from "/useful-functions.js";
import { verifyToken } from "/verify-token.js";
import { createModal, removeModal } from "../loginModule.js";
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

if (loggedInUser) {
  // removeLoginLi();
  renderLogoutLi();
} else {
  // removeLogoutLi();
  renderLoginLi();
}
class LoginRelatedEvent {
  constructor(className) {
    this.element = className;
  }
  renderBtn() {}
  renderModal() {
    document.getElementsByTagName(
      "body"
    )[0].innerHTML += `<div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="modalLoginLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalLoginLabel">환영합니다!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="" method="" class="login__form">
              <div class="mb-3">
                <label for="inputEmail1" class="form-label">이메일</label>
                <input type="email" class="form-control" id="email" placeholder="user@gaegood.com">
              </div>
              <div class="mb-3">
                <label for="inputPassword1" class="form-label">비밀번호</label>
                <input type="password" class="form-control" id="password" placeholder="****">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-primary login__submit__btn">확인</button>
          </div>
        </div>
      </div>
    </div>`;
  }
  removeModdal() {
    document.getElementsByTagName("body")[0].className = "";
    document.getElementsByTagName("body")[0].style = "none";
    document.querySelector("#modalLogin").style = "display: none";
    document.querySelector(".modal-backdrop").remove();
    return location.reload();
  }
  removeBtn() {
    const element = document.querySelector(`.${this.name}`);
    element.remove();
  }
}

function renderLoginLi() {
  const loginLi = document.createElement("li");
  loginLi.className += "login__btn";
  loginLi.innerHTML += `<a class="nav-link active" data-bs-toggle="modal" data-bs-target="#modalLogin"
              aria-current="page" href="#none">로그인</a>`;
  navAddLogin.prepend(loginLi);
  createModal();
  submitBtn();
}

function renderLogoutLi() {
  const logoutLi = document.createElement("li");
  logoutLi.className += "logout__btn";
  logoutLi.innerHTML += `<a class="nav-link active">로그아웃</a>`;
  navAddLogin.prepend(logoutLi);
}
document.querySelector(".logout__btn").addEventListener("click", (e) => {
  e.preventDefault();
  fetch("api/auth/logout", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(data.resMsg.msg);
      removeLogoutLi();
      renderLoginLi();
    });
});

async function submitBtn() {
  const loginFormSubmit = document.querySelector(".login__submit__btn");
  loginFormSubmit.addEventListener("click", (event) => {
    event.preventDefault;
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    // alert(
    //   `입력한 이메일과 비밀번호입니다\nemail: ${email.value}\npassword: ${password.value}`
    // );
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
        if (data.resCode === "200") {
          //모달창이 닫히는 기능
          removeModal();
          // 로그인 버튼 삭제
          removeLoginLi();
          // 로그아웃 버튼 보이게
          renderLogoutLi();
        } else {
          return Promise.reject(data);
        }
      })
      .catch((err) => {
        console.log(err);
        const resultMassage = err.resMsg.msg;
        alert(resultMassage);
      });
  });
}

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
