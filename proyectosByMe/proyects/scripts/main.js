const addBtn = document.getElementById("addBtn");


const proyects = document.querySelector(".proyects")
//click
addBtn.addEventListener("click", ()=>{


    

    let tittle = document.getElementById("input-tittle");
    let description = document.getElementById("input-description");

    if ( tittle.value !== "" && description.value !== "" ){
        let card = document.createElement("DIV");
        let cardDate = document.createElement("h2");
        let cardTittle = document.createElement("h2");
        let cardLetter = document.createElement("h3");
        let cardDescription = document.createElement("P");
        
        //asignacion de clases
        card.classList.add("proyect");
        cardDate.classList.add("proyect__date");
        cardTittle.classList.add("proyect__tittle", "weight-700");
        cardLetter.classList.add("proyect__cover");
        cardDescription.classList.add("proyect__description", "weight-300");

        console.log(tittle.value);
        console.log(description.value);
        


        //asignacion de textos
        let today = new Date();
        today = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
        cardDate.innerHTML = today;

        cardTittle.innerHTML = tittle.value;
        cardLetter.innerHTML = tittle.value[0];
        cardDescription.innerHTML = description.value;


        let fragment = document.createDocumentFragment();
        card.appendChild(cardDate);
        card.appendChild(cardTittle);
        card.appendChild(cardLetter);
        card.appendChild(cardDescription);

        fragment.appendChild(card);

        proyects.appendChild(fragment);
        
        cleanInputs(tittle, description);
    }
    else{
        alert("Bro, está vacío");
    }
});


function cleanInputs(input1, input2){
    input1.value = "";
    input2.value = "";
}