/*
  {
    // shortId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "basic-user",
    },
    address: {
      type: String,
      required: true,
      default: "서울특별시 선동구 성수성수2가3동 광나루로6길 49",
    },
*/


/*
우리가 정한 마이페이지 로직

1. 마이페이지 버튼 클릭하면 마이페이지 화면으로 이동한다.
2. 수정할 항목 데이터를 채워준다. 이때, 각 항목에 대해 이미 db에 존재하는 데이터가 있으면 각 항목에 뿌려줄지, 그냥 빈칸으로 둘지에 대해서는 고려해보기.
3. 수정하기를 클릭하면 현재 비밀번호를 입력해야 하는 모달창이 표시된다.
4. 현재 비밀번호를 입력하고 모달에 있는 저장하기 버튼을 클릭하면, 백으로 사용자 구별할수 있는 키 값으로 식별한 뒤 하나의 사용자만을 선택해 사용자가 입력한 정보로 put 요청으로 보낸다. 업데이트 된 정보가 있을 경우에는 업데이트 완료되었습니다 alert 메시지 띄우고, 업데이트 된 정보가 없을 경우에는 업데이트된 정보가 없습니다 alert 메시지를 띄운다.
5. alert메시지 확인을 누르면 다른 곳으로 이동되지 않고 alert만 꺼진다.

*/
const passwordChgBtn = document.querySelector(".password.change");
const phoneNumberChgBtn = document.querySelector(".phonenumber.change");
const addressChgBtn = document.querySelector(".address.change");


passwordChgBtn.addEventListener('click', changeAlert);
phoneNumberChgBtn.addEventListener('click', changeAlert)
addressChgBtn.addEventListener('click', changeAlert)

function changeAlert() {
    alert("변경이 완료되었습니다.")
    // 유저 정보 업데이트 하는 코드가 필요. 
    // 즉 해당하는 유저정보(비밀번호, 휴대폰번호, 주소 각각이) 가 서버로 다시 이동
}

// 파일 받아오기
fetch("/api/products")
  .then((res) => {
    return res.json();
  })
  .then((productList) => {
    const createCard = (item) => {
      return `<div class="card ${item.category}">
      <a href='/products/detail/${item._id}'>
        <img src="${item.smallImageURL}" class="card-img-top" alt="${
        item.name
      }" />
        <div class="card-body">
        <div class="card-body">${item.category}</div>
        <div class="card-text card-text-title">${item.name}</div>
        <div class="card-text card-spec">${item.shortDesc}</div>
        <div class="card-text">${addCommas(item.price)}</div>
        </div>
      </a>
      </div>
    </div>`;
    };
    productList.forEach((product) => {
      const newCard = createCard(product);
      cards.innerHTML += newCard;
    });
  });


// 회원탈퇴 기능 

// 단순 탈퇴버튼 누르면 - confirm() 창 뜨고 - true면 jwt 토큰 날리고, db에서 정보 없앰 (delete)
const deleteUserBtn = document.querySelector(".user-delete");

async function deleteUser(){
	const answer = confirm("회원 탈퇴 하시겠습니까? \n 진심이십니까?");

		if(answer === true){
			
				try {
          //  jwt 토큰 날리고 (로그아웃 방법이랑 비슷?)

          // db에서 회원정보 삭제

					// 삭제 성공
					alert("회원 정보가 삭제되었습니다.");
          
          // 메인 홈페이지로 이동시키기
          
				} catch (err) {
					alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
			
				}
		}
}

deleteUserBtn.addEventListener('click', deleteUser);
