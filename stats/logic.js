(async () => {
    // Получаем данные из функции getData()
    const data = await getData();

    // Проверяем, что данные существуют и не пусты
    if (data && data.length > 0) {
        // Получаем параметр member из URL
        const urlParams = new URLSearchParams(window.location.search);
        const member = urlParams.get('member');

        let selectedElement;

        if (member) {
            // Декодируем параметр member
            const decodedMember = decodeURIComponent(member).replace(/"/g, '');

            // Ищем элемент в data, где "Фамилия, имя" совпадает с decodedMember
            selectedElement = data.find(item => item["Фамилия, имя"] === decodedMember);

            if (!selectedElement) {
                console.log('Элемент с указанным именем не найден.');
                selectedElement = data[0]; // Используем первый элемент, если совпадение не найдено
            }
        } else {
            // Если параметр member отсутствует, используем первый элемент
            selectedElement = data[0];
        }

        // Передаем выбранный элемент в функцию calculatePercentages
        calculatePercentages(selectedElement);
    } else {
        console.log('Данные отсутствуют или пусты.');
    }
})();






function calculatePercentages(data) {
    console.log("функция выполнилась");
    console.log(data);
    const elements = document.querySelectorAll('.krug');

    const ranges = {
        "Подъем на бицепс": {
            min: 1,
            max: 100
        },
        "Сгибатель кисти": {
            min: 0.5,
            max: 50
        },
        "Боковое давление": {
            min: 0.8,
            max: 80
        },
        "трицепс блок": {
            min: 0.55,
            max: 55
        },
        "Подъём на луч": {
            min: 0.5,
            max: 50
        },
        "Провинция": {
            min: 0.4,
            max: 40
        },
        "Отведение": {
            min: 0.4,
            max: 40
        }
    };

    let percentages = {};

    for (const key in ranges) {
        if (data[key]) {
            const value = parseFloat(data[key]);
            const range = ranges[key];
            const percentage = ((value - range.min) / (range.max - range.min)) * 100;
            percentages[key] = Math.max(0, Math.min(100, percentage)).toFixed(2); // Ограничиваем значение от 0 до 100
            percentages[key] = Math.round(percentages[key]); // Округляем до целого числа
        }
    }

    // 2-й раз: Подъем на бицепс, Сгибатель кисти, Боковое давление
    const firstAverage = Math.round((parseFloat(percentages["Подъем на бицепс"]) +
        parseFloat(percentages["Сгибатель кисти"]) +
        parseFloat(percentages["Боковое давление"])) / 3);
    const firstH1 = elements[1].querySelector('h1');
    if (firstH1) {
        firstH1.textContent = firstAverage; // Вставляем среднее значение в h1
    }

    // 3-й раз: Подъём на луч, Провинция, Отведение
    const secondAverage = Math.round((parseFloat(percentages["Подъём на луч"]) +
        parseFloat(percentages["Провинция"]) +
        parseFloat(percentages["Отведение"])) / 3);
    const secondH1 = elements[2].querySelector('h1');
    if (secondH1) {
        secondH1.textContent = secondAverage; // Вставляем среднее значение в h1
    }

    // 4-й раз: трицепс блок, Боковое давление
    const thirdAverage = Math.round((parseFloat(percentages["трицепс блок"]) +
        parseFloat(percentages["Боковое давление"])) / 2);
    const thirdH1 = elements[3].querySelector('h1');
    if (thirdH1) {
        thirdH1.textContent = thirdAverage; // Вставляем среднее значение в h1
    }
    const overallAverage = Math.round((firstAverage + secondAverage + thirdAverage) / 3);
    const overallH1 = elements[0].querySelector('h1');
    if (overallH1) {
        overallH1.textContent = overallAverage; // Вставляем общее среднее значение в h1
    }


    // Получаем элементы по ID и устанавливаем текст с процентами
    document.getElementById('pod_bifct').innerHTML = `${percentages["Подъем на бицепс"]}%`;
    document.getElementById('sgib_kist').innerHTML = `${percentages["Сгибатель кисти"]}%`;
    document.getElementById('bok_davl1').innerHTML = `${percentages["Боковое давление"]}%`;
    document.getElementById('trip_block').innerHTML = `${percentages["трицепс блок"]}%`;
    document.getElementById('pod_luch').innerHTML = `${percentages["Подъём на луч"]}%`;
    document.getElementById('pronactia').innerHTML = `${percentages["Провинция"]}%`;
    document.getElementById('otvedenye').innerHTML = `${percentages["Отведение"]}%`;
    document.getElementById('bok_davl2').innerHTML = `${percentages["Боковое давление"]}%`;

    
    document.querySelector('.div4 h1').textContent = data["Фамилия, имя"];
    document.querySelector('.div4 h2').textContent = data["Подпись"];
    document.querySelector('.div1 img').src = data["Фото"];


}
