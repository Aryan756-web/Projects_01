/* =========================
   BASIC ELEMENT SELECTION
========================= */

// Navbar / Login
const usernameBtn = document.querySelector(".username button");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");

// Hero scroll
const bookServiceBtn = document.querySelector(".cta-btn");
const servicesSection = document.querySelector(".services-section");

// Cart elements
const cartBox = document.querySelector(".cart-box");
const emptyCart = document.querySelector(".empty-cart");
const cartHint = document.querySelector(".cart-link");
const totalBox = document.querySelector(".total strong");

// Booking
const bookBtnWrapper = document.querySelector(".book-btn");
const bookBtn = bookBtnWrapper.querySelector("button");
const warningText = document.querySelector(".warning");

// Form inputs
const nameInput = document.querySelector('.cart-box input[placeholder="Full Name"]');
const emailInput = document.querySelector('.cart-box input[placeholder="Email ID"]');
const phoneInput = document.querySelector('.cart-box input[placeholder="Phone Number"]');

/* =========================
   LOGIN MODAL LOGIC
========================= */

usernameBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
  loginModal.style.display = "none";
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

/* =========================
   CART CONTAINER
========================= */

const cartItemsContainer = document.createElement("div");
cartItemsContainer.classList.add("cart-items");
cartBox.insertBefore(cartItemsContainer, document.querySelector(".total"));

let totalAmount = 0;

/* =========================
   HELPER FUNCTIONS
========================= */

function getPrice(priceText) {
  return parseFloat(priceText.replace("₹", "").trim());
}

function updateTotal() {
  totalBox.textContent = `₹ ${totalAmount.toFixed(2)}`;
}

function toggleCartUI() {
  const hasItems = cartItemsContainer.children.length > 0;

  emptyCart.style.display = hasItems ? "none" : "block";
  cartHint.style.display = hasItems ? "none" : "block";
  warningText.style.display = hasItems ? "none" : "block";

  bookBtn.disabled = !hasItems;
  bookBtn.classList.toggle("enabled", hasItems);
}

/* =========================
   ADD ITEM LOGIC
========================= */

document.querySelectorAll(".add").forEach(button => {
  button.addEventListener("click", () => {
    const serviceItem = button.closest("li");
    const serviceName = serviceItem.querySelector("span").textContent;
    const priceText = serviceItem.querySelector(".price").textContent;
    const price = getPrice(priceText);

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <span>${serviceName}</span>
      <span>₹${price}</span>
      <button class="remove">−</button>
    `;

    cartItem.querySelector(".remove").addEventListener("click", () => {
      cartItem.remove();
      totalAmount -= price;
      updateTotal();
      toggleCartUI();
    });

    cartItemsContainer.appendChild(cartItem);

    totalAmount += price;
    updateTotal();
    toggleCartUI();
  });
});

/* =========================
   SCROLL TO SERVICES
========================= */

bookServiceBtn.addEventListener("click", () => {
  servicesSection.scrollIntoView({ behavior: "smooth" });
});

/* =========================
   BOOK NOW VALIDATION
========================= */

bookBtn.addEventListener("click", () => {
  if (cartItemsContainer.children.length === 0) {
    alert("Please add items to the cart before booking.");
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all details before booking.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  alert("🎉 Booking Successful! We will contact you soon.");

  cartItemsContainer.innerHTML = "";
  totalAmount = 0;

  updateTotal();
  toggleCartUI();

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
});

/* =========================
   GOOGLE SIGN-IN
========================= */

window.onload = function () {
  google.accounts.id.initialize({
    client_id: "PASTE_YOUR_CLIENT_ID_HERE",
    callback: handleGoogleLogin
  });

  google.accounts.id.renderButton(
    document.getElementById("googleSignIn"),
    {
      theme: "outline",
      size: "large",
      width: "100%"
    }
  );
};

function handleGoogleLogin(response) {
  const userData = JSON.parse(
    atob(response.credential.split(".")[1])
  );

  localStorage.setItem("loggedInUser", userData.name);

  usernameBtn.textContent = userData.name;
  loginModal.style.display = "none";
}

/* =========================
   PERSIST LOGIN
========================= */

const savedUser = localStorage.getItem("loggedInUser");
if (savedUser) {
  usernameBtn.textContent = savedUser;
}

/* =========================
   INITIAL STATE
========================= */

bookBtn.disabled = true;
updateTotal();
toggleCartUI();
