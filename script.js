// ================= 1. MENU DATA =================
const menuItems = [
    {
        id: 1,
        name: "Classic Smash Cheeseburger",
        category: "Burgers",
        price: 249,
        rating: 4.6,
        time: "20-25 mins",
        desc: "Double juicy patty, melted cheddar, caramelized onions, and house secret sauce.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Margherita Wood-Fired Pizza",
        category: "Pizza",
        price: 349,
        rating: 4.8,
        time: "25-30 mins",
        desc: "Hand-stretched sourdough crust, San Marzano tomatoes, fresh mozzarella & basil.",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Hyderabadi Dum Biryani",
        category: "Biryani",
        price: 299,
        rating: 4.9,
        time: "30-35 mins",
        desc: "Aromatic basmati rice slow-cooked with saffron, exotic spices, and mirchi ka salan.",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Avocado Quinoa Buddha Bowl",
        category: "Healthy",
        price: 279,
        rating: 4.5,
        time: "15-20 mins",
        desc: "Organic quinoa, ripe avocado, roasted chickpeas, cherry tomatoes, and lemon tahini.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Pepperoni Feast Pizza",
        category: "Pizza",
        price: 429,
        rating: 4.7,
        time: "25-30 mins",
        desc: "Loaded with crispy pepperoni slices, extra mozzarella, and oregano seasoning.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Belgian Chocolate Lava Cake",
        category: "Desserts",
        price: 159,
        rating: 4.9,
        time: "15-20 mins",
        desc: "Warm dark chocolate cake with a gooey molten center dusted with cocoa.",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Crispy Peri-Peri Chicken Burger",
        category: "Burgers",
        price: 229,
        rating: 4.4,
        time: "20-25 mins",
        desc: "Crunchy spiced chicken fillet topped with lettuce, jalapenos, and garlic mayo.",
        image: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "New York Blueberry Cheesecake",
        category: "Desserts",
        price: 199,
        rating: 4.8,
        time: "15-20 mins",
        desc: "Creamy baked cheesecake on a buttery biscuit crust topped with blueberry compote.",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
    }
];

// ================= 2. STATE & DOM ELEMENTS =================
let cart = [];

const foodGrid = document.getElementById('food-grid');
const categoryBtns = document.querySelectorAll('.cat-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Cart Elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const subtotalEl = document.getElementById('subtotal-price');
const totalEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Modal Elements
const orderModal = document.getElementById('order-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// ================= 3. RENDER MENU ITEMS =================
function renderMenu(items) {
    foodGrid.innerHTML = "";

    if (items.length === 0) {
        foodGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #686b78;">No dishes found matching your search.</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('food-card');
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.name}">
                <span class="delivery-time"><i class="fa-regular fa-clock"></i> ${item.time}</span>
            </div>
            <div class="card-body">
                <div class="card-top">
                    <h3 class="card-title">${item.name}</h3>
                    <span class="rating"><i class="fa-solid fa-star"></i> ${item.rating}</span>
                </div>
                <p class="card-desc">${item.desc}</p>
                <div class="card-footer">
                    <span class="price">₹${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
                </div>
            </div>
        `;
        foodGrid.appendChild(card);
    });
}

// ================= 4. FILTERING & SEARCH =================
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button styling
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-category');
        if (selectedCategory === 'all') {
            renderMenu(menuItems);
        } else {
            const filtered = menuItems.filter(item => item.category === selectedCategory);
            renderMenu(filtered);
        }
    });
});

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );
    renderMenu(filtered);
}

searchInput.addEventListener('input', handleSearch);
searchBtn.addEventListener('click', handleSearch);

// ================= 5. CART FUNCTIONALITY =================
function addToCart(id) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const foodItem = menuItems.find(item => item.id === id);
        cart.push({ ...foodItem, quantity: 1 });
    }
    updateCartUI();
    openCart();
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    // Update badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    // Render cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="empty-cart-msg">Your cart is empty. Add some delicious food!</div>`;
        subtotalEl.textContent = "₹0";
        totalEl.textContent = "₹0";
        checkoutBtn.disabled = true;
        return;
    }

    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>₹${item.price} × ${item.quantity}</span>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    const deliveryFee = 40;
    subtotalEl.textContent = `₹${subtotal}`;
    totalEl.textContent = `₹${subtotal + deliveryFee}`;
    checkoutBtn.disabled = false;
}

// ================= 6. SIDEBAR & MODAL CONTROLS =================
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

checkoutBtn.addEventListener('click', () => {
    closeCart();
    orderModal.classList.add('active');
    cart = [];
    updateCartUI();
});

closeModalBtn.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

// Initialize the page with all menu items
renderMenu(menuItems);
