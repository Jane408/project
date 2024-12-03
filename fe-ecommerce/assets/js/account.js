// 1. Các hàm xử lý DOM (Sự kiện, Modal, Search)
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".account__tab");
  const tabContents = document.querySelectorAll(".tab__content");
  const logoutButton = document.querySelector(".account__tab:last-child");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      tabContents.forEach(content => content.classList.remove("active-tab"));

      const targetId = tab.getAttribute("data-target");
      const targetContent = document.querySelector(targetId);
      if (targetContent) {
        targetContent.classList.add("active-tab");
      }

      tabs.forEach(tab => tab.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("token");

      window.location.href = "/index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  getCustomerAndOrders();
});

// 2. Các hàm xử lý dữ liệu người dùng
function getCustomerAndOrders() {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:8080/customer/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const customer = response.data;
      displayCustomerProfile(customer);
      axios
        .get("http://localhost:8080/invoice", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(orderResponse => {
          const orders = orderResponse.data;
          if (orders && orders.length > 0) {
            displayOrders(orders);
          } else {
            displayNoOrdersMessage();
          }
        })
        .catch(error => {
          console.error("Có lỗi khi lấy dữ liệu đơn hàng:", error);
        });
    })
    .catch(error => {
      console.error("Có lỗi khi lấy dữ liệu khách hàng:", error);
    });
}

function displayCustomerProfile(customer) {
  document.getElementById("fullname").innerText = customer.fullName;
  document.getElementById("customer-name").innerText = customer.fullName;
  document.getElementById("customer-address").innerText = customer.address;
}

function displayOrders(orders) {
  orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = "";
  let counter = 1;
  orders.forEach(order => {
    const formattedPrice =
      order.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      " VND";
    const orderTitleRow = document.createElement("tr");
    orderTitleRow.innerHTML = `
        <td colspan="4" style="font-weight: bold;">Đơn hàng #${counter}</td>
      `;
    ordersList.appendChild(orderTitleRow);

    const orderRow = document.createElement("tr");
    orderRow.innerHTML = `
        <td>Ngày đặt: ${new Date(order.orderDate).toLocaleDateString(
          "vi-VN"
        )}</td>
        <td>Tình trạng: ${order.status}</td>
        <td colspan="2">Tổng hóa đơn: ${formattedPrice}</td>
      `;
    ordersList.appendChild(orderRow);

    const detailRow = document.createElement("tr");
    const productDetails = order.invoiceDetailsDtos
      .map(
        item => `
  <tr>
    <td>${item.productName}</td>
    <td>${item.sizeName}</td>
    <td>${item.quantity}</td>
    <td>${
      item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
    }</td>
  </tr>
`
      )
      .join("");

    detailRow.innerHTML = `
  <td colspan="5">
    <table class="invoice-details">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Size</th>
          <th>Số lượng</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        ${productDetails}
      </tbody>
    </table>
  </td>
`;
    ordersList.appendChild(detailRow);
    counter++;
  });
}

function displayNoOrdersMessage() {
  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML =
    "<tr><td colspan='4'>Bạn chưa có đơn hàng nào.</td></tr>";
}
