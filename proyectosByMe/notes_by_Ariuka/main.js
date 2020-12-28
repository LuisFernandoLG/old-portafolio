

//div con las cards
const notesContainer = document.querySelector(".notes");
const fragment = document.createDocumentFragment();
const btnAdd = document.getElementById("add");
const btnDelete = document.getElementById("delete");

//agregar al html

let i = 0;

btnAdd.addEventListener("click", ()=>{

    //creación de elementos
    let card = document.createElement("DIV");
    let note = document.createElement("DIV");
    let h2 = document.createElement("H2");
    let p = document.createElement("P");

    //asignacion de clases
    card.classList.add("card", "card-animation");
    note.classList.add("note");
    h2.classList.add("note__tittle", "weight-600");
    p.classList.add("note__quote", "weight-300");

    h2.innerHTML = `Nota #${ Math.round(Math.random()*100) } `;
    p.innerHTML = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores facilis nulla reprehenderit tempore dolor error quas ullam atque voluptatum mollitia.";


    //agregar elementos
    card.appendChild(note);
    note.appendChild(h2);
    note.appendChild(p);


    fragment.appendChild(card);

    //añadir al html
    notesContainer.appendChild(fragment);

    i++;


});


//Eliminación

btnDelete.addEventListener("click", ()=>{

    let child = document.querySelector(".card");
    let parent = child.parentNode;
    parent.removeChild(child);
});