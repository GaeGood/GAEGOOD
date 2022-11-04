const orderListTable = document.querySelector(".orderlist-table");

fetch("/api/orders") // /api/orders 로 get요청
  .then((res) => {
    return res.json();
  })
  .then((orderList) => {
    const createOrderContent = (orderLists) => 
	{                
		`<div>
			<div>${orderList.date}</div>
			<table class="orderlist-table" id="order-${_id}">
				<tr>
					<th><img src="#"></th>
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
const orderCancelBtn = document.querySelector(".order-cancel");

function orderCancel(){
		const answer = confirm("주문 취소 시 복구할 수 없습니다. \n 정말로 취소하시겠습니까?");
		if(answer == true){

			// db에서 주문정보 삭제
				try {
					// 삭제 성공
					alert("주문 정보가 삭제되었습니다.");

					// 삭제한 아이템 화면에서 지우기
					// const deletedItem = document.querySelector(`#order-${id}`);
					// deletedItem.remove();

				} catch (err) {
					alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
				}
			}
		}
    
orderCancelBtn.addEventListener('click', orderCancel);


// 회원탈퇴 기능 
const deleteUserBtn = document.querySelector(".user-delete");

async function deleteUser(){
	const answer = confirm("회원 탈퇴 하시겠습니까? \n 진심이십니까?");
		if(answer === true){
			try {
				// 삭제 성공
				alert("회원 정보가 삭제되었습니다.");
				
				// 메인 홈페이지로 이동시키기
		
			} catch (err) {
				alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
			}
		}
}

deleteUserBtn.addEventListener('click', deleteUser);
