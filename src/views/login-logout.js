// 로그인 버튼에 이벤트 리스너를 부여하는 함수
function addEventListenerOnLoginBtn(loggedInUser) {
  // 로그인 한 유저가 없어야 함
  if (!loggedInUser) {
    console.log("-------- login button에 이벤트 리스너 연결 시작 --------");
    const loginFormSubmit = document.querySelector(".login__submit__btn");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    loginFormSubmit.addEventListener("click", (event) => {
      alert(
        `입력한 이메일과 비밀번호입니다\nemail: ${email.value}\npassword: ${password.value}` // 추후 삭제
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
          }
          alert(resultMassage);
          location.reload();
        });
    });
    console.log("-------- login button에 이벤트 리스너 연결 완료 --------");
  }
}

// 로그아웃 버튼에 이벤트 리스너를 부여하는 함수
function addEventListenerOnLogoutBtn(loggedInUser) {
  // 로그인 한 유저가 있어야 함
  if (loggedInUser) {
    console.log("-------- logout button에 이벤트 리스너 연결 시작 --------");
    const logoutBtn = document.querySelector(".nav-item.logout");
    logoutBtn.addEventListener("click", (e) => {
      fetch("/api/auth/logout", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert(data.resMsg.msg);
          location.reload();
        });
    });
    console.log("-------- logout button에 이벤트 리스너 연결 완료 --------");
  }
}

export { addEventListenerOnLoginBtn, addEventListenerOnLogoutBtn };
