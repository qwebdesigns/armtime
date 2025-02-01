let data = JSON.parse(localStorage.getItem('cachedJsonData'));
let currentData;
const filePath = '../settings/category.json';
let currentCategory;
let currentName;

const current_url = new URL(window.location.href);
const linkName = current_url.searchParams.get('unicod'); //.replace(/"/g, '');;
if (linkName) {
    currentName = linkName.replace(/"/g, '');
}
else{
    currentName = "000-000-000-001";
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
                    //console.log("Текущая категория:", currentCategory, "Вес участника:", weight);
                }
            }
            getAllParsentages(currentCategory, currentData);
        })
        .catch(error => {
            console.error('Ошибка при загрузке JSON:', error);
        });



}




function findParticipant(memberCode) {
    if (!data) {
        console.log("Данные не найдены");
        return;
    }
    if (!memberCode) {
        console.log("Укажите код участника");
        return;
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i]["Код"] === memberCode) {
            currentData = data[i];
        }
    }
    //console.log("currentData", currentData);
    
    getCurrentCategory(currentData["Вес участника"]);
}

// Пример использования
findParticipant(currentName);



let percentagesAll;
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
    percentagesAll = {
        "Строгий подъем на бицепс": Math.floor(calculatePercentage(min_max_values["MIN Biceps"], min_max_values["MAX Biceps"], currentDat["Строгий подъем на бицепс"])),
        "Сгибатель кисти": Math.floor(calculatePercentage(min_max_values["MIN Wrist Flexor"], min_max_values["MAX Wrist Flexor"], currentDat["Сгибатель кисти"])),
        "Боковое давление": Math.floor(calculatePercentage(min_max_values["MIN Side Pressure"], min_max_values["MAX Side Pressure"], currentDat["Боковое давление"])),
        "Подъем на луч": Math.floor(calculatePercentage(min_max_values["MIN Lift on Radius"], min_max_values["MAX Lift on Radius"], currentDat["Подъем на луч"])),
        "Пронация": Math.floor(calculatePercentage(min_max_values["MIN Pronation"], min_max_values["MAX Pronation"], currentDat["Пронация"])),
        "Отведение": Math.floor(calculatePercentage(min_max_values["MIN Abduction"], min_max_values["MAX Abduction"], currentDat["Отведение"])),
        "Французский жим": Math.floor(calculatePercentage(min_max_values["MIN French Press"], min_max_values["MAX French Press"], currentDat["Французский жим"])),
    };
    //console.log("percentagesAll", percentagesAll);
    let ringPercentages = {
        "ring3": Math.floor((percentagesAll["Французский жим"] + percentagesAll["Боковое давление"]) / 2),
        "ring2": Math.floor((percentagesAll["Подъем на луч"] + percentagesAll["Пронация"] + percentagesAll["Отведение"]) / 3),
        "ring1": Math.floor((percentagesAll["Строгий подъем на бицепс"] + percentagesAll["Сгибатель кисти"] + percentagesAll["Боковое давление"]) / 3),
    }
    
    let ring0 = Math.floor((ringPercentages["ring1"] + ringPercentages["ring2"] + ringPercentages["ring3"]) / 3);

    //console.log("ring0: ", ring0, "ring1: ", ringPercentages["ring1"], "ring2: ", ringPercentages["ring2"], "ring3: ", ringPercentages["ring3"]);



    document.getElementById("avatar").src = currentDat["Фото"];
    //console.log(currentDat["Фото"]);
    document.getElementById("FIO").innerHTML = currentDat["Фамилия, имя"];
    document.getElementById("podpis").innerHTML = currentDat["Подпись"];

    document.getElementById("member_weight").textContent = currentDat['Вес участника'] + " кг";
    
    document.getElementById("circle0").style = "--percentage: " + ring0 + "%;";
    document.getElementById("ring0_ball").innerHTML = ring0;

    document.getElementById("circle1").firstElementChild.textContent = ringPercentages["ring1"];
    document.getElementById("circle1").style = "--percentage: " + ringPercentages["ring1"] + "%;";

    document.getElementById("circle2").firstElementChild.textContent = ringPercentages["ring2"];
    document.getElementById("circle2").style = "--percentage: " + ringPercentages["ring2"] + "%;";

    document.getElementById("circle3").firstElementChild.textContent = ringPercentages["ring3"];
    document.getElementById("circle3").style = "--percentage: " + ringPercentages["ring3"] + "%;";

    rings_data.push(percentagesAll["Строгий подъем на бицепс"]); //document.getElementById("b_c_circle1_1").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Строгий подъем на бицепс"] + "%";
    rings_data.push(percentagesAll["Сгибатель кисти"]); //document.getElementById("b_c_circle1_2").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Сгибатель кисти"] + "%";
    rings_data.push(percentagesAll["Боковое давление"]); //document.getElementById("b_c_circle1_3").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Боковое давление"] + "%";

    rings_data.push(percentagesAll["Подъем на луч"]); //document.getElementById("b_c_circle2_1").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Подъем на луч"] + "%";
    rings_data.push(percentagesAll["Пронация"]); //document.getElementById("b_c_circle2_2").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Пронация"] + "%";
    rings_data.push(percentagesAll["Отведение"]); //document.getElementById("b_c_circle2_3").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Отведение"] + "%";

    rings_data.push(percentagesAll["Французский жим"]); //document.getElementById("b_c_circle3_1").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Французский жим"] + "%";
    rings_data.push(percentagesAll["Боковое давление"]); //document.getElementById("b_c_circle3_2").getElementsByClassName("bar-fill")[0].style.width = percentagesAll["Боковое давление"] + "%";
    //console.warn(rings_data)

    var act_card_color;
    if (currentDat['Карточка'] && currentDat['Карточка'] != card_variant[0]['Название карточки']) {
        var backs = document.getElementById('cardBack');
        var memberCard = currentDat['Карточка'];
        for (let i = 0; i < card_variant.length; i++) {
            if (memberCard === card_variant[i]['Название карточки']) {
                backs.style = "--hue: " + card_variant[i]['Цветовой круг'] + "deg;";
                document.getElementById('card').classList.add('big_number');
                document.getElementById('card').style.setProperty('--card_acktent', card_variant[i]["Основной акцент"]);
                document.getElementById('circle0').classList.add('CraditenCard');
                act_card_color = card_variant[i]["Основной акцент"];
                document.getElementById('share_button').style.background = card_variant[i]["Основной акцент"];
                document.getElementById('share_button').classList.add('big_number');
                document.getElementsByClassName('cardStandart')[0].remove();
                document.getElementsByClassName('cardContent')[0].classList.add('isDeleteStandartCard');
            }
        }


        

    }
    
    GenerateChart(rings_data, 'circle1', act_card_color);

}
let rings_data = [];

