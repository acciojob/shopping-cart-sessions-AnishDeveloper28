
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();


  document.getElementById("clear-cart-btn").addEventListener("click", clearCart);
});

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear existing content
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    li.querySelector("button").addEventListener("click", () => addToCart(product));
    productList.appendChild(li);
  });
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear existing content

  const cart = getCart();
  if (cart.length === 0) {
    cartList.innerHTML = "<li>The cart is empty.</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}


function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}


function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  renderCart();
}


function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}
