const getCategory = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (!category) {
      console.warn("No category found in URL");
      return null;
    }

    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    if (response.status === 200) {
      return response;
    } else {
      console.error("Unexpected response status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error finding category products:", error);
    return null;
  }
};

const displayCategory = async () => {
  try {
    const response = await getCategory(); 
    if (!response) return;

    let result = "";
    try {
      result = response.data.products.map(product => `
        <div class="col-md-3 my-3">
          <div class="card -d-flex flex-column" style="width: 18rem;">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title subColor2 textShadow">${product.title}</h5>
              <div class='d-flex gap-5'>
                <span class='flex-grow-1'>${product.price}$</span>
                <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${product.rating}</span>
              </div>
              <a href="./prodDetails.html?prodID=${product.id}" class="btn prodBtn w-100 mt-2 subColor1 bg-mainColor" target="_blank">Details</a>
            </div>
          </div>
        </div>
      `).join(" ");
    } catch (mapError) {
      console.error("Error while rendering category products:", mapError);
    }

    const container = document.querySelector(".categoryContent");
    if (container) {
      container.innerHTML = result;
    } else {
      console.warn("categoryContent element not found in DOM");
    }

  } catch (error) {
    console.error("Error in displayCategory:", error);
  }
};

displayCategory();

/* Nav Btns */
try {
  const navSearchBtn = document.querySelector(".fa-magnifying-glass");
  const navCartBtn = document.querySelector(".fa-cart-shopping");
  const navHeartBtn = document.querySelector(".fa-heart");
  const navUserBtn = document.querySelector(".fa-user");
  const offcanvasCart = document.querySelector(".offcanvasCart");
  const navSearchInput = document.querySelector(".navSearchInput");

  if (navSearchBtn && navSearchInput) {
    navSearchBtn.addEventListener("click", () => {
      navSearchInput.classList.remove("d-none");
    });
  } else {
    console.warn("Search button or input not found in DOM");
  }
} catch (navError) {
  console.error("Error initializing nav buttons:", navError);
}
/* Nav Btns */
