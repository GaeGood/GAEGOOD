import { addCommas } from "/useful-functions.js";

const html = window.location.href;
const sp = html.split("details/");
const id = sp[1];
console.log(id);
fetch(`/api/products/${id}`)
  .then((res) => res.json())
  .then((product) => product.forEach(addproduct))
  .catch((err) => alert(err.message));

// HTML Template 사용하여 댓글 화면에 표시하기
function addproduct(product) {
  // const category = document.querySelector('.product-category').innerHTML;
  // const name = document.querySelector('.product-name').innerHTML;
  // const desc = document.querySelector('.product-desc').innerHTML;
  // const price = document.querySelector('.product-price').innerHTML;

  return `
            <div class="product-container">
            <div class="product-category">${product.category}</div>
            <img src="#" class="product-img">
            <div class="product-name">${product.name}</div>
            <div class="product-desc">${product.shortDesc}</div>
            <div class="product-price">${product.price}</div>
        </div>
    `;
}

// function addproductComponent(product) {
//   const template = document.querySelector(".product-container");
//   const node = document.importNode(template.content, true);
//   node.querySelector(".product-category").textContent = product.content;
//   node.querySelector(".product-name").textContent = product.author.name;
//   node.querySelector(".product-desc").textContent = product.createdAt;
//   node.querySelector(".product-price").textContent = product.createdAt;
//   document.querySelector("#products").appendChild(node);
// }
