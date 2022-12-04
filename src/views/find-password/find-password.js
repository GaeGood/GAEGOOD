import { main } from "/public/js/main.js";

const { loggedInUser } = await main();

// /api/auth/renewPassword 로 api 요청
const userInputEmail = document.querySelector("#exampleFormControlInput1");

const findPasswordBtn = document.getElementById("find-password");
findPasswordBtn.addEventListener("click", sendEmail);

function sendEmail() {
  fetch(`/api/auth/renewPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `${userInputEmail.value}`,
    }),
  })
    .then(async (res) => {
      const json = await res.json();

      if (res.ok) {
        return json;
      }

      return Promise.reject(json);
    })
    .then((data) => {
      alert("이메일로 임시 비밀번호가 발송되었습니다. \n로그인해주세요");
      window.location.href = "/";
    })
    .catch((err) => {
      alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
    });
}
