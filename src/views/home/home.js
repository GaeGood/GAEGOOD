const productView = document.querySelector(".productView");

fetch("/api/products") // => API 요청 1번, request
  .then((res) => res.json()) // => API 요청 1번 결과 productList
  .then((productList) => {
    console.log(productList);

    productList.forEach((product) => {
      const productComponent = createComponent(product);
      productView.innerHTML += productComponent;
    });
  });

function createComponent(product) {
  return `<div>
      <a href="/products/detail/${product._id}">
        <span>${product.name}</span>
        <span>${product.shortDesc}</span>
        <span>${product.price}원</span>
      </a>
    </div>`;
}
