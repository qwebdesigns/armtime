const API_KEY = 'AIzaSyBipCKTS4-g1jvv-vpmAvyo-MunhprXqwg'; // Замените на ваш API ключ
const SPREADSHEET_ID = '1hDHsHJJ_ac8gsYUj1obBjYkSp-0tunSsKwd6pLuNjFg'; // Замените на ID вашей таблицы
const RANGE = 'Main!A2:N100'; // Замените на нужный вам диапазон

let jsonData;
// Ключи
const keys = [
    "Фамилия, имя",
    "Подпись",
    "Вес участника",
    "Строгий подъем на бицепс",
    "Сгибатель кисти",
    "Боковое давление",
    "Подъем на луч",
    "Пронация", "Отведение",
    "Французский жим",
    "Подтверждение",
    "Профессионал",
    "Карточка",
    "Фото"
];

function convertToJSON(data) {
    return data.map(row => {
        let obj = {};
        keys.forEach((key, index) => {
            obj[key] = row[index];
        });
        return obj;
    });
}

function cacheData(jsonData) {
    const timestamp = new Date().toISOString();
    localStorage.setItem('cachedJsonData', JSON.stringify(jsonData));
    localStorage.setItem('lastCacheTime', timestamp);
    console.log('Данные сохранены в локальном хранилище с временной меткой:', timestamp);
}

function getCachedData() {
    const cachedData = localStorage.getItem('cachedJsonData');
    const lastCacheTime = localStorage.getItem('lastCacheTime');
    if (cachedData && lastCacheTime) {
        const currentTime = new Date();
        const cacheTime = new Date(lastCacheTime);
        const timeDifference = (currentTime - cacheTime) / (1000 * 60);
        if (timeDifference > 5) {
            console.log('Кэш старше 5 минут. Запрашиваем новые данные.');
            return null;
        } else {
            console.log('Кэш актуален. Используем данные из локального хранилища.');
            return {
                data: JSON.parse(cachedData)
            };
        }
    } else {
        console.log('Данные в кэше отсутствуют.');
        return null;
    }
}
async function fetchData() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    return convertToJSON(data.values);
}
async function getData() {
    const cachedData = getCachedData();
    if (cachedData) {
        console.log('Используем кэшированные данные:', cachedData);
    } else {
        const jsonData = await fetchData();
        cacheData(jsonData);
        console.log('Получены новые данные:', jsonData);
    }
}
getData();