let cartItems = JSON.parse(localStorage.getItem('addToCartBag')) || []

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


let productsContainer = document.querySelector('#checkoutProducts')

cartItems.forEach(item => {

    let category=  item.category
    let selectedCategory = categories[category]

    let product = selectedCategory?.find((product) => {
        return String(product.id) === String(item.id);
    });

    let totalPrice = product.price * item.quantity;

    subtotal = subtotal + totalPrice
    if(cartItems.length <= 4){
        shipping += 100
    }
    else{
        shipping = 400
    }


   productsContainer.innerHTML += `
   

    <div class="checkout-item">
              <!-- Product Image -->
          <a id='cartLink' href="./detail.html?category=${category}&id=${item.id}">

              <div class="checkout-item-image">
                <img
                  src="${product.image}"
                  alt="Product Name"
                />
              </div>

          </a>

              <!-- Product Information -->
              <div class="checkout-item-info">
                <h3>${product.name}</h3>

                <p class="product-category">${product.category}</p>

                <p class="product-quantity">Quantity: ${item.quantity}</p>

                <p class="product-price">Rs. ${product.price}</p>
              </div>

              <!-- Total Price -->
              <div class="checkout-item-total">Rs. ${totalPrice}</div>

              <span id='removeIcon'><img onclick='removeItem(${product.id})' src="https://cdn-icons-png.flaticon.com/512/9759/9759080.png" alt=""></span> 
            </div>
            
   
   `
   
   total = subtotal +shipping - discount

   document.querySelector('#checkoutSubtotal').innerHTML = `Rs : ${subtotal}`
   document.querySelector('#checkoutShipping').innerHTML = `Rs : ${shipping}`
   document.querySelector('#checkoutDiscount').innerHTML =  `Rs : ${discount}`
   document.querySelector('#checkoutTotal').innerHTML =  `Rs : ${total}`
});


function removeItem(itemID){

    cartItems = cartItems.filter(item => {
        return !(item.id == itemID)
    })

    localStorage.setItem('addToCartBag', JSON.stringify(cartItems))

    location.reload();
}
