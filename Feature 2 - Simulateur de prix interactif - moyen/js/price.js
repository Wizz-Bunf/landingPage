let priceInput = 0;
let priceFinal = 0;

// Selecteurs
let colorSelect = 1;
let colorSelectColor = "red";
let colorSelectPrices = [1, 4, 1.2, 1.1, 1.3, 1.4];

let secondSelector = 1;
let secondSelectorPrices = [1, 2, 60];

let thirdSelector = 1;

// Générer dynamiquement le HTML
function renderUI() {
  const app = document.getElementById("price");
  app.innerHTML = `
    <main class="container-fluid d-flex flex-column mx-auto mt-5 px-5 pt-3 pb-5 bg-primary">
      <h1 class="text-white">Simulateur de prix interactif</h1>

      <label for="priceInput" class="fs-3 text-white">Prix</label>
      <div class="input-group mb-3">
        <span class="input-group-text bg-secondary text-white">€</span>
        <input type="number" id="priceInput" class="form-control" placeholder="123" />
        <span class="input-group-text bg-secondary text-white">.00</span>
      </div>

      <div class="container d-flex flex-column card p-4 bg-secondary">
        <label for="color" class="fs-4 text-white">Choix de la couleur</label>
        <select id="color" class="form-select">
          <option value="0" id="red">Rouge</option>
          <option value="1" id="blue">Bleu</option>
          <option value="2" id="#fd3f92">Fuchsia</option>
          <option value="3" id="#e7968b">Rose</option>
          <option value="4" id="#cc338b">Magenta</option>
          <option value="5" id="#960018">Carmin</option>
        </select>

        <div class="d-flex flex-column mt-3">
          <p class="fs-4 text-white">Capacité / Version</p>
          <div class="d-flex gap-3">
            <button type="button" class="btn btn-info btnSelector2" id="0">64 Go</button>
            <button type="button" class="btn btn-primary btnSelector2" id="1">128 Go</button>
            <button type="button" class="btn btn-primary btnSelector2" id="2">Premium</button>
          </div>
        </div>

        <div class="d-flex flex-column mt-3">
          <p class="fs-4 text-white">Options supplémentaires</p>
          <div class="d-flex gap-3">
            <button type="button" class="btn btn-primary btnSelector3" id="3-1">Garantie étendue</button>
            <button type="button" class="btn btn-primary btnSelector3" id="3-2">Accessoires</button>
          </div>
        </div>
      </div>

      <div class="container p-3 fs-1 mt-5 card text-white" id="priceFinal" style="background-color: red;">
        0 €
      </div>
    </main>
  `;
}

// Ajouter tous les event listeners après injection du HTML
function bindEvents() {
  document.getElementById("priceInput").addEventListener("input", priceInputChange);
  document.getElementById("color").addEventListener("change", colorSelectSelection);

  document.querySelectorAll(".btnSelector2").forEach((element) => {
    element.addEventListener("click", btnSelector2Selection);
  });

  document.querySelectorAll(".btnSelector3").forEach((element) => {
    element.addEventListener("click", btnSelector3Selection);
  });
}

// Input prix
function priceInputChange() {
  priceInput = Number(document.getElementById("priceInput").value);
  priceFinalChange();
}

// Sélection couleur
function colorSelectSelection() {
  const select = document.getElementById("color");
  const value = Number(select.value);
  colorSelect = colorSelectPrices[value];
  colorSelectColor = select.options[select.selectedIndex].id;
  priceFinalChange();
}

// Boutons capacité/version
function btnSelector2Selection(e) {
  document.querySelectorAll(".btnSelector2").forEach((element) => {
    element.classList.remove("btn-info");
    element.classList.add("btn-primary");
  });

  e.target.classList.remove("btn-primary");
  e.target.classList.add("btn-info");

  secondSelector = secondSelectorPrices[Number(e.target.id)];
  priceFinalChange();
}

// Boutons options
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

// Calcul final
function priceFinalChange() {
  const priceFinalEl = document.getElementById("priceFinal");
  priceFinal = priceInput * colorSelect * secondSelector * thirdSelector;
  priceFinalEl.innerText = priceFinal.toFixed(2) + " €";
  priceFinalEl.style.backgroundColor = colorSelectColor;
}

// Initialisation
window.onload = () => {
  renderUI();
  bindEvents();
};
