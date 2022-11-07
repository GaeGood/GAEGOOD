//import { addCommas } from "/useful-functions.js";
//import { main } from "/main.js";
//const { loggedInUser } = await main();

const mainTag = document.getElementById("main__container");

const adminPageList = document.querySelectorAll(
  ".admin__page__list > button"
);

const adminBtnOder = document.querySelector(".btn__admin__oder");
const adminBtnUser = document.querySelector(".btn__admin__user");
const adminBtnCategory = document.querySelector(".btn__admin__addCategory");
const adminBtnadddProduct = document.querySelector(".btn__admin__addProduct");

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
        .then((data) => {console.log(data);});
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
