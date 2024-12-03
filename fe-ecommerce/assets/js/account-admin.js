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
  getAdmin();
});

// 2. Các hàm xử lý dữ liệu người dùng
function getAdmin() {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:8080/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      const dataAdmin = response.data;
      console.log(dataAdmin);
      if (dataAdmin) {
        displayAdminProfile(dataAdmin);
      } else {
        console.error("Không có thông tin!");
      }
    })
    .catch(error => {
      console.error("Có lỗi khi lấy dữ liệu:", error);
    });
}

function displayAdminProfile(admin) {
  document.getElementById("fullname").innerText = admin.fullName;
  document.getElementById("customer-name").innerText = admin.fullName;
  document.getElementById("customer-address").innerText = admin.address;
}
