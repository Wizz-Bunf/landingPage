
let priceInput = 0;
let priceFinal = 0;

function priceInputChange() {
    priceInput = Number(document.getElementById("priceInput").value);
    priceFinalChange();
}

// #region Select 1

let colorSelect = 1;
let colorSelectColor = red;
let colorSelectPrices = [1, 4, 1.2, 1.1, 1.3, 1.4];

function colorSelectSelection() {
    colorSelect = colorSelectPrices[Number(document.getElementById("color").value)];
    colorSelectColor = document.querySelector(`option[value="${Number(document.getElementById("color").value)}"]`).id;
    
    priceFinalChange();
}

// #endregion

// #region Select 2

let secondSelector = 1;
let secondSelectorPrices = [1, 2, 60];

document.querySelectorAll(".btnSelector2").forEach((element) => {
    element.addEventListener("click", (e) => { btnSelector2Selection(e) })
})

function btnSelector2Selection(e) {

    document.querySelectorAll(".btnSelector2").forEach((element) => {
        if (element.classList.contains("btn-info")) {
            element.classList.remove("btn-info");
            element.classList.add("btn-primary");
        }
    })

    e.target.classList.remove("btn-primary");
    e.target.classList.add("btn-info");
    secondSelector = secondSelectorPrices[Number(e.target.id)];

    priceFinalChange();

}

// #endregion

// #region Select 3

let thirdSelector = 1;

document.querySelectorAll(".btnSelector3").forEach((element) => {
    element.addEventListener("click", (e) => { btnSelector3Selection(e) })
})

function btnSelector3Selection(e) {
    if (e.target.classList.contains("btn-primary")) {
        e.target.classList.remove("btn-primary");
        e.target.classList.add("btn-info");
        thirdSelector += 50;
    } else {
        e.target.classList.remove("btn-info");
        e.target.classList.add("btn-primary");
        thirdSelector -= 50;
    }
    priceFinalChange();
}

// #endregion

function priceFinalChange() {
    document.getElementById("priceFinal").style.backgroundColor = colorSelectColor;

    priceFinal = priceInput * colorSelect * secondSelector * thirdSelector;
    document.getElementById("priceFinal").innerHTML = priceFinal + " €";
}