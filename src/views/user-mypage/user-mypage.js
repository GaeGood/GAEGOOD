const [userEmail, 
  userPassWordOne, 
  userPassWordTwo, 
  userName, 
  userPhoneNumber, 
  userPostCode, 
  userAddressOne, 
  userAddressTwo] = document.querySelectorAll('.user')

const deleteUserBtn = document.querySelector(".user__delete");
const userInfoChangeBtn = document.querySelector(".userinfo__change")
const addressChangeBtn = document.querySelector(".address__search");

// jwt 토큰에서 유저 id decode 하기 
const token = document.cookie.split("=")[1]
function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));

    return jsonPayload.id;
}

const userId = parseJwt(token)

// test userId = 6363ee2874a45025f7c7bd89

// 유저 받아오기
 fetch(`/api/users/${userId}`, {
  method: "GET"
})
  .then((res) => {
    return res.json();
  })
  .then((userData) => {
    console.log(userData)
    const { address, email, name } = userData   
    userAddressOne.value = address
    userEmail.innerHTML = email
    userName.innerHTML = name
  });


// 유저변경

function saveUserData() {
    // 비밀번호 확인
    
    if(userPassWordOne.value !== userPassWordTwo.value){
      alert('비밀번호가 다릅니다. 다시 입력해주세요.')
    }
   
     // 주소를 변경했는데, 덜 입력한 경우(상세주소 칸이 비어있을 때)
     if((userAddressOne.value = "") || (userAddressTwo.value = "")) {
      alert('주소를 다시 입력해주세요.')
     }

     // 전화번호 옳은 형식이 아닐때, 비어있을 때 경고

  fetch(`/api/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": "tes@naver.com",
      "password" : "1234",
      "name": "tes hyung",
      "role": "basic-user",
      "address": `서울특별시 성북구`
    }),
  }).then((response) => {
    if(!response.ok){
      throw new Error()
    } 
    alert('회원정보가 변경되었습니다.')
  })
  .catch((err) => alert('에러가 발생했습니다. 관리자에게 문의하세요.'));
}

userInfoChangeBtn.addEventListener('click', saveUserData)




// 주소찾기 
// Daum 주소 API 
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
      userPostCode.value = `${data.zonecode}`;
      userAddressOne.value = `${addr} ${extraAddr}`;
      userAddressTwo.focus();
    },
  }).open();
}

addressChangeBtn.addEventListener('click', searchAddress);

// 회원탈퇴 기능 

async function deleteUser(){
 
	const answer = confirm("회원 탈퇴 하시겠습니까? \n 진심이십니까?");

		if(answer === true){
			
				try {
          // jwt 토큰 날리고 (로그아웃 방법이랑 비슷?)


          // db에서 회원정보 삭제


					// 삭제 성공하면 alert뜨고 메인 홈페이지로 이동
					alert("회원 정보가 삭제되었습니다.");
          window.location.href = "/";

				} catch (err) {
					alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
			
				}
		}
}

deleteUserBtn.addEventListener('click', deleteUser);
