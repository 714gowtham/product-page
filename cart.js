// Function to initialize or update the cart from localStorage
function initializeCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

let cart = initializeCart();

function updateCartContent() {
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = ''; // Clear previous content
    let totalPrice = 0; // Initialize total price

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        let { image, title, price, quantity } = item;
        let itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class='row-img'>
                <img class='rowimg' src="${image}" alt="${title}">
            </div>
            <p style='font-size:12px;'>${title}</p>
            <p style='font-size:12px;'>Quantity: ${quantity}</p>
            <h2 style='font-size: 15px;'>$ ${price * quantity}.00</h2>
            <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
        `;
        cartContent.appendChild(itemElement);
        totalPrice += price * quantity; // Calculate total price
    });

    let totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `Total: $${totalPrice}.00`;
    cartContent.appendChild(totalElement);
}

// Function to remove item from the cart
function delElement(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartContent();
}

// Initialize the cart content when the page loads
window.onload = function() {
    updateCartContent();
}

// Add event listener for the proceed to payment button
document.getElementById('proceed-payment').addEventListener('click', function() {
    window.location.href = 'payment.html';
});
