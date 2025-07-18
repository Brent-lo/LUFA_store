// 等待 DOM 載入完成
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

    // 1. 從 localStorage 中取得 cart（購物車）資料，若沒有就設為空陣列
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. 獲取顯示總金額的元素
    const totalEl = document.getElementById('total-price');

    // 3. 渲染購物車的函式
    const renderCart = () => {
        // 先移除所有舊的商品卡片
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.remove());

        // 找到商品區塊容器
        const container = document.querySelector('.container.my-5');

        // 判斷購物車為0
        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <h4 class="mb-4">目前您尚未選擇商品</h4>
                    <a href="index.html" class="btn btn-primary">去主頁逛逛</a>
                </div>
            `;

            // 購物車清空時，清除 localStorage 中的資料
            localStorage.removeItem('cart');

            return; // 不繼續往下執行
        }

        // 重新取得 total-price 元素（上面可能會被清空）
        
        const totalGood = document.getElementById('total-good');
        const totalNode = document.getElementById('total-price');

        let total = 0; // 小計總金額

        // 對每一筆商品進行渲染
        cart.forEach((item, index) => {
            const subTotal = item.price * item.quantity; // 單品總價
            total += subTotal; // 加總總金額

            // 建立卡片
            const card = document.createElement('div');
            card.className = 'card mt-5 shadow-sm';
            card.dataset.index = index; // 存商品索引，用於辨識是哪一筆資料
            
            // 卡片內容 HTML
            card.innerHTML = `
            <div class="row g-0 align-items-center text-center text-md-start">
            <!-- 商品圖片：小螢幕佔滿整列 -->
            <div class="col-12 col-md-3 mb-3 mb-md-0">
                <img src="${item.img}" class="img-fluid rounded-start w-100" alt="商品圖片">
            </div>
            <!-- 商品名稱：小螢幕佔滿整列 -->
            <div class="col-12 col-md-4 mb-2 mb-md-0 ">
            <div class="card-body ">
                <h5 class="card-title mb-0">${item.name}</h5>
            </div>
            </div>
            
            <!-- 數量控制 + 刪除按鈕：小螢幕佔滿整列並置中，桌面版靠左 -->
            <div class="col-12 col-md-3 mb-2 mb-md-0">
            <div class="d-flex justify-content-center justify-content-md-start align-items-center gap-2">
                <button class="btn btn-outline-secondary btn-sm me-2 btn-minus">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="btn btn-outline-secondary btn-sm ms-2 btn-plus">+</button>
            </div>
            </div>
            <!-- 價格顯示：小螢幕置中，桌面靠左 -->
            <div class="col-12 col-md-2 d-flex justify-content-center justify-content-md-start align-items-center mt-2 mt-md-0">
            <div class="item-price fw-bold me-3" data-price="${item.price}">$${subTotal}</div>
            <button class="btn btn-sm btn-outline-danger btn-delete">
                <i class="bi bi-trash3"></i>
            </button>
            </div>
            
            </div>
            `;
            // 在表頭後插入商品卡片
            totalGood.after(card);
        });

        // 顯示總金額
        totalNode.textContent = `總金額：$${total}`;

        // 將更新後的購物車寫入 localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    // 商品加減刪除按鈕 點擊購物車區塊內任一按鈕（使用事件代理）
    document.querySelector('.container.my-5').addEventListener('click', function (e) {
        const card = e.target.closest('.card'); // 找到最靠近的卡片
        if (!card) return;
        const index = parseInt(card.dataset.index, 10); // 取出卡片的 index
        if (isNaN(index)) return;

        // 處理 + 按鈕：增加數量
        if (e.target.classList.contains('btn-plus')) {
            cart[index].quantity += 1;
        }
        // 處理 - 按鈕：減少數量（最低為 1）
        else if (e.target.classList.contains('btn-minus')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            }
        }
        // 處理刪除按鈕
        else if (e.target.closest('.btn-delete')) {
            cart.splice(index, 1); // 移除該商品
        } else {
            return; // 若不是操作按鈕就不執行
        }

        // 重新渲染購物車
        renderCart();
    });
    // 初次執行：載入頁面時先顯示購物車內容
    renderCart();
});
