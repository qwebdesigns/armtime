const labels = [
    'Подъем на бицепс',
    'Сгибатель кисти',
    'Боковое давление',
    'Подъем на луч',
    'Пронация',
    'Отведение',
    'Трицепс',
    'Боковое давление'
];
var rid_save = [];
var dataSets = [];
var dataLabels = [];
var chart;
var test;
var color_act = '#8a2be2';
const canvas = document.getElementById('myChart');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
document.getElementById('circle1').addEventListener('click', () => {
    GenerateChart(rid_save, 'circle1');
});
document.getElementById('circle2').addEventListener('click', () => {
    GenerateChart(rid_save, 'circle2');
});
document.getElementById('circle3').addEventListener('click', () => {
    GenerateChart(rid_save, 'circle3');
});

function GenerateChart(rid, circle, ac) {
    rid_save = rid;
    let dataSets, dataLabels;
    if(ac){
        color_act = ac;
    }

    if (circle == 'circle1') {
        dataSets = [rid_save[0], rid_save[1], rid_save[2]];
        dataLabels = [labels[0], labels[1], labels[2]];
    } else if (circle == 'circle2') {
        dataSets = [rid_save[3], rid_save[4], rid_save[5]];
        dataLabels = [labels[3], labels[4], labels[5]];
    } else if (circle == 'circle3') {
        dataSets = [rid_save[6], rid_save[7]];
        dataLabels = [labels[6], labels[7]];
    } else {
        dataSets = [rid_save[0], rid_save[1], rid_save[2]];
        dataLabels = [labels[0], labels[1], labels[2]];
    }

    // Сортировка dataSets и соответствующих dataLabels
    const combinedArray = dataSets.map((value, index) => {
        return {
            value: value,
            label: dataLabels[index]
        };
    });

    combinedArray.sort((a, b) => b.value - a.value);

    const sortedDataSets = combinedArray.map(item => item.value);
    const sortedDataLabels = combinedArray.map(item => item.label);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: sortedDataLabels,
            datasets: [{
                data: sortedDataSets,
                backgroundColor: [
                    color_act,
                    'white',
                    'gray'
                ],
                borderColor: [
                    'black',
                    'black',
                    'black'


                ],
                borderWidth: 8
            }]
        },
        options: options,
        plugins: [{
            afterDraw: chart => {
                const ctx = chart.ctx;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                //ctx.fillStyle = 'red'; // Измените этот цвет на нужный
                const fontSize = 15; // Установите размер шрифта по вашему усмотрению
                const fontWeight = 'bold'; // Установите толщину шрифта по вашему усмотрению ('normal', 'bold', 'bolder', 'lighter', 100-900)
                chart.data.datasets.forEach((dataset, i) => {
                    chart.getDatasetMeta(i).data.forEach((arc, index) => {
                        const data = dataset.data[index];
                        const position = arc.tooltipPosition();
                        const angle = (arc.startAngle + arc.endAngle) / 2;
                        const offset = 35; // Измените величину смещения по вашему вкусу
                        const x = position.x + Math.cos(angle) * offset;
                        const y = position.y + Math.sin(angle) * offset;

                        // Устанавливаем выравнивание текста в зависимости от угла
                        if (angle >= -Math.PI / 2 && angle <= Math.PI / 2) {
                            ctx.textAlign = 'left'; // Справа
                        } else {
                            ctx.textAlign = 'right'; // Слева
                        }

                        // Устанавливаем цвет текста в цвет секции
                        ctx.fillStyle = arc.options.backgroundColor;
                        

                        // Устанавливаем размер шрифта
                        ctx.font = `${fontWeight} ${fontSize}px Arial`;
                        // Функция для переноса слов
                        const wrapText = (text, x, y, maxWidth, lineHeight) => {
                            const words = text.split(' ');
                            let line = '';
                            let lineY = y;

                            for (let n = 0; n < words.length; n++) {
                                const testLine = line + words[n] + ' ';
                                const metrics = ctx.measureText(testLine);
                                const testWidth = metrics.width;

                                if (testWidth > maxWidth && n > 0) {
                                    ctx.fillText(line, x, lineY);
                                    line = words[n] + ' ';
                                    lineY += lineHeight;
                                } else {
                                    line = testLine;
                                }
                            }

                            ctx.fillText(line, x, lineY);
                        };

                        // Определяем максимальную ширину текста и высоту строки
                        const maxWidth = 60; // Задайте максимальную ширину по вашему усмотрению
                        const lineHeight = 20; // Задайте высоту строки по вашему усмотрению

                        // Вызываем функцию для переноса слов
                        wrapText(chart.data.labels[index], x, y, maxWidth, lineHeight);
                    });
                });
            }
        }]
    });
}


