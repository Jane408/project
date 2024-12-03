/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach(img => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach(tabsContent => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach(tab => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});

/*===============  LOAD CATEGORY PRODUCT =============*/
const categoryModule = (function () {
  function loadCategoryProduct() {
    axios
      .get("http://localhost:8080/categories")
      .then(response => {
        const categories = response.data;
        renderCategoryProduct(categories);
      })
      .catch(error => {
        console.error("Lỗi khi tải loại sản phẩm", error);
      });
  }

  function renderCategoryProduct(categories) {
    const categoryListDiV =
      document.getElementsByClassName("swiper-wrapper")[0];
    categoryListDiV.innerHTML = "";

    categories.forEach(category => {
      categoryListDiV.innerHTML += `
        <a  class="category__item swiper-slide">
              <img
                src="assets/img/category-${category.id}.jpg"
                alt=""
                class="category__img"
              />
              <h3 class="category__title">${category.name}</h3>
        </a>`;
    });
  }
  return { loadCategoryProduct: loadCategoryProduct };
})();

/*===============  LOAD PRODUCT =============*/
const productModule = (function () {
  function loadProducts() {
    axios
      .get("http://localhost:8080/products")
      .then(response => {
        const products = response.data;
        const limitedProducts = products.slice(0, 6);
        renderProducts(limitedProducts);
      })
      .catch(error => {
        console.error("Lỗi khi tải sản phẩm", error);
      });
  }

  function renderProducts(products) {
    const productListDiv = document.getElementsByClassName(
      "products__container"
    )[0];
    productListDiv.innerHTML = "";

    products.forEach(product => {
      const formattedPrice =
        product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";

      let storedPromotion = JSON.parse(
        localStorage.getItem(`promotion_${product.id}`)
      );
      if (storedPromotion) {
        product.discountPercentage = storedPromotion;
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
      productListDiv.innerHTML += `
        <div class="product__item">
          <div class="product__banner">
            <a href="details-user.html?id=${
              product.id
            }" class="product__images">
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
            <a href="details-user.html?id=${product.id}">
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
    const addToCartButtons = document.querySelectorAll(".cart__btn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", handleAddToCart);
    });
  }

  return { loadProducts: loadProducts };
})();

/*===============  LOAD NEW PRODUCT =============*/
const newProductModule = (function () {
  function loadNewProducts() {
    axios
      .get("http://localhost:8080/products")
      .then(response => {
        const products = response.data;
        const limitedProducts = products.slice(6, 13);
        rendernewProducts(limitedProducts);
      })
      .catch(error => {
        console.error("Lỗi khi tải sản phẩm", error);
      });
  }

  function rendernewProducts(products) {
    const productListDiv = document.getElementById("new-swiper-wrapper");
    productListDiv.innerHTML = "";

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
          storedPromotion =
            promotionProductDtos[randomIndex].discountPercentage;
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
      productListDiv.innerHTML += `
        <div class="product__item swiper-slide">
          <div class="product__banner">
            <a href="details-user.html?id=${
              product.id
            }" class="product__images" >
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
            <h3 class="product__title">${product.name}</h3>
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
  return { loadNewProducts: loadNewProducts };
})();

/*===============  GO TO PRODUCT DETAILS =============*/

newProductModule.loadNewProducts();
categoryModule.loadCategoryProduct();
productModule.loadProducts();
