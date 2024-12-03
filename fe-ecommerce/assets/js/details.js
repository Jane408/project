function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  console.log("URL Params:", urlParams.toString());
  console.log("Product ID từ URL:", productId);

  return productId ? Number(productId) : null;
}

async function fetchProductDetails(productId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/products/${productId}`
    );

    const product = response.data;
    const image = document.getElementById("images-big");
    image.innerHTML = "";
    image.innerHTML += `
            <img
              src="./assets/img/product-${product.id}-1.jpg"
              alt=""
              class="details__img"
              
            />
    `;
    document.getElementById("product-name").innerText = product.name;
    const formattedPrice =
      product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
    document.getElementById("old-price").innerText = `Giá ${formattedPrice}`;
    let storedPromotion = JSON.parse(
      localStorage.getItem(`promotion_${product.id}`)
    );
    if (storedPromotion !== null && storedPromotion > 0) {
      product.discountPercentage = storedPromotion;

      let newPrice = product.price * (1 - product.discountPercentage / 100);
      const formattedNewPrice =
        newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";

      document.getElementById(
        "new-price"
      ).innerText = `Giá ${formattedNewPrice}`;

      document.getElementById(
        "promotion"
      ).innerText = `${product.discountPercentage}%`;

      document.querySelector(".old__price").innerText = `${product.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
      document.querySelector(".old__price").style.textDecoration =
        "line-through";
    } else {
      document.getElementById("promotion").innerText = "";
      document.querySelector(".old__price").style.display = "block";
      document.querySelector(".old__price").style.display = "none";
      document.getElementById("new-price").innerText = `Giá ${product.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`;
    }
    const sizeList = document.getElementById("size-list");
    sizeList.innerHTML = "";
    product.inventoryDtos.forEach(inventory => {
      sizeList.innerHTML += `
                  <li>
      <a href="#" class="size__link" onclick="selectSize(this, '${inventory.sizeName}', ${inventory.quantity})">${inventory.sizeName}</a>
    </li>`;
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert("Error fetching product details!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const productId = getProductIdFromURL();
  console.log("Product ID:", productId);
  if (productId) {
    fetchProductDetails(productId);
  } else {
    alert("Không tìm thấy sản phẩm!");
  }
});

function selectSize(element, size, quantity) {
  const sizeLinks = document.querySelectorAll(".size__link");
  sizeLinks.forEach(function (link) {
    link.classList.remove("size-active");
  });
  element.classList.add("size-active");
  const quantityDetails = document.querySelector(".quantity-details");
  const quantityText = document.querySelector(".quantity-details span");
  quantityText.textContent = quantity;
  quantityDetails.style.display = "block";

  const quantityInput = document.getElementById("quantity-input");
  quantityInput.value = 1;
  quantityInput.setAttribute("max", quantity);
  quantityInput.oninput = function () {
    checkQuantity(quantity);
  };
}

function checkQuantity(maxQuantity) {
  const quantityInput = document.getElementById("quantity-input");

  if (parseInt(quantityInput.value) > maxQuantity) {
    quantityInput.value = maxQuantity;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const quantityDetails = document.querySelector(".quantity-details");
  quantityDetails.style.display = "none";
});

document.querySelector(".btn--sm").addEventListener("click", function (e) {
  e.preventDefault();

  const token = localStorage.getItem("auth-token");
  if (!token) {
    window.location.href = "/login-register.html";
    return;
  }

  addToCart();
});
