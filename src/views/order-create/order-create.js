import { main } from "/main.js";
const { loggedInUser } = await main(); 
import {
  deleteIndexedDBdata,
  getAllIndexedDB,
  getIndexedDB,
  getAllKeysIndexedDB,
} from "/indexedDB.js";

const DATABASE_NAME = "cartDB";
const version = 1;
const objectStore = "cartStorage";

// 장바구니 상품 여부 확인
const orderProductList = await getAllIndexedDB(DATABASE_NAME, version, objectStore, 
  function(orderProductDBList) {
    return orderProductDBList;
  })

  if(!orderProductList){
    alert('장바구니에 상품이 없습니다.')
    window.location.href = "/"
  }


// db에 있는 기존 유저정보 화면에 띄우기 
const { email, name, phoneNumber, postCode, address, extraAddress, _id } = loggedInUser
console.log(loggedInUser)
const [ userName, userPhoneNumber, userPostCode, userStreetAddress, userExterAddress, userRequestMessage ] = document.querySelectorAll('.user')
const [ productsPriceHTML , deliveryFeeHTML, totalPriceHTML ] = document.querySelectorAll('.pay')

if (!phoneNumber && !postCode && !extraAddress){
  userName.value = name
  userPhoneNumber.value = ""
  userPostCode.value = ""
  userStreetAddress.value = address
  userExterAddress.value = ""
} else {
  userName.value = name
  userPhoneNumber.value = phoneNumber
  userPostCode.value = postCode
  userStreetAddress.value = address
  userExterAddress.value = extraAddress
}








// 아래 변수는 post시에 사용될 상품 id들, 수량들의 객체를 위해 선언


/*
orderProductList
amount: 1
bigImageURL: "/public/images/product-images/자유형-개발자-스티커.png"
category: 
 createdAt: "2022-11-04T17:40:36.745Z"
 name: "스티커/지류"
 updatedAt: "2022-11-04T17:40:36.745Z"
 __v: 0
 _id: "63654e94faa3aa6363ad18b3"

id: "63654ee2faa3aa6363ad18c8" // 상품ID
longDesc: "스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. 스티커/지류 긴 설명입니다. "
name: "스티커/지류"
price: 15000
shortDesc: "스티커/지류 짧은 설명입니다."
smallImageURL: "/public/images/product-images/말풍선-개발자-스티커.png"
stock: 10
*/

const orderProductTable = document.querySelector('.product__list')

const productAllIdArr = []
const productAllAmountArr = []
let productsPrice = 0
orderProductList.forEach((orderProduct) => {

        // 장바구니 각각의 상품마다 표 생성될 수 있도록 템플릿리터럴 진행~
        orderProductTable.innerHTML += `
            <tr>
              <td>
                  <span class="order product__id hidden">${orderProduct.id}</span>
              </td>
              <td>
                  <img src="${orderProduct.smallImageURL}" class="order product__picture" />
              </td>
              <td>
                  <span class="order product__info">
                    <div>${orderProduct.name}</div>
                    <div>${orderProduct.shortDesc}</div>
                  </span>
              </td>
              <td>
                  <span class="order product__amount">${orderProduct.amount}</span>
              </td>
              <td>
                  <span class="order product__price">${orderProduct.price}원</span>
              </td>
            </tr>  
            `

        productAllIdArr.push(orderProduct.id)
        productAllAmountArr.push(orderProduct.amount)

        productsPrice += orderProduct.price * orderProduct.amount;
        productsPriceHTML.innerHTML = productsPrice
        deliveryFeeHTML.innerHTML = 3000
        totalPriceHTML.innerHTML = productsPrice + 3000



    })



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
      userStreetAddress.value = `${addr} ${extraAddr}`;
      userExterAddress.value = ""
      userExterAddress.focus();
    },
  }).open();
}

addressSearchBtn.addEventListener('click', searchAddress);


// 요청사항

// "직접 입력" 선택 시 input칸 보이게 함
const requestSelectBox = document.querySelector('#request__Select__Box')
const selectOptions = document.querySelectorAll('.select__option')

function handleRequestChange(e) {
  const type = e.target.value;
  console.log(type)
  if (type !== "5") { // type이 5이 아니면 
    if (type === "0") {
      userRequestMessage.value = ""
    } else {
      userRequestMessage.value = selectOptions[parseInt(type)].innerHTML.trim()
    }
  } else {
    userRequestMessage.value = ""
    userRequestMessage.placeholder = "최대 50자 입력가능"
    userRequestMessage.focus()
  }

}


const shippingInformationList =
{
    "buyer": `${_id}`,
    "productList":`${productAllIdArr}`,
    "countList":`${productAllAmountArr}`,
    "shippingStatus":"배송전",
    "shippingPostCode" : `${userPostCode.value}`,
    "shippingStreetAddress":`${userStreetAddress.value}`,
    "shippingExtraAddress":`${userExterAddress.value}`,
    "shippingRequestMessage":`${userRequestMessage.value}`,
    "totalAmount":`${productsPrice.innerHTML}`,
    "recipientName":`${userName.value}`,
    "recipientPhoneNumber":`${userPhoneNumber.value}`,
}

// 결제하기 버튼 눌렀을 때

const payBtn = document.querySelector('.pay__button')

function payBtnClick(){
    if( !userName.value || !userPhoneNumber.value || !userPostCode.value || !userStreetAddress.value || !userExterAddress.value ){
        return alert('배송지 정보를 정확하게 채워주세요')
    }

    // 기존에 휴대폰번호와 주소가 없다면 주문할 때 배송지와 휴대폰번호로 기존 유저정보 업데이트 

    // if (!phoneNumber && !postCode && !extraAddress){

    //   fetch(`/api/users/${_id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       "_id" : `${_id}`,
    //       "email": `${email}`,
    //       "password" : `${password}`,
    //       "phoneNumber" : `${userPhoneNumber.value}`,
    //       "createdAt" : `${createdAt}`,
    //       "name": `${userName.value}`,
    //       "role": `${role}`,
    //       "postCode": `${userPostCode.value}`,
    //       "address": `${userAddressOne.value}`,
    //       "extraAddress": `${userExtraAddress.value}`
    //     }),
    //   })
    //   .then((response) => response.json())
    //   .then((userInfoChange) => {
    //     alert('회원정보가 변경되었습니다.')
    //     // window.location.href = "/users/mypage";
    //   })
    //   .catch((err) => {
    //     alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`)
    //   });      
    // }


    fetch(`/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shippingInformationList),
    })
    .then((response) => response.json())
    .then((data) => {
        // deleteIndexedDBdata(DATABASE_NAME, version, objectStore, orderProduct)
        alert("결제 및 주문이 정상적으로 완료되었습니다.\n감사합니다.");
        // window.location.href = "/"
        console.log(data)
    })
    .catch((err) => {
      alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`)
    });


}

payBtn.addEventListener('click', payBtnClick)


// 기존에 휴대폰번호와 주소가 없다면 주문할 때 배송지와 휴대폰번호로 기존 유저정보 업데이트 

if (!phoneNumber && !postCode && !extraAddress){
  



}

