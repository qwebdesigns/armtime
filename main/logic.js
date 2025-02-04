// Выбираем все элементы с id="link"
const links = document.querySelectorAll('#link');
const loadingElement = document.querySelector('.loadingotherpage');
const loadingText = document.getElementById('loadingText');
// Добавляем обработчик события на каждый элемент
links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        loadingElement.style.display = 'flex'; // Показываем элемент

        // Симуляция загрузки (например, переход на другую страницу через 2 секунды)
        setTimeout(() => {
            loadingElement.style.display = 'none'; // скрываем элемент
            window.location.href = this.href; // Переход по ссылке
        }, 1200);
    });
});

var is_open_modal = false;
var member_code = localStorage.getItem('unical_member_code');


const stat_button =  document.getElementsByClassName('haracter')[0];
stat_button.addEventListener('click', function(){
    if (member_code == null) {
        document.getElementById('codeModal').style.display = 'flex';
        is_open_modal = true;
    } else {
        window.location.href = "../stats/?unicod=\""+member_code+"\"";
    }
});




document.addEventListener('click', function (event) {
    var modal = document.getElementById('codeModal');
    var isClickInside = document.getElementsByClassName('modal-content')[0].contains(event.target) || stat_button.contains(event.target);
    if (!isClickInside) {
        modal.style.display = 'none';
        is_open_modal = false;
    }
});




document.getElementById('codeAccept').addEventListener('click', function () {
    var code = document.getElementById('codeInput').value;
    var regex = /^[^\s]{3}-[^\s]{3}-[^\s]{3}-[^\s]{3}$/;

    if (!regex.test(code)) {
        document.getElementById('codeInput').style.border = '1px solid red';
        document.getElementById('codeInput').value = '';
        document.getElementById('codeInput').placeholder = 'Формат: XXX-XXX-XXX-XXX';
    } else {
        loadingText.innerHTML = 'Проверка кода...';
        loadingElement.style.display = 'flex'; // Показываем элемент
        let data = JSON.parse(localStorage.getItem('cachedJsonData'));
        let codeFound = false;

        loadingElement.style.display = 'flex';
        loadingText.innerHTML = 'Проверка кода...';
        for (let i = 0; i < data.length; i++) {
            if (data[i]["Код"] === code) {
                localStorage.setItem('unical_member_code', code);
                window.location.href = "../stats/?unicod=\"" + code + "\"";
                codeFound = true;
                break;
            }
        }

        if (!codeFound) {
            loadingElement.style.display = 'none';
            loadingText.innerHTML = '';


            document.getElementById('codeInput').style.border = '1px solid red';
            document.getElementById('codeInput').value = '';
            document.getElementById('codeInput').placeholder = 'Код не найден..';

            loadingElement.style.display = 'none';
            loadingText.innerHTML = '';
        }
    }
});
