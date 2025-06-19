document.addEventListener("DOMContentLoaded", function () {
    // ===============判斷是否已經登入=================
    const loginBtn = document.getElementById("loginBtn");
    const dropdownMenu = loginBtn?.nextElementSibling; //loginBtn? => 如果loginBtn存在的話就執行後面的
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
});
// ========== 共用函式：切換 tab 並滾動到對應區域 ==========
function activateTabAndScroll(hash) {
    // 根據 hash 取得對應的 tab 切換按鈕（如 data-bs-target="#room1"）
    const tabTriggerEl = document.querySelector(`button[data-bs-target="${hash}"]`);

    // 根據 hash 取得對應的頁面區塊元素（如 <div id="room1">）
    const targetSection = document.querySelector(hash);

    // 如果找到了對應的 tab 按鈕，使用 Bootstrap 的 API 主動切換 tab
    if (tabTriggerEl) {
        new bootstrap.Tab(tabTriggerEl).show();
    }

    // 如果找到了對應的內容區塊，進行平滑滾動
    if (targetSection) {
        // 延遲一點點時間，以確保 tab 內容已經 render 出來
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' }); // 使用 smooth 平滑滾動
        }, 300); // 300ms 延遲
    }
}

// ========== nav連結時的處理 ==========
document.querySelectorAll('.nav-link[href^="#room"]').forEach(function (link) {
    // 為每個符合條件的 nav-link 元素加上點擊監聽器
    link.addEventListener('click', function (e) {
        e.preventDefault(); // 阻止超連結預設跳轉行為
        const hash = this.getAttribute('href'); // 取得 href，例如 "#room1"
        activateTabAndScroll(hash); // 呼叫共用函式，切換 tab 並滾動
    });
});
// ========== 從其他頁跳轉時 自動處理 hash ==========
window.addEventListener('DOMContentLoaded', function (){
    const hash = window.location.hash; // 取得網址中的 #hash，如 "#room2"
    // 如果 hash 存在，且是以 #room 開頭（符合目標 tab 的條件）
    if (hash && hash.startsWith('#room')) {
        activateTabAndScroll(hash); // 呼叫共用函式，主動切換 tab 並滾動
    }
});

// ===增加商品到購物車========
document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', function (){
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price, 10);
        const img = btn.dataset.img;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // 跳轉到購物車頁
        window.location.href = '購物車.html';
    });
});