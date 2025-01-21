const buttonUploadPhoto = document.getElementById('button_upload_photo');
const fileInput = document.getElementById('file_input');
const userPhoto = document.getElementById('user_photo');
const cropperContainer = document.getElementById('cropper-container');
const cropperImage = document.getElementById('cropper_image');
const overlay = document.getElementById('overlay');
const cropButton = document.getElementById('crop_button');
let cropper;

buttonUploadPhoto.addEventListener('click', () => {
   fileInput.click(); // Открываем диалог выбора файла
});

fileInput.addEventListener('change', (event) => {
   const file = event.target.files[0];
   if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
         cropperImage.src = e.target.result; // Устанавливаем src для изображения в cropper
         cropperContainer.style.display = 'block'; // Показываем контейнер обрезки
         overlay.style.display = 'block'; // Показываем полупрозрачный фон
         cropButton.style.display = 'block'; // Скрываем контейнер обрезки
         buttonUploadPhoto.style.display = 'none'; // Скрываем кнопку загрузки фото

         // Инициализация Cropper.js
         if (cropper) {
            cropper.destroy(); // Уничтожаем предыдущий экземпляр
         }
         cropper = new Cropper(cropperImage, {
            aspectRatio: 1, // Устанавливаем соотношение сторон
            viewMode: 1, // Устанавливаем режим просмотра
            background: false, // Отключаем фоновую сетку
            autoCropArea: 1, // Устанавливаем область обрезки на 100%
         });
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
   }
});

cropButton.addEventListener('click', () => {
   const canvas = cropper.getCroppedCanvas();
   userPhoto.src = canvas.toDataURL(); // Устанавливаем обрезанное изображение в элемент user_photo
   cropperContainer.style.display = 'none'; // Скрываем контейнер обрезки
   overlay.style.display = 'none'; // Скрываем полупрозрачный фон
   cropButton.style.display = 'none'; // Скрываем контейнер обрезки
   buttonUploadPhoto.style.display = 'block'; // Скрываем кнопку загрузки фото
   buttonUploadPhoto.querySelector('h2').innerHTML = 'Изменить фото'; 
   buttonUploadPhoto.querySelector('p').innerHTML = 'Данное фото будет в вашем профиле'; 

});

boc2 = document.getElementById('boc2');
boc1 = document.getElementById('boc1');
boc1.addEventListener('change', function() { boc2.value = boc1.value; });
boc2.addEventListener('change', function() { boc1.value = boc2.value; });

anketa_data = {
   "name": "Имя",
   "surname": "Фамилия",
   "patronymic": "Отчество",
   "date": "Дата рождения",
   "phone": "Телефон",
   "email": "E-mail",
   "password": "Пароль",
}



min_max = {
   'МИН Сгибатель кисти': 11,
   'МАКС Сгибатель кисти': 12,

   'МИН Боковое давление': 11,
   'МАКС Боковое давление': 12,

   'МИН Подъем на луч': 11,
   'МАКС Подъем на луч': 12,

   'МИН Пронация': 11,
   'МАКС Пронация': 12,

   'МИН Отведение': 11,
   'МАКС Отведение': 12,

   'МИН Турецкий жим': 11,
   'МАКС Турецкий жим': 12,
   
   'МИН Боковое давление': 11,
   'МАКС Боковое давление': 12
}