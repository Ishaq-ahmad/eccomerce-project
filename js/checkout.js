
let cartItems = JSON.parse(
    localStorage.getItem('addToCartBag') || '[]'
);

const categories = {
    men: window.menProducts,
    women: window.womenProducts,
    kids: window.kidsProducts,
    beauty: window.beautyProducts,
    home: window.homeProducts,
    studio: window.studioProducts
};

let subtotal = 0;
let shipping = 0;
let discount = 0;
let total = 0;

let productsContainer = document.querySelector('#checkoutProducts');

// Convert price and discount strings into numbers
function getNumber(value) {
    return Number(
        String(value).replace(/[^\d.-]/g, '')
    );
}



cartItems.forEach(item => {

    let category = item.category;
    let selectedCategory = categories[category];

    let product = selectedCategory?.find(product => {
        return String(product.id) === String(item.id);
    });

    if (!product) {
        console.warn('Product not found:', item);
        return;
    }

    

    // Convert values into numbers
    let oldPrice = getNumber(product.oldPrice);
    let discountPercent = getNumber(product.discount);
    let quantity = getNumber(item.quantity);


    if(cartItems.length > 0 ){
        shipping += quantity * 100
    }else if(cartItems.length > 4){
        shipping = 400
    }else{
        shipping = 0
    }

    // Validate values
    if (
        !Number.isFinite(oldPrice) ||
        !Number.isFinite(discountPercent) ||
        !Number.isFinite(quantity) ||
        oldPrice <= 0 ||
        quantity <= 0
    ) {
        console.warn('Invalid product price/discount/quantity:', product, item);
        return;
    }

    // Calculate prices
    let oldTotal = oldPrice * quantity;

    let itemDiscount = oldTotal * discountPercent / 100;

    let totalPrice = oldTotal - itemDiscount;

    let finalUnitPrice = totalPrice / quantity;

    // Update summary values
    subtotal += totalPrice;
    discount += itemDiscount;

    // Display product
    productsContainer.innerHTML += `
        <div class="checkout-item">

            <a href="./detail.html?category=${category}&id=${item.id}">
                <div class="checkout-item-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
            </a>

            <div class="checkout-item-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-quantity">
                    Quantity: ${quantity}
                </p>

                <p class="product-price">
                    Old Price: <del>Rs. ${oldPrice}</del>
                </p>

                <p class="product-discount">
                    Discount: ${discountPercent}%
                </p>

                <p class="product-price">
                    Final Price: Rs. ${finalUnitPrice.toFixed(2)}
                </p>

            </div>

            <div class="checkout-item-total">
                Rs. ${totalPrice.toFixed(2)}
            </div>

            <span id="removeIcon">
                <img
                    onclick="removeItem('${item.id}', '${category}')"
                    src="https://cdn-icons-png.flaticon.com/512/9759/9759080.png"
                    alt="Remove product"
                >
            </span>

        </div>
    `;
});

// Final total
total = subtotal + shipping;

// Display summary
document.querySelector('#checkoutSubtotal').innerHTML =
    `Rs: ${subtotal.toFixed(2)}`;

document.querySelector('#checkoutShipping').innerHTML =
    `Rs: ${shipping.toFixed(2)}`;

document.querySelector('#checkoutDiscount').innerHTML =
    `Rs: ${discount.toFixed(2)}`;

document.querySelector('#checkoutTotal').innerHTML =
    `Rs: ${total.toFixed(2)}`;


// Remove product from cart
function removeItem(itemID, itemCategory) {

    cartItems = cartItems.filter(item => {
        return !(
            String(item.id) === String(itemID) &&
            item.category === itemCategory
        );
    });

    localStorage.setItem(
        'addToCartBag',
        JSON.stringify(cartItems)
    );

    location.reload();
}
