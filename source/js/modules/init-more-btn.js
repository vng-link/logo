
const initMoreBtn = () => {

    document.addEventListener('click', function (event) {

        if (event.target.hasAttribute('data-button-load-more')) {

            var targetContainer = document.querySelector('[data-container-load-more]');
            var url = event.target.getAttribute('data-url'); // URL для загрузки данных

            if (url) {
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'text/html'
                    }
                })
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (data) {
                        // Удаляем старую кнопку "Показать еще"
                        var oldPagination = document.querySelector('[data-button-load-more]');
                        if (oldPagination) {
                            oldPagination.remove();
                        }

                        // Создаем временный контейнер для разбора HTML
                        var tempContainer = document.createElement('div');
                        tempContainer.innerHTML = data;

                        // Ищем новые элементы и навигацию
                        var elements = tempContainer.querySelectorAll('[data-item-load-more]');
                        var pagination = tempContainer.querySelector('[data-button-load-more]');

                        // Добавляем новые элементы в контейнер
                        elements.forEach(function (element) {
                            targetContainer.appendChild(element);
                        });

                        // Добавляем новую кнопку "Показать еще", если она есть
                        if (pagination) {
                            targetContainer.appendChild(pagination);
                        }
                    })
                    .catch(function (error) {
                        console.error('Ошибка при загрузке данных:', error);
                    });
            }
        }
    });

}


export { initMoreBtn };


