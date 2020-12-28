let proyects = [
    {
        "name" : "ThemeDark",
        "description" : "Consiste que al hacer click en la imagen, se agregam clases que cambia la página en un tema dark"
    },
]

let fragment = document.createDocumentFragment();

const cards = document.querySelector(".cards");


let card = document.createElement("DIV");
let img = document.createElement("IMG");
let h2 = document.createElement("H2");
let h3 = document.createElement("H3");

card.classList.add("card");
h2.classList.add("card__name", "weight-500");
h3.classList.add("card__subtittle", "weight-300");

img.setAttribute("src", "/img/sofa.svg");


card.appendChild(img);
card.appendChild(h2);
card.appendChild(h3);

fragment.appendChild(card)