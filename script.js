// -------------------------------
// Variáveis globais
// -------------------------------
const PRODUCTS = [
  { code: "P001", name: "Pão Brioche", price: 4.50 },
  { code: "P002", name: "Café 250g", price: 24.00 },
  { code: "P003", name: "Leite 1L", price: 5.75 },
  { code: "P004", name: "Queijo 200g", price: 16.90 },
  { code: "P005", name: "Bolo Chocolate", price: 25.00 },
  { code: "P006", name: "Biscoito Oreo", price: 4.90},
  { code: "P007", name: "Coxinha", price: 5.50}
];

let cart = []; // array do carrinho
var lastAction = ""; // só pra demonstrar uso do var

// -------------------------------
// Funções
// -------------------------------

// Login simples
function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let msg = document.getElementById("loginMsg");

  if (user === "Suzi" && pass === "1234") {
    msg.textContent = "Login realizado!";
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("mainSection").classList.remove("hidden");
    renderProducts(PRODUCTS);
  } else {
    msg.textContent = "Usuário ou senha inválidos!";
  }
}

// Buscar produtos
function searchProducts() {
  let term = document.getElementById("searchInput").value.toLowerCase();
  let results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(term) || p.code.toLowerCase().includes(term)
  );
  renderProducts(results);
}

// Mostrar lista de produtos no HTML
function renderProducts(list) {
  let div = document.getElementById("productList");
  div.innerHTML = "";
  if (list.length === 0) {
    div.textContent = "Nenhum produto encontrado.";
    return;
  }
  list.forEach(p => {
    let item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `<span>${p.name} - R$ ${p.price.toFixed(2)}</span>
                      <button onclick="addToCart('${p.code}')">Adicionar</button>`;
    div.appendChild(item);
  });
}

// Adicionar ao carrinho
function addToCart(code) {
  let prod = PRODUCTS.find(p => p.code === code);
  let item = cart.find(i => i.code === code);
  if (item) {
    item.qty++;
  } else {
    cart.push({ code: prod.code, name: prod.name, price: prod.price, qty: 1 });
  }
  renderCart();
}

// Remover do carrinho
function removeFromCart(code) {
  let index = cart.findIndex(i => i.code === code);
  if (index > -1) {
    if (cart[index].qty > 1) {
      cart[index].qty--;
    } else {
      cart.splice(index, 1);
    }
  }
  renderCart();
}

// Mostrar carrinho
function renderCart() {
  let div = document.getElementById("cartList");
  div.innerHTML = "";
  if (cart.length === 0) {
    div.textContent = "(vazio)";
    return;
  }

  let total = 0;
  cart.forEach(i => {
    let subtotal = i.price * i.qty;
    total += subtotal;

    let item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `<span>${i.name} (${i.qty}) - R$ ${subtotal.toFixed(2)}</span>
                      <button onclick="removeFromCart('${i.code}')">Remover</button>`;
    div.appendChild(item);
  });

  let totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  div.appendChild(totalDiv);
}

// Finalizar compra
function finalizePurchase() {
  let div = document.getElementById("finalSummary");
  if (cart.length === 0) {
    div.textContent = "Carrinho vazio!";
    return;
  }
  let total = 0;
  let resumo = "<h3>Resumo do Pedido</h3><ul>";
  cart.forEach(i => {
    total += i.price * i.qty;
    resumo += `<li>${i.name} - ${i.qty} x R$ ${i.price.toFixed(2)}</li>`;
  });
  resumo += `</ul><p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
  div.innerHTML = resumo;
}

// Limpar carrinho
function clearCart() {
  cart = [];
  renderCart();
  document.getElementById("finalSummary").innerHTML = "";
}

// -------------------------------
// Eventos
// -------------------------------
document.getElementById("btnLogin").addEventListener("click", login);
document.getElementById("btnSearch").addEventListener("click", searchProducts);
document.getElementById("btnShowAll").addEventListener("click", () => renderProducts(PRODUCTS));
document.getElementById("btnFinalize").addEventListener("click", finalizePurchase);
document.getElementById("btnClear").addEventListener("click", clearCart);
