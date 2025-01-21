let data = JSON.parse(localStorage.getItem('cachedJsonData'));
let currentData;
const filePath = '../settings/category.json';
let currentCategory;
let currentName;

const current_url = new URL(window.location.href);
const linkName = current_url.searchParams.get('member');//.replace(/"/g, '');;
if (linkName) {
    currentName = linkName.replace(/"/g, '');
}
else{
    currentName = "Чучкалов Даниил";
}

function getCurrentCategory(weight) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не в порядке: ' + response.statusText);
            }
            return response.json(); // Парсим JSON
        })
        .then(data => {
            const categoryData = data["Categories"]; // Здесь вы можете работать с вашими данными

            for (let i = 0; i < categoryData.length; i++) {
                if (weight >= parseInt(categoryData[i]["Minimum Participant Weight"]) && weight <= parseInt(categoryData[i]["Maximum Participant Weight"])) {
                    currentCategory = categoryData[i];
                    console.log("Текущая категория:", currentCategory, "Вес участника:", weight);
                }
            }
            getAllParsentages(currentCategory, currentData);
        })
        .catch(error => {
            console.error('Ошибка при загрузке JSON:', error);
        });



}




function findParticipant(fullName) {
    if (!data) {
        console.log("Данные не найдены");
        return;
    }
    if (!fullName) {
        console.log("Укажите имя участника");
        return;
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i]["Фамилия, имя"] === fullName) {
            currentData = data[i];
        }
    }
    console.log("currentData", currentData);
    
    getCurrentCategory(currentData["Вес участника"]);
}

// Пример использования
findParticipant(currentName);




function calculatePercentage(min, max, value) {
    return ((value - min) / (max - min)) * 100;
}

function getAllParsentages(currentCat, currentDat) {
    if (!currentCat || !currentDat) {
        console.log("Данные не найдены");
        return;
    }


    const min_max_values = currentCat['Weights'];
    //console.log('min_max_values', min_max_values);
    let percentagesAll = {
        "Строгий подъем на бицепс": Math.floor(calculatePercentage(min_max_values["MIN Biceps"], min_max_values["MAX Biceps"], currentDat["Строгий подъем на бицепс"])),
        "Сгибатель кисти": Math.floor(calculatePercentage(min_max_values["MIN Wrist Flexor"], min_max_values["MAX Wrist Flexor"], currentDat["Сгибатель кисти"])),
        "Боковое давление": Math.floor(calculatePercentage(min_max_values["MIN Side Pressure"], min_max_values["MAX Side Pressure"], currentDat["Боковое давление"])),
        "Подъем на луч": Math.floor(calculatePercentage(min_max_values["MIN Lift on Radius"], min_max_values["MAX Lift on Radius"], currentDat["Подъем на луч"])),
        "Пронация": Math.floor(calculatePercentage(min_max_values["MIN Pronation"], min_max_values["MAX Pronation"], currentDat["Пронация"])),
        "Отведение": Math.floor(calculatePercentage(min_max_values["MIN Abduction"], min_max_values["MAX Abduction"], currentDat["Отведение"])),
        "Французский жим": Math.floor(calculatePercentage(min_max_values["MIN French Press"], min_max_values["MAX French Press"], currentDat["Французский жим"])),
    };
    console.log("percentagesAll", percentagesAll);
    let ringPercentages = {
        "ring3": Math.floor((percentagesAll["Французский жим"] + percentagesAll["Боковое давление"]) / 2),
        "ring2": Math.floor((percentagesAll["Строгий подъем на бицепс"] + percentagesAll["Сгибатель кисти"] + percentagesAll["Боковое давление"]) / 3),
        "ring1": Math.floor((percentagesAll["Подъем на луч"] + percentagesAll["Пронация"] + percentagesAll["Отведение"]) / 3),
    }
    
    let ring0 = Math.floor((ringPercentages["ring1"] + ringPercentages["ring2"] + ringPercentages["ring3"]) / 3);

    console.log("ring0: ", ring0, "ring1: ", ringPercentages["ring1"], "ring2: ", ringPercentages["ring2"], "ring3: ", ringPercentages["ring3"]);



    document.getElementById("avatar").src = currentDat["Фото"];
    console.log(currentDat["Фото"]);
    document.getElementById("FIO").innerHTML = currentDat["Фамилия, имя"];
    document.getElementById("podpis").innerHTML = currentDat["Подпись"];

    document.getElementById("circle0").firstElementChild.textContent = ring0;
    document.getElementById("circle0").style = "--percentage: " + ring0 + "%;";
    document.getElementById("circle1").firstElementChild.textContent = ringPercentages["ring1"];
    document.getElementById("circle1").style = "--percentage: " + ringPercentages["ring1"] + "%;";
    document.getElementById("circle2").firstElementChild.textContent = ringPercentages["ring2"];
    document.getElementById("circle2").style = "--percentage: " + ringPercentages["ring2"] + "%;";
    document.getElementById("circle3").firstElementChild.textContent = ringPercentages["ring3"];
    document.getElementById("circle3").style = "--percentage: " + ringPercentages["ring3"] + "%;";

    document.getElementById("b_c_circle1_1").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Строгий подъем на бицепс"] + "%";
    document.getElementById("b_c_circle1_2").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Сгибатель кисти"] + "%";
    document.getElementById("b_c_circle1_3").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Боковое давление"] + "%";
    document.getElementById("b_c_circle2_1").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Подъем на луч"] + "%";
    document.getElementById("b_c_circle2_2").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Пронация"] + "%";
    document.getElementById("b_c_circle2_3").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Отведение"] + "%";
    document.getElementById("b_c_circle3_1").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Французский жим"] + "%";
    document.getElementById("b_c_circle3_2").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Боковое давление"] + "%";

}