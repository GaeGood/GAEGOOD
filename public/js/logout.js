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
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((success) => {
          alert(success);
          location.reload();
        })
        .catch((e) => {
          alert(e);
        });
    });
    console.log("-------- logout button에 이벤트 리스너 연결 완료 --------");
  }
}

export { addEventListenerOnLogoutBtn };
