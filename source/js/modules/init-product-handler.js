
const initProductHandler = () => {

    if (document.querySelectorAll('[data-open-modal="modal-order-form"]').length === 0) {
        return;
    }


    const modalOrder = document.querySelector('[data-modal="modal-order-form"]');
    const modalOrderTitle = modalOrder.querySelector('[data-modal-product-title]');
    const modalOrderInputTitle = modalOrder.querySelector('[data-modal-input-product-title]');
    const modalOrderInputPrice = modalOrder.querySelector('[data-modal-input-product-price]');


    document.addEventListener('click', function (event) {

        if (event.target.closest('[data-open-modal="modal-order-form"]')) {
            const parent = event.target.closest('[data-open-modal="modal-order-form"]');
            const productTitle = parent.querySelector('[data-product-title]').innerHTML;
            const productPrice = parent.querySelector('[data-product-price]').innerHTML;

            modalOrderTitle.innerHTML = productTitle;
            modalOrderInputTitle.value = productTitle;
            modalOrderInputPrice.value = productPrice;
        }

    });

}



export { initProductHandler };


