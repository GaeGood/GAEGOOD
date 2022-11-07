console.log("hi i'm order-detail.js");

import { main } from "/main.js";
const loggedInUser = await main();

const orderDetailWrap = document.getElementById("order-detail__wrap");

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

    orderDetailWrap.innerHTML += `
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
          <label class="order-detail__order-content__label">배송 상태</label>
          <div class="order-detail__order-content">${order.shippingStatus}</div>
        </div>
        <div class="order-detail__order-content__wrap">
          <label class="order-detail__order-content__label">배송 주소</label>
          <div class="order-detail__order-content">${order.shippingAddress}</div>
        </div>
        <div class="order-detail__order-content__wrap">
          <label class="order-detail__order-content__label">총액</label>
          <div class="order-detail__order-content">${order.totalAmount}</div>
        </div>
        <div class="order-detail__order-content__wrap">
          <label class="order-detail__order-content__label">수령인 이름</label>
          <div class="order-detail__order-content">${order.recipientName}</div>
        </div>
        <div class="order-detail__order-content__wrap">
          <label class="order-detail__order-content__label">수령인 연락처</label>
          <div class="order-detail__order-content">${order.recipientPhoneNumber}</div>
        </div>`;

    const productInfo = document.getElementById(
      "order-detail__order-content__product-info"
    );

    renderOrderProduct(order, productInfo);
  })
  .then((error) => {
    alert(error);
  });

function renderOrderProduct(order, productInfo) {
  console.log(order);
  console.log(productInfo);
  for (let i = 0; i < order.productList.length; i++) {
    const productItem = document.createElement("div");
    productItem.classList.add(
      "order-detail__order-content__product-info__product-item"
    );
    productItem.innerText = `${order.productList[i].name} ${order.countList[i]} 개`;

    productInfo.appendChild(productItem);
  }
}

const orderEditBtn = document.getElementById(
  "order__options__option__edit-btn"
);

orderEditBtn.setAttribute("href", `/orders/${oid}/edit`);

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
      console.log(data);
    });
});
