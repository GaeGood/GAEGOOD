const loginSubmitBtn = document.querySelector(".login__submit__btn");
const loginForm = document.querySelector(".login__form");

loginSubmitBtn.addEventListener("click", (e) => {
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      title: "Test",
      body: "I am testing!",
      userId: 1,
    }),
  }).then((response) => console.log(response));
});
