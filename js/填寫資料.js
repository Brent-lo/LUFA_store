document.addEventListener('DOMContentLoaded', function () {
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
    document.getElementById('checkout-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const customer = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
        };
        localStorage.setItem('customerInfo', JSON.stringify(customer));
        window.location.href = '完成訂單.html';
    });
});