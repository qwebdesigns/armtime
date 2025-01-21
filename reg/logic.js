document.getElementById('yourFormId').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    const formtimestamp = new Date().toISOString();
    let newFormObject = {
        "Временная метка": formtimestamp,
        "ФИО": formObject["Member_name"],
        "Email": formObject["Email"],
        "Подпись": formObject["Podsis"],
        "Вес участника": formObject["Member_weight"],
        "Строгий подъем на бицепс у стены": formObject["Member_biceps"],
        "Сгибатель кисти": formObject["Member_flexor"],
        "Боковое давление": formObject["Member_pressure"],
        "Подъём на луч": formObject["Member_luch"],
        "Пронация": formObject["Member_pronator"],
        "Отведение": formObject["Member_otved"],
        "Французский жим": formObject["Member_franc"]
    };
    



    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzEA3gbDv-DsQ4jcG-Uk9o14GXeZDtWqJdNoeeXkiKywgdjj0MMc1zJOtbOW_A7qmQz/exec?gid=0', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Success:', JSON.parse(xhr.responseText));
        }
    };
    xhr.send(JSON.stringify(newFormObject));
    
    //console.log('Success:', JSON.stringify(formObject));
});