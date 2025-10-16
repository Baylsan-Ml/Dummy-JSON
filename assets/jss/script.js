const getProducts=async()=>{
    const response= await axios.get(`https://dummyjson.com/products?limit=10`);
    /* console.log(response.data); */
    if(response.status==200)
        return response;
}
getProducts();
const displayProducts=async()=>{
    const response= await getProducts();
    const result= response.data.products.map(product=>`
        <div class="card -d-flex  flex-column" style="width: 18rem;">
  <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
  <div class="card-body">
    <h5 class="card-title subColor2 textShadow">${product.title}</h5>
    <div class='d-flex gap-5'>
    <span class='flex-grow-1'>${product.price}$</span>
    <span class=''><i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    ${product.rating}</span>
    </div>
    <a href="./prodDetails.html?prodID=${product.id}" class="btn prodBtn w-100 mt-2 subColor1 bg-mainColor" target="_blank">Details</a>
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

 /*  autoplay: {
    deley:3000,
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




