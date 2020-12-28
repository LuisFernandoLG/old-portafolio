//CLICK EN LA IMAGEN PARA CAMBIAR A MODO OSCURO


const container = document.querySelector(".container");
const informationContainer = document.querySelector(".information");
const tittles = document.getElementsByClassName("feature__tittle");
const descriptions = document.getElementsByClassName("feature__description");
const tittle = document.querySelector(".information__tittle");
const body = document.body;


const img = document.querySelector(".ilustration__img");



img.addEventListener("click", ()=>{

    for ( let i = 0; i < tittles.length; i++ ){
        tittles[i].classList.toggle("darkFont");
        descriptions[i].classList.toggle("darkFont");
    }
    
    body.classList.toggle("darkBackGround");
    informationContainer.classList.toggle("darkBackGround");
    tittle.classList.toggle("darkFont");
    

});


