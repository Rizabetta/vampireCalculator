document.getElementById("translation").onclick = () => {
    let inoutNumder = +document.getElementById("decimalNumber").value;
    let numberSystem = document.getElementById("s1");
    let message = inoutNumder + "₁₀ = ";

    if (numberSystem.value == 16) message += inoutNumder.toString(16) + "₁₆";
    else message += inoutNumder.toString(2) + "₂";

    var p = document.createElement('p');
    p.classList.add('history-operations');
    p.innerHTML = message;
    container.appendChild(p);
}