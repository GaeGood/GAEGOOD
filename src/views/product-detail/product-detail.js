import { addCommas } from "/useful-functions.js";

const html = window.location.href;
const sp = html.split("details/");
const id = sp[1];
console.log(id);
fetch(`/api/products/${id}`)
  .then((res) => res.json())
  .then((product) => addproduct(product))
  .catch((err) => alert(err.message));

// HTML Template 사용하여 댓글 화면에 표시하기
function addproduct(product) {
  // const category = document.querySelector('.product-category').innerHTML;
  // const name = document.querySelector('.product-name').innerHTML;
  // const desc = document.querySelector('.product-desc').innerHTML;
  // const price = document.querySelector('.product-price').innerHTML;

  document.querySelector(".product-category").innerHTML = data.category;
  document.querySelector(".product-name").innerHTML = data.name;
  document.querySelector(".product-desc").innerHTML = data.longDesc;
  document.querySelector(".product-price").innerHTML = data.price;
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
