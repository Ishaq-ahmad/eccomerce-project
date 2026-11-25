
// get change quantity in detail page
let quantity = 1
function changeQuantity(value){
    quantity = quantity+value

    if(quantity< 1 ){
        quantity =1
    }

   let total=  product.price * quantity

   let productQuantity= document.getElementById('productQuantity').innerText= quantity

    document.querySelector('#totalPrice').innerHTML = `RS : ${total}`
}




// 1. Get URL parameters

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const category = params.get("category");


// 2. All product categories

const categories = {
    men: window.menProducts,
    women: window.womenProducts,
    kids: window.kidsProducts,
    beuty: window.beautyProducts,
    home: window.homeProducts,
    studio: window.studioProducts
};


// 3. Select category

const selectedProducts = categories[category];


// 4. Find product using ID

const product = selectedProducts?.find((item) => {
    return item.id == id;
});





// 5. Select HTML container

const mainContainer = document.querySelector(".detail-container");


// 6. Display product details

let cartOrderValue=0

if (product) {

    mainContainer.innerHTML = `

        <div class="detail-page">

            <!-- Breadcrumb -->

            <div class="detail-breadcrumb">
                <a href="./index.html">Home</a> /

                <a href="./${category === "home" ? "home-leaving" : category}.html">
                    ${category.toUpperCase()}
                </a> /

                <span>${product.name}</span>
            </div>


            <!-- Product Details -->

            <main class="detail-product">

                <!-- Product Image -->

                <div class="detail-gallery">

                    <div class="detail-main-image">

                        <span class="detail-discount">
                            ${product.discount}
                        </span>

                        <img src="${product.image}" alt="${product.name}">

                    </div>

                </div>


                <!-- Product Information -->

                <div class="detail-information">

                    <p class="detail-category">
                        ${product.category}
                    </p>

                    <h1 class="detail-title">
                        ${product.name}
                    </h1>


                    <!-- Rating -->

                    <div class="detail-rating">

                        <span>★ ★ ★ ★ ☆</span>

                        <p>(${product.rating} Reviews)</p>

                    </div>


                    <!-- Price -->

                    <div class="detail-price">

                        <h2 id='totalPrice'>Rs. ${product.price}</h2>

                        <del>Rs. ${product.oldPrice}</del>

                        <span>${product.discount}</span>

                    </div>


                    <!-- Description -->

                    <p class="detail-description">
                        Enjoy the perfect combination of comfort,
                        quality and modern style with this product.
                        Perfect for your everyday needs.
                    </p>


                    <!-- Size Selection -->

                    <div class="detail-selection">

                        <h3>Select Size</h3>

                        <div class="detail-size-options">

                            <button>S</button>
                            <button>M</button>
                            <button>L</button>
                            <button>XL</button>
                            <button>XXL</button>

                        </div>

                    </div>


                    <!-- Quantity -->

                    <div class="detail-quantity">

                         <h3>Quantity:</h3>

                    <button onclick="changeQuantity(-1)">-</button>

                    <span id="productQuantity">1</span>

                    <button onclick="changeQuantity(1)">+</button>

                    </div>


                    <!-- Buttons -->

                    <div class="detail-buttons">

                          <button onclick="addToCart(${product.id}, '${category}', quantity)">
                                Add to Cart
                            </button>

                   

                    </div>


                    <!-- Extra Information -->

                    <div class="detail-extra">

                        <p>✓ Free delivery on selected orders</p>

                        <p>✓ Easy returns</p>

                        <p>✓ Secure payment</p>

                    </div>

                </div>

            </main>


            <!-- Product Description -->

            <section class="detail-more">

                <h2>Product Description</h2>

                <p>
                    ${product.name} combines comfort and modern style.
                    It is a great choice for everyday use.
                </p>

            </section>

        </div>

    `;

} else {

    mainContainer.innerHTML = `

        <div class="detail-not-found">

            <h2>Product Not Found!</h2>

            <a href="./index.html">Back to Home</a>

        </div>

    `;

}

