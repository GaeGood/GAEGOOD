import { addCommas } from "/useful-functions.js";
import { verifyToken } from "/verify-token.js";

// verifyToken : 브라우저가 갖고 있는 JWT토큰을 서버로부터 검증 받는 함수
// 검증 성공 시 => { verifySucceed: true, loggedInUser } 을 반환
// 검증 실패 시 => { verifySucceed: false } 을 반환
const verifyResult = await verifyToken();

const { loggedInUser } = verifyResult;

console.log("-------------------- 토큰 검증 종료 -------------------------");

const navAddLogin = document.querySelector(".navbar-nav");

if (loggedInUser) {
  // removeLoginLi();
  renderLogoutLi();
} else {
  // removeLogoutLi();
  renderLoginLi();
}

function renderLoginLi() {
  const loginLi = document.createElement("li");
  loginLi.className += " login__btn";
  loginLi.innerHTML += `<a class="nav-link active nav-item" data-bs-toggle="modal" data-bs-target="#modalLogin"
              aria-current="page" href="#none">로그인</a>`;
  navAddLogin.prepend(loginLi);
  
  // 마이페이지 버튼 삭제 -> 회원가입 생성
  const mypageHtml = document.querySelector(".nav-item.mypage")
  mypageHtml.className = "nav-item mypage hidden";
  const joinHtml = document.querySelector(".nav-item.join")
  joinHtml.className = "nav-item join"

}

function removeLoginLi() {
  const loginLi = document.querySelector(".login__btn");
  navAddLogin.removeChild(loginLi);
}

function renderLogoutLi() {
  const logoutLi = document.createElement("li");
  logoutLi.className += " logout__btn";
  logoutLi.innerHTML += `<a class="nav-link active nav-item">로그아웃</a>`;

  logoutLi.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("/api/auth/logout", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.resMsg.msg);
        removeLogoutLi();
        renderLoginLi();
      });
  });
  navAddLogin.prepend(logoutLi);
  
  // 회원가입버튼 삭제 -> 마이페이지 버튼 나타내기
  const mypageHtml = document.querySelector(".nav-item.mypage")
  mypageHtml.className = "nav-item mypage";
  
  const joinHtml = document.querySelector(".nav-item.join")
  joinHtml.className = "nav-item join hidden"
  
}

function removeLogoutLi() {
  const logoutLi = document.querySelector(".logout__btn");
  navAddLogin.removeChild(logoutLi);
  // window.location.href = "/";

}

const [userEmail, 
  userPassWordOne, 
  userPassWordTwo, 
  userName, 
  userPhoneNumber, 
  userPostCode, 
  userAddressOne, 
  userExtraAddress] = document.querySelectorAll('.user')

const deleteUserBtn = document.querySelector(".user__delete");
const userInfoChangeBtn = document.querySelector(".userinfo__change")
const addressChangeBtn = document.querySelector(".address__search");


// 유저 불러오기
let { address, extraAddress, postCode, createdAt, email, name, password, role, _id, phoneNumber } = loggedInUser

userEmail.innerHTML = email;
userName.value = name;
userPhoneNumber.value = phoneNumber;
userPostCode.value = postCode;
userAddressOne.value = address;
userExtraAddress.value = extraAddress;

// 주소와 핸드폰번호가 없을 경우 빈칸으로 만들기
if(userPostCode.value == "undefined" || userAddressOne.value == "undefined"){
  userPostCode.value = ""
  userAddressOne.value = ""
  userExtraAddress.value = ""
}

if(userPhoneNumber.value == "undefined"){
  userPhoneNumber.value = ""
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

addressSearchBtn.addEventListener('click', searchAddress);


// 유저변경
function saveUserData(e) {
    e.preventDefault();

    // 비밀번호 확인
    if(!(userPassWordOne.value == "" && userPassWordTwo.value == "")){ // 두 칸이 빈칸이 아니면 = 하나라도 입력값이 있으면
      if (userPassWordOne.value !== userPassWordTwo.value) { // 두 값이 틀리면
        return alert('비밀번호가 다릅니다. 다시 입력해주세요.')
      } else if (userPassWordOne.value === userPassWordTwo.value) {
        password = userPassWordOne.value;
      }
    } else {
      return alert('비밀번호를 입력해주세요.')
    }

    // 주소를 변경했는데, 덜 입력한 경우(상세주소 칸이 비어있을 때)
    if ((userAddressOne.value === "") || (userExtraAddress.value === "")) {
      return alert('주소를 다시 입력해주세요.')
    }
     
   
    // 전화번호
    if(userPhoneNumber.value !== ""){
      // 숫자만 매칭
        const numberCheck = userPhoneNumber.value.split("")
        let result = []
        numberCheck.forEach((number) => {
          const pattern = /[0-9]/g
          result.push(number.match(pattern))
        })
      
      // 숫자가 아닌 다른값이 들어가 있을 경우
      if (result.includes(null)) {
        return alert('잘못 입력하셨습니다. 숫자만 입력하세요.')
      }
      // 길이가 아닐 경우
      if (!((numberCheck.length >= 10) && (numberCheck.length <= 11))){
        return alert("잘못 입력하셨습니다. 알맞은 번호를 입력하세요.")
      }
      
    } else {
      userPhoneNumber.value = phoneNumber
    }

    
    fetch(`/api/users/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // "password" : `${password}`,
        // "name": `${userName.value}`,
        // "address": `${userAddressOne.value}`,

        "_id" : `${_id}`,
        "email": `${email}`,
        "password" : `${password}`,
        "phoneNumber" : `${userPhoneNumber.value}`,
        "createdAt" : `${createdAt}`,
        "name": `${userName.value}`,
        "role": `${role}`,
        "postCode": `${userPostCode.value}`,
        "address": `${userAddressOne.value}`,
        "extraAddress": `${userExtraAddress.value}`
      }),
    })
    .then((response) => response.json())
    .then((userInfoChange) => {
      alert('회원정보가 변경되었습니다.')
      // window.location.href = "/users/mypage";
    })
    .catch((err) => {
      alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`)
    });
}

userInfoChangeBtn.addEventListener('click', saveUserData)


// 회원탈퇴 기능 

function deleteUser(){
	const answer = confirm("회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다.");
	  if(answer === true){
      fetch(`/api/users/${_id}`,{
      method:"DELETE"
      })
      .then(response=>response.json())
      .then(data=>{
        alert("회원 정보가 삭제되었습니다.")
        window.location.href = "/"
      })
      .catch( err => alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`));
    }
}

deleteUserBtn.addEventListener('click', deleteUser);
