// 1. Các hàm hỗ trợ
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// 2. Các hàm xử lý DOM (Sự kiện, Modal, Search)
document.addEventListener("DOMContentLoaded", function () {
  loadCategories();
  loadProducts();
});

document.querySelector("button").addEventListener("click", function () {
  document.getElementById("addProductForm").style.display = "flex";
});

document.getElementById("closeFormBtn").addEventListener("click", function () {
  document.getElementById("addProductForm").style.display = "none";
});

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const productAddDateInput = document.getElementById("productAddDate");
    productAddDateInput.value = currentDate;
    productAddDateInput.setAttribute("min", currentDate);

    const productName = document.getElementById("productName").value;
    const productPrice = parseFloat(
      document.getElementById("productPrice").value
    );
    const productCategory = document.getElementById("productCategory").value;
    const productSize = document.getElementById("productSize").value;
    const productQuantity = parseInt(
      document.getElementById("newQuantity").value
    );

    if (!productName) {
      alert("Tên sản phẩm không được để trống.");
      return;
    }

    if (isNaN(productPrice) || productPrice < 0) {
      alert("Giá sản phẩm không hợp lệ. Giá phải là một số và không được âm.");
      return;
    }

    if (isNaN(productQuantity) || productQuantity <= 0) {
      alert(
        "Số lượng sản phẩm không hợp lệ. Số lượng phải là một số và lớn hơn 0."
      );
      return;
    }

    const newProduct = {
      name: productName,
      addDate: currentDate,
      price: productPrice,
      category: { id: productCategory },
      inventoriesDtos: [
        {
          sizeName: productSize,
          quantity: productQuantity,
        },
      ],
    };

    axios
      .post("http://localhost:8080/products", newProduct)
      .then(() => {
        loadProducts();
        loadInventory();
        document.getElementById("addProductForm").style.display = "none";
        const successMessage = document.getElementById(
          "success-message-product"
        );
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 2000);
      })
      .catch(error => {
        console.error("Error adding product:", error);
      });
  });

document
  .getElementById("searchInputProduct")
  .addEventListener("input", filterProducts);

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", function () {
    if (productToDelete !== null) {
      axios
        .delete(`http://localhost:8080/products/${productToDelete}`)
        .then(() => {
          loadInventory();
          const row = document.querySelector(
            `#productTable tr[data-id='${productToDelete}']`
          );
          if (row) row.remove();

          const deleteModal = document.getElementById(
            "deleteConfirmationModal"
          );
          deleteModal.style.display = "none";
          productToDelete = null;
        })
        .catch(error => {
          console.error("Error deleting product:", error);
        });
    }
  });

document
  .getElementById("cancelDeleteBtn")
  .addEventListener("click", function () {
    const deleteModal = document.getElementById("deleteConfirmationModal");
    deleteModal.style.display = "none";
    productToDelete = null;
  });

// 3. Các hàm xử lý dữ liệu sản phẩm (Load, Display, Filter)
let products = [];

function loadProducts() {
  axios
    .get("http://localhost:8080/products")
    .then(response => {
      products = response.data;
      console.log(products);
      displayProducts(products);
      if (Array.isArray(products) && products.length > 0) {
        const sizeSet = new Set();

        products.forEach(product => {
          if (product.inventoryDtos && Array.isArray(product.inventoryDtos)) {
            product.inventoryDtos.forEach(size => {
              sizeSet.add(size.sizeName);
            });
          }
        });
        const sizeSelect = document.getElementById("productSize");
        sizeSelect.innerHTML = "";
        sizeSet.forEach(sizeName => {
          const option = document.createElement("option");
          option.value = sizeName;
          option.textContent = sizeName;
          sizeSelect.appendChild(option);
        });
      } else {
        console.error("Products is empty or not an array.");
      }
    })
    .catch(error => {
      console.error("Error loading products:", error);
      document.getElementById("productTable").innerHTML =
        "<tr><td colspan='6'>Không thể tải dữ liệu</td></tr>";
    });
}

