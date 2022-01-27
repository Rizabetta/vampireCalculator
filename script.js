let a = '0'; // first number
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
    if (!event.target.classList.contains('d16')) return;
    // нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) {
        a = '0';
        b = '';
        sign = '';
        return
    };

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .    
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            if (a === '0' && key !== '.') a = key; else
                a += key;

            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            if (b === '0' && key !== '.') b = key; else
                if (b === '' && key === '.') b += '0.'; else
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
        console.log(a);
        return;
    }

    // нажата =
    a = parseFloat(a);
    b = parseFloat(b);
    if (key === '=') {
        let c = a;
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                if (a.toString().length > 8) a = a.toFixed(8);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = (a * b);
                break;
            case "/":
                if (b == '0') {
                    out.textContent = 'ошибка';
                    a = '0';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        finish = true;
        if (isNaN(a)) a = 'ошибка';
        if (isNaN(b)) b = 'ошибка';
        out.textContent = a;
        //out.textContent = a.toFixed(2);
        console.table(a, b, sign);

        var p = document.createElement('p');
        p.classList.add('history-operations');

        if ((a == b && b == 0) || (a == b && b == '')) p.innerHTML = c + '=' + a; else
            p.innerHTML = c + sign + b + '=' + a;
        if (a == c && sign == "" && isNaN(b) == false) p.innerHTML = b + '=' + b;
        if (a == c && sign == "" && isNaN(b) !== false) p.innerHTML = a;
        container.appendChild(p);
        console.log(c, sign, b, '=', a);

        if (isNaN(a)) a = '0';
        if (isNaN(b)) b = '';
    }

}