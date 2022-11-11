import { main } from "/public/js/main.js";
const { loggedInUser } = await main();
import {
  createOderTable,
  createUserTable,
  createCategoryTable,
  createProductTable,
} from "./user-admin-module.js";

const mainTag = document.getElementById("main__container");

let categoryId;
let beforeValue;
let productId;

const adminBtnOder = document.querySelector(".btn__admin__oder");
const adminBtnUser = document.querySelector(".btn__admin__user");
const adminBtnCategory = document.querySelector(".btn__admin__category");
const adminBtnaddProduct = document.querySelector(".btn__admin__product");
const allBtns = [
  adminBtnOder,
  adminBtnUser,
  adminBtnCategory,
  adminBtnaddProduct,
];

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
  "상품명",
  "카테고리",
  "가격(원)",
  "재고수량(개)",
  "수정",
  "삭제",
];

function compareEnglish(lsName) {
  if (lsName === "주문관리") return "oder__management";
  else if (lsName === "회원관리") return "user__management";
  else if (lsName === "카테고리 관리") return "add__category";
  return "add__product";
}

for (let i = 0; i < allBtns.length; i++) {
  const listBtn = allBtns[i];
  listBtn.addEventListener("click", (element) => {
    //지금 table이 있는지 확인하고 있다면 다 지우기
    const currentTable = document.querySelector(".bd-example");
    if (currentTable) currentTable.remove();

    const listName = allBtns[i].innerText;
    const listNameEn = compareEnglish(listName);

    const newHtml = document.createElement("div");
    newHtml.className = `bd-example ${listNameEn}`;

    //주문관리 기능 구현
    if (listName === "주문관리") {
      document.querySelector(".btn__admin__addCategory").style =
        "display:none";
      document.querySelector(".btn__admin__addProduct").style =
        "display:none";
      fetch("/api/orders")
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
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
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newDatas) => {
          newHtml.appendChild(createOderTable(oderAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          oderManagementEdit();
          oderManagementDelete();
        })
        .catch((err) => alert(err));
    }

    //회원관리 기능구현
    else if (listName === "회원관리") {
      document.querySelector(".btn__admin__addCategory").style =
        "display:none";
      document.querySelector(".btn__admin__addProduct").style =
        "display:none";

      fetch("/api/users")
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              name: data.name,
              email: data.email,
              role: data.role,
            };
          });
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newData) => {
          newHtml.appendChild(createUserTable(userAdmin, newData));
          mainTag.append(newHtml);
        })
        .then(() => {
          userManagementEdit();
          userManagementDelete();
        })
        .catch((err) => alert(err));
    } else if (listName === "카테고리 관리") {
      //상품추가와 카테고리추가 없애기
      document.querySelector(".btn__admin__addCategory").style =
        "display:inline";
      document.querySelector(".btn__admin__addProduct").style =
        "display:none";

      fetch("/api/categories")
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              name: data.name,
              updateDate: data.updatedAt.slice(0, 10),
            };
          });
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newDatas) => {
          newHtml.appendChild(createCategoryTable(categoryAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          categoryManagementEdit();
          categoryManagementDelete();
        })
        .catch((err) => alert(err));
    } else if (listName === "상품 관리") {
      //상품추가와 카테고리추가 없애기
      document.querySelector(".btn__admin__addCategory").style =
        "display:none";
      document.querySelector(".btn__admin__addProduct").style =
        "display:inline";

      fetch("/api/products")
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              date: data.createdAt.slice(0, 10),
              category: data.category.replace("#", ""),
              name: data.name,
              price: Number(data.price).toLocaleString(),
              stock: Number(data.stock).toLocaleString(),
            };
          });
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newDatas) => {
          newHtml.appendChild(createProductTable(productAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          productManagementEdit();
          productManagementDelete();
        })
        .catch((err) => alert(err));
    }
  });
}
editSubmitCategory();
categoryManagementCreate();
editSubmitProduct();
productManagementCreate();

