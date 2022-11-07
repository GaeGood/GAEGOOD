import { main } from "/main.js";
const { loggedInUser } = await main(); 

console.log(loggedInUser)


// 장바구니 정보 가져오기


const idxedDB = window.indexedDB.open('cartDB');
console.log(idxedDB)



// 기존 DB의 사용자 정보 가져오기

/*
address: "d"
createdAt: "2022-11-06T14:50:43.961Z"
email: "test3@naver.com"
extraAddress: "d"
name: "may"
password: "$2b$10$kiCMxMBhgu5XN4esa7i./OprjomKxlIeRice2vNBrJUb4QVEiD0wO"
phoneNumber: "01012345678"
postCode: "d"
role: "basic-user"
updatedAt: "2022-11-07T02:23:07.974Z"
__v: 0
_id: "6367c9c386545678e88c4bbf"

*/
const { name, phoneNumber, postCode, address, extraAddress, _id } = loggedInUser
const [ userName, userPhoneNumber, userPostCode, userAddress, userExterAddress, userRequestMessage ] = document.querySelectorAll('.user')

console.log(name, phoneNumber, postCode, address, extraAddress, _id)

userName.value = name
userPhoneNumber.value = phoneNumber
userPostCode.value = postCode
userAddress.value = address
userExterAddress.value = extraAddress




// 주소찾기 
const addressSearchBtn = document.querySelector(".address__search");
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
      userAddress.value = `${addr} ${extraAddr}`;
      userExterAddress.value = ""
      userExterAddress.focus();
    },
  }).open();
}

addressSearchBtn.addEventListener('click', searchAddress);



// 받아온 정보를 배송정보로 POST

/*
스키마
  async addOrder(req, res, next) {
    const {
      buyer,
      productList,
      countList,
      shippingStatus,
      -shippingPostCode,
      shippingAddress,
      -shippingExtraAddress,
      -shippingRequestMessage,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = req.body;


*/


// const test = {
//     "buyer":`${_id}`,
//     "productList":["636558f323b82631a9ca229c", "6365500afaa3aa6363ad1923", "63654fd2faa3aa6363ad190c"],
//     "countList":["1", "3", "2"],
//     "shippingStatus":"배송전",
//     "shippingPostCode":`${userPostCode.value}`,
//     "shippingAddress":`${userAddress.value}`,
//     "shippingExtraAddress":`${userExterAddress.value}`,
//     "shippingRequestMessage": `${userRequestMessage.value}`,
//     "totalAmount":" 총 금액",
//     "recipientName":`${userName.value}`,
//     "recipientPhoneNumber":`${userPhoneNumber.value}`
//       }

//       console.log(test)


const shippingInformationList = (() => 
    { return {
    "buyer":`${_id}`,
    "productList":["636558f323b82631a9ca229c", "6365500afaa3aa6363ad1923", "63654fd2faa3aa6363ad190c"],
    "countList":["1", "3", "2"],
    "shippingStatus":"배송전",
    "shippingPostCode":`${userPostCode.value}`,
    "shippingAddress":`${userAddress.value}`,
    "shippingExtraAddress":`${userExterAddress.value}`,
    "shippingRequestMessage": `${userRequestMessage.value}`,
    "totalAmount": "총 금액",
    "recipientName":`${userName.value}`,
    "recipientPhoneNumber":`${userPhoneNumber.value}`
      }})


// post시 빈칸 있으면 return alert 진행
// 결제 완료 된다음에 indexedDB에서 값 지울건지도 상의해봐야겠네(즉 장바구니를 비울지?)

// fetch(`api/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(shippingInformationList),
//     })
//     .then((response) => response.json())
//     .then(() => {
//       alert('회원정보가 변경되었습니다.')
//       // window.location.href = "/users/mypage";
//     })
//     .catch((err) => {
//       alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`)
//     });











// 요청사항
const requestOption = {
  1: "직접 수령하겠습니다.",
  2: "배송 전 연락바랍니다.",
  3: "부재 시 경비실에 맡겨주세요.",
  4: "부재 시 문 앞에 놓아주세요.",
  5: "부재 시 택배함에 넣어주세요.",
  6: "직접 입력",
};

// "직접 입력" 선택 시 input칸 보이게 함
// default값(배송 시 요청사항을 선택해 주세여) 이외를 선택 시 글자가 진해지도록 함
const requestSelectBox = document.querySelector('#request__Select__Box')
const requestMessageInput = document.querySelector('.request__message')
const selectOptions = document.querySelectorAll('.select__option')

function handleRequestChange(e) {
  const type = e.target.value;

  if (type !== "5") { // type이 5이 아니면 
    requestMessageInput.value = selectOptions[parseInt(type)].innerHTML.trim()
  } else {
    requestMessageInput.placeholder = "최대 50자 입력가능"
    requestMessageInput.focus()
  }

}

requestSelectBox.addEventListener("change", handleRequestChange);

const payBtn = document.querySelector('.pay__button')
// 결제하기 버튼 눌렀을 때


function payBtnClick(){
    alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
    window.location.href = "/"
}

payBtn.addEventListener('click', payBtnClick)