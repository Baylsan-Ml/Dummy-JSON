const getAllProducts = async (page) => {
    const skip= (page-1)*15; 
    const response= await axios.get(`https://dummyjson.com/products?limit=15&skip=${skip}`);
    if(response.status==200)
        return response;
}
getAllProducts();

const displayProducts=async(page=1)=>{
    const response= await getAllProducts(page);
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