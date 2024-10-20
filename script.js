$(document).ready(function () {
    let cart = [];
    let totalAmount = 0;

    // Toggle Search Bar on Search Icon Click
    $('#search-icon').click(function (event) {
        event.preventDefault(); // Prevent default behavior of the link
        var searchBar = $('#search-bar');
        if (searchBar.css('display') === 'none') {
            searchBar.css('display', 'block'); // Show search bar
        } else {
            searchBar.css('display', 'none'); // Hide search bar if it's already visible
        }
    });

    // Add to Cart
    $('.add-to-cart').click(function () {
        let productCard = $(this).closest('.product-card');
        let productId = productCard.data('id');
        let productName = productCard.data('name');
        let productPrice = parseFloat(productCard.data('price'));
        let productImage = productCard.find('img').attr('src');

        // Check if product is already in the cart
        let existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            // Add new product to cart
            let product = { id: productId, name: productName, price: productPrice, quantity: 1, image: productImage };
            cart.push(product);
        }

        updateCartSidebarDisplay();
    });

    // Show cart details in the sidebar
    function updateCartSidebarDisplay() {
        let cartItems = $('#cart-items-sidebar');
        cartItems.empty();
        totalAmount = 0;
        cart.forEach(function (item, index) {
            totalAmount += item.price * item.quantity;
            cartItems.append(`
                <li class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div>$${item.price}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="decrement-item" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increment-item" data-index="${index}">+</button>
                        <button class="cart-item-remove" data-index="${index}">Remove</button>
                    </div>
                </li>
            `);
        });

        // Update total amount
        $('#total-amount-sidebar').text(totalAmount.toFixed(2));

        // Show the sidebar and overlay
        $('#cart-sidebar').addClass('active');
        $('#cart-overlay').addClass('active');
    }

    // Increment item quantity
    $(document).on('click', '.increment-item', function () {
        let index = $(this).data('index');
        cart[index].quantity++;
        updateCartSidebarDisplay();
    });

    // Decrement item quantity
    $(document).on('click', '.decrement-item', function () {
        let index = $(this).data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1); // Remove product if quantity is 1 and user tries to decrement
        }
        updateCartSidebarDisplay();
    });

    // Remove item from cart
    $(document).on('click', '.cart-item-remove', function () {
        let index = $(this).data('index');
        cart.splice(index, 1); // Remove product from cart
        updateCartSidebarDisplay();
    });

    // Close sidebar when close button or overlay is clicked
    $('#close-cart, #cart-overlay').click(function () {
        $('#cart-sidebar').removeClass('active');
        $('#cart-overlay').removeClass('active');
    });

    // Checkout button in the sidebar
    $('#checkout-sidebar').click(function () {
        alert('Thank you for your purchase!');
        cart = [];
        totalAmount = 0;
        $('#cart-count').text(0);
        $('#total-amount-sidebar').text('0.00');
        $('#cart-items-sidebar').empty();
        $('#cart-sidebar').removeClass('active');
        $('#cart-overlay').removeClass('active');
    });

    // Category scrolling functionality
    let currentIndex = 0;
    const items = $('.category-item');
    const itemCount = items.length;
    const itemWidth = items.outerWidth(true);
    const wrapperWidth = $('.category-wrapper').outerWidth();

    // Calculate the max index
    const maxIndex = Math.ceil(itemCount - wrapperWidth / itemWidth);

    $('.next').on('click', function () {
        if (currentIndex < maxIndex) {
            currentIndex++;
            $('.categories').css('transform', `translateX(-${currentIndex * itemWidth}px)`);
        }
    });

    $('.prev').on('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            $('.categories').css('transform', `translateX(-${currentIndex * itemWidth}px)`);
        }
    });

    // Open the cart sidebar when the cart icon is clicked
    $('#cartIcon').click(function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
        // Toggle sidebar visibility
        $('#cart-sidebar').toggleClass('active');
        $('#cart-overlay').toggleClass('active');

        // Update cart display when opening the sidebar
        if ($('#cart-sidebar').hasClass('active')) {
            updateCartSidebarDisplay();
        }
    });
});
