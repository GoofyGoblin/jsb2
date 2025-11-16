document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");

  const product = products[productId];

  if (!product) {
    document.getElementById("product_name").textContent = "Product Not Found";
    return;
  }

  document.getElementById("product_name").textContent = product.name;
  document.getElementById("product_price").textContent = product.price;
  document.getElementById("product_image").src = product.image;
});
