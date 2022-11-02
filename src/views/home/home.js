// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

// import { json } from "express";
// import nodemon from "nodemon";
// import * as Api from "/api.js";
// import { randomId } from "/useful-functions.js";

// 요소(element), input 혹은 상수
// const landingDiv = document.querySelector("#landingDiv");
// const greetingDiv = document.querySelector("#greetingDiv");
const fabricBtn = document.querySelector(".btn-fabrics");
const stickerBtn = document.querySelector(".btn-stickers");
const card = document.querySelector(".card");
const cards = document.querySelector(".cards");

// function fabricBtn() {
//   if (card.classList.contains("sticker")) {
//     card.classList.add("hidden");
//   }
// }

// function stickerBtn() {
//   if (card.classList.contains("sticker")) {
//     card.classList.add("hidden");
//   }
// }

const className = "";
const productName = "";
const productDesc = "";
const price = "";

// 템플릿리터럴 안의 내용은 백에서 json 파일로 가져올 때..!!!

function cardTemplateInsert() {
  const jsonProductData = [
    {
      Type: "fabric",
      name: "담요",
      Description: "얼음도 녹일 수 있는 담요",
      price: "5000",
    },
    {
      Type: "other",
      name: "머그컵",
      Description: "머그컵",
      price: "5000",
    },
    {
      Type: "fabric",
      name: "담요",
      Description: "얼음도 녹일 수 있는 담요",
      price: "5000",
    },
    {
      Type: "other",
      name: "머그컵",
      Description: "머그컵",
      price: "5000",
    },
  ];

  // let result = [];
  // jsonProductData.forEach((item) => {
  //   result.push(item);
  // });

  const resultArray = jsonProductData.map((item) => {
    return `<div class="card ${item.Type}">
    <img src="elice-rabbit.png" class="card-img-top" alt="..." />
    <div class="card-body"></div>
            <div class="card-text card-text-title">${item.name}</div>
            <div class="card-text card-spec">
              ${item.Description} 
            </div>
            <div class="card-text">${item.price}</div>
          </div>
        </div>`;
  });
  return resultArray;
}
const thing = cardTemplateInsert().join("");

cards.innerHTML += thing;

// cards.append(resultArray[i]);
// let apple = [a,b,c]
// apple.join("")
// 만약, 제이슨 데이터가 배열이 아닌 경우?

// 목표 : 배열인 제이슨 데이터를 한 요소 별로 불러와서 걔네 값을 뽑아내고
// 그 뽑아낸걸 템플릿에 innerHTML로 넣어준다.

// 1. card 템플릿 리터럴 하나 생성(붕어빵틀) -완료
// 2. 틀에다가 그.. fabric, sticker, 등등의 클래스명 넣어주기
// 3. 이 만들어진 내용을 .innerHTML 로 넣어주기.

fabricBtn.addEventListener("click", () => {
  alert("제발 되라");
});
// stickerBtn.addEventListener("click", stickerBtn);

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener("click", alertLandingText);
  greetingDiv.addEventListener("click", alertGreetingText);
}

function insertTextToLanding() {
  landingDiv.insertAdjacentHTML(
    "beforeend",
    `
      <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
    `
  );
}

function insertTextToGreeting() {
  greetingDiv.insertAdjacentHTML(
    "beforeend",
    `
      <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
    `
  );
}

function alertLandingText() {
  alert("GAEGOOD 쇼핑몰입니다. 안녕하세요.");
}

function alertGreetingText() {
  alert("GAEGOOD 쇼핑몰에 오신 것을 환영합니다");
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get("/api/user/data");
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
