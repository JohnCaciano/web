// Función para mostrar el carrito
function showCart() {
    document.getElementById('cart').style.display = 'block';
}

// Función para ocultar el carrito
function hideCart() {
    document.getElementById('cart').style.display = 'none';
}

// Agrega un producto al carrito
function addToCart(productName, price) {
    const cartItems = document.getElementById('cart-items');

    // Obtener el carrito actual desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    let itemExists = cart.find(item => item.name === productName);

    if (itemExists) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        itemExists.quantity += 1;
        itemExists.totalPrice = (parseFloat(price) * itemExists.quantity).toFixed(2);
    } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push({
            name: productName,
            price: parseFloat(price),
            quantity: 1,
            totalPrice: parseFloat(price).toFixed(2)
        });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la vista del carrito
    renderCartItems();
}

// Renderizar los elementos del carrito
function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    // Obtener el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Limpiar la lista de elementos del carrito
    cartItems.innerHTML = '';

    let total = 0;
    let count = 0;

    // Crear los elementos del carrito dinámicamente
    cart.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('data-product-name', item.name);
        li.innerHTML = `${item.name} - $${item.price} x <span class="item-quantity">${item.quantity}</span> = $<span class="item-total">${item.totalPrice}</span>
        <button onclick="removeFromCart('${item.name}')">Eliminar</button>`;
        cartItems.appendChild(li);

        // Calcular el total y la cantidad
        total += parseFloat(item.totalPrice);
        count += item.quantity;
    });

    // Actualizar el total y la cantidad en la interfaz
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
}

// Eliminar un producto del carrito
function removeFromCart(productName) {
    // Obtener el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar los productos para eliminar el seleccionado
    cart = cart.filter(item => item.name !== productName);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la vista del carrito
    renderCartItems();
}

// Vaciar el carrito
function clearCart() {
    // Limpiar el carrito en localStorage
    localStorage.removeItem('cart');

    // Actualizar la vista del carrito
    renderCartItems();
    hideCart();
}

// Función para cargar el carrito en cart.html al abrir la página
function loadCart() {
    renderCartItems();
}

// Maneja el clic en los botones de agregar al carrito
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product-name');
        const price = button.getAttribute('data-price');
        addToCart(productName, price);
        showCart();
    });
});

// Llamada para cargar el carrito al abrir cart.html
if (document.getElementById('cart')) {
    loadCart();
}

// Alterna la visibilidad del carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    if (cart.style.display === 'none' || cart.style.display === '') {
        showCart();
    } else {
        hideCart();
    }
}

function confirmPurchase() {
    alert('Compra confirmada. ¡Gracias por tu compra!');
    clearCart();
}

