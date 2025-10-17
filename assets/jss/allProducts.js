let Products = [];

const getAllProducts = async (page=1) => {
  try {
    const skip= (page-1)*15; 
    const response= await axios.get(`https://dummyjson.com/products?limit=15&skip=${skip}`);
    if(response.status==200)
        return response;
    else
        console.error("Unexpected status:", response.status);
  } catch (error) {
    console.error("Error finding products:", error);
    return null;
  }
}
getAllProducts();

const displayProducts=async(page=1)=>{
  try {
    const response= await getAllProducts(page);
    if (!response) return;
    Products = response.data.products;
    const numberOfPages= Math.ceil(response.data.total / 15);

    let result = "";
    try {
      result= response.data.products.map(product=>`
       <div class="card -d-flex flex-column" style="width: 18rem;">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title subColor3 subFont">${product.title}</h5>
            <div class='d-flex gap-5 subFont1'>
              <span class='flex-grow-1'>${product.price}$</span>
              <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${product.rating}</span>
            </div>
            <div class="cartBtn-heartBtn d-flex gap-2 mt-3 subFont">
              <button class='btn bg-subColor1'><i class="fa-solid fa-heart fa-lg" style="color: #920001;"></i></button>
              <button class='btn bg-subColor1 subColor3 flex-grow-1'><i class="fa-solid fa-cart-shopping fa-lg" style="color: #920001;"></i> Add to Cart</button>
            </div>
            <a href="./prodDetails.html?prodID=${product.id}" class="btn prodBtn w-100 mt-2 subColor1 bg-mainColor subFont" target="_blank">Details</a>
          </div>
        </div>
      `).join(' ');
    } catch(mapError){
      console.error("Error rendering product cards:", mapError);
    }

    const container = document.querySelector(".productsContent");
    if (container) container.innerHTML=result;

    // pagination
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

    const pagination = document.querySelector(".pagination");
    if (pagination) pagination.innerHTML=paginationLink;

  } catch (error) {
    console.error("Error displaying products:", error);
  }
} 
displayProducts();

/* Search */
try {
  const searchInput = document.querySelector(".search-input");
  if(searchInput){
    searchInput.addEventListener("input", ()=>{
      const filterText= searchInput.value.toLowerCase();
      const filteredProducts = Products.filter((product)=> product.title.toLowerCase().includes(filterText));
      const result = filteredProducts.map(product=>`
        <div class="card -d-flex flex-column" style="width: 18rem;">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title subColor3 subFont">${product.title}</h5>
            <div class='d-flex gap-5 subFont1'>
              <span class='flex-grow-1'>${product.price}$</span>
              <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${product.rating}</span>
            </div>
          </div>
        </div>
      `).join('');
      const container = document.querySelector(".productsContent");
      if (container) container.innerHTML=result;
    })
  }
} catch(err){
  console.error("Error in search input:", err);
}

/* nav search */
try {
  const navSearchInput = document.querySelector(".navSearchInput");
  if(navSearchInput){
    navSearchInput.addEventListener("input", ()=>{
      const filterText= navSearchInput.value.toLowerCase();
      const filteredProducts = Products.filter((product)=> product.title.toLowerCase().includes(filterText));
      const result = filteredProducts.map(product=>`
        <div class="card -d-flex flex-column" style="width: 18rem;">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title subColor3 subFont">${product.title}</h5>
          </div>
        </div>
      `).join('');
      const container = document.querySelector(".productsContent");
      if (container) container.innerHTML=result;
    })
  }
}catch(err){
  console.error("Error in nav search:", err);
}
/* Search end */


/* Sort */
try {
  const sortSelect = document.querySelector(".sort-select");
  if(sortSelect){
    sortSelect.addEventListener("change", ()=>{
      const selected = sortSelect.value; 
      let sortedProducts = Array.from(Products); 
      if(selected === "title-asc") sortedProducts.sort((a,b)=> a.title.localeCompare(b.title));
      else if(selected === "title-desc") sortedProducts.sort((a,b)=> b.title.localeCompare(a.title));
      else if(selected === "price-asc") sortedProducts.sort((a,b)=> a.price - b.price);
      else if(selected === "price-desc") sortedProducts.sort((a,b)=> b.price - a.price);

      const result = sortedProducts.map(product=>`
        <div class="col-md-3 my-3">
          <div class="card -d-flex flex-column" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title subColor2 textShadow">${product.title}</h5>
              <span>${product.price}$</span>
            </div>
          </div>
        </div>
      `).join(' ');
      const container = document.querySelector(".productsContent");
      if (container) container.innerHTML=result;
    });
  }
}catch(err){
  console.error("Error in sort:", err);
}
/* Sort end */


/* Create New Product */ 
try {
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
  if(createProdBtn) createProdBtn.addEventListener("click", showModal);
  if(closeBtn[0]) closeBtn[0].addEventListener("click", hideModal);
  if(CloseBtn[0]) CloseBtn[0].addEventListener("click", hideModal);
  if(uploadBtn[0]) uploadBtn[0].addEventListener("click", hideModal);

  document.addEventListener("keydown", ({code})=>{
    if (code == 'Escape'){ hideModal(); }
  });
  document.addEventListener("click", function(e){
    if(modalFlag){
      const modalContent = document.querySelector(".modal-content");
      if(e.target === createNewProdModal && !modalContent.contains(e.target)){
        hideModal();
      }      
    }
  });

  if(saveBtn){
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
          title, description, price, stock, category, images
        });
        console.log("Product added:", response.data);
        alert("Product added successfully!");
        hideModal();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    });
  }
}catch(err){
  console.error("Error in create product modal:", err);
}
/* Create New Product */


/* Delete Product */
try {
  const deleteBtn=document.querySelector(".deleteBtn");
  if(deleteBtn){
    deleteBtn.addEventListener("click", async()=>{
      try {
        // لازم تحددي الـ id 
        const id = 1; 
        const response = await axios.delete(`https://dummyjson.com/products/${id}`);
        console.log("Product Deleted:", response.data);
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    })
  }
}catch(err){
  console.error("Error setting delete btn:", err);
}
/* Delete Product */


/* Nav Btns */
try {
  const navSearchBtn=document.querySelector(".fa-magnifying-glass");
  const navSearchInput = document.querySelector(".navSearchInput");
  if(navSearchBtn && navSearchInput){
    navSearchBtn.addEventListener("click", ()=>{
      navSearchInput.classList.remove('d-none');
    })
  }
}catch(err){
  console.error("Error with nav buttons:", err);
}
/* Nav Btns */
