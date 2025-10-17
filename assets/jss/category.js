const getCategory = async () => {
    const params = new URLSearchParams(window.location.search);
     const category = params.get("category");
    const response= await axios.get(`https://dummyjson.com/products/category/${category}`);
    if(response.status==200)
        return response;
}

const displayCategory = async () => {
    const response = await getCategory(); 
    if (!response) return; 
   const result= response.data.products.map(product=>`
        <div class="col-md-3 my-3">
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
</div>
        `
    ).join (' ');
    document.querySelector(".categoryContent").innerHTML=result;
} 
displayCategory();



/* Nav Btns */
const navSearchBtn=document.querySelector(".fa-magnifying-glass");
const navCartBtn=document.querySelector(".fa-cart-shopping");
const navHeartBtn=document.querySelector(".fa-heart");
const navUserBtn=document.querySelector(".fa-user");
const offcanvasCart=document.querySelector(".offcanvasCart");

navSearchBtn.addEventListener("click", ()=>{
   navSearchInput.classList.remove('d-none');
})

/* Nav Btns */