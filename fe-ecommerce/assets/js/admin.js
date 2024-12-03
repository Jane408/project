// 1. Các hàm hỗ trợ
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

// 2. Các hàm xử lý DOM
window.addEventListener("load", () => {
  const homeMenu = document.getElementById("homeMenu");
  showTab("home", homeMenu);
  loadDashboardData();
  loadOrders();
  loadProducts();
  loadCustomers();
  loadInventory();
});

const sidebarMenuItems = document.querySelectorAll(".sidebar .nav-link");
sidebarMenuItems.forEach(item => {
  item.addEventListener("click", event => {
    const tabId = item.getAttribute("data-tab");
    const menuItem = item.closest(".nav-item");

    if (!menuItem.classList.contains("active")) {
      showTab(tabId, menuItem);
    }
    event.preventDefault();
  });
});

// 3. Các hàm API và xử lý dữ liệu
function showTab(tabId, menuItem) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.style.display = "none";
  });
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }
  const menuItems = document.querySelectorAll(".nav-item");
  menuItems.forEach(item => {
    item.classList.remove("active");
  });
  menuItem.classList.add("active");
}

function loadDashboardData() {
  axios
    .get("http://localhost:8080/invoices/summary")
    .then(response => {
      document.getElementById("totalRevenue").innerText = formatPrice(
        response.data.revenue
      );
      document.getElementById("totalOrders").innerText =
        response.data.invoiceTotal;
    })
    .catch(error => {
      console.error("Lỗi khi tải tổng doanh thu và hóa đơn:", error);
    });

  axios
    .get("http://localhost:8080/customers/summary")
    .then(response => {
      document.getElementById("totalCustomers").innerText =
        response.data.totalCustomers;
    })
    .catch(error => {
      console.error("Lỗi khi tải tổng số khách hàng:", error);
    });
}

function goHome(event) {
  event.preventDefault();
  window.location.href = "index-admin.html";
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
