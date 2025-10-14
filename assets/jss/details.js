const getDetails = async () => {
    const params = new URLSearchParams(window.location.search);
     console.log(params);
     const prodID = params.get("prodID");
    console.log(prodID); 

    const response = await axios.get(`https://dummyjson.com/products/${prodID}`);
    const data = response.data;

    return response;
}
getDetails();

const displayProdDetails = async () => {
    const response = await getDetails(); 
    if (!response) return; 
    const product = response.data; 
    const result = `
        <div class="card -d-flex  flex-column my-5" style="width: 18rem;">
              <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      ${product.images.map(img => `
        <div class="swiper-slide">
          <img src="${img}" class="card-img-top" alt="${product.title}">
        </div>
      `).join('')}
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
            <div class="card-body">
                <h5 class="card-title subColor2 textShadow">${product.title}</h5>
                <div class='d-flex gap-5'>
                    <span class='flex-grow-1'>${product.price}$</span>
                    <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    ${product.rating}</span>
                </div>
                <p class="card-text">${product.description}</p>
            </div>
        </div>
    `;

    document.querySelector(".prodDetailsContent").innerHTML = result;
} 
displayProdDetails();