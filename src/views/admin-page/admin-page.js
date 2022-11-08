//import { addCommas } from "/useful-functions.js";
//import { main } from "/main.js";
//const { loggedInUser } = await main();
import { createTable } from "./admin-class.js";

const mainTag = document.getElementById("main__container");

const adminPageList = document.querySelectorAll(
  ".admin__page__list > button"
);

const adminBtnOder = document.querySelector(".btn__admin__oder");
const adminBtnUser = document.querySelector(".btn__admin__user");
const adminBtnCategory = document.querySelector(".btn__admin__addCategory");
const adminBtnadddProduct = document.querySelector(".btn__admin__addProduct");

const oderAdmin = [
  "주문관리",
  "주문자",
  "주문정보",
  "총액(원)",
  "상태관리",
  "취소",
];
const userAdmin = ["가입날짜", "이메일", "이름", "권한", "관리"];
const categoryAdmin = [
  "생성날짜",
  "카테고리 이름",
  "수정날짜",
  "수정",
  "삭제",
];
const productAdmin = [
  "생성날짜",
  "이름",
  "카테고리",
  "가격",
  "재고수량",
  "수정",
  "삭제",
];

function compareEnglish(lsName) {
  if (lsName === "주문관리") return "oder__management";
  else if (lsName === "회원관리") return "user__management";
  else if (lsName === "카테고리 관리") return "add__category";
  return "add__product";
}

for (let i = 0; i < adminPageList.length; i++) {
  const listBtn = adminPageList[i];
  listBtn.addEventListener("click", (element) => {
    //지금 table이 있는지 확인하고 있다면 다 지우기
    const currentTable = document.querySelector(".bd-example");
    if (currentTable) currentTable.remove();

    const listName = adminPageList[i].innerText;
    const listNameEn = compareEnglish(listName);

    const newHtml = document.createElement("div");
    newHtml.className = `bd-example ${listNameEn}`;
    if (listName === "주문관리") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          const newData = data.map((e) => {
            return {
              date: e.createdAt,
              name: e.recipientName,
              products: e.productList.map(e => e.name),
              total: e.totalAmount,
              shopStatus: e.shippingStatus,
              cancle: false,
            }});
          return newData;
        })
        .then(newData => {
          createTable(newData)
        })
      newHtml.innerHTML = innerOderManagement(listName);
    } else if (listName === "회원관리") {
      newHtml.innerHTML = innerUserManagement(listName);
    } else if (listName === "카테고리 관리") {
      newHtml.innerHTML = innerAddCategory(listName);
    } else {
      newHtml.innerHTML = innerAddProduct(listName);
    }
    mainTag.append(newHtml);
  });
}

function innerOderManagement(name) {
  return `<!--${name}리스트-->
  <table class="table text-center">
  <thead>
  <tr>
    <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${name}</font></font></th>
  </tr>
    </thead>
    <thead class="table-light">
      <tr>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">주문날짜</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">주문자</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">주문정보</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">주문총액</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">상태관리</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">취소</font>
          </font>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">2020-01-01</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">청바지, 폰케이스</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">장미유</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">30000</font>
          </font>
        </td>
        <td>
        <div class="dropdown">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          수정하기
        </a>
      
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">배송전</a></li>
          <li><a class="dropdown-item" href="#">배송중</a></li>
          <li><a class="dropdown-item" href="#">배송완료</a></li>
        </ul>
      </div>
        </td>
        <td>
          <button type="button" class="btn btn-outline-danger">삭제하기</button>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">2</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">야곱</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">손튼</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@지방</font>
          </font>
        </td>
      </tr>
    </tbody>
  </table>`;
}

function innerUserManagement(name) {
  return `<!--${name}리스트-->
  <table class="table text-center">
  <thead>
  <tr>
    <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${name}</font></font></th>
  </tr>
</thead>
    <thead class="table-light">
      <tr>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">가입날짜</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">이메일</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">이름</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">권한</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">관리</font>
          </font>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">1</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">표시</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">장미유</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@mdo</font>
          </font>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">2</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">야곱</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">손튼</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@지방</font>
          </font>
        </td>
      </tr>
    </tbody>
  </table>`;
}

function innerAddCategory(name) {
  return `<!--${name}리스트-->
  <table class="table text-center">
  <thead>
  <tr>
    <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${name}</font></font></th>
  </tr>
</thead>
    <thead class="table-light">
      <tr>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">생성날짜</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">카테고리 이름</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">수정날짜</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">수정</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">삭제</font>
          </font>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">1</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">표시</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">장미유</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@mdo</font>
          </font>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">2</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">야곱</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">손튼</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@지방</font>
          </font>
        </td>
      </tr>
    </tbody>
  </table>`;
}

function innerAddProduct(name) {
  return `<!--${name}리스트-->
  <table class="table text-center">
  <thead>
  <tr>
    <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${name}</font></font></th>
  </tr>
</thead>
    <thead class="table-light">
      <tr>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">생성날짜</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">이름</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">카테고리</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">가격</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">재고수</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">수정</font>
          </font>
        </th>
        <th scope="col">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">삭제</font>
          </font>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">1</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">표시</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">장미유</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@mdo</font>
          </font>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">2</font>
          </font>
        </th>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">야곱</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">손튼</font>
          </font>
        </td>
        <td>
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">@지방</font>
          </font>
        </td>
      </tr>
    </tbody>
  </table>`;
}
