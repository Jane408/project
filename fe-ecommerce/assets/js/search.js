document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      performSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
      }
    });
  }
});

async function performSearch() {
  const searchTerm = document.getElementById("search-input").value;
  const totalItemsElement = document.getElementById("totalItems");
  if (!searchTerm) {
    alert("Vui lòng nhập từ khóa tìm kiếm.");
    return;
  }
  try {
    const response = await axios.get(
      `http://localhost:8080/search?name=${encodeURIComponent(searchTerm)}`
    );
    const products = response.data;
    if (products.length === 0) {
      totalItemsElement.innerHTML = "Không tìm thấy sản phẩm nào.";
    } else {
      totalItemsElement.innerHTML = `Tìm thấy <span>${products.length}</span> sản phẩm!`;
    }

    //console.log("Products received: ", products); // In dữ liệu ra console
    renderDisplaySearchResults(products);
  } catch (error) {
    console.error("Có lỗi xảy ra khi tìm kiếm sản phẩm:", error);
  }
}

function renderDisplaySearchResults(products) {
  const resultsContainer = document.getElementsByClassName(
    "products__container"
  )[0];

  console.log("resultsContainer: ", resultsContainer);
  resultsContainer.innerHTML = "";

  products.forEach(product => {
    const formattedPrice =
      product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";

    let validPromotions = product.promotionProductDtos.filter(
      promotion => promotion.discountPercentage > 0
    );
    let randomDiscount =
      validPromotions.length > 0
        ? validPromotions[Math.floor(Math.random() * validPromotions.length)]
            .discountPercentage
        : "";
    let newPrice = product.price * (1 - randomDiscount / 100);

    const formattedNewPrice =
      newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    resultsContainer.innerHTML += `
        <div class="product__item">
          <div class="product__banner">
            <a href="details.html" class="product__images">
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
            <div class="product__actions">
              <a href="#" class="action__btn" aria-label="Quick View">
                <i class="fi fi-rs-eye"></i>
              </a>
              <a href="#" class="action__btn" aria-label="Add to Wishlist">
                <i class="fi fi-rs-heart"></i>
              </a>
              <a href="#" class="action__btn" aria-label="Compare">
                <i class="fi fi-rs-shuffle"></i>
              </a>
            </div>
            <div class="product__badge light-blue">-${randomDiscount}%</div>
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
              <span class="new__price">${formattedNewPrice}</span>
              <span class="old__price">${formattedPrice}</span>
            </div>
            <a
              href="#"
              class="action__btn cart__btn"
              aria-label="Add To Cart"
            >
              <i class="fi fi-rs-shopping-bag-add"></i>
            </a>
          </div>
        </div>
      `;
  });
}
