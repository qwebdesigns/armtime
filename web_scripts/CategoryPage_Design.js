var how_sort = [];

function showCategories(flag) {
    switch (flag) {
        case 'pro':
            how_sort[0] = 'pro';
            break;
        case 'common':
            how_sort[0] = 'common';
            break;
    }
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('categoriesPage').style.display = 'flex';
}

function showMain() {
    document.getElementById('categoriesPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'flex';
}

function showCategory(category){
    if (category == '65' || category == '75' || category == '85' || category == '95' || category == '105' || category == '105+') {
        how_sort[1] = category;
        openSort(how_sort);
    }
    else{
        alert('Error 002x01');
    }
}

