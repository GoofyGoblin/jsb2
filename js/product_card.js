const params = new URLSearchParams(window.location.search);
const productId = params.get("product");
const baseUrl = "http://localhost:3000/products";

fetch(`${baseUrl}/${productId}`)
  .then((res) => {
    if (!res.ok) throw new Error("Direct fetch failed");
    return res.json();
  })
  .then((product) => {
    displayProduct(product);
  })
  .catch(() => {
    // Fallback: fetch all products
    fetch(baseUrl)
      .then((res) => res.json())
      .then((products) => {
        const p = products.find((x) => String(x.id) === String(productId));
        if (!p) {
          document.getElementById("product_name").textContent =
            "Product Not Found";
          return;
        }
        displayProduct(p);
      });
  });
function displayProduct(product) {
  document.getElementById("product_name").textContent = product.name;
  document.getElementById("product_price").textContent = product.price;
  const imgEl = document.getElementById("product_image");
  if (imgEl) {
    if (typeof product.image === "string") {
      imgEl.src = product.image.startsWith("/")
        ? `${window.location.origin}${product.image}`
        : product.image;
    } else {
      imgEl.removeAttribute("src");
    }
  }
}
