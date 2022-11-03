const html = window.location.href;
const sp = html.split("products/detail/");
const pid = sp[1];

fetch(`/api/products/${pid}`)
  .then((res) => res.json())
  .then((product) => {
    console.log(product);
  });
