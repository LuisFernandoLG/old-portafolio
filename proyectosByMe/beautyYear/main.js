const card = document.querySelector(".card");
const circle = document.querySelector(".circle");
const orangeShine = document.querySelector(".orangeShine");
const greenShine = document.querySelector(".greenShine");
const commet1 = document.querySelector(".commet1");
const commet2 = document.querySelector(".commet2");
const date = document.querySelector(".date");

const helperDiv = document.querySelector(".helperDiv");




helperDiv.addEventListener("mousemove", e =>{

    let width = helperDiv.clientWidth; // 100%
    let height = helperDiv.clientHeight; // 100%

    let x = e.offsetX;
    let y = e.offsetY;
    
    if ( x <= (width / 2)) moveNegativeX();
    
    if ( y <= (height / 2)) moveNegativeY();
    


    

});


card.addEventListener("mouseout", ()=>{
    card.style.transform = null;
    card.style.transform = null;
    commet1.style.transform = null;
    commet2.style.transform = null;
    greenShine.style.transform = null;
    orangeShine.style.transform = null;
    date.style.transform = null;

});




const moveNegativeX = ()=>{
    card.style.transform = "translateX(-20px)";
    commet1.style.transform = "translateX(-20px)";
    commet2.style.transform = "translateX(-20px)";
    greenShine.style.transform = "translateX(-20px)";
    orangeShine.style.transform = "translateX(-20px)";
    date.style.transform = "translateX(-20px)";
    
}

const movePositiveX = ()=>{
    card.style.transform = "translateX(20px)";
    commet1.style.transform = "translateX(20px)";
    commet2.style.transform = "translateX(20px)";
    greenShine.style.transform = "translateX(20px)";
    orangeShine.style.transform = "translateX(20px)";
    date.style.transform = "translateX(20px)";
}

const movePositiveY = ()=>{
    card.style.transform = "translateY(20px)";
    commet1.style.transform = "translateY(20px)";
    commet2.style.transform = "translateY(20px)";
    greenShine.style.transform = "translateY(20px)";
    orangeShine.style.transform = "translateY(20px)";
    date.style.transform = "translateY(20px)";
}

const moveNegativeY = ()=>{
    card.style.transform = "translateY(-20px)";
    commet1.style.transform = "translateY(-20px)";
    commet2.style.transform = "translateY(-20px)";
    greenShine.style.transform = "translateY(-20px)";
    orangeShine.style.transform = "translateY(-20px)";
    date.style.transform = "translateY(-20px)";
}



