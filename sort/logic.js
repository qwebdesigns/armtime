const data = JSON.parse(localStorage.getItem('cachedJsonData'));
const cardContainer = document.getElementById('card_conteiner');

const currentUrl = window.location.href;
// http://192.168.1.3:5500/categories/sort?sort=1&flag=%22pro%22&category=%2275%22
const sort = currentUrl.split('sort=')[1].split('&')[0];
var flag = currentUrl.split('flag=')[1].split('&')[0].replace(/%22/g, '');
const category = currentUrl.split('category=')[1].replace(/%22/g, '');
console.log('sort:', sort + ', flag:', flag + ', category:', category);
const filePath = '../settings/category.json';
var current_load_category;
if (!flag) {
    alert('Ошибка при загрузке данных... 2x011a');
}
else{
    if (flag === 'pro') {
        flag = "да";
    }
    else if (flag === 'common') {
        flag = "нет";
    }
    else {
        alert('Ошибка при загрузке данных... 2x012b');
    }
}



cardContainer.innerHTML = '';
getCurrentCategory(category)
function getCurrentCategory(categoryLink) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не в порядке: ' + response.statusText);
            }
            return response.json(); // Парсим JSON
        })
        .then(dataCat => {
            const categoryData = dataCat["Categories"]; // Здесь вы можете работать с вашими данными

            for (let i = 0; i < categoryData.length; i++) {
                if (categoryLink === categoryData[i]['Category Name']) {
                    //alert(categoryData[i]['Category Title']);
                    window.document.title = categoryData[i]['Category Title'];
                    current_load_category = categoryData[i];
                    generateCart(current_load_category);
                }
            }
        })
        .catch(error => {
            console.error('Ошибка при загрузке JSON:', error);
        });
}


function generateCart(clc) {
    const min_weight = Number(clc['Minimum Participant Weight']);   // Минимальный вес участника в категории
    const max_weight = Number(clc['Maximum Participant Weight']);   // Максимальный вес участника в категории
    const min_max_val = clc['Weights'];                     // Минимальные и максимальные значения для каждого упражнения
    var member_weight;                                      // Вес участника
    var allmembers = [];
    for (let i = 0; i < data.length; i++) {
        member_weight = Number(data[i]['Вес участника']);
        //alert('Имя= ' + data[i]['Фамилия Имя'] + " | Вес= " + member_weight);
        if (member_weight >= min_weight && member_weight <= max_weight && data[i]['Профессионал'] == flag) {
            var member_point = calcPersMember(data[i], min_max_val, min_weight, max_weight);
            //console.log("| Вес= "+member_weight+'  | Очко участника=', member_point + " | Имя= " + data[i]['Фамилия, имя']);
            allmembers.push([member_point, data[i]]);
            }
        }
        allmembers.sort(function (a, b) {
            return b[0] - a[0];
        });
        for (let i = 0; i < allmembers.length; i++) {
            console.log("| Вес= " + allmembers[i][1]['Вес участника'] + '  | Очко участника=', allmembers[i][0] + " | Имя= " + allmembers[i][1]['Фамилия, имя']);
            create(allmembers[i][1], allmembers[i][0]); 
            // Создаем карточку участника
            // allmembers[i][1] - данные участника
            // allmembers[i][0] - очки участника
        };
}

function create(member, points) {
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
        const url = `../stats/?unicod=${encodeURIComponent(member["Код"])}`;
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
    


function calculatePercentage(min, max, value) {
    return ((value - min) / (max - min)) * 100;
}
function calcPersMember(member, min_max, ) {
    const min_max_values = min_max;
    const percentagesAll = {
        "Строгий подъем на бицепс": Math.floor(calculatePercentage(min_max_values["MIN Biceps"], min_max_values["MAX Biceps"], member["Строгий подъем на бицепс"])),
        "Сгибатель кисти": Math.floor(calculatePercentage(min_max_values["MIN Wrist Flexor"], min_max_values["MAX Wrist Flexor"], member["Сгибатель кисти"])),
        "Боковое давление": Math.floor(calculatePercentage(min_max_values["MIN Side Pressure"], min_max_values["MAX Side Pressure"], member["Боковое давление"])),
        "Подъем на луч": Math.floor(calculatePercentage(min_max_values["MIN Lift on Radius"], min_max_values["MAX Lift on Radius"], member["Подъем на луч"])),
        "Пронация": Math.floor(calculatePercentage(min_max_values["MIN Pronation"], min_max_values["MAX Pronation"], member["Пронация"])),
        "Отведение": Math.floor(calculatePercentage(min_max_values["MIN Abduction"], min_max_values["MAX Abduction"], member["Отведение"])),
        "Французский жим": Math.floor(calculatePercentage(min_max_values["MIN French Press"], min_max_values["MAX French Press"], member["Французский жим"])),
    };
    let ringPercentages = {
        "ring3": Math.floor((percentagesAll["Французский жим"] + percentagesAll["Боковое давление"]) / 2),
        "ring2": Math.floor((percentagesAll["Подъем на луч"] + percentagesAll["Пронация"] + percentagesAll["Отведение"]) / 3),
        "ring1": Math.floor((percentagesAll["Строгий подъем на бицепс"] + percentagesAll["Сгибатель кисти"] + percentagesAll["Боковое давление"]) / 3),
    }
    let ring0 = Math.floor((ringPercentages["ring1"] + ringPercentages["ring2"] + ringPercentages["ring3"]) / 3);
    return ring0;
}














































/*
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
        const url = `../stats/?unicod=${encodeURIComponent(member["Код"])}`;
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
*/