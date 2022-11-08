import { addCommas } from "/useful-functions.js";

const html = window.location.href;
const productUrl = html.split('/products/detail/');
const productId = productUrl[1];

console.log(productId); // 결과가 상품 id가 나와야 정상

//data = {
//     "_id": "63628295d66abef64d53f920",
//     "name": "새로운 상품 이름1",
//     "category": "티셔츠",
//     "shortDesc": "java 티셔츠",
//     "longDesc": "java 에서 생산한 java 티셔츠입니다.",
//     "price": 15000,
//     "smallImageURL": "java-tshirts smallImageURL"
// }

fetch(`/api/products/${productId}`)
    .then((res) => { return res.json() })
    .then(data => {
        addproduct(data)
    })
// HTML Template 사용하여 댓글 화면에 표시하기
function addproduct(data) {

    document.querySelector('.product-category').innerHTML = data.category;
    document.querySelector('.product-name').innerHTML = data.name;
    document.querySelector('.product-desc').innerHTML = data.longDesc;
    document.querySelector('.product-price').innerHTML = data.price;

    // return `
    //         <div class="product-container">
    //         <div class="product-category">${product.category}</div>
    //         <img src="#" class="product-img">
    //         <div class="product-name">${product.name}</div>
    //         <div class="product-desc">${product.shortDesc}</div>
    //         <div class="product-price">${product.price}</div>
    //     </div>
    // `
}
//추후 리팩토링 할 경우 사용
// function addproductComponent(product) {
//     const template = document.querySelector('.product-container');
//     const node = document.importNode(template.content, true);
//     node.querySelector('.product-category').textContent = product.content;
//     node.querySelector('.product-name').textContent = product.author.name;
//     node.querySelector('.product-desc').textContent = product.createdAt;
//     node.querySelector('.product-price').textContent = product.createdAt;
//     document.querySelector('#products').appendChild(node);
// }