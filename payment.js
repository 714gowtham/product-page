function showInput(paymentType) {
    document.querySelectorAll('.payment-input').forEach(input => {
        input.style.display = 'none';
    });
    const inputSection = document.getElementById(paymentType + '-input');
    if (inputSection) {
        inputSection.style.display = 'block';
    }
}

function placeOrder() {
    // Check if a payment method is selected
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    let paymentSelected = false;

    paymentMethods.forEach(method => {
        if (method.checked) {
            paymentSelected = true;
        }
    });

    if (!paymentSelected) {
        alert('Please select a payment method.');
        return;
    }

    const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // For Credit Card Payment
    if (selectedPaymentMethod === 'credit') {
        const cardNumber = document.querySelector('#credit-input input[name="card-number"]').value;
        const expiryDate = document.querySelector('#expiry-date').value;
        const cvv = document.querySelector('#credit-input input[name="cvv"]').value;

        if (!cardNumber || !expiryDate || !cvv) {
            alert('Please fill out all card details.');
            return;
        }

        const [expiryMonth, expiryYear] = expiryDate.split('/');
        if (!expiryMonth || !expiryYear || expiryMonth.length !== 2 || expiryYear.length !== 4) {
            alert('Please enter a valid expiry date in MM/YYYY format.');
            return;
        }
    }

    // For UPI Payment
    if (selectedPaymentMethod === 'upi') {
        const upiId = document.querySelector('#upi-input input').value;

        if (!upiId) {
            alert('Please enter your UPI ID.');
            return;
        }
    }

    // Empty the cart and show confirmation popup
    localStorage.removeItem('cart');
    showPopup();
}

function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function redirectToHome() {
    window.location.href = 'index.html'; // Redirect to the main page
}

window.onload = function() {
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }
}
