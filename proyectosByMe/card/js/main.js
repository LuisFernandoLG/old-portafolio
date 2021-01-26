const loadedBar = document.querySelector(".loaded");
const input = document.querySelector(".control-container__input");
const price = document.querySelector(".price__data-number");

let x = 50;

const moveLoadedBar = e=>{
    if (input.value !== x){
        loadedBar.style.width = `${x}%`;

        price.textContent = (x * .32).toFixed(2);
    }
    x = input.value;
    console.log(x);
}



input.addEventListener("input", moveLoadedBar, false);
input.addEventListener("change", moveLoadedBar, false);




