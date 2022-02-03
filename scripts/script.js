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
    a = '0'; // first number and result
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
        return
    };

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .   
    if (digit.includes(key)) {
        if (a.toString().length >= 8) {
            // console.log(parseInt(a) + 'd');
            // for (var count = 0; parseInt(a) > 10;) {
            //     a = a / 10;
            //     count++;
            // }
            // a = a + 'e' + count;
            while (a.toString().length >= 8)

                a = a.slice(0, -1);
            // a = Math.floor(a / 10);
        }
        if (b.toString().length >= 8) { b = b.slice(0, -1) };
        if (b === '.') b = '0.';
        if (sign === '') {
            // if (b === '' && sign === '') {
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
        console.log(a, 'это а и б ', b);
        return;
    }

    if (key === 'exp') {
        a = Math.exp(a);
        if (a.toString().length > 8) a = a.toPrecision(2);
        if (a == Infinity) a = "значение превышено";
        out.textContent = a;
    }

    if (key === '√') {
        a = Math.sqrt(a);
        if (a.toString().length > 8) a = a.toPrecision(2);
        if (isNaN(a)) a = "ошибка";
        out.textContent = a;
    }

    if (key === '%') {
        a = a / 100;
        if (a.toString().length > 8) a = a.toPrecision(2);
        out.textContent = a;
    }

    // нажата =
    a = parseFloat(a);
    b = parseFloat(b);
    if (isNaN(b)) b = 0;
    if (isNaN(a)) a = 0;
    if (key === '=') {
        var c = a;
        if (b === '') b = a;
        if (b === '.') b = '0.';
        switch (sign) {
            case "+":
                a = (+a) + (+b);
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
        if (isNaN(a) == false && isNaN(b) == false) { a = a.toPrecision(2); b = b.toPrecision(2); };
        if (a.toString().length > 8) { a = "значение превышено"; };

        if (a > 99999999) { a = "значение превышено"; };
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);

        var p = document.createElement('p');
        p.classList.add('history-operations');

        if ((a == b && b == 0) || (a == b && b == '')) p.innerHTML = c + '=' + a; else
            if (isNaN(b) == false || isNaN(a) == false)
                p.innerHTML = c + sign + b + '=' + a;
        if (a == c && sign == "" && isNaN(b) == false) p.innerHTML = a + '=' + a;
        if (a == c && sign == "" && isNaN(b) !== false) p.innerHTML = a;

        container.appendChild(p);
        console.log(c, sign, b, '=', a);

        if (isNaN(a) || a == 'значение превышено') a = '0';
        if (isNaN(b) || a == 'значение превышено') b = '';
    }

}