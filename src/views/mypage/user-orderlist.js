
const orderCancelBtn = document.querySelector(".order-cancel");

function orderCancel(){
    // alert('test')
		const answer = confirm("주문 취소 시 복구할 수 없습니다. \n 정말로 취소하시겠습니까?");
		if(answer == true){
			alert('주문이 취소되었습니다')
		}
    }

orderCancelBtn.addEventListener('click', orderCancel)

// // db에서 주문정보 삭제
// async function deleteOrderData(e) {
//   e.preventDefault();

//   try {
//     await Api.delete("/api/orders", orderIdToDelete);

//     // 삭제 성공
//     alert("주문 정보가 삭제되었습니다.");

//     // 삭제한 아이템 화면에서 지우기
//     const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
//     deletedItem.remove();

//     // 전역변수 초기화
//     orderIdToDelete = "";

//     closeModal();
//   } catch (err) {
//     alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
//   }
// }