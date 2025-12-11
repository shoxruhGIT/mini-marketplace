const API = "https://fakestoreapi.com/products";
const productsCard = document.getElementById("products-card");

async function fetchProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    productsCard.innerHTML = "<p>Error loading products.</p>";
    console.error(err);
  }
}

function renderProducts(products) {
  productsCard.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image__container">
        <img src="${p.image}" alt="${p.title}" class="product-image">

        <button class="add-to-cart-button" data-id="${p.id}">
           Add to Cart
        </button>
      </div>

      <div class="product-details">
        <div class="product-title">${p.title}</div>
        <div class="product-price">$${p.price.toFixed(2)}</div>
      </div>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      const event = new CustomEvent("addToCart", {
        detail: { id: p.id, title: p.title, price: p.price, image: p.image },
      });
      window.dispatchEvent(event);

      btn.textContent = "Added";
      btn.disabled = true;
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
      setTimeout(() => {
        btn.textContent = "Add to cart";
        btn.disabled = false;
        btn.style.backgroundColor = "";
        btn.style.color = "";
      }, 800);
    });

    productsCard.appendChild(card);
  });
}

fetchProducts();
