console.log("hi i'm order-detail.js");

import { main } from "/main.js";
const loggedInUser = await main();

const path = window.location.href;
console.log(path);

const oid = path.split("/")[4];
console.log(oid);

fetch(`/api/orders/${oid}`)
  .then((res) => {
    const json = res.json();
    if (res.ok) {
      return json;
    }
    return Promise.reject(json);
  })
  .then((order) => {
    console.log("order");
    console.log(order);

    const orderDetailWrap = document.getElementById("order-detail__wrap");
    orderDetailWrap.innerHTML += renderOrderContent(order);

    const productInfo = document.getElementById(
      "order-detail__order-content__product-info"
    );
    renderOrderProduct(order, productInfo);

    fillOrderEditModalInput(order);
  })
  .then((error) => {
    alert(error);
  });

// order-content 렌더
function renderOrderContent(order) {
  return `
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">구매자</label>
      <div class="order-detail__order-content">${order.buyer.name}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">구매 상품</label>
      <div
        class="order-detail__order-content"
        id="order-detail__order-content__product-info"
      ></div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">총액</label>
      <div class="order-detail__order-content">${order.totalAmount}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">배송 상태</label>
      <div class="order-detail__order-content">${order.shippingStatus}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">배송지 우편번호</label>
      <div class="order-detail__order-content">${order.shippingPostCode}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">배송지 도로명주소</label>
      <div class="order-detail__order-content">${order.shippingStreetAddress}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">배송지 상세주소</label>
      <div class="order-detail__order-content">${order.shippingExtraAddress}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">수령인 이름</label>
      <div class="order-detail__order-content">${order.recipientName}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">수령인 연락처</label>
      <div class="order-detail__order-content">${order.recipientPhoneNumber}</div>
    </div>
    <div class="order-detail__order-content__wrap">
      <label class="order-detail__order-content__label">요청사항</label>
      <div class="order-detail__order-content">${order.shippingRequestMessage}</div>
    </div>`;
}

// order-content 중 product-info 렌더
function renderOrderProduct(order, productInfo) {
  for (let i = 0; i < order.productList.length; i++) {
    const productItem = document.createElement("div");
    productItem.classList.add(
      "order-detail__order-content__product-info__product-item"
    );
    productItem.innerText = `${order.productList[i].name} ${order.countList[i]} 개`;

    productInfo.appendChild(productItem);
  }
}

// 주문 수정 기능

// 주문 수정 모달 창의 기본 값 채우기
function fillOrderEditModalInput(order) {
  document.getElementById(
    "order-edit__modal__input__shipping-post-code"
  ).value = order.shippingPostCode;
  document.getElementById(
    "order-edit__modal__input__shipping-street-address"
  ).value = order.shippingStreetAddress;
  document.getElementById(
    "order-edit__modal__input__shipping-extra-address"
  ).value = order.shippingExtraAddress;
  document.getElementById(
    "order-edit__modal__input__shipping-request-message"
  ).value = order.shippingRequestMessage;
  document.getElementById("order-edit__modal__input__recipient-name").value =
    order.recipientName;
  document.getElementById(
    "order-edit__modal__input__recipient-phone-number"
  ).value = order.recipientPhoneNumber;
}

// 주문 수정 모달 창의 확인 버튼 클릭 시 주문 수정이 이루어짐
const orderEditSumbitBtn = document.querySelector(".order-edit__submit-btn");

orderEditSumbitBtn.addEventListener("click", (event) => {
  const shippingPostCode = document.getElementById(
    "order-edit__modal__input__shipping-post-code"
  ).value;
  const shippingStreetAddress = document.getElementById(
    "order-edit__modal__input__shipping-street-address"
  ).value;
  const shippingExtraAddress = document.getElementById(
    "order-edit__modal__input__shipping-extra-address"
  ).value;
  const shippingRequestMessage = document.getElementById(
    "order-edit__modal__input__shipping-request-message"
  ).value;
  const recipientName = document.getElementById(
    "order-edit__modal__input__recipient-name"
  ).value;
  const recipientPhoneNumber = document.getElementById(
    "order-edit__modal__input__recipient-phone-number"
  ).value;
  fetch(`/api/orders/${oid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shippingPostCode,
      shippingStreetAddress,
      shippingExtraAddress,
      shippingRequestMessage,
      recipientName,
      recipientPhoneNumber,
    }),
  })
    .then((res) => {
      const json = res.json();
      if (res.ok) {
        return json;
      }
      return Promise.reject(json);
    })
    .then((order) => {
      // 수정된 Order 정보로 새로 그려주기
      const orderDetailWrap = document.getElementById("order-detail__wrap");
      orderDetailWrap.innerHTML = "";
      orderDetailWrap.innerHTML += renderOrderContent(order);

      const productInfo = document.getElementById(
        "order-detail__order-content__product-info"
      );
      renderOrderProduct(order, productInfo);

      //모달창이 닫히는 기능
      document.getElementsByTagName("body")[0].className = "";
      document.getElementsByTagName("body")[0].style = "none";
      document.querySelector("#order-edit__modal").style = "display: none";
      document.querySelector(".modal-backdrop").remove();
    })
    .catch((error) => {
      alert(error);
    });
});

// 주문 삭제 기능
const orderDeleteBtn = document.getElementById(
  "order__options__option__delete-btn"
);

orderDeleteBtn.addEventListener("click", (e) => {
  console.log("삭제 버튼 클릭");
  fetch(`/api/orders/${oid}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      alert("주문 삭제 완료");
      location.href = "/orders/list/";
    });
});

// 주소 검색 기능

const addressSearchBtn = document.querySelector(".address__search");
console.log("addressSearchBtn");
console.log(addressSearchBtn);

function searchAddress(e) {
  e.preventDefault();

  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }

      const shippingPostCode = document.getElementById(
        "order-edit__modal__input__shipping-post-code"
      );
      const shippingStreetAddress = document.getElementById(
        "order-edit__modal__input__shipping-street-address"
      );
      const shippingExtraAddress = document.getElementById(
        "order-edit__modal__input__shipping-extra-address"
      );
      shippingPostCode.value = `${data.zonecode}`;
      shippingStreetAddress.value = `${addr} ${extraAddr}`;
      shippingExtraAddress.focus();
    },
  }).open();
}

addressSearchBtn.addEventListener("click", searchAddress);
