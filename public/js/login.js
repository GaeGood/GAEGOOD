// 로그인 버튼에 이벤트 리스너를 부여하는 함수
function addEventListenerOnLoginBtn(loggedInUser) {
  // 로그인 한 유저가 없어야 함
  if (!loggedInUser) {
    const loginFormSubmit = document.querySelector(".login__submit__btn");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    loginFormSubmit.addEventListener("click", (event) => {
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
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((success) => {
          //모달창이 닫히는 기능
          document.getElementsByTagName("body")[0].className = "";
          document.getElementsByTagName("body")[0].style = "none";
          document.querySelector("#modalLogin").style = "display: none";
          document.querySelector(".modal-backdrop").remove();
          location.reload();
        })
        .catch((e) => {
          alert(e);
        });
    });
  }
}

export { addEventListenerOnLoginBtn };
