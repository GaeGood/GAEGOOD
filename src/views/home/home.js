import { addCommas } from "/useful-functions.js";

const cards = document.querySelector(".cards");
const categories = document.querySelectorAll(".nav-item");

const loginFormSubmit = document.querySelector(".login__submit__btn");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const loginBtn = document.querySelector(".login__btn");
const logoutBtn = document.querySelector(".logout__btn");

const joinFormSubmit = document.querySelector(".join__submit__btn");
const joinUserName = document.querySelector("#join__user__name");
const joinEmail = document.querySelector("#join__email");
const joinPassword = document.querySelector("#join__password");
const joinPasswordCheck = document.querySelector("#join__password__check");
const joinAddress = document.querySelector("#join__address");

//토큰을 가지고 있는지 확인 후 가지고있으면 로그아웃버튼을, 없으면 로그인버튼
fetch("api/auth/verifyToken")
  .then((res) => {
    if (res.ok === true) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  })
  .then((data) => {
    // 로그인 성공
    loginBtn.style = "display: none";
    logoutBtn.style = "display: block";
    return data;
  })
  .catch((e) => {
    console.error("프엔이 생성한 에러메세지: 토큰이 없습니다.");
    console.error(`${e.name}: ${e.message}`);
  });

//로그인 후 모달창 없애는 기능(여기서 관리자인지 일반유저인지 확인하기)
loginFormSubmit.addEventListener("click", (event) => {
  event.preventDefault;
  //!!!아래는 확인용 서비스때 꼭 지울 것
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
      //const resultMassage = data.resMsg.msg;
      if (data.resCode === "200") {
        //모달창이 닫히는 기능
        document.getElementsByTagName("body")[0].className = "";
        document.getElementsByTagName("body")[0].style = "none";
        document.querySelector("#modalLogin").style = "display: none";
        document.querySelector(".modal-backdrop").remove();
      }
      alert("환영합니다");
      location.reload();
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

//로그아웃 버튼 클릭시 쿠키삭제
logoutBtn.addEventListener("click", () => {
  fetch("/api/auth/logout")
    .then((res) => res.json())
    .then(() => {
      logoutBtn.style = "display: none";
      loginBtn.style = "display: block";
    });
});

///=========아래는 회원가입 기능=================
// const joinFormSubmit = document.querySelector(".join__submit__btn");
// const joinUserName = document.querySelector("#join__user__name");
// const joinEmail = document.querySelector("#join__user__email");
// const joinPassword = document.querySelector("#join__password");
// const joinPasswordCheck = document.querySelector("#join__password__check");
// const joinAddress = document.querySelector("#join__address");
joinFormSubmit.addEventListener("click", (event) => {
  event.preventDefault;
  //!!!아래는 확인용 서비스때 꼭 지울 것
  alert(
    `입력한 정보입니다\n
    name: ${joinUserName.value}\n
    email: ${joinEmail.value}\n
    password: ${joinPassword.value}\n
    passwordCheck: ${joinPasswordCheck.value}\n
    address: ${joinAddress.value}
    `
  );
  if (joinPassword.value === joinPasswordCheck.value) {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: joinUserName.value,
        email: joinEmail.value,
        password: joinPassword.value,
        address: joinAddress.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //const resultMassage = data.resMsg.msg;
        if (data.resCode === "200") {
          alert(`환영합니다 ${joinUserName.value}님`);
          //모달창이 닫히는 기능
          document.getElementsByTagName("body")[0].className = "";
          document.getElementsByTagName("body")[0].style = "none";
          document.querySelector("#modalLogin").style = "display: none";
          document.querySelector(".modal-backdrop").remove();
          location.reload();
        } else {
          alert("비밀번호를 확인해주세요");
        }
      });
  }
});
