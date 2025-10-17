const getProducts=async()=>{
    const response= await axios.get(`https://dummyjson.com/products?limit=10`);
    /* console.log(response.data); */
    if(response.status==200)
        return response;
}
getProducts();
const displayProducts=async()=>{
    const response= await getProducts();
    Products = response.data.products;
    const result= response.data.products.map(product=>`
        <div class="card -d-flex  flex-column" style="width: 18rem;">
  <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
  <div class="card-body">
    <h5 class="card-title subColor3 subFont">${product.title}</h5>
    <div class='d-flex gap-5 subFont1'>
    <span class='flex-grow-1'>${product.price}$</span>
    <span class=''><i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    ${product.rating}</span>
    </div>
    <div class="cartBtn-heartBtn d-flex gap-2 mt-3 subFont">
    <button class='btn bg-subColor1'><i class="fa-solid fa-heart fa-lg" style="color: #920001;"></i></button>
    <button class='btn bg-subColor1 subColor3 flex-grow-1'><i class="fa-solid fa-cart-shopping fa-lg" style="color: #920001;"></i> Add to Cart</button>
    </div>
    <a href="./prodDetails.html?prodID=${product.id}" class="btn prodBtn w-100 mt-2 subColor1 bg-mainColor subFont" target="_blank">Details</a>
  </div>
</div>
     
        `
    ).join (' ');
    document.querySelector(".homeProductsCard").innerHTML=result;
} 
 displayProducts();

/* swiper init code */
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  /* loop: true, */

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  /* autoplay: {
    deley:900,
  }, */

  effect: 'fade',
  speed: 1500,

  slidesPerView: 3,
  spaceBetween: 30,

});

/* Home-Categories start */
const getCategory= async()=>{
  const response= await axios.get('https://dummyjson.com/products/category-list');
  /* console.log(response); */
  if (response.status ==200)
      return response;
}

const displayCategory= async()=>{
  const response=await getCategory();

  const result= response.data.map(category=>`
    <li class="list-group-item d-flex justify-content-center rounded">
    <a href="./category.html?category=${category}" class='btn btn-outline' target="_blanck">${category}</a>
    </li>
    `).join (' ');

    document.querySelector(".categoryList").innerHTML=result;
}
displayCategory();
/* Home-Categories end */


/* Nav Btns */
const navSearchBtn=document.querySelector(".fa-magnifying-glass");
const navCartBtn=document.querySelector(".fa-cart-shopping");
const navHeartBtn=document.querySelector(".fa-heart");
const navUserBtn=document.querySelector(".fa-user");

const offcanvasCart=document.querySelector(".offcanvasCart");

navSearchBtn.addEventListener("click", ()=>{
   navSearchInput.classList.remove('d-none');
})


/* nav search */
const navSearchInput = document.querySelector(".navSearchInput");
navSearchInput.addEventListener("input", ()=>{
    const filterText= navSearchInput.value.toLowerCase();
    const filteredProducts = Products.filter((product)=>{
    return product.title.toLowerCase().includes(filterText);
});
     const result = filteredProducts.map ((product)=>{
        return `
        <div class="card -d-flex  flex-column" style="width: 18rem;">
  <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
  <div class="card-body">
    <h5 class="card-title subColor3 subFont">${product.title}</h5>
    <div class='d-flex gap-5 subFont1'>
    <span class='flex-grow-1'>${product.price}$</span>
    <span class=''><i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    ${product.rating}</span>
    </div>
    <div class="cartBtn-heartBtn d-flex gap-2 mt-3 subFont">
    <button class='btn bg-subColor1'><i class="fa-solid fa-heart fa-lg" style="color: #920001;"></i></button>
    <button class='btn bg-subColor1 subColor3 flex-grow-1'><i class="fa-solid fa-cart-shopping fa-lg" style="color: #920001;"></i> Add to Cart</button>
    </div>
    <a href="./prodDetails.html?prodID=${product.id}" class="btn prodBtn w-100 mt-2 subColor1 bg-mainColor subFont" target="_blank">Details</a>
  </div>
</div>
        `

    }).join('');
    document.querySelector(".homeProductsCard").innerHTML=result;
})

/* Nav Btns */

