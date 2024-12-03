document.addEventListener("DOMContentLoaded", function () {
  const cartId = localStorage.getItem("cartId");
  console.log(cartId);
  if (cartId) {
    axios
      .get(`http://localhost:8080/carts/${cartId}`)
      .then(response => {
        const cartDetails = response.data.cartDetailsDtos;
        console.log(cartDetails);
        const totalQuantity = response.data.cartDetailsDtos.reduce(
          (acc, item) => acc + item.productQuantity,
          0
        );
        updateCartQuantity(totalQuantity);
        localStorage.setItem("totalQuantity", totalQuantity);
        localStorage.setItem("cartDetailsId", response.data.id);
      })
      .catch(error => console.error("Lỗi khi lấy thông tin giỏ hàng", error));
  } else {
    updateCartQuantity(null);
  }
});
function updateCartQuantity(totalQuantity) {
  const cartQuantityElement = document.getElementById("cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.textContent = totalQuantity;
  }
}

function handleAddToCart(event, quantityDetails) {
  event.preventDefault();
  console.log(quantityDetails);
  const cartId = localStorage.getItem("cartId");
  const productId = localStorage.getItem("productIdDetails");
  const quantity = quantityDetails;
  console.log("Request Data: ", { cartId, productId, quantity });

  axios
    .post("http://localhost:8080/cartdetails", {
      cartId: cartId,
      productId: productId,
      quantity: quantity,
    })
    .then(() => {
      updateCartQuantityImmediately(quantity);

      alert("Sản phẩm đã được thêm vào giỏ hàng");
    })
    .catch(error => {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng", error);
    });
}

function updateCartQuantityImmediately(addedQuantity) {
  const currentQuantity = parseInt(localStorage.getItem("totalQuantity")) || 0;
  const updatedQuantity = currentQuantity + addedQuantity;

  updateCartQuantity(updatedQuantity);

  localStorage.setItem("totalQuantity", updatedQuantity);
}
