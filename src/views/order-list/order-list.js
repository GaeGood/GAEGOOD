import { main } from "/main.js";
const { loggedInUser } = await main();

const orderListTable = document.querySelector(".orderlist-table");
const deleteUserBtn = document.querySelector(".user__delete");

console.log(loggedInUser)
// 유저 불러오기
let { _id } = loggedInUser

// 상품 불러오기
fetch("/api/orders") // /api/orders 로 get요청
  .then((res) => {
    return res.json();
  })
  .then((orderLists) => {
    orderLists.forEach(orderList)
    const createOrderContent = (orderList) => 
	{                
		`<div>
			<div>${orderLists.date}</div>
			<table class="orderlist-table" id="order-${_id}">
				<tr>
					<th><img src=`&{orderList.smallImageURL}`></th>
					<td>
						<div>${orderList.name}</div>
						<div>${orderList.count}</div>
					</td>
					<td>
						<div>${orderList.deliveryStatus}</div>
						<button class="order-cancel">주문취소</button>
					</td>
				</tr>
			</table>
		</div>`		
				}


    orderList.forEach((orderContent) => {
      const newOrderContent = createOrderContent(orderContent);
      orderListTable.innerHTML += newOrderContent;
    });
  });



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

function deleteUser(){
	const answer = confirm("회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다.");
	  if(answer){
      fetch(`/api/users/${_id}`,{
      method:"DELETE"
      })
      .then(response=>response.json())
      .then(data => {
        alert("회원 정보가 삭제되었습니다.")
        window.location.href = "/"
      })
      .catch( err => alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`));
    }
}

deleteUserBtn.addEventListener('click', deleteUser);