
let saveProductArray = JSON.parse(
    localStorage.getItem("addToCartBag") || "[]"
);
bagItemDisplay();
function addToCart(productId, category, quantity = 1) {


    let product = {
        id: productId,
        category: category,
        quantity: quantity
    };
    
    saveProductArray.push(product);

    localStorage.setItem(
        "addToCartBag",
        JSON.stringify(saveProductArray)
    );


    bagItemDisplay();
}

function bagItemDisplay() {

    let cartValue = localStorage.getItem("addToCartBag");

    saveProductArray = cartValue
        ? JSON.parse(cartValue)
        : [];

    let badge = document.querySelector(".badge");


    if (badge) {
        let totalItems = saveProductArray.reduce(
            (total, item) => total + item.quantity,
            0
        );

        badge.innerHTML = totalItems;
    }

  
    
}



bagItemDisplay();
document.addEventListener('navbarLoaded', bagItemDisplay)
