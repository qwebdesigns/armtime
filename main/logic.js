// Выбираем все элементы с id="link"
const links = document.querySelectorAll('#link');

// Добавляем обработчик события на каждый элемент
links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        const loadingElement = document.querySelector('.loadingotherpage');
        loadingElement.style.display = 'flex'; // Показываем элемент

        // Симуляция загрузки (например, переход на другую страницу через 2 секунды)
        setTimeout(() => {
            window.location.href = this.href; // Переход по ссылке
        }, 1200);
    });
});