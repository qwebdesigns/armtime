let stataBlocks = document.querySelectorAll('#stata');

stataBlocks.forEach(block => {
    let h1s = block.querySelectorAll('h1');
    let krug = block.querySelector('.krug');

    // Функция для обновления стиля krug
    const updateKrugStyle = () => {
        h1s.forEach((h1, index) => {
            if (h1) {
                let pr = h1.textContent;
                krug.style.background = `conic-gradient(#ffffffa7 0% calc(${pr} * 1%), #ffffff41 calc(${pr} * 1%))`;
            }
        });
    };

    // Функция для вычисления среднего значения
    const calculateAverage = () => {
        let total = 0;
        let count = 0;

        h1s.forEach((h1, index) => {
            if (index > 0) { // Пропускаем первый h1
                total += parseFloat(h1.textContent) || 0; // Преобразуем текст в число
                count++;
            }
        });

        if (count > 0) {
            let average = total / count;
            h1s[0].textContent = average.toFixed(2); // Обновляем первый h1
        }
    };

    // Инициализация стиля и среднего значения при загрузке
    updateKrugStyle();
    calculateAverage();

    // Создание наблюдателя для отслеживания изменений в h1
    const observer = new MutationObserver(() => {
        updateKrugStyle();
        calculateAverage(); // Пересчитываем среднее при изменении
    });
    
    h1s.forEach(h1 => {
        observer.observe(h1, { childList: true, subtree: true });
    });

    // Важно: не забудьте отключить наблюдателя, если он больше не нужен
    // observer.disconnect(); // Вызовите это, когда нужно остановить наблюдение
});



// Function to handle circle clicks
function handleCircleClick(circleIndex) {
    // Скрываем все элементы
    document.getElementById('dlya_kruga_2').classList.remove('show');
    document.getElementById('dlya_kruga_3').classList.remove('show');
    document.getElementById('dlya_kruga_4').classList.remove('show');

    // Показываем соответствующий элемент
    if (circleIndex === 2) {
        document.getElementById('dlya_kruga_2').classList.add('show');
    } else if (circleIndex === 3) {
        document.getElementById('dlya_kruga_3').classList.add('show');
    } else if (circleIndex === 4) {
        document.getElementById('dlya_kruga_4').classList.add('show');
    }
}

// Adding event listeners to the circles
document.querySelector('.stata-2').addEventListener('click', () => handleCircleClick(2));
document.querySelector('.stata-3').addEventListener('click', () => handleCircleClick(3));
document.querySelector('.stata-4').addEventListener('click', () => handleCircleClick(4));