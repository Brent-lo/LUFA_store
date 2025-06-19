   // ==========每個商品的小計=======
   function updateSubtotal(card) {
    const quantity = parseInt(card.querySelector('.item-quantity').textContent);
    const price = parseFloat(card.querySelector('.item-price').dataset.price);
    const subtotal = quantity * price;
    card.querySelector('.item-price').textContent = '$' + subtotal;
}
// =========總金額=====
function updateTotal() {
    let total = 0;
    document.querySelectorAll('.card').forEach(card => {
        // 商品數量
        const quantity = parseInt(card.querySelector('.item-quantity').textContent);
        // 商品單價
        const price = parseFloat(card.querySelector('.item-price').dataset.price);
        total += quantity * price;
    });
    document.getElementById('total-price').textContent = '總金額：$' + total;
}
// =======商品數量計算 加減刪除=====
document.addEventListener('DOMContentLoaded', () => {
    // 對每個加入的商品去運作
    document.querySelectorAll('.card').forEach(card => {
        const minusBtn = card.querySelector('.btn-minus');
        const plusBtn = card.querySelector('.btn-plus');
        const deleteBtn = card.querySelector('.btn-delete');
        // 減商品
        minusBtn.addEventListener('click', () => {
            let qty = parseInt(card.querySelector('.item-quantity').textContent);
            if (qty > 1) {
                card.querySelector('.item-quantity').textContent = qty - 1;
                updateSubtotal(card);
                updateTotal();
            }
        });
        // 加商品
        plusBtn.addEventListener('click', () => {
            let qty = parseInt(card.querySelector('.item-quantity').textContent);
            card.querySelector('.item-quantity').textContent = qty + 1;
            updateSubtotal(card);
            updateTotal();
        });
        // 刪除按鍵
        deleteBtn.addEventListener('click', () => {
            card.remove();
            updateTotal();
        });
    });

    updateTotal();
});
