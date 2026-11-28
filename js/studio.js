
if(document.getElementById('products')){
    const container = document.getElementById("products");

    window.studioProducts.forEach((product) => {
        container.innerHTML += `
        <a href="./detail.html?category=studio&id=${product.id}">
        <div class="product-card">
      
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="discount">${product.discount}</span>
            </div>
      
            <div class="product-info">
      
                <p>${product.category}</p>
      
                <h3>${product.name}</h3>
      
                <p class="rating">
                    ★ ★ ★ ★ ☆ (${product.rating})
                </p>
      
                <div class="price">
                    <span>Rs. ${product.price}</span>
                    <del>Rs. ${product.oldPrice}</del>
                </div>
      
                <button id='addToCartBtn'
                 onclick="event.preventDefault(); event.stopPropagation(); addToCart(${product.id}, 'studio')"> Add to Cart
                 </button>      
            </div>
        </div>
        </a>
      `;
      });
}

