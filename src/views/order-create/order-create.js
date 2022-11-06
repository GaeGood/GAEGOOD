import { main } from "/main.js";
const { loggedInUser } = await main(); 


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