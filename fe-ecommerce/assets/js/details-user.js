// 1. Các hàm xử lý DOM (Sự kiện, Modal, Search)
document.addEventListener("DOMContentLoaded", function () {
  const productId = getProductIdFromURL();
  console.log("Product ID:", productId);
  if (productId) {
    fetchProductDetails(productId);
  } else {
    alert("Không tìm thấy sản phẩm!");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const quantityDetails = document.querySelector(".quantity-details");
  quantityDetails.style.display = "none";
});

document.querySelectorAll(".btn--sm").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng.");
      window.location.href = "/login";
      return;
    }

    const selectedSizeAndQuantity = JSON.parse(
      localStorage.getItem("selectedSizeAndQuantity")
    );

    // Kiểm tra xem có dữ liệu hay không
    if (!selectedSizeAndQuantity || selectedSizeAndQuantity.length === 0) {
      alert("Vui lòng chọn kích thước và số lượng!");
      return;
    }

    const selectedSize = document
      .querySelector(".size-active")
      .textContent.trim(); // Giả sử bạn chọn kích thước qua giao diện
    const selectedItem = selectedSizeAndQuantity.find(
      item => item.size === selectedSize
    );

    if (selectedItem) {
      const updatedQuantity = selectedItem.quantity; // Lấy quantity của size đã chọn
      console.log(updatedQuantity); // Kiểm tra xem quantity có đúng không
      handleAddToCart(e, updatedQuantity);
    } else {
      alert("Kích thước bạn chọn không hợp lệ!");
    }
  });
});

// 2. Các hàm xử lý dữ liệu sản phẩm
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
    localStorage.setItem("productIdDetails", response.data.id);
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
        <a href="#" class="size__link" onclick="selectSize(this, '${inventory.sizeName}', ${inventory.quantity},${productId})">${inventory.sizeName}</a>
      </li>`;
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert("Error fetching product details!");
  }
}

function selectSize(element, size, quantity, productId) {
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
  quantityInput.value = 1; // Đặt giá trị mặc định cho quantityInput
  quantityInput.setAttribute("max", quantity); // Thiết lập giới hạn max cho input

  // Kiểm tra và lấy dữ liệu cũ từ localStorage

  // Kiểm tra và lấy dữ liệu cũ từ localStorage
  let existingData = JSON.parse(
    localStorage.getItem("selectedSizeAndQuantity")
  );

  // Nếu không có dữ liệu cũ, khởi tạo mảng rỗng
  if (!Array.isArray(existingData)) {
    existingData = [];
  }

  // Tạo đối tượng dữ liệu mới, bao gồm cả productId
  const newData = {
    productId: productId, // Đảm bảo productId được lưu vào đây
    size: size,
    quantity: parseInt(quantityInput.value),
    maxQuantity: quantity,
  };

  // Kiểm tra xem có dữ liệu cũ cho cùng productId và size không
  const existingSizeIndex = existingData.findIndex(
    item => item.productId === productId && item.size === size
  );

  if (existingSizeIndex !== -1) {
    // Nếu đã có dữ liệu cũ cho productId và size, cập nhật số lượng
    existingData[existingSizeIndex].quantity = newData.quantity;
  } else {
    // Nếu chưa có, thêm mới vào mảng
    existingData.push(newData);
  }

  // Lọc và loại bỏ các đối tượng không có productId
  existingData = existingData.filter(item => item.productId !== undefined);

  // Lưu lại dữ liệu vào localStorage mà không làm mất dữ liệu cũ
  localStorage.setItem("selectedSizeAndQuantity", JSON.stringify(existingData));

  // In lại dữ liệu trong localStorage để kiểm tra
  console.log(
    "Dữ liệu lưu vào localStorage:",
    JSON.parse(localStorage.getItem("selectedSizeAndQuantity"))
  );
  // Xử lý sự kiện thay đổi số lượng
  quantityInput.oninput = function () {
    const updatedQuantity = Math.min(quantityInput.value, quantity);
    quantityInput.value = updatedQuantity;
    console.log(updatedQuantity);
    const updatedSizeAndQuantity = {
      productId: productId,
      size: size,
      quantity: updatedQuantity,
      maxQuantity: quantity,
    };
    console.log(updatedSizeAndQuantity);

    // Lưu lại dữ liệu vào localStorage
    const updatedSizeIndex = existingData.findIndex(item => item.size === size);
    if (updatedSizeIndex !== -1) {
      existingData[updatedSizeIndex].quantity = updatedQuantity;
      localStorage.setItem(
        "selectedSizeAndQuantity",
        JSON.stringify(existingData)
      );
    } else {
      // Nếu không có, cần thêm vào mảng
      existingData.push(updatedSizeAndQuantity);
      localStorage.setItem(
        "selectedSizeAndQuantity",
        JSON.stringify(existingData)
      );
    }
    console.log(localStorage.getItem("selectedSizeAndQuantity"));
    checkQuantity(quantity);
  };
}

function checkQuantity(maxQuantity) {
  const quantityInput = document.getElementById("quantity-input");

  if (parseInt(quantityInput.value) > maxQuantity) {
    quantityInput.value = maxQuantity;
  }
}
