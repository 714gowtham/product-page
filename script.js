// Sample products
const product = [
    { id: 0, image: 'images/product-1.png', title: 'orange', price: 120 },
    { id: 1, image: 'images/product-2.png', title: 'onions', price: 60 },
    { id: 2, image: 'images/product-3.png', title: 'chicken', price: 230 },
    { id: 3, image: 'images/product-4.png', title: 'cabbage', price: 100 },
    { id: 4, image: 'images/product-5.png', title: 'potato', price: 230 },
    { id: 5, image: 'images/product-6.png', title: 'avocado', price: 90 }
];

// Function to initialize or update the cart from localStorage
function initializeCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

let cart = initializeCart();
let i = 0;

// Function to render products on the page
function renderProducts() {
    document.getElementById('root').innerHTML = product.map((item, index) => {
        var { image, title, price } = item;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src="${image}" alt="${title}">
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>
                    <button onclick='addtocart(${index})'>Add to cart</button>
                </div>
            </div>`
        );
    }).join('');
}

function addtocart(index) {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === product[index].id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1; // Increase the quantity
    } else {
        cart.push({ ...product[index], quantity: 1 }); // Add new item with quantity 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

function displaycart() {
    let total = 0;
    const cartCount = cart.length;
    document.getElementById("count").innerHTML = cartCount;
    if (cartCount === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("Total").innerHTML = "$ 0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items, index) => {
            var { image, title, price, quantity } = items;
            total += price * quantity;
            document.getElementById("Total").innerHTML = "$ " + total + ".00";
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src="${image}" alt="${title}">
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <p style='font-size:12px;'>Quantity: ${quantity}</p>
                    <h2 style='font-size: 15px;'>$ ${price * quantity}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
    }
}

// Function to remove item from the cart
function delElement(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

// Function to navigate to the cart page
function gotocart() {
    window.location.href = 'cart.html';
}

// Function to proceed to payment page
function proceedToPayment() {
    window.location.href = 'payment.html';
}

// Initialize the page
renderProducts();
displaycart();

// Add event listeners for the buttons
document.getElementById('view-cart').addEventListener('click', gotocart);
document.getElementById('proceed-payment').addEventListener('click', proceedToPayment);


// footer js

document.getElementsByClass('sec newsletter').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('success-popup').style.display = 'block';
    setTimeout(function() {
      document.getElementById('success-popup').style.display = 'none';
    }, 3000); // hide popup after 3 seconds
  });