//============ 주문관련 =====================
function oderManagementEdit() {
  const editBtns = document.querySelectorAll(".dropdown-item");
  for (let count = 0; count < editBtns.length; count++) {
    editBtns[count].addEventListener("click", (e) => {
      e.preventDefault();
      const btnValue = e.target.text;
      const btnId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id;
      //배송상태가 바뀐 값(배송중 => 배송완료)으로 현재 버튼이 배송완료 바뀌는 기능
      e.target.parentElement.parentElement.parentElement.querySelector(
        "a"
      ).innerText = `${btnValue}`;
      fetch(`/api/orders/${btnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingStatus: `${btnValue}`,
        }),
      })
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((alt) =>
          alert(`배송상태가 "${alt.shippingStatus}"으로 변경되었습니다.`)
        )
        .catch((err) => alert(err));
    });
  }
}
function oderManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 주문건을 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/orders/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((alt) => alert(alt))
          .catch((err) => alert(err));
      }
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
      //배송상태가 바뀐 값(배송중 => 배송완료)으로 현재 버튼이 배송완료 바뀌는 기능
      e.target.parentElement.parentElement.parentElement.querySelector(
        "a"
      ).innerText = `${btnValue}`;
      fetch(`/api/users/${btnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: `${btnValue}`,
        }),
      })
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((alt) =>
          alert(`${alt.name}의 권한이 ${alt.role}로 변경되었습니다.`)
        )
        .catch((err) => alert(err));
    });
  }
}
function userManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 유저의 정보를 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/users/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((idData) => alert(`${idData}이 삭제되었습니다.`))
          .catch((err) => alert(err));
      }
    });
  }
}

//============== 카테고리관련 ===============
function editSubmitCategory() {
  document
    .querySelector(".submit__edit__category")
    .addEventListener("click", (e) => {
      const newValue = document.getElementById("edit-category-name").value;
      fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newValue,
        }),
      })
        .then(async (res) => {
          const json = await res.json();
          if (res.ok) {
            return json;
          }
          return Promise.reject(json);
        })
        .then((data) => {
          alert(`"${beforeValue}"이(가) "${data.name}" 으로 변경되었습니다.`);
          document.querySelector(".btn__admin__category").click();
          bootstrap.Modal.getInstance("#btn__admin__editCategory").hide();
        })
        .catch((err) => alert(err));
    });
}
function categoryManagementEdit() {
  const editCategoryBtns = document.querySelectorAll(
    ".btn__admin__editCategory"
  );
  for (let count = 0; count < editCategoryBtns.length; count++) {
    editCategoryBtns[count].addEventListener("click", (e) => {
      beforeValue =
        document.querySelectorAll(".current__name")[count].innerText;
      categoryId = e.currentTarget.parentElement.parentElement.id;
      const inputCategoryName = document.getElementById("edit-category-name");
      inputCategoryName.value = beforeValue;
    });
  }
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
        name: `${document.getElementById("category-name").value}`,
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject();
      })
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
      })
      .catch(() => alert("카테고리명을 입력해주세요"));
  });
}
function categoryManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 카테고리를 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/categories/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((alt) => alert(alt))
          .catch((err) => alert(err));
      }
    });
  }
}
//============== 상품관련 ===============

