import { main } from "/main.js";
const { loggedInUser } = await main();

const { orderList } = loggedInUser;

console.log(orderList);
// orderList에서 뽑아올 내용
// countList
// productList
// createdAt(상품주문시간)
// shippingStatus

// 상품에서 뽑아올 내용
// fetch통해 상품이름, 상품 가격, 상품 사진

const orderContents = document.querySelector(".order__contents");

orderList.forEach((order) => {
  const orderId = order._id;
  const countList = order.countList;
  const productIdList = order.productList;
  const orderDay = order.createdAt.split("T")[0];
  const orderTime = order.createdAt.split("T")[1].slice(0, 8);
  const shippingStatus = order.shippingStatus;

  productIdList.forEach((productId) => {
    countList.forEach((count) => {
      /* 상품 상세정보 불러오기*/
      fetch(`/api/products/${productId}`)
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

          orderContents.innerHTML += `<a href="/orders/${orderId}">
            <div class="card-header">${orderDay} 주문</div>
            <span class="card-body">
              <div class="product__picture">
                <img src=${productImg} class="product__image"/>
              </div>
              <div class="product__information">
                <h5 class="card-title">${productName}</h5>
                <span class="card-text">${productPrice}원</span>
                <span class="card-text">${count}개</span>
              </div>
              <div class="etc__zone">
                <div>${shippingStatus}</div>
                <button href="#" class="btn btn-primary">
                주문취소
                </button>
              </div>
            </span>
          </a>`;
        })
        .catch((err) => alert(err));
    });
  });
});

const orderListTable = document.querySelector(".orderlist-table");
const deleteUserBtn = document.querySelector(".user__delete");

/*
createdAt: "2022-11-08T11:59:20.516Z"
email: "maymaymay@naver.com"
extraAddress: "상세 주소"
name: "imay"
orderList: Array(2)
  0: {_id: '636a5b18392e60ba131f6484', buyer: '636a4498404007c6e61cee89', productList: Array(2), countList: Array(2), shippingStatus: '배송전', …}
  1: {_id: '636a5cab920248f1e57da9eb', buyer: '636a4498404007c6e61cee89', productList: Array(3), countList: Array(3), shippingStatus: '배송전', …}

password: "$2b$10$xbtHEanKhMDfMgIVxd.v..PrnmvVdxhI8meA6AP6U5bNVbWWYSG56"
phoneNumber: "1234567890"
postCode: "우편번호"
role: "basic-user"
streetAddress: "도로명"
updatedAt: "2022-11-08T13:42:03.209Z"
__v: 2
_id: "636a4498404007c6e61cee89"

*/

/*
오더정보

buyer: "636a4498404007c6e61cee89"
countList: (2) [1, 1]
createdAt: "2022-11-08T13:35:20.530Z"
productList: Array(2)
  0: "63654ee0faa3aa6363ad18bc"
  1: "63654f3ffaa3aa6363ad18e8"

recipientName: "imay"
recipientPhoneNumber: "1234567890"
shippingExtraAddress: "상세 주소"
shippingPostCode: "우편번호"
shippingRequestMessage: "부재 시 문 앞에 놓아주세요."
shippingStatus: "배송전"
shippingStreetAddress: "도로명"
totalAmount: "33000"
updatedAt: "2022-11-08T13:35:20.530Z"
__v: 0
_id: "636a5b18392e60ba131f6484"

*/

// 상품 불러오기
// fetch("/api/orders") // /api/orders 로 get요청
//   .then((res) => {
//     return res.json();
//   })
//   .then((orderLists) => {
//     orderLists.forEach(orderList)
//     const createOrderContent = (orderList) =>
// 	{
// 		`<div>
// 			<div>${orderLists.date}</div>
// 			<table class="orderlist-table" id="order-${_id}">
// 				<tr>
// 					<th><img src=`&{orderList.smallImageURL}`></th>
// 					<td>
// 						<div>${orderList.name}</div>
// 						<div>${orderList.count}</div>
// 					</td>
// 					<td>
// 						<div>${orderList.deliveryStatus}</div>
// 						<button class="order-cancel">주문취소</button>
// 					</td>
// 				</tr>
// 			</table>
// 		</div>`
// 				}

//     orderList.forEach((orderContent) => {
//       const newOrderContent = createOrderContent(orderContent);
//       orderListTable.innerHTML += newOrderContent;
//     });
//   });

// 주문 취소 버튼 눌렀을 때 발생 로직
// const orderCancelBtn = document.querySelector(".order-cancel");

// function orderCancel(){
//       // 배송상태 확인해서 상품준비중 혹은 배송 전 상태일때만 취소 가능하게 진행
//   if() {

//   }
// 		const answer = confirm("주문 취소 시 복구할 수 없습니다. \n 정말로 취소하시겠습니까?");
// 		if(answer){

// 			// db에서 주문정보 삭제
// 				try {
// 					// 삭제 성공
// 					alert("주문 정보가 삭제되었습니다.");

// 					// 삭제한 아이템 화면에서 지우기
// 					// const deletedItem = document.querySelector(`#order-${id}`);
// 					// deletedItem.remove();

// 				} catch (err) {
// 					alert(`주문정보 삭제 과정에서 오류가 발생하였습니다 \n: ${err}`);
// 				}
// 			}
// 		}

// orderCancelBtn.addEventListener('click', orderCancel);

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
