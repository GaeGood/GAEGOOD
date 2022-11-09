function addEventListenerOnJoinBtn(loggedInUser) {
  // 로그인 한 유저가 없어야 함
  if (!loggedInUser) {
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
            alert("회원가입에 성공했습니다. 로그인해주세요.");

            document.getElementsByTagName("body")[0].className = "";
            document.getElementsByTagName("body")[0].style = "none";
            document.querySelector("#modalJoin").style = "display: none";
            document.querySelector(".modal-backdrop").remove();
          })
          .catch((error) => alert(error));
      }
    });
  }
}

export { addEventListenerOnJoinBtn };
