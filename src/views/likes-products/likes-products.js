import { main } from "/public/js/main.js";
const { loggedInUser } = await main();

if (!loggedInUser) {
  window.location.href = "/";
}

let { likesProductList, name, _id } = loggedInUser;

const likeNone = document.querySelector(".like__none");
const likesProductListZone = document.querySelector(".like__product__list");

const mainMypageHeader = document.querySelector(".main__mypage__header");
mainMypageHeader.innerHTML = `안녕하세요, ${name}님!`;

likesProductListMake();

console.log("likesProductList", likesProductList);

function likesProductListMake() {
  likesProductList.forEach((likesProduct) => {
    // 주문내역이 있으면 주문내역 없다는 안내멘트 지우기
    likeNone.className = "like__none hidden";

    const productid = likesProduct._id;
    const productCategory = likesProduct.category;
    const productName = likesProduct.name;
    const productImgUrl = likesProduct.smallImageURL;

    likesProductListZone.innerHTML += `
          <div class="card" style="width: 15rem">
            <div class="product__image__zone">
              <a href="/products/${productid}"><img
                src="${productImgUrl}"
                class="card-img-top product__image"
                alt="찜상품사진"
              /></a>
            </div>
            <div class="card-body">
              <div class="like__zone">
                <a href="/products/${productid}" class="product__information">
                    <h5 class="card-title">${productName}</h5>
                    <p class="card-text">${productCategory}</p>
                </a>
                <div class="buttons__container">
                    <div class="like__button">
                        <i class="fa-regular fa-heart hidden"></i>
                        <i class="fa-solid fa-heart" id="${productid}"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>
    
    `;
    const likeButton = document.querySelector(".like__product__list");

    function likeButtonClick(e) {
      if (e.target.id === `${productid}`) {
        const answer = confirm("찜 목록에서 삭제하시겠습니까?");

        if (answer) {
          likesProductList = likesProductList.filter(
            (likesProduct) => likesProduct._id !== e.target.id
          );

          fetch(`/api/users/${_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              likesProductList: likesProductList,
            }),
          })
            .then(async (res) => {
              const json = await res.json();

              if (res.ok) {
                return json;
              }

              return Promise.reject(json);
            })
            .then((userInfoChange) => {
              alert("찜 목록에서 삭제되었습니다.");
              window.location.href = "/users/likes-products/";
            })
            .catch((err) => {
              alert(
                `에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`
              );
            });
        }
      }
    }

    likeButton.addEventListener("click", likeButtonClick);
  });
}

// 회원탈퇴 기능
const deleteUserBtn = document.querySelector(".user__delete");

function deleteUser() {
  const answer = confirm(
    "회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다."
  );
  if (answer) {
    fetch(`/api/users/${_id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((data) => {
        alert("회원 정보가 삭제되었습니다.");
        window.location.href = "/";
      })
      .catch((err) =>
        alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`)
      );
  }
}

deleteUserBtn.addEventListener("click", deleteUser);
