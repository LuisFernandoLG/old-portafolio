/* RELLENAR */

const dates = document.getElementById("dates");
let fragment = document.createDocumentFragment();
console.log(dates.hasChildNodes());


class Date{

    constructor(number, tittle, description){
        this.number = number;
        this.tittle = tittle;
        this.description = description;
    }


    /* GETTERS */
    get getNumber(){
        return this.number;
    }

    get getTittle(){
        return this.tittle;
    }

    get getDescription(){
        return this.description;
    }

}

let content = [
    {
        "number": "01",
        "tittle": "Autum",
        "description": "It's a wonderful season"
    },
    {
        "number": "28",
        "tittle": "Spring",
        "description": "It's a terrific season"
    },
    {
        "number": "06",
        "tittle": "Summer",
        "description": "It's a hot season"
    },
    {
        "number": "31",
        "tittle": "Fall",
        "description": "Trees start to loose their leaves"
    },
    {
        "number": "18",
        "tittle": "Winter",
        "description": "It's the most wonderful time of the year"
    },
    {
        "number": "16",
        "tittle": "Summer",
        "description": "Oh man it's too hot"
    },
    {
        "number": "06",
        "tittle": "Hell",
        "description": "Go to hell"
    },
    


    
    

]

/* CREACION DE ELEMENTOS */

let mainTittle = document.getElementById("mainTittle");

function changeText(tittle){
    mainTittle.innerHTML = tittle;
    mainTittle.style.animation = "highlightNode .9s ease";

    
}

for ( let i = 0; i<7; i++){

    const date = document.createElement("DIV");
    const dateNumber = document.createElement("H2");
    const dateTittle = document.createElement("H3");
    const dateDescription = document.createElement("P");

    date.classList.add("date",`key-${i}`);
    dateNumber.classList.add("date__number", "weight-900");
    dateTittle.classList.add("date__tittle", "weight-700");
    dateDescription.classList.add("date__description", "weight-300");



    /* asignacion de contenido */
    let number = content[i]["number"];
    let tittle = content[i]["tittle"];
    let description = content[i]["description"];
    

    dateNumber.innerHTML = number;
    dateTittle.innerHTML = tittle;
    dateDescription.innerHTML = description;
    


    date.appendChild(dateNumber);
    date.appendChild(dateTittle);
    date.appendChild(dateDescription);

    /**ADD CLICK LISTENER */
    date.addEventListener("click", function(){ changeText(tittle);} );

    fragment.appendChild(date);

    
}
dates.appendChild(fragment);

console.log(dates.hasChildNodes());

if ( dates.hasChildNodes() === false ){
    const text = document.createElement("H2");
    text.innerHTML = "NO HAY FECHAS";
    fragment.appendChild(text);
    dates.appendChild(fragment);

}