function editSubmitProduct() {
  const submitBtns = document.querySelector(".submit__edit__product");
  const name = document.getElementById("edit-product-name");
  const category = document.getElementById("edit-product-category");
  const shortDesc = document.getElementById("edit-short-description");
  const longDesc = document.getElementById("edit-long-description");
  const imageFile = document.getElementById("edit-product-img");
  const stock = document.getElementById("edit-product-stock");
  const price = document.getElementById("edit-product-price");
  submitBtns.addEventListener("click", (e) => {
    const formData = new FormData();

    if (category.value === "카테고리를 선택하세요") {
      formData.append("category", "#전체");
    } else {
      formData.append("category", `#${category.value}`);
    }
    formData.append("name", name.value);
    formData.append("shortDesc", shortDesc.value);
    formData.append("longDesc", longDesc.value);
    formData.append("productImage", imageFile.files[0]);
    formData.append("stock", stock.value);
    formData.append("price", price.value);

    fetch(`/api/products/${productId}`, {
      method: "PUT",
      body: formData,
      headers: {},
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject(json);
      })
      .then((data) => {
        console.log(data);
        alert(`${data.name} 의 정보가 변경되었습니다.`);
        //form 안의 input값 전부 초기화하기
        name.value = "";
        category.value = "";
        shortDesc.value = "";
        longDesc.value = "";
        imageFile.value = "";
        stock.value = "";
        price.value = "";
        bootstrap.Modal.getInstance("#btn__admin__editProduct").hide();
        document.querySelector(".btn__admin__product").click();
      })
      .catch((err) => alert(err));
  });
}
function productManagementEdit() {
  //카테고리의 리스트를 불러오는 작업
  const addCategoryList = document.querySelectorAll(
    ".btn__admin__editProduct"
  );
  addCategoryList.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      fetch("/api/categories")
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((datas) => {
          document.getElementById("edit-product-category").innerHTML = "";
          datas.forEach((element) => {
            document.getElementById("edit-product-category").innerHTML += `
        <option>${element.name}</option>`;
          });
        })
        .catch((err) => alert(err));
    });
  });

  //수정하기 모달창을 띄울 때 데이터에 맞게 모달창에 넣어주기
  const editProductBtns = document.querySelectorAll(
    ".btn__admin__editProduct"
  );
  const name = document.getElementById("edit-product-name");
  const category = document.getElementById("edit-product-category");
  const shortDesc = document.getElementById("edit-short-description");
  const longDesc = document.getElementById("edit-long-description");
  const stock = document.getElementById("edit-product-stock");
  const price = document.getElementById("edit-product-price");

  for (let count = 0; count < editProductBtns.length; count++) {
    editProductBtns[count].addEventListener("click", (e) => {
      productId = e.currentTarget.parentElement.parentElement.id;
      fetch(`/api/products/${productId}`)
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((newData) => {
          name.value = newData.name;
          //카테고리의 제일첫번째 데이터가 현재 데이터의 카테고리 표기가 되게 replace사용
          category.value = newData.category.replace("#", "");
          shortDesc.value = newData.shortDesc;
          longDesc.value = newData.longDesc;
          stock.value = newData.stock;
          price.value = newData.price;
        })
        .catch((err) => alert(err));
    });
  }
}
function productManagementCreate() {
  //카테고리의 리스트를 불러오는 작업
  const addCategoryList = document.querySelector(".btn__admin__addProduct");
  addCategoryList.addEventListener("click", (e) => {
    fetch("/api/categories")
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((datas) => {
        document.getElementById("create-product-category").innerHTML = "";
        datas.forEach((element) => {
          document.getElementById("create-product-category").innerHTML += `
        <option>${element.name}</option>`;
        });
      })
      .catch((err) => alert(err));
  });
  //추가하기 버튼을 클릭했을 때
  const addProductBtn = document.querySelector(".submit__product");
  addProductBtn.addEventListener("click", (e) => {
    const name = document.getElementById("create-product-name");
    const category = document.getElementById("create-product-category");
    const shortDesc = document.getElementById("create-short-description");
    const longDesc = document.getElementById("create-long-description");
    const imageFile = document.getElementById("create-product-img");
    const stock = document.getElementById("create-product-stock");
    const price = document.getElementById("create-product-price");

    const formData = new FormData();
    if (category.value === "카테고리를 선택하세요") {
      formData.append("category", "전체");
    } else {
      formData.append("category", category.value);
    }
    formData.append("name", name.value);
    formData.append("shortDesc", shortDesc.value);
    formData.append("longDesc", longDesc.value);
    formData.append("productImage", imageFile.files[0]);
    formData.append("stock", stock.value);
    formData.append("price", price.value);

    fetch("/api/products", {
      method: "POST",
      body: formData,
      headers: {},
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject(json);
      })
      .then((data) => {
        alert(`${data.name} 이(가) 상품에 추가되었습니다.`);
        //form 안의 input값 전부 초기화하기
        name.value = "";
        category.value = "";
        shortDesc.value = "";
        longDesc.value = "";
        imageFile.value = "";
        stock.value = "";
        price.value = "";

        bootstrap.Modal.getInstance("#btn__admin__addProduct").hide();
        document.querySelector(".btn__admin__product").click();
      })
      .catch((err) => alert(err));
  });
}
function productManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 상품의 정보를 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/products/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((alt) => alert(alt))
          .catch((err) => alert(err));
      }
    });
  }
}
