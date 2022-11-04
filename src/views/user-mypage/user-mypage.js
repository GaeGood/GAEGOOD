const passwordChgBtn = document.querySelector(".password.change");
const phoneNumberChgBtn = document.querySelector(".phonenumber.change");
const addressChgBtn = document.querySelector(".address.change");


passwordChgBtn.addEventListener('click', changeAlert);
phoneNumberChgBtn.addEventListener('click', changeAlert)
addressChgBtn.addEventListener('click', changeAlert)

function changeAlert() {
    alert("변경이 완료되었습니다.")
    // 유저 정보 업데이트 하는 코드가 필요. 
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