const options = {
    //circumference: 2 * Math.PI, // Полный оборот для сегментов
    rotation: -Math.PI / 2, // Начальный угол для отрисовки сегментов
    cutout: '50%', // Размер внутреннего отверстия
    radius: '60%', // Радиус графика
    spacing: 0, // Расстояние между сегментами
    hoverOffset: 25,
    // Дополнительные настройки
    responsive: false, // График будет адаптивным
    maintainAspectRatio: true, // Сохранять соотношение сторон при изменении размера
    aspectRatio: 1, // Соотношение сторон графика
    devicePixelRatio: window.devicePixelRatio, // Соотношение пикселей устройства

    locale: 'en-US', // Локаль для форматирования значений
    indexAxis: 'x', // Ось индексов для категориальных данных
    skipNull: true, // Пропускать нулевые значения
    segment: { // Настройки сегментов
        borderColor: 'blue', // Цвет границы сегментов
        borderWidth: 2 // Ширина границы сегментов
    },

    // Настройки анимации
    animation: {
        duration: 500, // Продолжительность анимации в миллисекундах
        easing: 'easeInOutQuart', // Эффект анимации
        animateRotate: true, // Анимация вращения
        animateScale: false // Анимация масштабирования
    },

    // Настройки всплывающих подсказок


    plugins: {
        tooltip: {
            enabled: true, // Включить или отключить всплывающие подсказки
            mode: 'nearest', // Режим подсказки: 'index', 'nearest', 'dataset', 'point'
            intersect: true, // Проверка пересечения для подсказок
            backgroundColor: 'rgba(255, 255, 255, 0.55)', // Цвет фона всплывающей подсказки
            bodyColor: 'black', // Цвет заголовка всплывающей подсказки
            titleFont: {
                display: false,
                size: 16, // Размер шрифта заголовка
                family: 'Arial', // Шрифт заголовка
                style: 'italic', // Стиль шрифта заголовка
                weight: 'bold', // Толщина шрифта заголовка
            },
            bodyFont: {
                size: 14, // Размер шрифта тела подсказки (например, 12, 14, 16 и т.д.)
                family: 'Arial', // Шрифт тела подсказки (например, 'Arial', 'Verdana', 'Helvetica' и т.д.)
                style: 'normal', // Стиль шрифта тела подсказки ('normal', 'italic', 'oblique')
                weight: 'bolder', // Толщина шрифта тела подсказки ('normal', 'bold', 'bolder', 'lighter', или значения от 100 до 900)
            },
            footerFont: {
                size: 12, // Размер шрифта нижнего колонтитула подсказки
                family: 'Arial', // Шрифт нижнего колонтитула подсказки
                style: 'normal', // Стиль шрифта нижнего колонтитула
                weight: 'normal', // Толщина шрифта нижнего колонтитула
            },
            padding: 10, // Внутренний отступ подсказки
            displayColors: false, // Показывать цветные блоки рядом с текстом подсказки
            borderColor: 'black', // Цвет границы подсказки
            borderWidth: 1, // Ширина границы подсказки
            caretSize: 5, // Размер указателя подсказки (треугольника)
            cornerRadius: 10, // Радиус скругления углов подсказки
            xPadding: 10, // Горизонтальный внутренний отступ
            yPadding: 10, // Вертикальный внутренний отступ
            callbacks: {
                // Коллбэк для кастомизации текста подсказки
                label: function (tooltipItem, data) {
                    //console.log('--------------= ' + tooltipItem.formattedValue);
                    //test = tooltipItem;
                    //console.log('--------------= ' + data);

                    //const dataset = data.datasets[tooltipItem.dataIndex];
                    const value = tooltipItem.formattedValue + " баллов";
                    return `${value}`;
                },
                title: function () {
                    return ''; // Возвращаем пустую строку, чтобы убрать заголовок
                },
                footer: function () {
                    return ''; // Возвращаем пустую строку, чтобы убрать нижний колонтитул
                }
            }
        },
        title: {
            display: true, // Отображать заголовок
            text: 'Стиль борьбы', // Текст заголовка
            font: {
                size: 25, // Размер шрифта заголовка (например, 16, 18, 20 и т.д.)
                family: 'Arial', // Шрифт заголовка (например, 'Arial', 'Verdana', 'Helvetica' и т.д.)
                style: 'normal', // Стиль шрифта заголовка ('normal', 'italic', 'oblique')
                weight: 'bolder', // Толщина шрифта заголовка ('normal', 'bold', 'bolder', 'lighter', или значения от 100 до 900)
                lineHeight: 1, // Высота строки заголовка (например, 1, 1.2, 1.5 и т.д.)
            },
            color: 'white', // Цвет текста заголовка
            align: 'center', // Выравнивание заголовка ('start', 'center', 'end')
            padding: {
                top: 40, // Внутренний отступ сверху (например, 10, 15 и т.д.)
                bottom: 0 // Внутренний отступ снизу (например, 10, 15 и т.д.)
            }
        },
        legend: {
            display: false, // Отображать легенду
            position: 'top', // Положение легенды: 'top', 'left', 'bottom', 'right'
            align: 'center', // Выравнивание легенды: 'start', 'center', 'end'
            labels: {
                boxWidth: 40, // Ширина коробки цвета
                padding: 10, // Отступы внутри легенды
                usePointStyle: false, // Использовать стили точек для легенды
                color: 'white', // Цвет текста легенды
                font: {
                    size: 12, // Размер шрифта текста легенды
                    style: 'normal', // Стиль шрифта: 'normal', 'italic', 'oblique'
                    family: 'Arial', // Семейство шрифта
                    weight: 'normal' // Толщина шрифта: 'normal', 'bold', 'bolder', 'lighter', etc.
                }
            }
        },
    }
};