/*
  {
    // shortId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
    address: {
      type: String,
      required: true,
      default: "서울특별시 선동구 성수성수2가3동 광나루로6길 49",
    },
*/

const passwordChgBtn = document.querySelector(".password.change");
const phoneNumberChgBtn = document.querySelector(".phonenumber.change");
const addressChgBtn = document.querySelector(".address.change");


passwordChgBtn.addEventListener('click', changeAlert);
phoneNumberChgBtn.addEventListener('click', changeAlert)
addressChgBtn.addEventListener('click', changeAlert)

function changeAlert() {
    alert("변경이 완료되었습니다.")
    // 유저 정보 업데이트 하는 코드가 필요. 
    // 즉 해당하는 유저정보(비밀번호, 휴대폰번호, 주소 각각이) 가 서버로 다시 이동
}

// 파일 받아오기
fetch("/api/products")
  .then((res) => {
    return res.json();
  })
  .then((productList) => {
    const createCard = (item) => {
      return `<div class="card ${item.category}">
      <a href='/products/detail/${item._id}'>
        <img src="${item.smallImageURL}" class="card-img-top" alt="${
        item.name
      }" />
        <div class="card-body">
        <div class="card-body">${item.category}</div>
        <div class="card-text card-text-title">${item.name}</div>
        <div class="card-text card-spec">${item.shortDesc}</div>
        <div class="card-text">${addCommas(item.price)}</div>
        </div>
      </a>
      </div>
    </div>`;
    };
    productList.forEach((product) => {
      const newCard = createCard(product);
      cards.innerHTML += newCard;
    });
  });