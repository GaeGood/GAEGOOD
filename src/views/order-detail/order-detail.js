import { main } from "/public/js/main.js";
const loggedInUser = await main();

const path = window.location.href;
console.log(path);

const oid = path.split("/")[4];
console.log(oid);

fetch(`/api/orders/${oid}`)
  .then(async (res) => {
    const json = await res.json();

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

    checkOrderShippingStatus(order);

    fillOrderEditModalInput(order);
  })
  .catch((error) => {
    alert(error);
  });

// order-content 렌더
function renderOrderContent(order) {
  let shippingCost;

  if (Number(order.totalAmount) >= 50000) {
    shippingCost = "0원 (5만원 이상 무료배송)";
  } else {
    shippingCost = "3,000원";
  }

  return `
    <h2 class="order-detail__title" id="order-detail__main-title">주문상세</h2>
    <div class="order-detail__order-content__outer-wrap card">
      <div class="order-detail__order-content__wrap">
        <div class="order-detail__order-content order-detail__underline"><h6>
          주문일  ${order.createdAt.slice(0, 10)}
        </h6></div>
      </div>
      <div class="order-detail__order-content__wrap">
        <div class="order-detail__order-content" id="order-detail__order-content__shipping-status__wrap">
          <h4 id="shipping-ready" class="shipping-status">배송전</h4><h5> > </h5><h4 id="shipping-ongoing" class="shipping-status">배송중</h4><h5> > </h5><h4 id="shipping-finished" class="shipping-status">배송완료</h4>
        </div>
      </div>
      <div class="order-detail__order-content__wrap" id="order-detail__order-content__product-info__wrap">
        <label id="order-history" class="order-detail__order-content__label">주문 내역</label>
        <div
          class="order-detail__order-content card"
          id="order-detail__order-content__product-info"
        ></div>
      </div>
      <div class="order-detail__order-content__wrap">
        <label class="order-detail__order-content__label">배송비</label>
        <div class="order-detail__order-content">
          ${shippingCost}
        </div>
      </div>
      <div class="order-detail__order-content__wrap">
        <label class="order-detail__order-content__label">총 결제금액</label>
        <div class="order-detail__order-content">
          ${Number(order.totalAmount).toLocaleString()} 원
        </div>
      </div>
    </div>
    <h5 class="order-detail__title">받는사람 정보</h5>
    <div class="order-detail__order-content__outer-wrap card">
      <div class="order-detail__order-content__wrap">
        <label class="order-detail__order-content__label">받는사람</label>
        <div class="order-detail__order-content order-detail__underline">
          ${order.recipientName}
        </div>
      </div>
      <div class="order-detail__order-content__wrap">
        <label class="order-detail__order-content__label">연락처</label>
        <div class="order-detail__order-content order-detail__underline">
          ${order.recipientPhoneNumber}
        </div>
      </div>
      <div class="order-detail__order-content__wrap">
        <label class="order-detail__order-content__label">주소</label>
        <div class="order-detail__order-content order-detail__underline">
          (${order.shippingPostCode})
          ${order.shippingStreetAddress}
          ${order.shippingExtraAddress}
        </div>
      </div>
      <div class="order-detail__order-content__wrap">
        <label class="order-detail__order-content__label">배송 요청사항</label>
        <div class="order-detail__order-content order-detail__underline">
          ${order.shippingRequestMessage}
        </div>
      </div>
    </div>
    `;
}

// order-content 중 product-info 렌더
function renderOrderProduct(order, productInfo) {
  for (let i = 0; i < order.productList.length; i++) {
    const productItem = document.createElement("div");
    productItem.classList.add(
      "order-detail__order-content__product-info__product-item"
    );
    productInfo.appendChild(productItem);

    const productItemLink = document.createElement("a");
    productItemLink.classList.add(
      "order-detail__order-content__product-info__product-item__link"
    );
    productItemLink.href = `/products/${order.productList[i]._id}`;
    productItem.appendChild(productItemLink);

    const productItemSmallImageURL = document.createElement("img");
    productItemSmallImageURL.classList.add(
      "order-detail__order-content__product-info__product-item__product-content"
    );
    productItemSmallImageURL.setAttribute("id", "order-detail__product-image");
    productItemSmallImageURL.src = order.productList[i].smallImageURL;
    productItemLink.appendChild(productItemSmallImageURL);

    const productItemName = document.createElement("div");
    productItemName.classList.add(
      "order-detail__order-content__product-info__product-item__product-content"
    );
    productItemName.innerText = `${order.productList[i].name} ${order.countList[i]} 개`;
    productItemLink.appendChild(productItemName);

    const productItemPrice = document.createElement("div");
    productItemPrice.classList.add(
      "order-detail__order-content__product-info__product-item__product-content"
    );
    productItemPrice.innerText = `${Number(
      order.productList[i].price
    ).toLocaleString()} 원 x ${order.countList[i]} = ${(
      Number(order.productList[i].price) * Number(order.countList[i])
    ).toLocaleString()} 원`;
    productItemLink.appendChild(productItemPrice);
  }
}

function checkOrderShippingStatus(order) {
  const shippingStatus = order.shippingStatus;
  if (shippingStatus === "배송전") {
    document.getElementById("shipping-ready").style.color = "black";
    document.getElementById("shipping-ready").style.fontSize = "36px";
  } else {
    const orderEditBtn = document.getElementById(
      "order__options__option__edit-btn"
    );
    const orderCancelBtn = document.getElementById(
      "order__options__option__cancel-btn"
    );

    orderEditBtn.disabled = true;
    orderEditBtn.title = "배송이 시작되어 주문 정보를 수정할 수 없습니다.";
    orderCancelBtn.disabled = true;
    orderCancelBtn.title = "배송이 시작되어 주문을 취소할 수 없습니다.";

    if (shippingStatus === "배송중") {
      document.getElementById("shipping-ongoing").style.color = "black";
      document.getElementById("shipping-ongoing").style.fontSize = "36px";
    } else if (shippingStatus === "배송완료") {
      document.getElementById("shipping-finished").style.color = "black";
      document.getElementById("shipping-finished").style.fontSize = "36px";
    } else if (shippingStatus === "취소완료") {
      document.getElementById(
        "order-detail__order-content__shipping-status__wrap"
      ).innerHTML = `<h2 id="shipping-cancel" class="shipping-status">취소완료</h2>`;
    }
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
    .then(async (res) => {
      const json = await res.json();
      if (res.ok) {
        return json;
      }
      return Promise.reject(json);
    })
    .then((order) => {
      // 수정된 Order 정보로 새로 그려주기
      alert("수정이 완료되었습니다.");
      const orderDetailWrap = document.getElementById("order-detail__wrap");
      orderDetailWrap.innerHTML = "";
      orderDetailWrap.innerHTML += renderOrderContent(order);

      const productInfo = document.getElementById(
        "order-detail__order-content__product-info"
      );

      renderOrderProduct(order, productInfo);
      checkOrderShippingStatus(order);

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
const orderCancelBtn = document.getElementById(
  "order__options__option__cancel-btn"
);

orderCancelBtn.addEventListener("click", (e) => {
  console.log("주문 취소 버튼 클릭");

  if (window.confirm("주문을 취소하시겠습니까?")) {
    fetch(`/api/orders/${oid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingStatus: "취소완료" }),
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((order) => {
        alert("주문 취소가 완료되었습니다.");

        const productInfo = document.getElementById(
          "order-detail__order-content__product-info"
        );

        productInfo.innerHTML = "";

        renderOrderProduct(order, productInfo);
        checkOrderShippingStatus(order);
      });
  }
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
