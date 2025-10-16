let Products = [];
const getAllProducts = async (page=1) => {
    const skip= (page-1)*15; 
    const response= await axios.get(`https://dummyjson.com/products?limit=15&skip=${skip}`);
    if(response.status==200)
        return response;
}
getAllProducts();

const displayProducts=async(page=1)=>{
    const response= await getAllProducts(page);
    Products = response.data.products;
    const numberOfPages= Math.ceil(response.data.total / 15);
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
    document.querySelector(".productsContent").innerHTML=result;


    let paginationLink=``;

    if(page > 1){
        paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page -1})">Previous</button></li>`;
    }else{
        paginationLink += `<li class="page-item"><button class="page-link disabled">Previous</button></li>`;
    }

    for(let i=1 ; i<= numberOfPages; i++){
        if(i==1 || i==numberOfPages || (i > page-2 && i < page+2))
            paginationLink+=`<li class="page-item"><button class="page-link ${i==page?"active":''}" onclick="displayProducts(${i})">${i}</button></li>`;
    }

    if(page < numberOfPages){
        paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page +1})">Next</button></li>`;
    }else{
        paginationLink += `<li class="page-item"><button class="page-link disabled">Next</button></li>`;
    }

    document.querySelector(".pagination").innerHTML=paginationLink;
} 

displayProducts();




/* Search */
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", ()=>{
    const filterText= searchInput.value.toLowerCase();
    const filteredProducts = Products.filter((product)=>{
    return product.title.toLowerCase().includes(filterText);
});
     const result = filteredProducts.map ((product)=>{
        return `
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

    }).join('');
    document.querySelector(".productsContent").innerHTML=result;
})
/* Search end */



 /* Sort */
const sortSelect = document.querySelector(".sort-select");

sortSelect.addEventListener("change", ()=>{
    const selected = sortSelect.value; 
    let sortedProducts = Array.from(Products); 

    if(selected === "title-asc"){
        sortedProducts.sort((a,b)=> a.title.localeCompare(b.title));
    }
    else if(selected === "title-desc"){
        sortedProducts.sort((a,b)=> b.title.localeCompare(a.title));
    }
    else if(selected === "price-asc"){
        sortedProducts.sort((a,b)=> a.price - b.price);
    }
    else if(selected === "price-desc"){
        sortedProducts.sort((a,b)=> b.price - a.price);
    }

    const result = sortedProducts.map(product=>`
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
    `).join(' ');

    document.querySelector(".productsContent").innerHTML=result;
});
/* Sort end */


/* Create New Product */ 
const createProdBtn=document.querySelector(".add-new-btn");
const createNewProdModal=document.querySelector(".createNewProdModal");
const closeBtn=document.querySelectorAll(".close_btn");
const CloseBtn=document.querySelectorAll(".close-btn");
const uploadBtn=document.querySelectorAll(".upload-btn");
const saveBtn=document.querySelector(".save-btn");

let modalFlag=false;

const hideModal=()=>{
    createNewProdModal.classList.remove('show');
    modalFlag=false;
}
const showModal=()=>{
    createNewProdModal.classList.add('show');
    modalFlag=true;
}
createProdBtn.addEventListener("click", showModal);
closeBtn[0].addEventListener("click", hideModal);
CloseBtn[0].addEventListener("click", hideModal);
uploadBtn[0].addEventListener("click", hideModal);

/* closing by Keyboard */
document.addEventListener("keydown", ({code})=>{
        if (code == 'Escape'){
            hideModal();
        }
    })
/* Closing by clicking anywhere */
document.addEventListener("click", function(e){
    if(modalFlag == true){
        const modalContent = document.querySelector(".modal-content");
        if(e.target === createNewProdModal && !modalContent.contains(e.target)){
            hideModal();
        }      
    }
});
/* Calling API */
saveBtn.addEventListener("click", async () => {
  const title = document.querySelector(".prodTitle").value;
  const price = Number(document.querySelector(".prodPrice").value);
  const stock = Number(document.querySelector(".prodStock").value);
  const category = document.querySelector(".prodCategory").value;
  const description = document.querySelector(".prodDescription").value;

  const files = document.querySelector(".prodImages").files;
  const images = Array.from(files).map(file => URL.createObjectURL(file)); 

  try {
    const response = await axios.post('https://dummyjson.com/products/add', {
      title,
      description,
      price,
      stock,
      category,
      images
    });

    console.log("Product added:", response.data);
    alert("Product added successfully!");
    hideModal();
  } catch (error) {
    console.error("Error adding product:", error);
  }
});
/* Create New Product */

/* Delete Product */
const deleteBtn=document.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", async()=>{
    try {
    const response = await axios.delete(`https://dummyjson.com/products/${id}`);
    console.log("Product Deleted:", response.data);
    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
})
/* Delete Product */
