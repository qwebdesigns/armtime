// URL опубликованной Google Таблицы
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTzByXOVqZkM-N8x8CjY6lgb1wEcw21VLDdt60uYTxjvMd5ZZR48ZkoXs1X9lKvPl-lbfqZC0OtbYJ3/pubhtml?gid=0&single=true';

// Функция для парсинга Google Таблицы и сохранения данных в JSON
async function parseGoogleSheetToJson() {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const table = doc.querySelector('table');

        if (table) {
            const rows = table.querySelectorAll('tr');
            let data = [];

            // Определяем ключи для JSON
            const keys = [
                "Фамилия, имя",
                "Подпись",
                "Вес",
                "Подъем на бицепс",
                "Сгибатель кисти",
                "Боковое давление",
                "Подъём на луч",
                "Провинция",
                "Отведение",
                "трицепс блок",
                "Подтверждение",	
                "Профессионал",
                "Фото"
            ];

            // Извлекаем данные
            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                if (cells.length > 0) {
                    let rowData = {};
                    keys.forEach((key, index) => {
                        rowData[key] = cells[index] ? cells[index].innerText.trim() : "";
                    });
                    data.push(rowData);
                }
            }
            data = data.slice(2); // Убираем первые две строки, если они не нужны

            // Сохраняем данные в локальное хранилище браузера
            localStorage.setItem('cachedJsonData', JSON.stringify(data));

            // Сохраняем временную метку
            const timestamp = new Date().toISOString();
            localStorage.setItem('lastCacheTime', timestamp);

            console.log('Данные успешно сохранены в локальное хранилище.');
            console.log('Временная метка:', timestamp);

            return data; // Возвращаем данные для дальнейшего использования

        } else {
            console.log('Таблица не найдена.');
            return null;
        }
    } catch (error) {
        console.error('Ошибка при парсинге:', error);
        return null;
    }
}

// Функция для получения данных из кэша
function getCachedData() {
    const cachedData = localStorage.getItem('cachedJsonData');
    const lastCacheTime = localStorage.getItem('lastCacheTime');

    if (cachedData && lastCacheTime) {
        const currentTime = new Date();
        const cacheTime = new Date(lastCacheTime);
        const timeDifference = (currentTime - cacheTime) / (1000 * 60); // Разница в минутах

        if (timeDifference > 5) {
            console.log('Кэш старше 5 минут. Запрашиваем новые данные.');
            return null; // Возвращаем null, чтобы запросить новые данные
        } else {
            console.log('Кэш актуален. Используем данные из локального хранилища.');
            return {
                data: JSON.parse(cachedData),
                timestamp: lastCacheTime
            };
        }
    } else {
        console.log('Данные в кэше отсутствуют.');
        return null;
    }
}

// Основная функция для получения данных
async function getData() {
    const cachedData = getCachedData();

    if (!cachedData) {
        // Если кэш отсутствует или старше 5 минут, запрашиваем новые данные
        const jsonData = await parseGoogleSheetToJson();
        return jsonData;
    } else {
        // Используем данные из кэша
        return cachedData.data;
    }
}
/*
// Пример использования
(async () => {
    const data = await getData();
    console.log('Данные:', data);
})();

*/
