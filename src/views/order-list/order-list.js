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
  const shippingStatus = order.shippingStatus;

  orderContents.innerHTML += `<a href="/orders/${orderId}" >
        <div class="card-header">${orderDay} 주문</div>
        <div class="order__${orderId}" style='display:flex'></div>
        </a>`;

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
        // 여기서부터 복붙

        const dateOrder = document.querySelector(`.order__${orderId}`);

        dateOrder.innerHTML += `
        <div>
                <span class="card-body">
                  <div class="product__picture">
                    <img src=${productImg} class="product__image"/>
                  </div>
                  <div class="product__information">
                    <h5 class="card-title">${productName}</h5>
                    <span class="card-text">${productPrice}원</span>
                    <span class="card-text">${countList[i]}개</span>
                  </div>
                </span>
        </div>`;
        //<div>
        // <div class="etc__zone">
        //   <div>${shippingStatus}</div>
        //   <button href="#" class="btn btn-primary">
        //     주문상세
        //   </button>
        // </div>
        //</div>

        //   orderContents.innerHTML += `<a href="/orders/${orderId}" class="order">
        //   <div class="card-header">${orderDay} 주문</div>
        //   <span class="card-body">
        //     <div class="product__picture">
        //       <img src=${productImg} class="product__image"/>
        //     </div>
        //     <div class="product__information">
        //       <h5 class="card-title">${productName}</h5>
        //       <span class="card-text">${productPrice}원</span>
        //       <span class="card-text">${countList[i]}개</span>
        //     </div>
        //     <div class="etc__zone">
        //       <div>${shippingStatus}</div>
        //       <button href="#" class="btn btn-primary">
        //       주문취소
        //       </button>
        //     </div>
        //   </span>
        // </a>`;
      })
      .catch((err) => alert(err));
  }
  const dateOrder = document.querySelector(`.order__${orderId}`);
  dateOrder.innerHTML += `
        <div>
        <div class="etc__zone">
          <div>${shippingStatus}</div>
          <button href="#" class="btn btn-primary">
            주문상세
          </button>
        </div>
        </div>
  `;
});

const deleteUserBtn = document.querySelector(".user__delete");

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
