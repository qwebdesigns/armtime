let data = JSON.parse(localStorage.getItem('cachedJsonData'));
const cardContainer = document.getElementById('card_conteiner');
cardContainer.innerHTML = '';

function iterateData() {
    if(data){
        for (let i = 0; i < data.length; i++) {
            generateCart(data[i]);
        }
    }

}

iterateData();




function generateCart(member) {
    
    // Создаем карточку
    const card = document.createElement('div');
    card.classList.add('card');

    // Добавляем фото
    const foto = document.createElement('div');
    foto.classList.add('foto');
    const img = document.createElement('img');
    img.src = member["Фото"]; // Используем изображение по умолчанию, если нет данных
    img.alt = '';
    foto.appendChild(img);

    // Добавляем имя и username
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    const h1 = document.createElement('h1');
    h1.textContent = member["Фамилия, имя"];
    const h2 = document.createElement('h2');
    h2.textContent = member["Подпись"];
    nameDiv.appendChild(h1);
    nameDiv.appendChild(h2);

    // Добавляем кнопку "Анализ"
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input');
    const input = document.createElement('input');
    input.type = 'button';
    input.value = 'Анализ';
    // Добавляем обработчик события для кнопки
    input.addEventListener('click', () => {
        // Формируем URL с параметром member
        const url = `../stats/?member=${encodeURIComponent(member["Фамилия, имя"])}`;
        // Перенаправляем пользователя на страницу
        window.location.href = url;
    });
    inputDiv.appendChild(input);

    // Собираем карточку
    card.appendChild(foto);
    card.appendChild(nameDiv);
    card.appendChild(inputDiv);

    // Вставляем карточку в контейнер
    cardContainer.appendChild(card);
}