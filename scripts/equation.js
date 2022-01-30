let input1 = document.getElementById('x2');
let input2 = document.getElementById('x');
let input3 = document.getElementById('free');

document.getElementById('solve-equation').onclick = () => {
    let x2 = +input1.value;
    let x = +input2.value;
    let free = +input3.value;
    let discriminant = x * x - 4 * x2 * free;
    let message = '';

    if (x2 == 0) {
        input1.value = 1;
        alert('значение крэффициента при х² не может быть равно 0 ');
    }
    if (discriminant < 0) message = "нет корней"; else
        if (discriminant > 0) {
            message = 'x1 = ' + ((x * (-1) - Math.sqrt(discriminant)) / 2 * x2).toPrecision(2) + '; x2 = ' + ((x * (-1) + Math.sqrt(discriminant)) / 2 * x2).toPrecision(2);
        } else { message = 'x = ' + (x * (-1) / 2 * x2).toPrecision(2); }
    console.log(message);

    var p = document.createElement('p');
    p.classList.add('history-operations');
    p.innerHTML = message;
    container.appendChild(p);
}