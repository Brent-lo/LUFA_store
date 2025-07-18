// ========== 購物摘要渲染 ==========
document.addEventListener("DOMContentLoaded", function () {
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

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalEl = document.getElementById("total-price");
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    let deliveryFee = 0;

    const getDeliveryFee = () => {
        const selected = document.querySelector('input[name="delivery"]:checked');
        return selected ? parseInt(selected.value, 10) : 0;
    };

    const renderCartSummary = () => {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => card.remove());

        const container = document.querySelector(".container.my-5");

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <h4 class="mb-4">目前您尚未選擇商品</h4>
                    <a href="index.html" class="btn btn-primary">去主頁逛逛</a>
                </div>
            `;
            localStorage.removeItem("cart");
            return;
        }
        const totalGood = document.getElementById("total-good");
        const totalNode = document.getElementById("total-price");
        let total = 0;

        cart.forEach((item) => {
            const subTotal = item.price * item.quantity;
            total += subTotal;

            const card = document.createElement("div");
            card.className = "card mb-3";

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
                <span class="item-quantity">${item.quantity}個</span>
            </div>
            </div>
            <!-- 價格顯示：小螢幕置中，桌面靠左 -->
            <div class="col-12 col-md-2 d-flex justify-content-center justify-content-md-start align-items-center mt-2 mt-md-0">
            <div class="item-price fw-bold me-3" data-price="${item.price}">$${subTotal}</div>
            
            </div>
            
            </div>
            `;
            // 在表頭後插入商品卡片
            totalGood.after(card);
        });

        // 計算總金額 + 運費
        deliveryFee = getDeliveryFee();
        totalEl.textContent = `總金額：$${total + deliveryFee}`;
    };

    // 當選擇不同運送方式時更新運費與總金額
    deliveryRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            renderCartSummary();
        });
    });

    // 儲存付款與運送方式
    document.querySelector(".btn.btn-primary")?.addEventListener("click", () => {
        const payment = document.querySelector('input[name="payment"]:checked')?.value;
        const delivery = document.querySelector('input[name="delivery"]:checked')?.value;

        if (!payment || !delivery) {
            alert("請選擇付款與運送方式");
            return;
        }

        localStorage.setItem("selectedPayment", payment);
        localStorage.setItem("selectedDelivery", delivery);
        // 若有下一頁，這裡可導向下一頁
        // location.href = "./填寫資料.html";
    });

    renderCartSummary();
});
