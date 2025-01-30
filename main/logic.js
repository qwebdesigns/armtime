// Выбираем все элементы с id="link"
const links = document.querySelectorAll("#link");
const loadingElement = document.querySelector(".loadingotherpage");
const loadingText = document.getElementById("loadingText");
// Добавляем обработчик события на каждый элемент
links.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    loadingElement.style.display = "flex"; // Показываем элемент

    // Симуляция загрузки (например, переход на другую страницу через 2 секунды)
    setTimeout(() => {
      loadingElement.style.display = "none"; // cкрываем элемент
      window.location.href = this.href; // Переход по ссылке
    }, 1200);
  });
});

// Переменная для отслеживания состояния модального окна
// Переменная для отслеживания состояния модального окна
var is_open_modal = false;
// Получаем уникальный код участника из localStorage
var member_code = localStorage.getItem("unical_member_code");

// Получаем кнопку для отображения статистики
const stat_button = document.getElementsByClassName("haracter")[0];
// Добавляем обработчик события на кнопку
stat_button.addEventListener("click", function () {
  // Если уникальный код участника отсутствует
  if (member_code == null) {
    // Показываем модальное окно для ввода кода
    document.getElementById("codeModal").style.display = "flex";
    is_open_modal = true;
  } else {
    // Переходим на страницу статистики с уникальным кодом
    window.location.href = '../stats/?unicod="' + member_code + '"';
  }
});

// Добавляем обработчик события на документ для закрытия модального окна
document.addEventListener("click", function (event) {
  // Получаем модальное окно
  var modal = document.getElementById("codeModal");
  // Проверяем, был ли клик внутри модального окна или на кнопке
  var isClickInside =
    document
      .getElementsByClassName("modal-content")[0]
      .contains(event.target) || stat_button.contains(event.target);
  // Если клик был вне модального окна и кнопки
  if (!isClickInside) {
    // Скрываем модальное окно
    modal.style.display = "none";
    is_open_modal = false;
  }
});

// Добавляем обработчик события на кнопку подтверждения кода
document.getElementById("codeAccept").addEventListener("click", function () {
  // Получаем введенный код
  var code = document.getElementById("codeInput").value;
  // Регулярное выражение для проверки формата кода
  var regex = /^[^\s]{3}-[^\s]{3}-[^\s]{3}-[^\s]{3}$/;

  // Если код не соответствует формату
  if (!regex.test(code)) {
    // Устанавливаем красную границу и очищаем поле ввода
    document.getElementById("codeInput").style.border = "1px solid red";
    document.getElementById("codeInput").value = "";
    document.getElementById("codeInput").placeholder =
      "Формат: XXX-XXX-XXX-XXX";
  } else {
    // Обновляем текст загрузки и показываем элемент загрузки
    loadingText.innerHTML = "Проверка кода...";
    loadingElement.style.display = "flex";
    // Получаем кэшированные данные из localStorage
    let data = JSON.parse(localStorage.getItem("cachedJsonData"));
    let codeFound = false;

    // Проверяем наличие кода в данных
    for (let i = 0; i < data.length; i++) {
      if (data[i]["Код"] === code) {
        // Сохраняем уникальный код участника в localStorage
        localStorage.setItem("unical_member_code", code);
        // Переходим на страницу статистики с уникальным кодом
        window.location.href = '../stats/?unicod="' + code + '"';
        codeFound = true;
        break;
      }
    }

    // Если код не найден
    if (!codeFound) {
      // Скрываем элемент загрузки и очищаем текст загрузки
      loadingElement.style.display = "none";
      loadingText.innerHTML = "";

      // Устанавливаем красную границу и очищаем поле ввода
      document.getElementById("codeInput").style.border = "1px solid red";
      document.getElementById("codeInput").value = "";
      document.getElementById("codeInput").placeholder = "Код не найден..";

      // Скрываем элемент загрузки и очищаем текст загрузки
      loadingElement.style.display = "none";
      loadingText.innerHTML = "";
    }
  }
});
