const [userEmail, userPassWordOne, userPassWordTwo, 
  userName, userPhoneNumber, userPostCode, 
  userAddressOne, userAddressTwo] = document.querySelectorAll('.user')

const deleteUserBtn = document.querySelector(".user__delete");
const userInfoChangeBtn = document.querySelector(".userinfo__change")
const addressChangeBtn = document.querySelector(".address__search");



function changeAlert() {
    // 비밀번호를 새로 작성한 경우

     // 주소를 변경했는데, 덜 입력한 경우(상세주소 칸이 비어있을 때)

     // 전화번호 옳은 형식이 아닐때, 비어있을 때 경고


    alert("변경이 완료되었습니다.")
    // 유저 정보 업데이트 하는 코드가 필요. 
}

userInfoChangeBtn.addEventListener('click',changeAlert)

// let userData;
// async function insertUserData() {
//   userData = await Api.get("/api/user");

//   // 객체 destructuring
//   const { fullName, email, address, phoneNumber } = userData;

//   // 서버에서 온 비밀번호는 해쉬 문자열인데, 이를 빈 문자열로 바꿈
//   // 나중에 사용자가 비밀번호 변경을 위해 입력했는지 확인하기 위함임.
//   userData.password = "";

//   securityTitle.innerText = `회원정보 관리 (${email})`;
//   fullNameInput.value = fullName;

//   if (address) {
//     const { postalCode, address1, address2 } = address;

//     postalCodeInput.value = postalCode;
//     address1Input.value = address1;
//     address2Input.value = address2;
//   } else {
//     // 나중에 입력 여부를 확인하기 위해 설정함
//     userData.address = { postalCode: "", address1: "", address2: "" };
//   }

//   if (phoneNumber) {
//     phoneNumberInput.value = phoneNumber;
//   }

//   // 크롬 자동완성 삭제함.
//   passwordInput.value = "";

// }


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
    const { address, email, name } = userData   
    userAddressOne.value = address
    userEmail.innerHTML = email
    userName.innerHTML = name
  });


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
      userAddressTwo.placeholder = "상세 주소를 입력해 주세요.";
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
