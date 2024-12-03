// 1. Các hàm hỗ trợ
function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// 2. Các hàm xử lý DOM (Sự kiện, Modal, Search)
document
  .getElementById("searchInputInventory")
  .addEventListener("input", filterInventory);

// 3. Các hàm xử lý dữ liệu sản phẩm (Load, Display, Filter)

let inventory = [];

function loadInventory() {
  axios
    .get("http://localhost:8080/inventories")
    .then(response => {
      inventory = response.data;
      displayInventory(inventory);
    })
    .catch(error => {
      console.error("Lỗi khi tải dữ liệu:", error);
      document.getElementById("inventoryTable").innerHTML =
        "<tr><td colspan='6'>Không thể tải dữ liệu</td></tr>";
    });
}

function displayInventory(inventoryList) {
  const tableContent = document.getElementById("inventoryTable");
  tableContent.innerHTML = "";
  inventoryList.forEach(item => {
    const row = document.createElement("tr");
    row.setAttribute("data-id", `${item.productId}-${item.sizeId}`);
    row.appendChild(createCell(item.productId));
    row.appendChild(createCell(item.productName));
    row.appendChild(createCell(item.quantity));
    row.appendChild(createCell(item.sizeName));
    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `
        <i class="fa fa-edit" onclick="editInventoryItem('${item.productId}-${item.sizeId}')" style="cursor: pointer; color: #007bff;"></i>
    `;
    row.appendChild(actionsCell);

    tableContent.appendChild(row);
  });
}

function filterInventory() {
  const searchValue = document
    .getElementById("searchInputInventory")
    .value.toLowerCase();

  const filteredInventory = inventory.filter(item => {
    return item.productName.toLowerCase().includes(searchValue);
  });

  displayInventory(filteredInventory);
}

let editingInventoryId = null;

function editInventoryItem(inventoryId) {
  if (editingInventoryId !== null && editingInventoryId !== inventoryId) {
    cancelInventoryEdit(editingInventoryId);
  }
  const [productId, sizeId] = inventoryId.split("-");

  const item = inventory.find(
    i => i.productId === parseInt(productId) && i.sizeId === parseInt(sizeId)
  );
  if (!item) return;

  const row = document.querySelector(`tr[data-id='${inventoryId}']`);
  if (!row) return;

  row.innerHTML = `
    <td>${item.productId}</td>
    <td>${item.productName}</td>
    <td><input type="number" id="editQuantity" value="${item.quantity}" style="width: 60%;" /></td>
    <td>${item.sizeName}</td>
    <td>
      <i class="fa fa-save" onclick="saveInventoryItem('${inventoryId}')" style="cursor: pointer; color: #28a745;"></i>
      <i class="fa fa-times" onclick="cancelInventoryEdit('${inventoryId}')" style="cursor: pointer; color: red; margin-left: 10px;"></i>
    </td>
  `;
  editingInventoryId = inventoryId;
}

function saveInventoryItem(inventoryId) {
  const updatedQuantity = document.getElementById("editQuantity").value;

  const [itemId, sizeId] = inventoryId.split("-");

  const item = inventory.find(
    i => i.productId === parseInt(itemId) && i.sizeId === parseInt(sizeId)
  );
  if (!item) return;

  axios
    .put(`http://localhost:8080/inventories/${item.inventoryId}`, {
      productId: item.productId,
      sizeId: item.sizeId,
      quantity: updatedQuantity,
    })
    .then(response => {
      loadInventory();
      editingInventoryId = null;

      const successMessage = document.getElementById(
        "success-message-inventory"
      );
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 2000);
    })
    .catch(error => {
      console.error("Lỗi khi cập nhật kho:", error);
    });
}

function cancelInventoryEdit(inventoryId) {
  const [itemId, sizeId] = inventoryId.split("-");

  const row = document.querySelector(
    `#inventoryTable tr[data-id='${inventoryId}']`
  );
  const item = inventory.find(
    i => i.productId === parseInt(itemId) && i.sizeId === parseInt(sizeId)
  );

  if (!item) return;
  row.innerHTML = `
    <td>${item.productId}</td>
    <td>${item.productName}</td>
    <td>${item.quantity}</td>
    <td>${item.sizeName}</td>
    <td>
      <i class="fa fa-edit" onclick="editInventoryItem('${item.productId}-${item.sizeId}')" style="cursor: pointer; color: #007bff;"></i>
    </td>
  `;

  editingInventoryId = null;
}
