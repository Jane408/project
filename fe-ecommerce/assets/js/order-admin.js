// 1. Các hàm hỗ trợ
function formatPrice(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// 2. Các hàm xử lý DOM (Sự kiện, Modal, Search)
document
  .getElementById("searchInputOrder")
  .addEventListener("input", filterOrders);

// 3. Các hàm xử lý dữ liệu sản phẩm (Load, Display, Filter)
let orders = [];

function loadOrders() {
  axios
    .get("http://localhost:8080/invoices")
    .then(response => {
      orders = response.data;
      console.log(orders);
      displayOrders(orders);
    })
    .catch(error => {
      console.error("Error loading orders:", error);
      document.getElementById("orderTable").innerHTML =
        "<tr><td colspan='6'>Không thể tải dữ liệu</td></tr>";
    });
}

function displayOrders(ordersList) {
  const tableContent = document.getElementById("orderTable");
  tableContent.innerHTML = "";

  ordersList.forEach(order => {
    const row = document.createElement("tr");

    row.appendChild(createCell(order.id));
    row.appendChild(createCell(order.fullName));
    row.appendChild(createCell(formatPrice(order.totalAmount)));
    row.appendChild(createCell(order.orderDate));
    row.appendChild(createCell(order.status));
    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `
        <i class="fa fa-edit" onclick="editOrder(${order.id}, this)" style="cursor: pointer; color: #007bff;"></i>
      `;
    row.appendChild(actionsCell);
    tableContent.appendChild(row);
  });
}

function filterOrders() {
  const searchValue = document
    .getElementById("searchInputOrder")
    .value.toLowerCase();

  const filteredOrders = orders.filter(order => {
    return (
      order.fullName.toLowerCase().includes(searchValue) ||
      order.status.toLowerCase().includes(searchValue)
    );
  });

  displayOrders(filteredOrders);
}

let currentEditingRow = null;

function editOrder(orderId, iconElement) {
  const row = iconElement.closest("tr");

  if (currentEditingRow && currentEditingRow !== row) {
    restoreRowState(currentEditingRow);
  }

  const statusCell = row.querySelector("td:nth-child(5)");

  const statusSelect = document.createElement("select");
  const statuses = ["Chờ xử lý", "Đã giao hàng", "Đã hoàn thành", "Hủy đơn"];

  statuses.forEach(status => {
    const option = document.createElement("option");
    option.value = status;
    option.text = status;
    if (status === statusCell.textContent.trim()) {
      option.selected = true;
    }
    statusSelect.appendChild(option);
  });

  row.originalStatus = statusCell.textContent.trim();
  statusCell.innerHTML = "";
  statusCell.appendChild(statusSelect);

  const actionsCell = row.querySelector("td:nth-child(6)");
  actionsCell.innerHTML = `
    <i class="fa fa-save" onclick="saveOrder(${orderId}, this)" style="cursor: pointer; color: #28a745;"></i>
    <i class="fa fa-times" onclick="cancelEditOrder(this)" style="cursor: pointer; color: #dc3545; margin-left: 10px;"></i>
  `;

  currentEditingRow = row;
}

function saveOrder(orderId, buttonElement) {
  const row = buttonElement.closest("tr");
  const statusCell = row.querySelector("td:nth-child(5)");
  const newStatus = statusCell.querySelector("select").value;

  updateOrderStatus(orderId, newStatus);

  statusCell.textContent = newStatus;

  const actionsCell = row.querySelector("td:nth-child(6)");
  actionsCell.innerHTML = `
    <i class="fa fa-edit" onclick="editOrder(${orderId}, this)" style="cursor: pointer; color: #007bff;"></i>
  `;

  currentEditingRow = null;
}

function cancelEditOrder(buttonElement) {
  const row = buttonElement.closest("tr");
  if (row) {
    restoreRowState(row);
  }

  currentEditingRow = null;
}

function restoreRowState(row) {
  const statusCell = row.querySelector("td:nth-child(5)");

  statusCell.textContent = row.originalStatus;

  const actionsCell = row.querySelector("td:nth-child(6)");
  actionsCell.innerHTML = `
    <i class="fa fa-edit" onclick="editOrder(${row.cells[0].textContent}, this)" style="cursor: pointer; color: #007bff;"></i>
  `;
}

function updateOrderStatus(orderId, newStatus) {
  axios
    .put(`http://localhost:8080/invoices/${orderId}`, { status: newStatus })
    .then(response => {
      const successMessage = document.getElementById("success-message-order");
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
    })
    .catch(error => {
      console.error("Error updating order status:", error);
    });
}