let categories = [];
function loadCategories() {
  axios
    .get("http://localhost:8080/categories")
    .then(response => {
      const categorySelect = document.getElementById("productCategory");
      categories = response.data;
      response.data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error loading categories:", error);
    });
}

function displayProducts(productsList) {
  const tableContent = document.getElementById("productTable");
  tableContent.innerHTML = "";

  productsList.forEach(product => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", product.id);

    row.appendChild(createCell(product.id));
    row.appendChild(createCell(product.name));
    row.appendChild(createCell(formatPrice(product.price)));
    row.appendChild(createCell(product.nameCategory));
    row.appendChild(createCell(product.addDate));
    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `
      <i class="fa fa-edit" onclick="editProduct(${product.id})" style="cursor: pointer; color: #007bff;"></i>
      <i class="fa fa-trash" onclick="deleteProduct(${product.id})" style="cursor: pointer; color: red; margin-left: 10px;"></i>
    `;
    row.appendChild(actionsCell);

    tableContent.appendChild(row);
  });
}

function filterProducts() {
  const searchValue = document
    .getElementById("searchInputProduct")
    .value.toLowerCase();

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchValue) ||
      product.nameCategory.toLowerCase().includes(searchValue)
    );
  });

  displayProducts(filteredProducts);
}

// 4. Các hàm chỉnh sửa và xóa sản phẩm
let editingProductId = null;
function editProduct(productId) {
  if (editingProductId !== null && editingProductId !== productId) {
    cancelEdit(editingProductId);
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;
  editingProductId = productId;
  const row = document.querySelector(
    `#productTable tr[data-id='${productId}']`
  );

  const selectedCategoryId = product.category ? product.category.id : null;
  const categoryOptions = categories
    .map(
      category =>
        `<option value="${category.id}" ${
          category.id === selectedCategoryId ? "selected" : ""
        }>${category.name}</option>`
    )
    .join("");

  row.innerHTML = `
    <td>${product.id}</td>
    <td><input type="text" id="editName" value="${product.name}" /></td>
    <td><input type="text" id="editPrice" value="${product.price}" style="width: 90%;"/></td>
    <td><select id="editCategory">${categoryOptions}</select></td>
    <td><input type="date" id="editAddDate" value="${product.addDate}" /></td>
    <td>
      <i class="fa fa-save" onclick="saveProduct(${product.id})" style="cursor: pointer; color: #28a745;"></i>
      <i class="fa fa-times" onclick="cancelEdit(${product.id})" style="cursor: pointer; color: red; margin-left: 10px;"></i>
    </td>
  `;
}

function saveProduct(productId) {
  const row = document.querySelector(
    `#productTable tr[data-id='${productId}']`
  );

  const updatedProduct = {
    name: document.getElementById("editName").value,
    price: parseFloat(document.getElementById("editPrice").value),
    addDate: document.getElementById("editAddDate").value,
    category: { id: document.getElementById("editCategory").value },
  };

  axios
    .put(`http://localhost:8080/products/${productId}`, updatedProduct)
    .then(() => {
      const successMessage = document.getElementById(
        "success-message-product-update"
      );
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
      loadProducts();
      editingProductId = null;
    })
    .catch(error => {
      console.error("Error saving product:", error);
    });
}

function cancelEdit(productId) {
  const row = document.querySelector(
    `#productTable tr[data-id='${productId}']`
  );
  const product = products.find(p => p.id === productId);
  row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.nameCategory}</td>
    <td>${product.addDate}</td>
    <td>
      <i class="fa fa-edit" onclick="editProduct(${product.id})" style="cursor: pointer; color: #007bff;"></i>
      <i class="fa fa-trash" onclick="deleteProduct(${product.id})" style="cursor: pointer; color: red; margin-left: 10px;"></i>
    </td>
  `;
  editingProductId = null;
}

let productToDelete = null;
function deleteProduct(productId) {
  if (editingProductId !== null && editingProductId !== productId) {
    cancelEdit(editingProductId);
  }
  productToDelete = productId;
  const deleteModal = document.getElementById("deleteConfirmationModal");
  deleteModal.style.display = "flex";
}
