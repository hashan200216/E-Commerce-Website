document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Paper Serviettes', price: 150.00, image: 'admin/images/product/Sanet.png', },
        { id: 2, name: 'Paper Serviettes', price: 140.00, image: 'admin/images/product/Go PS.png' },
        { id: 3, name: 'Mini Paper Serviettes', price: 95.00, image: 'admin/images/product/Sanet PS MM.png' },
        { id: 4, name: 'Facial Tissues', price: 130.00, image: 'admin/images/product/Facial.png' },
        { id: 5, name: 'Facial Tissues', price: 180.00, image: 'admin/images/product/Facial.png' },
        { id: 6, name: 'Toilet Rolls', price: 90.00, image: 'admin/images/product/TR.png' },
        { id: 7, name: 'Toilet Roll', price: 100.00, image: 'admin/images/product/S TR.png' },
        { id: 8, name: 'Multi Fold Hand Towels', price: 270.00, image: 'admin/images/product/GO Multi.png' },
        { id: 9, name: 'Multi Fold Hand Towels', price: 290.00, image: 'admin/images/product/S MH.png' },
        { id: 10, name: 'Kitchen Towles ', price: 290.00, image: 'admin/images/product/Kitchen.png' },
        { id: 11, name: 'Bed Towles', price: 395.00, image: 'admin/images/product/Bed.png' }
    ];
   




    const cart = [];

    const productList = document.getElementById('productList');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    function displayProducts() {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;
            productItem.appendChild(productImage);

            const productName = document.createElement('span');
            productName.textContent = product.name;
            productItem.appendChild(productName);

            const productPrice = document.createElement('span');
            productPrice.textContent = `${product.price.toFixed(2)}`;
            productItem.appendChild(productPrice);

            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Cart';
            addButton.addEventListener('click', () => addToCart(product));
            productItem.appendChild(addButton);

            productList.appendChild(productItem);
        });
    }

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        displayCart();
    }

    function displayCart() {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
            cartTotal.textContent = 'Total: 0.00';
            return;
        }

        let total = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');

            const cellName = document.createElement('td');
            cellName.textContent = item.name;
            row.appendChild(cellName);

            const cellImage = document.createElement('td');
            const productImage = document.createElement('img');
            productImage.src = item.image;
            productImage.alt = item.name;
            cellImage.appendChild(productImage);
            row.appendChild(cellImage);

            const cellQuantity = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 1;
            quantityInput.addEventListener('change', () => updateQuantity(item.id, quantityInput.value));
            cellQuantity.appendChild(quantityInput);
            row.appendChild(cellQuantity);

            const cellPrice = document.createElement('td');
            cellPrice.textContent = `${item.price.toFixed(2)}`;
            row.appendChild(cellPrice);

            const cellTotal = document.createElement('td');
            const itemTotal = item.quantity * item.price;
            cellTotal.textContent = `${itemTotal.toFixed(2)}`;
            row.appendChild(cellTotal);

            const cellAction = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeFromCart(item.id));
            cellAction.appendChild(removeButton);
            row.appendChild(cellAction);

            cartItems.appendChild(row);

            total += itemTotal;
        });

        cartTotal.textContent = `Total: ${total.toFixed(2)}`;
    }

    function updateQuantity(productId, quantity) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity = parseInt(quantity, 10);
            displayCart();
        }
    }

    function removeFromCart(productId) {
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            displayCart();
        }
    }

    displayProducts();
    displayCart();
});
