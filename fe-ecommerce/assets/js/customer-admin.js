// 1. Các hàm hỗ trợ
function searchCustomers() {
  const searchValue = document
    .getElementById("searchInputCustomer")
    .value.toLowerCase();

  const regex = new RegExp(searchValue, "i");

  const filteredCustomers = customers.filter(customer =>
    regex.test(customer.fullName)
  );

  displayCustomers(filteredCustomers);
}

// 2. Hàm xử lý DOM
document
  .getElementById("searchInputCustomer")
  .addEventListener("input", searchCustomers);

// 3. Các hàm xử lý dữ liệu sản phẩm
let customers = [];

function loadCustomers() {
  axios
    .get("http://localhost:8080/customers")
    .then(response => {
      customers = response.data;
      displayCustomers(customers);
    })
    .catch(error => {
      console.error("Đã xảy ra lỗi khi tải dữ liệu khách hàng:", error);
      document.getElementById("customerTable").innerHTML =
        "<tr><td colspan='6'>Không thể tải dữ liệu</td></tr>";
    });
}

function displayCustomers(customersToDisplay) {
  const customerTable = document.getElementById("customerTable");
  customerTable.innerHTML = "";
  customersToDisplay.forEach(customer => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.fullName}</td>
      <td>${customer.phoneNumber}</td>
      <td>${customer.address}</td>
      <td>${customer.userName}</td>
      <td>${customer.password}</td>
    `;

    customerTable.appendChild(row);
  });
}
