let a = ''; // first number
let b = ''; // secont number
let sign = ''; // знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// экран 
const out = document.querySelector('.calc-screen p');
const container = document.querySelector('.calc-history');

function clearAll() {
    a = ''; // first number and result
    b = ''; // second number 
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .    
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (a === '0' && key !== '0' && key !== '.') a = key; else
                a += key;

            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            if (b === '0' && key !== '0' && key !== '.') b = key; else
                b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.table(a, b, sign);
        return;
    }

    // нажата =
    if (key === '=') {
        let c = a;
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;

        out.textContent = a;
        console.table(a, b, sign);
        var p = document.createElement("p");
        if (a == b && b == 0) p.innerHTML = c + '=' + a; else
            p.innerHTML = c + sign + b + '=' + a;
        container.appendChild(p);
        console.log(c, sign, b, '=', a);
    }

}