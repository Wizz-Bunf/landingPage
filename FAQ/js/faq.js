const faqData = [
    { question: "De quoi le monde est-il fait ?", answer: "De beaucoup de chose dont ce site." },
    { question: "Sommes-nous libres ?", answer: "Non. Sorry bro." },
    { question: "Qu’est-ce qu’un raisonnement valide ?", answer: "Le mien." },
    { question: "Qu’est-ce que le bien ?", answer: "L'option de caresser un chien ou un chat dans un jeu video."},
    { question: "Qu’est-ce que le mal ?", answer: "Un mot en 3 lettres qui donne 5 points au scrabble sans bonus, se qui n'est pas beaucoup." }
];

const accordion = document.getElementById("faqAccordion");
const template = document.getElementById("faq-template");

faqData.forEach((item, index) => {
    const clone = template.content.cloneNode(true);

    //Eléments à remplir
    const button = clone.querySelector("button");
    const collapse = clone.querySelector(".accordion-collapse");
    const body = clone.querySelector(".accordion-body");

    //Ajoute text
    button.textContent = item.question;
    body.textContent = item.answer;

    // Donner des IDs uniques pour Bootstrap (thx GPT j'avais pas compris)
    const collapseId = "collapse" + index;
    collapse.id = collapseId;
    button.setAttribute("data-bs-toggle", "collapse");
    button.setAttribute("data-bs-target", "#" + collapseId);
    button.setAttribute("aria-controls", collapseId);

    accordion.appendChild(clone);
});