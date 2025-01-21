
document.getElementById('circle1').addEventListener('click', open_ring1);
document.getElementById('circle2').addEventListener('click', open_ring2);
document.getElementById('circle3').addEventListener('click', open_ring3);

//показываем первые 3 бара от колца 1
function open_ring1() {
    //делаем видимыми наши бары
    document.getElementById('b_c_circle1_1').style.display = 'block';
    document.getElementById('b_c_circle1_2').style.display = 'block';
    document.getElementById('b_c_circle1_3').style.display = 'block';
    //даём им анимацию появления
    document.getElementById('b_c_circle1_1').classList.add('visible');
    document.getElementById('b_c_circle1_2').classList.add('visible');
    document.getElementById('b_c_circle1_3').classList.add('visible');
    //скрываем остальные бары
    document.getElementById('b_c_circle2_1').style.display = 'none';
    document.getElementById('b_c_circle2_2').style.display = 'none';
    document.getElementById('b_c_circle2_3').style.display = 'none';
    document.getElementById('b_c_circle3_1').style.display = 'none';
    document.getElementById('b_c_circle3_2').style.display = 'none';
}
//показываем вторые 3 бара от колца 2
function open_ring2() {
    //делаем видимыми наши бары
    document.getElementById('b_c_circle2_1').style.display = 'block';
    document.getElementById('b_c_circle2_2').style.display = 'block';
    document.getElementById('b_c_circle2_3').style.display = 'block';
    //даём им анимацию появления
    document.getElementById('b_c_circle2_1').classList.add('visible');
    document.getElementById('b_c_circle2_2').classList.add('visible');
    document.getElementById('b_c_circle2_3').classList.add('visible');
    //скрываем остальные бары
    document.getElementById('b_c_circle1_1').style.display = 'none';
    document.getElementById('b_c_circle1_2').style.display = 'none';
    document.getElementById('b_c_circle1_3').style.display = 'none';
    document.getElementById('b_c_circle3_1').style.display = 'none';
    document.getElementById('b_c_circle3_2').style.display = 'none';
}
//показываем последние 2 бара от колца 3
function open_ring3() {
    //делаем видимыми наши бары
    document.getElementById('b_c_circle3_1').style.display = 'block';
    document.getElementById('b_c_circle3_2').style.display = 'block';
    //даём им анимацию появления
    document.getElementById('b_c_circle3_1').classList.add('visible');
    document.getElementById('b_c_circle3_2').classList.add('visible');
    //скрываем остальные бары
    document.getElementById('b_c_circle1_1').style.display = 'none';
    document.getElementById('b_c_circle1_2').style.display = 'none';
    document.getElementById('b_c_circle1_3').style.display = 'none';
    document.getElementById('b_c_circle2_1').style.display = 'none';
    document.getElementById('b_c_circle2_2').style.display = 'none';
    document.getElementById('b_c_circle2_3').style.display = 'none';
}