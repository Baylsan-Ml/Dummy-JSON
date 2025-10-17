const getDetails = async () => {
    const params = new URLSearchParams(window.location.search);
     console.log(params);
     const prodID = params.get("prodID");
    if (!prodID) return null;
    try{
    const response = await axios.get(`https://dummyjson.com/products/${prodID}`);
    const data= response.data;
    return data;
    }catch(error){
      console.error("Error finding product details:", error);
    return null;
    }
}
getDetails();

const displayProdDetails = async () => {
    const product = await getDetails(); 
    if (!product) return; 
     
    const result = `
        <div class="col-md-6 d-flex justify-content-center mb-5">
      <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      ${product.images.map(img => `
        <div class="swiper-slide">
          <img src="${img}" class="card-img-top" alt="${product.title}">
        </div>
      `).join('')}
    </div>
    <div class="swiper-pagination img-pagination"></div>
    <div class="swiper-button-prev img-prev"></div>
    <div class="swiper-button-next img-next"></div>
  </div>
  </div>

  <div class="col-md-6 d-flex justify-content-center">
  <div class="card desCard d-flex  flex-column  p-3" style="width: 18rem;">
            <h5 class="card-title subColor3 subFont my-3">${product.title}</h5>
            <p class="subFont1 subColor">${product.description}</p>
    <div class='d-flex gap-5 subFont1'>
    <span class='flex-grow-1'>${product.price}$</span>
    <span class=''><i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    ${product.rating}</span>
    </div>
    <div class='d-flex gap-5 subFont1 my-3'>
    <span class='flex-grow-1'>Stock: ${product.stock}</span>
    <span class=''>Category: ${product.category}</span>
    </div>
    <div class="cartBtn-heartBtn d-flex gap-2 mt-3 subFont">
    <button class='btn bg-subColor1'><i class="fa-solid fa-heart fa-lg" style="color: #920001;"></i></button>
    <button class='btn bg-subColor1 subColor3 flex-grow-1'><i class="fa-solid fa-cart-shopping fa-lg" style="color: #920001;"></i> Add to Cart</button>
    </div>
    <a href="./prodDetails.html?prodID=${product.id}" class="btn prodBtn w-100 mt-2 subColor1 bg-mainColor subFont" target="_blank">Details</a>
  </div>
</div>
        </div>
         </div>
 
         
          <div class="reviews-container d-flex gap-3 mb-5 ">
  ${product.reviews.map(review => `
    <div class="col-md-4 d-flex justify-content-center">
    <div class="card text-center" style="min-width: 18rem; flex-shrink: 0;">
      <div class="card-header bg-subColor subColor1">Review</div>
      <div class="card-body  bg-subColor1 subColor">
        <h5 class="card-title">${review.reviewerName}</h5>
        <p class="card-text">${review.comment}</p>
        <div class="d-flex flex-column gap-2">
          <span>${review.reviewerEmail}</span>
          <span>Rating: ${review.rating}</span>
        </div>
      </div>
      <div class="card-footer text-body-secondary bg-subColor subColor1">
        <span class="subColor2">${review.date}</span>
      </div>
    </div>
    </div>
      `).join('')}`;

    document.querySelector(".prodDetailsContent").innerHTML = result;


    // init imgs swiper 
new Swiper(".mySwiper", {
  loop: true,
  pagination: { el: ".mySwiper .swiper-pagination", clickable: true },
  navigation: { 
    nextEl: ".mySwiper .swiper-button-next", 
    prevEl: ".mySwiper .swiper-button-prev" 
  },
});

// init reviews swiper 
/* new Swiper(".mySwiperReviews", {
  loop: true,
  slidesPerView: 1,   
  spaceBetween: 20,   
  pagination: { el: ".reviews-pagination", clickable: true },
  navigation: { nextEl: ".reviews-next", prevEl: ".reviews-prev" },
}); */
};

    
displayProdDetails();


  

