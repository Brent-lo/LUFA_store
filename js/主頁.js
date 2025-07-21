
document.addEventListener("DOMContentLoaded", function () {
    // ===============判斷是否已經登入=================
    const loginBtn = document.getElementById("loginBtn");
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
            location.reload();
        });
    } else {
        // 未登入：點擊導向登入頁面
        loginBtn?.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "./登入頁面.html";
        });
    }

    // =============== LÜFA 商品動態載入 START ===============
    const categoryTabs = document.querySelectorAll('.nav-link[data-bs-toggle="tab"]');
    if (categoryTabs.length > 0) {
        let currentPage = 1;
        const productsPerPage = 6;
        let currentCategory = 'all'; // 預設顯示所有商品

        const getFilteredProducts = () => {
            const categoryMap = {
                '#roomA': 'all',
                '#roomB': '串飾',
                '#roomC': '手鍊',
                '#roomD': '項鍊與吊墜',
                '#roomE': '戒指'
            };
            const activeTabSelector = document.querySelector('.nav-link.active[data-bs-toggle="tab"]')?.getAttribute('data-bs-target');
            currentCategory = categoryMap[activeTabSelector] || 'all';

            if (currentCategory === 'all') {
                return products;
            }
            return products.filter(p => p.category === currentCategory);
        };

        const addCartButtonListeners = () => {
            document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
                // 先移除舊的監聽器，避免重複綁定
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

                newBtn.addEventListener('click', function () {
                    const id = newBtn.dataset.id;
                    const name = newBtn.dataset.name;
                    const price = parseInt(newBtn.dataset.price, 10);
                    const img = newBtn.dataset.img;

                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existing = cart.find(item => item.id === id);

                    if (existing) {
                        existing.quantity += 1;
                    } else {
                        cart.push({ id, name, price, img, quantity: 1 });
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));
                    // 可選：提示用戶或更新購物車圖標
                    // window.location.href = '購物車.html'; // 根據需求決定是否跳轉
                    alert(`「${name}」已加入購物車！`);
                });
            });
        };

        const renderPagination = (totalProducts) => {
            const activeTabPane = document.querySelector('.tab-pane.active');
            if (!activeTabPane) return;
            const paginationControls = activeTabPane.querySelector('.pagination-controls');
            paginationControls.innerHTML = '';
            const totalPages = Math.ceil(totalProducts / productsPerPage);

            if (totalPages > 1) {
                // ... (此處省略分頁按鈕生成的程式碼，與前次相同)
                 const prevButton = document.createElement('button');
                prevButton.innerText = '上一頁';
                prevButton.classList.add('btn', 'btn-outline-secondary', 'mx-1');
                prevButton.disabled = currentPage === 1;
                prevButton.addEventListener('click', () => {
                    currentPage--;
                    renderProducts();
                });
                paginationControls.appendChild(prevButton);

                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.innerText = i;
                    pageButton.classList.add('btn', 'btn-outline-secondary', 'mx-1');
                    if (i === currentPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', () => {
                        currentPage = i;
                        renderProducts();
                    });
                    paginationControls.appendChild(pageButton);
                }

                const nextButton = document.createElement('button');
                nextButton.innerText = '下一頁';
                nextButton.classList.add('btn', 'btn-outline-secondary', 'mx-1');
                nextButton.disabled = currentPage === totalPages;
                nextButton.addEventListener('click', () => {
                    currentPage++;
                    renderProducts();
                });
                paginationControls.appendChild(nextButton);
            }
        };

        const renderProducts = () => {
            const activeTabPane = document.querySelector('.tab-pane.active');
            if (!activeTabPane) return;

            const productGrid = activeTabPane.querySelector('.product-grid');
            productGrid.innerHTML = '';

            const filteredProducts = getFilteredProducts();
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

            if (paginatedProducts.length === 0) {
                productGrid.innerHTML = '<p class="text-center col-12">此分類暫無商品。</p>';
            } else {
                paginatedProducts.forEach((product, index) => {
                    const alignClass = index % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
                    const productCard = `
                        <div class="d-flex ${alignClass} row mb-5">
                            <div class="image-col">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="text-col">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p class="price">NT$ ${product.price}</p>
                                <button class="btn btn-add-to-cart"
                                    data-id="${product.id}"
                                    data-name="${product.name}"
                                    data-price="${product.price}"
                                    data-img="${product.image}">
                                    加入購物車
                                </button>
                            </div>
                        </div>
                    `;
                    productGrid.innerHTML += productCard;
                });
            }

            addCartButtonListeners();
            renderPagination(filteredProducts.length);
        };

        categoryTabs.forEach(tab => {
            tab.addEventListener('shown.bs.tab', function () {
                currentPage = 1;
                renderProducts();
            });
        });

        // 初始載入
        renderProducts();
    }
    // =============== LÜFA 商品動態載入 END ===============
});


// ========== 共用函式：切換 tab 並滾動到對應區域 ==========
function activateTabAndScroll(hash) {
    const tabTriggerEl = document.querySelector(`button[data-bs-target="${hash}"]`);
    const targetSection = document.querySelector(hash);

    if (tabTriggerEl) {
        new bootstrap.Tab(tabTriggerEl).show();
    }

    if (targetSection) {
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
}

// ========== nav連結時的處理 ==========
document.querySelectorAll('.nav-link[href^="#room"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const hash = this.getAttribute('href');
        activateTabAndScroll(hash);
    });
});

// ========== 從其他頁跳轉時 自動處理 hash ==========
window.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#room')) {
        activateTabAndScroll(hash);
    }
});

// ===增加商品到購物車========
// 由於商品是動態載入的，舊的監聽器會失效。
// 已將監聽器綁定邏輯移至 renderProducts 函數內的 addCartButtonListeners 中，
// 確保每次渲染商品時，按鈕都能獲得最新的事件監聽。
