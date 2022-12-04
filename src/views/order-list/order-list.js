import { main, addCommas } from "/public/js/main.js";
const { loggedInUser } = await main();

if (!loggedInUser) {
  window.location.href = "/";
}

const { orderList, name, _id } = loggedInUser;

const orderNone = document.querySelector(".order__none");
const orderListZone = document.querySelector(".order__list");
const mainMypageHeader = document.querySelector(".main__mypage__header");
mainMypageHeader.innerHTML = `안녕하세요, ${name}님!`;

// 페이지 로드시 무조건 최근주문순으로
if (orderList.length) {
  orderListDefultSort();
}

function orderListDefultSort() {
  orderListZone.innerHTML = `
          <div class="table__title">
            <div class="table-header">주문정보</div>
            <div class="table__title asc__desc">
              <a class="order__sort"><div>오래된주문순</div></a>
            </div>
  `;
  orderList.reverse().forEach(orderListMake);

  // 오래된주문순 클릭 시 오래된주문순으로 정렬 이벤트
  const orderSort = document.querySelector(".order__sort");
  orderSort.addEventListener("click", orderListOldSort);
}

// 오래된주문순정렬
function orderListOldSort() {
  orderListZone.innerHTML = `
          <div class="table__title">
            <div class="table-header">주문정보</div>
            <div class="table__title asc__desc">
              <a class="order__sort"><div>최근주문순</div></a>
            </div>
  `;

  orderList.reverse().forEach(orderListMake);

  // 최근주문순 클릭 시 최근주문순으로 정렬 이벤트
  const orderSort = document.querySelector(".order__sort");
  orderSort.addEventListener("click", orderListDefultSort);
}

function orderListMake(order) {
  // 주문내역이 있으면 주문내역 없다는 안내멘트 지우기

  orderNone.className = "order__none hidden";

  const orderId = order._id;
  const countList = order.countList;
  const productIdList = order.productList;
  const orderDay = order.createdAt.split("T")[0];
  const shippingStatus = order.shippingStatus;

  orderListZone.innerHTML += `<div class="card order__contents">
        <a href="/orders/detail/${orderId}">
        <div class="card-header">${orderDay} 주문</div>
        <div class="orderzone__${orderId}" style="display:flex;align-items: center;justify-content: space-between;">
          <div class="order__${orderId}"></div>
          </a>
        </div>
  `;

  for (let i = 0; i < countList.length; i++) {
    fetch(`/api/products/${productIdList[i]}`)
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject(json);
      })
      .then((product) => {
        const productName = product.name;
        const productImg = product.smallImageURL;
        const productPrice = product.price;

        // 상품정보 삽입
        const dateOrder = document.querySelector(`.order__${orderId}`);
        dateOrder.innerHTML += `
                <div class="card-body">
                  <div class="product__picture">
                    <img src=${productImg} class="product__image"/>
                  </div>
                  <div class="product__information">
                    <h5 class="card-title">${productName}</h5>
                    <span class="card-text">${addCommas(productPrice)}원</span>
                    <span class="card-text"> / </span>
                    <span class="card-text">${countList[i]}개</span>
                  </div>
                </div>
       `;
      })
      .catch((err) => alert(err));
  }

  // 배송상태와 주문상세버튼 날짜별로 1개씩 추가
  const orderZone = document.querySelector(`.orderzone__${orderId}`);
  orderZone.innerHTML += `
        <div>
        <div class="etc__zone">
          <div class="shipping__status__${orderId}">${shippingStatus}</div>
          <a type="button" class="btn btn-outline-secondary" href="/orders/detail/${orderId}">
            주문상세</a>
        </div>
        </div>
  `;

  // 배송현황 취소완료시 글씨 색 red로 변경
  if (shippingStatus === "취소완료") {
    const shippingStatusMessage = document.querySelector(
      `.shipping__status__${orderId}`
    );
    shippingStatusMessage.style.color = "red";
  }
}

// // 최근주문순 클릭 시 최근주문순으로 정렬 이벤트
// const orderDesc = document.querySelector(".order__desc");
// orderDesc.addEventListener("click", orderListRecentSort);

// // 오래된주문순 클릭 시 오래된주문순으로 정렬 이벤트
// const orderAsc = document.querySelector(".order__asc");
// orderAsc.addEventListener("click", orderListOldSort);

// 회원탈퇴 기능
const deleteUserBtn = document.querySelector(".user__delete");

// 회원탈퇴 기능

function deleteUser() {
  const answer = confirm(
    "회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다."
  );
  if (answer) {
    fetch(`/api/users/${_id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((data) => {
        alert("회원 정보가 삭제되었습니다.");
        window.location.href = "/";
      })
      .catch((err) =>
        alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`)
      );
  }
}

deleteUserBtn.addEventListener("click", deleteUser);
