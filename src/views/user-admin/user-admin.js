import { main } from "/public/js/main.js";
const { loggedInUser } = await main();
import {
  createOderTable,
  createUserTable,
  createCategoryTable,
  createProductTable,
} from "./user-admin-module.js";

const mainTag = document.getElementById("main__container");

const adminPageList = document.querySelectorAll(".admin__page__list > button");

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
const categoryAdmin = ["생성날짜", "카테고리 이름", "수정날짜", "수정", "삭제"];
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

for (let i = 0; i < adminPageList.length - 2; i++) {
  const listBtn = adminPageList[i];
  listBtn.addEventListener("click", (element) => {
    //지금 table이 있는지 확인하고 있다면 다 지우기
    const currentTable = document.querySelector(".bd-example");
    if (currentTable) currentTable.remove();

    const listName = adminPageList[i].innerText;
    const listNameEn = compareEnglish(listName);

    const newHtml = document.createElement("div");
    newHtml.className = `bd-example ${listNameEn}`;

    //주문관리 기능 구현
    if (listName === "주문관리") {
      document.querySelector(".btn__admin__addCategory").style = "display:none";
      document.querySelector(".btn__admin__addProduct").style = "display:none";
      fetch("/api/orders")
        .then((res) => res.json())
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              name: data.recipientName,
              products: data.productList.map((data) => data.name),
              total: Number(data.totalAmount).toLocaleString(),
              shopStatus: data.shippingStatus,
            };
          });
          return newDatas;
        })
        .then((newDatas) => {
          newHtml.appendChild(createOderTable(oderAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          oderManagementEdit();
          oderManagementDelete();
        });
    }

    //회원관리 기능구현
    else if (listName === "회원관리") {
      document.querySelector(".btn__admin__addCategory").style = "display:none";
      document.querySelector(".btn__admin__addProduct").style = "display:none";

      fetch("/api/users")
        .then((res) => res.json())
        .then((datas) => {
          console.log(datas);
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              name: data.name,
              email: data.email,
              role: data.role,
            };
          });
          return newDatas;
        })
        .then((newData) => {
          console.log(newData);
          newHtml.appendChild(createUserTable(userAdmin, newData));
          mainTag.append(newHtml);
        })
        .then(() => {
          userManagementEdit();
          userManagementDelete();
        });
    } else if (listName === "카테고리 관리") {
      //상품추가와 카테고리추가 없애기
      document.querySelector(".btn__admin__addCategory").style =
        "display:inline";
      document.querySelector(".btn__admin__addProduct").style = "display:none";

      fetch("/api/categories")
        .then((res) => res.json())
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              name: data.name,
              updateDate: data.updatedAt.slice(0, 10),
            };
          });
          return newDatas;
        })
        .then((newDatas) => {
          newHtml.appendChild(createCategoryTable(categoryAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          categoryManagementCreate();
          categoryManagementEdit();
          categoryManagementDelete();
        });
    } else {
      //상품추가와 카테고리추가 없애기
      document.querySelector(".btn__admin__addCategory").style = "display:none";
      document.querySelector(".btn__admin__addProduct").style =
        "display:inline";

      fetch("/api/products")
        .then((res) => res.json())
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              category: data.category,
              name: data.name,
              price: data.price,
              stock: data.stock,
            };
          });
          return newDatas;
        })
        .then((newDatas) => {
          newHtml.appendChild(createProductTable(productAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          // productManagementCreate();
          productManagementEdit();
          productManagementDelete();
        });
    }
  });
}

//============ 주문관련 =====================
function oderManagementEdit() {
  const editBtns = document.querySelectorAll(".dropdown-item");
  //버튼클릭 => 배송준비 => 랜더링화면바꾸기 => fetch 수정 =>
  for (let count = 0; count < editBtns.length; count++) {
    editBtns[count].addEventListener("click", (e) => {
      //아래 기능이 없으면 배송상태가 바뀌면 최상단으로 화면이 이동한다
      e.preventDefault();
      const btnValue = e.target.text;
      const btnId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id;
      //배송상태가 바뀐 값(배송중 => 배송완료)으로 현재 버튼이 배송완료 바뀌는 기능
      e.target.parentElement.parentElement.parentElement.querySelector(
        "a"
      ).innerText = `${btnValue}`;
      fetch(`http://localhost:5000/api/orders/${btnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingStatus: `${btnValue}`,
        }),
      })
        .then((res) => res.json())
        .then((alt) =>
          alert(`배송상태가 "${alt.shippingStatus}"으로 변경되었습니다.`)
        );
    });
  }
}
function oderManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const btnId = e.target.parentElement.parentElement.id;
      document.getElementById(`${btnId}`).remove();
      fetch(`http://localhost:5000/api/orders/${btnId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((alt) => alert(alt));
    });
  }
}

//============== 유저관련 ===============
function userManagementEdit() {
  const editBtns = document.querySelectorAll(".dropdown-item");
  for (let count = 0; count < editBtns.length; count++) {
    editBtns[count].addEventListener("click", (e) => {
      e.preventDefault();
      const btnValue = e.target.text;
      const btnId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id;
      console.log(btnId);
      //배송상태가 바뀐 값(배송중 => 배송완료)으로 현재 버튼이 배송완료 바뀌는 기능
      e.target.parentElement.parentElement.parentElement.querySelector(
        "a"
      ).innerText = `${btnValue}`;
      fetch(`http://localhost:5000/api/users/${btnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: `${btnValue}`,
        }),
      })
        .then((res) => res.json())
        .then((alt) =>
          alert(`${alt.name}의 권한이 ${alt.role}로 변경되었습니다.`)
        );
    });
  }
}
function userManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const btnId = e.target.parentElement.parentElement.id;
      document.getElementById(`${btnId}`).remove();
      fetch(`http://localhost:5000/api/users/${btnId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((idData) => alert(`${idData}이 삭제되었습니다.`));
    });
  }
}

//============== 카테고리관련 ===============
function categoryManagementEdit() {
  const editCategoryBtns = document.querySelectorAll(
    ".btn__admin__editCategory"
  );
  let productId;
  let nameValue;
  for (let count = 0; count < editCategoryBtns.length; count++) {
    editCategoryBtns[count].addEventListener("click", (e) => {
      nameValue = document.querySelectorAll(".current__name")[count].innerText;
      productId = e.target.parentElement.parentElement.id;
      const inputCategoryName = document.querySelector("#edit-category-name");
      inputCategoryName.value = nameValue;
      //inputCategoryName.setAttribute("value", nameValue);
    });
  }
  //수정하기 버튼을 클릭했을 때
  document
    .querySelector(".submit__edit__category")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const newValue = document.querySelector("#edit-category-name").value;
      fetch(`http://localhost:5000/api/categories/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${newValue}`,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          alert(`"${nameValue}"이(가) "${data.name}" 으로 변경되었습니다.`);
          //기존에 있던 table 내의 카테고리 이름을 바뀐 카테고리 이름으로 바꾸어 그려줌
          document
            .getElementById(`${data._id}`)
            .querySelector(".current__name").innerText = `${data.name}`;
          bootstrap.Modal.getInstance("#btn__admin__editCategory").hide();
        });
    });
}
function categoryManagementCreate() {
  const addCategoryBtn = document.querySelector(".submit__category");
  addCategoryBtn.addEventListener("click", (e) => {
    //category-name
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${document.querySelector("#category-name").value}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = {
          _id: data._id,
          date: data.createdAt.slice(0, 10),
          name: data.name,
          updateDate: data.updatedAt.slice(0, 10),
        };
        alert(`${newData.name} 이(가) 카테고리에 추가되었습니다.`);
        //모달숨기기
        document.getElementById("category-name").value = "";
        bootstrap.Modal.getInstance("#btn__admin__addCategory").hide();
        document.querySelector(".btn__admin__category").click();
      });
  });
}

function categoryManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const btnId = e.target.parentElement.parentElement.id;
      document.getElementById(`${btnId}`).remove();
      fetch(`http://localhost:5000/api/categories/${btnId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((alt) => alert(alt));
    });
  }
}

//============== 상품관련 ===============
function productManagementEdit() {
  const editProductBtns = document.querySelectorAll(".btn__admin__editProduct");
  let productId;
  let nameValue;
  for (let count = 0; count < editProductBtns.length; count++) {
    editProductBtns[count].addEventListener("click", (e) => {
      nameValue = document.querySelectorAll(".current__name")[count].innerText;
      productId = e.target.parentElement.parentElement.id;
      const inputCProductName = document.querySelector("#edit-product-name");
      inputCProductName.value = nameValue;
    });
  }
  //수정하기 버튼을 클릭했을 때
  document
    .querySelector(".submit__edit__product")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const newValue = document.querySelector("#edit-product-name").value;
      fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${newValue}`,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          alert(`"${nameValue}"이(가) "${data.name}" 으로 변경되었습니다.`);
          //기존에 있던 table 내의 카테고리 이름을 바뀐 카테고리 이름으로 바꾸어 그려줌
          document
            .getElementById(`${data._id}`)
            .querySelector(".current__name").innerText = `${data.name}`;
          bootstrap.Modal.getInstance("#btn__admin__editProduct").hide();
        });
    });
}

function productManagementCreate() {
  const addProdcutBtn = document.querySelector(".submit__product");
  addProdcutBtn.addEventListener("click", (e) => {
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      enctype: "multipart/form-data",
      //`${document.querySelector("#category-name").value}`,
      body: JSON.stringify({
        name: "개발자 버튼 코스터 2Set",
        category: "홈데코/리빙",
        shortDesc: "개발자 버튼 코스터 2Set 짧은 설명입니다.",
        longDesc:
          "개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. 개발자 버튼 코스터 2Set 긴 설명입니다. ",
        price: 21000,
        smallImageURL:
          "/public/images/product-images/개발자-버튼-코스터-2Set.png",
        bigImageURL:
          "/public/images/product-images/개발자-버튼-코스터-2Set.png",
        stock: "100",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newData = {
          _id: data._id,
          date: data.createdAt.slice(0, 10),
          name: data.name,
          updateDate: data.updatedAt.slice(0, 10),
        };
        alert(`${newData.name} 이(가) 상품에 추가되었습니다.`);
        //모달숨기기
        bootstrap.Modal.getInstance("#btn__admin__addProduct").hide();
        //table의 맨 앞에 새로 추가된 데이터를 그려주는 기능
        document.querySelector(".table > tbody").insertAdjacentHTML(
          "afterbegin",
          `<tr id="${newData._id}">
                  <th scope="row">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">${newData.date}</font>
                    </font>
                  </th>
                  <td>
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;" class="current__name">${newData.name}</font>
                    </font>
                  </td>
                  <td>
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">${newData.updateDate}</font>
                    </font>
                  </td>
                  <td>
                  <button type="button" class="btn btn-outline-primary ms-auto p-2 bd-highlight btn__admin__editProduct" data-bs-toggle="modal"
              data-bs-target="#btn__admin__editProduct">수정하기</button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-outline-danger btn__delete">삭제하기</button>
                  </td>
                </tr>`
        );
      });
  });
}

function productManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const btnId = e.target.parentElement.parentElement.id;
      document.getElementById(`${btnId}`).remove();
      fetch(`http://localhost:5000/api/products/${btnId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((alt) => alert(alt));
    });
  }
}
