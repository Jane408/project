let currentPage = 0;
let pageSize = 6;
function fetchProducts(page) {
  const apiUrl = `http://localhost:8080/products/paged?page=${page}&size=${pageSize}`;
  axios
    .get(apiUrl)
    .then(response => {
      const data = response.data;
      updateTotalProducts(data.content.length);
      renderProducts(data.content);
      updatePagination(data);
    })
    .catch(error => {
      console.log("Error fetching products:", error);
    });
}

function updateTotalProducts(currentPageProductCount) {
  const totalProductsMessage = document.getElementById("totalItems");
  const noProductsMessage = document.getElementById("noProductsMessage");

  if (currentPageProductCount === 0) {
    totalProductsMessage.innerHTML = "";
    noProductsMessage.innerHTML = `Không tìm thấy sản phẩm`;
  } else {
    totalProductsMessage.innerHTML = `Tìm thấy <span>${currentPageProductCount}</span> sản phẩm!`;
    noProductsMessage.innerHTML = "";
  }
}

function renderProducts(products) {
  const productContainer = document.getElementsByClassName(
    "products__container"
  )[0];
  productContainer.innerHTML = "";
  products.forEach(product => {
    const formattedPrice =
      product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    let storedPromotion = JSON.parse(
      localStorage.getItem(`promotion_${product.id}`)
    );
    if (storedPromotion !== null && storedPromotion >= 0) {
      product.discountPercentage = storedPromotion;
    } else {
      const promotionProductDtos = product.promotionProductDtos;
      if (promotionProductDtos.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * promotionProductDtos.length
        );
        storedPromotion = promotionProductDtos[randomIndex].discountPercentage;
        product.discountPercentage = storedPromotion;

        localStorage.setItem(
          `promotion_${product.id}`,
          JSON.stringify(storedPromotion)
        );
      } else {
        product.discountPercentage = 0;
      }
    }
    let newPrice = product.price * (1 - product.discountPercentage / 100);

    const formattedNewPrice =
      newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    let priceHTML = "";
    if (product.discountPercentage > 0) {
      priceHTML = `
            <div class="product__price flex">
                <span class="new__price">${formattedNewPrice}</span>
                <span class="old__price" style="text-decoration: line-through;">${formattedPrice}</span>
            </div>
        `;
    } else {
      priceHTML = `
            <div class="product__price flex">
                <span class="new__price">${formattedPrice}</span>
            </div>
        `;
    }
    productContainer.innerHTML += `
      <div class="product__item">
        <div class="product__banner">
          <a href="details.html?id=${product.id}" class="product__images">
            <img
              src="assets/img/product-${product.id}-1.jpg"
              alt=""
              class="product__img default"
            />
            <img
              src="assets/img/product-${product.id}-2.jpg"
              alt=""
              class="product__img hover"
            />
          </a>
          
          ${
            product.discountPercentage > 0
              ? `<div class="product__badge light-blue">-${product.discountPercentage}%</div>`
              : ""
          }
        </div>
        <div class="product__content">
          <span class="product__category">${product.nameCategory}</span>
          <a href="details.html">
            <h3 class="product__title">${product.name}</h3>
          </a>
          <div class="product__rating">
            <i class="fi fi-rs-star"></i>
            <i class="fi fi-rs-star"></i>
            <i class="fi fi-rs-star"></i>
            <i class="fi fi-rs-star"></i>
            <i class="fi fi-rs-star"></i>
          </div>
          <div class="product__price flex">
            ${priceHTML}
          </div>
          
        </div>
      </div>
    `;
  });
}

function updatePagination(pageData) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("li");
  prevButton.innerHTML = `<a href="#" class="pagination__link icon"><i class="fi-rs-angle-double-small-left"></i></a>`;
  prevButton.onclick = () => {
    if (pageData.number > 0) {
      fetchProducts(pageData.number - 1);
    }
  };
  paginationContainer.appendChild(prevButton);

  for (let i = 0; i < pageData.totalPages; i++) {
    const pageButton = document.createElement("li");
    pageButton.innerHTML = `<a href="#" class="pagination__link ${
      pageData.number === i ? "active" : ""
    }">${i + 1}</a>`;
    pageButton.onclick = event => {
      event.preventDefault();
      fetchProducts(i);
    };
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("li");
  nextButton.innerHTML = `<a href="#" class="pagination__link icon"><i class="fi-rs-angle-double-small-right"></i></a>`;
  nextButton.onclick = () => {
    if (pageData.number < pageData.totalPages - 1) {
      fetchProducts(pageData.number + 1);
    }
  };
  paginationContainer.appendChild(nextButton);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts(currentPage);
});
