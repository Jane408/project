const cartId = localStorage.getItem("cartId");
document.addEventListener("DOMContentLoaded", function () {
  console.log(cartId);
  if (cartId) {
    axios
      .get(`http://localhost:8080/carts/${cartId}`)
      .then(response => {
        const cartDetails = response.data.cartDetailsDtos;
        console.log(cartDetails);
        renderCartItems(cartDetails);
      })
      .catch(error => console.error("Lỗi khi lấy thông tin giỏ hàng", error));
  }
});

document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    window.location.href = "shop-user.html";
  });

document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);

function placeOrder(event) {
  const customerId = localStorage.getItem("customerId");
  console.log(customerId);
  event.preventDefault();
  const cartId = localStorage.getItem("cartId");

  if (!cartId) {
    alert("Giỏ hàng trống!");
    return;
  }

  const cartItems = [];
  const tableBody = document.getElementById("cartTableBody").children;

  for (let row of tableBody) {
    const productId = row
      .querySelector(".quantity")
      .getAttribute("data-product-id");
    const quantity = parseInt(row.querySelector(".quantity").value);
    const price = parseFloat(
      row.querySelector(".table__price").textContent.replace(/[^0-9]/g, "")
    );
    const totalPrice = parseInt(price) * parseInt(quantity);
    const size = row.querySelector(".table__size").textContent;

    cartItems.push({
      productId: productId,
      quantity: quantity,
      totalPrice: totalPrice,
      sizeName: size,
    });
  }
  console.log(cartItems);

  const orderData = {
    customerId: customerId,
    invoiceDetailsRequestDtos: cartItems,
  };

  axios
    .post("http://localhost:8080/invoice/creates", orderData)
    .then(() => {
      const successMessage = document.getElementById("success-message-invoice");
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
      axios
        .delete(`http://localhost:8080/cart/${cartId}`)
        .then(() => {
          document.getElementById("placeOrderBtn").style.display = "none";
          const cartTableBody = document.getElementById("cartTableBody");
          cartTableBody.innerHTML = "";
        })
        .catch(error => {
          console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng", error);
        });
    })
    .catch(error => {
      console.error("Lỗi khi đặt hàng", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
    });
}

function renderCartItems(cartItems) {
  const tableBody = document.getElementById("cartTableBody");
  console.log(tableBody);

  tableBody.innerHTML = "";

  // Lấy dữ liệu size và quantity từ localStorage
  const updatedSizeAndQuantity = JSON.parse(
    localStorage.getItem("selectedSizeAndQuantity")
  );
  console.log(updatedSizeAndQuantity); // Kiểm tra dữ liệu

  if (updatedSizeAndQuantity && updatedSizeAndQuantity.length > 0) {
    cartItems.forEach(item => {
      // Lấy thông tin size và maxQuantity tương ứng cho mỗi sản phẩm
      const sizeData = updatedSizeAndQuantity.find(
        data => data.productId === item.productId
      );
      const sizeUpdate = sizeData ? sizeData.size : "N/A"; // Default nếu không tìm thấy
      const maxQuantityForSize = sizeData ? sizeData.maxQuantity : 0; // Default nếu không tìm thấy

      let storedPromotion = JSON.parse(
        localStorage.getItem(`promotion_${item.productId}`)
      );
      storedPromotion = storedPromotion ? storedPromotion : 0;
      const discountedPrice = item.productPrice * (1 - storedPromotion / 100);
      const productPrice = discountedPrice;
      const totalPrice = discountedPrice * item.productQuantity;
      const productPriceFormatted = formatPrice(productPrice);
      const totalPriceFormatted = formatPrice(totalPrice);

      const row = `
        <tr >
          <td>
            <img src="/assets/img/product-${item.productId}-1.jpg" alt="" class="table__img" />
          </td>
          <td>
            <h3 class="table__title">${item.productName}</h3>
          </td>
          <td>
            <span class="table__size">${sizeUpdate}</span>
          </td>
          <td>
            <span class="table__price">${productPriceFormatted} </span>
          </td>
          
          <td>
            <input type="number" value="${item.productQuantity}" class="quantity" data-product-id="${item.productId}" min="1" max="${maxQuantityForSize}"/>
          </td>
          <td>
            <span class="subtotal">${totalPriceFormatted}</span>
          </td>
          <td>
            <i class="fi fi-rs-trash table__trash" data-cart-details-id="${item.id}" style="cursor: pointer"></i>
          </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  } else {
    console.log("Không có dữ liệu selectedSizeAndQuantity trong localStorage");
  }

  const quantityInputs = document.querySelectorAll(".quantity");
  quantityInputs.forEach(input => {
    input.addEventListener("input", handleQuantityChange);
  });

  const deleteButtons = document.querySelectorAll(".table__trash");
  deleteButtons.forEach(button => {
    button.addEventListener("click", handleDeleteItem);
  });
}

function handleQuantityChange(event) {
  const row = event.target.closest("tr");
  const priceElement = row.querySelector(".table__price");
  const quantity = parseInt(event.target.value);
  const price = parseFloat(priceElement.textContent.replace(/[^0-9]/g, ""));

  const totalPrice = price * quantity;
  row.querySelector(".subtotal").textContent = formatPrice(totalPrice);
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}

function handleDeleteItem(event) {
  event.preventDefault();

  const isConfirmed = confirm("Bạn có chắc muốn xóa mục này không?");
  if (!isConfirmed) {
    return;
  }

  const trashIcon = event.target;

  const cartDetailsId = trashIcon.getAttribute("data-cart-details-id");
  console.log(cartDetailsId);

  if (!cartDetailsId) {
    alert("Không tìm thấy ID chi tiết giỏ hàng.");
    return;
  }

  axios
    .delete(`http://localhost:8080/cart/${cartId}/${cartDetailsId}`)
    .then(response => {
      if (response.status === 200) {
        trashIcon.closest("tr").remove();
        const tableBody = document.getElementById("cartTableBody");
        if (tableBody.children.length === 0) {
          document.getElementById("empty-cart-message").style.display = "block";
          document.getElementById("placeOrderBtn").style.display = "none";
        }
        const successMessage = document.getElementById(
          "success-message-cartdetails"
        );
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 2000);
      } else {
        alert("Xóa thất bại.");
      }
    })
    .catch(error => {
      console.error("Đã xảy ra lỗi:", error);
      alert("Đã xảy ra lỗi khi xóa.");
    });
}
