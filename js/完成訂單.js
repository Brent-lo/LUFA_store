document.addEventListener("DOMContentLoaded", () => {
  // ===============判斷是否已經登入=================
  const loginBtn = document.getElementById("loginBtn");
  const dropdownMenu = loginBtn?.nextElementSibling;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    // 顯示登入後的下拉功能
    loginBtn.classList.add("dropdown-toggle");
    loginBtn.setAttribute("data-bs-toggle", "dropdown");

    // 綁定登出功能
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      location.reload(); // 或跳轉回登入頁面
    });
  } else {
    // 未登入：點擊導向登入頁面
    loginBtn?.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "./登入頁面.html";
    });
  }
  // ======================
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // 顯示客戶資料
  const infoEl = document.getElementById("customer-info");
  if (customerInfo) {
    infoEl.innerHTML = `
        <h5>訂購人資訊</h5>
        <p><strong>姓名：</strong>${customerInfo.name}</p>
        <p><strong>信箱：</strong>${customerInfo.email}</p>
        <p><strong>電話：</strong>${customerInfo.phone}</p>
        <p><strong>地址：</strong>${customerInfo.address}</p>
        <hr />
      `;
  }

  // 顯示商品明細
  const itemsEl = document.getElementById("order-items");
  let total = 0;
  if (cart.length > 0) {
    itemsEl.innerHTML = "<h5>訂購商品</h5>";
    cart.forEach(item => {
      const sub = item.price * item.quantity;
      total += sub;
      itemsEl.innerHTML += `
          <div class="d-flex justify-content-between border-bottom py-2">
            <div>${item.name} × ${item.quantity}</div>
            <div>$${sub}</div>
          </div>
        `;
    });
  }

  // 顯示總金額
  document.getElementById("final-total").textContent = `總金額：$${total}`;

  // 清空 localStorage 中的 cart 與客戶資料
  localStorage.removeItem("cart");
  localStorage.removeItem("customerInfo");
});