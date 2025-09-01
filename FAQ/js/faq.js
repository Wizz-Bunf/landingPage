const faqData = [
  { question: "De quoi le monde est-il fait ?", answer: "De beaucoup de chose dont ce site." },
  { question: "Sommes-nous libres ?", answer: "Non. Sorry bro." },
  { question: "Qu’est-ce qu’un raisonnement valide ?", answer: "Le mien." },
  { question: "Qu’est-ce que le bien ?", answer: "L'option de caresser un chien ou un chat dans un jeu video." },
  { question: "Qu’est-ce que le mal ?", answer: "Un mot en 3 lettres qui donne 5 points au scrabble sans bonus." }
];

// Crée le conteneur principal
const app = document.getElementById("faqApp");

const title = document.createElement("h1");
title.className = "mb-4";
title.textContent = "FAQ";
app.appendChild(title);

const accordion = document.createElement("div");
accordion.className = "accordion";
accordion.id = "faqAccordion";
app.appendChild(accordion);

// Génère chaque item dynamiquement
faqData.forEach((item, index) => {
  const itemId = "faq-" + index;

  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  const header = document.createElement("h2");
  header.className = "accordion-header";
  header.id = `heading-${itemId}`;

  const button = document.createElement("button");
  button.className = "accordion-button collapsed";
  button.type = "button";
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#collapse-${itemId}`);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `collapse-${itemId}`);
  button.textContent = item.question;

  header.appendChild(button);
  accordionItem.appendChild(header);

  const collapse = document.createElement("div");
  collapse.id = `collapse-${itemId}`;
  collapse.className = "accordion-collapse collapse";
  collapse.setAttribute("aria-labelledby", `heading-${itemId}`);
  collapse.setAttribute("data-bs-parent", "#faqAccordion");

  const body = document.createElement("div");
  body.className = "accordion-body";
  body.textContent = item.answer;

  collapse.appendChild(body);
  accordionItem.appendChild(collapse);

  accordion.appendChild(accordionItem);
});
