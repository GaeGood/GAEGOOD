//어느페이지에서나 모달기능을 넣어주는 기능
async function createModal() {
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

function removeModal() {
  document.getElementsByTagName("body")[0].className = "";
  document.getElementsByTagName("body")[0].style = "none";
  document.querySelector("#modalLogin").style = "display: none";
  document.querySelector(".modal-backdrop").remove();
  return location.reload();
}

export { createModal, removeModal };

// const cards = document.querySelector(".cards");
// const categories = document.querySelectorAll(".nav-item");

// const loginFormSubmit = document.querySelector(".login__submit__btn");
// const email = document.querySelector("#email");
// const password = document.querySelector("#password");

// function renderLoginLi() {
//   const loginLi = document.createElement("li");
//   loginLi.className += " login__btn";
//   loginLi.innerHTML += `<a class="nav-link active nav-item" data-bs-toggle="modal" data-bs-target="#modalLogin"
//               aria-current="page" href="#none">로그인</a>`;
//   navAddLogin.prepend(loginLi);

//   // 마이페이지 버튼 삭제 -> 회원가입 생성
//   const mypageHtml = document.querySelector(".nav-item.mypage");
//   mypageHtml.className = "nav-item mypage hidden";
//   const joinHtml = document.querySelector(".nav-item.join");
//   joinHtml.className = "nav-item join";
// }

// function removeLoginLi() {
//   const loginLi = document.querySelector(".login__btn");
//   navAddLogin.removeChild(loginLi);
// }

// function renderLogoutLi() {
//   const logoutLi = document.createElement("li");
//   logoutLi.className += " logout__btn";
//   logoutLi.innerHTML += `<a class="nav-link active nav-item">로그아웃</a>`;

//   logoutLi.addEventListener("click", (e) => {
//     e.preventDefault();

//     fetch("api/auth/logout", {
//       method: "GET",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         alert(data.resMsg.msg);
//         removeLogoutLi();
//         renderLoginLi();
//       });
//   });
//   navAddLogin.prepend(logoutLi);

//   // 회원가입버튼 삭제 -> 마이페이지 버튼 나타내기
//   const mypageHtml = document.querySelector(".nav-item.mypage");
//   mypageHtml.className = "nav-item mypage";

//   const joinHtml = document.querySelector(".nav-item.join");
//   joinHtml.className = "nav-item join hidden";
// }

// function removeLogoutLi() {
//   const logoutLi = document.querySelector(".logout__btn");
//   navAddLogin.removeChild(logoutLi);
// }
// const loginBtn = document.querySelector(".login__btn");
// const logoutBtn = document.querySelector(".logout__btn");

// const joinFormSubmit = document.querySelector(".join__submit__btn");
// const joinUserName = document.querySelector("#join__user__name");
// const joinEmail = document.querySelector("#join__email");
// const joinPassword = document.querySelector("#join__password");
// const joinPasswordCheck = document.querySelector("#join__password__check");
// const joinAddress = document.querySelector("#join__address");

// function removeModal() {
//   document.getElementsByTagName("body")[0].className = "";
//   document.getElementsByTagName("body")[0].style = "none";
//   document.querySelector("#modalLogin").style = "display: none";
//   document.querySelector(".modal-backdrop").remove();
//   return location.reload();
// }
// //토큰을 가지고 있는지 확인 후 가지고있으면 로그아웃버튼을, 없으면 로그인버튼
// fetch("api/auth/verifyToken")
//   .then((res) => {
//     if (res.ok === true) {
//       return res.json();
//     } else {
//       throw new Error(res.status);
//     }
//   })
//   .then((data) => {
//     // 로그인 성공
//     loginBtn.style = "display: none";
//     logoutBtn.style = "display: block";
//     return data;
//   })
//   .catch((e) => {
//     console.error("프엔이 생성한 에러메세지: 토큰이 없습니다.");
//     console.error(`${e.name}: ${e.message}`);
//   });

// //로그인 후 모달창 없애는 기능(여기서 관리자인지 일반유저인지 확인하기)
// loginFormSubmit.addEventListener("click", (event) => {
//   event.preventDefault;
//   //!!!아래는 확인용 서비스때 꼭 지울 것
//   alert(
//     `입력한 이메일과 비밀번호입니다\nemail: ${email.value}\npassword: ${password.value}`
//   );
//   fetch("/api/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email.value,
//       password: password.value,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       //const resultMassage = data.resMsg.msg;
//       if (data.resCode === "200") {
//         //모달창이 닫히는 기능
//         document.getElementsByTagName("body")[0].className = "";
//         document.getElementsByTagName("body")[0].style = "none";
//         document.querySelector("#modalLogin").style = "display: none";
//         document.querySelector(".modal-backdrop").remove();

//         // 로그인 버튼 삭제
//         removeLoginLi();

//         // 로그아웃 버튼 보이게
//         renderLogoutLi();
//       }
//       alert("환영합니다");
//       location.reload();
//     });
// });

// const createCard = (item) => {
//   return `<div class="card ${item.category.name}">
//     <a href='/products/detail/${item._id}'>
//       <img src="${item.smallImageURL}" class="card-img-top" alt="${
//     item.name
//   }" />
//       <div class="card-body ${item.category.name}">
//       <div class="card-text card-text-title">${item.name}</div>
//       <div class="card-text card-spec">${item.shortDesc}</div>
//       <div class="card-text">${addCommas(item.price)}</div>
//       </div>
//     </a>
//     </div>
//   </div>`;
// };

// fetch("/api/products")
//   .then((res) => {
//     return res.json();
//   })
//   .then((productList) => {
//     productList.forEach((product) => {
//       const newCard = createCard(product);
//       cards.innerHTML += newCard;
//     });
//     return productList;
//   }) //카테고리를 누르는것에 따라서 카테고리별 상품 이미지 띄우기
//   .then((productList) => {
//     categories.forEach((category) => {
//       category.addEventListener("click", (event) => {
//         cards.textContent = "";
//         productList.forEach((product) => {
//           if (product.category.name === event.target.text) {
//             const newCard = createCard(product);
//             cards.innerHTML += newCard;
//           } else if (event.target.text === "전체") {
//             const newCard = createCard(product);
//             cards.innerHTML += newCard;
//           }
//         });
//       });
//     });
//   });

// //로그아웃 버튼 클릭시 쿠키삭제
// logoutBtn.addEventListener("click", () => {
//   fetch("/api/auth/logout")
//     .then((res) => res.json())
//     .then(() => {
//       logoutBtn.style = "display: none";
//       loginBtn.style = "display: block";
//     });
// });

// ///=========아래는 회원가입 기능=================
// joinFormSubmit.addEventListener("click", (event) => {
//   event.preventDefault;
//   //!!!아래는 확인용 서비스때 꼭 지울 것
//   const userInfo = {
//     name: joinUserName.value,
//     email: joinEmail.value,
//     password: joinPassword.value,
//     passwordCheck: joinPasswordCheck.value,
//     address: joinAddress.value,
//   };
//   //비밀번호와 비밀번호 확인 input 칸이 전부 맞아야 가입되게
//   if (userInfo.password === userInfo.passwordCheck) {
//     fetch("/api/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userInfo),
//     })
//       .then((res) => res.json())
//       .then((joinResult) => {
//         if (joinResult.resCode === "200") {
//           return joinResult;
//         }
//         // throw new Error(result);
//         return Promise.reject(joinResult);
//       })
//       .then(() => {
//         alert(`환영합니다 ${userInfo.name}님`);
//         removeModal();
//       })
//       //회원가입 후 바로 로그인하는 기능
//       .then(() => {
//         fetch("/api/auth/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userInfo.email,
//             password: userInfo.password,
//           }),
//         });
//         logoutBtn.style = "display: none";
//         loginBtn.style = "display: block";
//       })
//       .catch((err) => {
//         alert(err.resMsg.msg);
//       });
//   }
// });
