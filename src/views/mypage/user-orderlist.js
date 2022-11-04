/*

주문배송조회 btn 눌렀을 때의 로직
1. 페이지 로딩 시 토큰 유무 확인해서 가지고 있다면
  1-1 document.Cookie(jwt_token) 값으로 쿠키가 없으면(status가 200이 아니면, 즉 400이면(로그인정보가 없거나 잘못된 토큰 가지고 있을 때)) 
      alert (내용에 res.뜨면서 로그인페이지로 redirect
(로그인을 모달로 한다면 메인 홈화면으로!)
로그인 여부 확인을 resCode로 확인(서버에서 status코드를 return 해줌) 200을 받는지 받지 않는지 여부로 로그인 확인

  1-2 쿠키가 있다면 마이페이지 화면으로 redirect

  -----------

2. get 요청을 통해 유저에 맞는 주문목록을 가져온다
 2-1 브라우저가 가지고 있는 jwt 토큰을 변환(jwt 토큰 decode 검색해서 알아보자)하여 
	const userId = jwt 토큰 decode한 내용 중 payload의 userId를 변수에 할당
		그 안의 payload에 userID로 유저 정보 줘!

		decode할 필요 없고 변환된거 백에서 던저줌 userId
	const user = fetch(`api/users/${userId}`)  
		.then((res) => {
    	return res.json();
  		})

	if(user) {
		user이용해서 그려주고
	}
	else {
		로그인이 안된 사용자를 위한 기능
		로그인을 할 수 있는 페이지나 화면으로 이동하게끔.
	}


    (유저 정보에는 주문목록과 배송) DB로 다시 요청해서 유저를 찾음
 2-2 그 유저의 주문 list를 받아온다

 -----------

3. 받아온 주문목록(json) 을 내가 만든 form으로 알맞게 가져온다
(이건 home 상품목록 가져오는거랑 비슷하게 가져오면 될듯함)

*/



/* 페이지 이동시 자동 로드되는 내용(주문목록) */

/*

1. 페이지 로딩 시 토큰 유무 확인해서 가지고 있다면
  1-1 쿠키가 없으면 alert 뜨면서 로그인페이지로 redirect
(로그인을 모달로 한다면 메인 홈화면으로!)
로그인 여부 확인을 resCode로 확인 200을 받는지 받지 않는지 여부로 로그인 확인

  1-2 쿠키가 있다면 마이페이지 화면으로 redirect

*/


// 2. get 요청을 통해 유저에 맞는 주문목록을 가져온다



// 주문목록 가져와서 기존 테이블에 요소 하나하나 추가하기
const orderListTable = document.querySelector(".orderlist-table");

fetch("/api/products")
  .then((res) => {
    return res.json();
  })
  .then((orderList) => {
    const createOrderContent = (orderLists) => 
	{`<tr>
		<th><img src="#"></th>
		<td>
			<div>${orderList.name}</div>
			<div>${orderList.count}</div>
		</td>
		<td>
			<div>${orderList.deliveryStatus}</div>
			<button class="order-cancel">주문취소</button>
		</td>
	</tr>`}

    orderList.forEach((orderContent) => {
      const newOrderContent = createOrderContent(orderContent);
      orderListTable.innerHTML += newOrderContent;
    });
  });



// 주문 취소 버튼 눌렀을 때 발생 로직
const orderCancelBtn = document.querySelector(".order-cancel");

function orderCancel(){
    // alert('test')
		const answer = confirm("주문 취소 시 복구할 수 없습니다. \n 정말로 취소하시겠습니까?");
		if(answer == true){
			alert('주문이 취소되었습니다')
		}
    }

orderCancelBtn.addEventListener('click', orderCancel)
