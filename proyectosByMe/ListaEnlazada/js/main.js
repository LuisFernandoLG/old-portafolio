/* Buttons */

const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");

let contentMessage = document.querySelector(".message");
let contentNullPtr = document.querySelector(".nodes__null");

/* container of Nodes */

let nodes = document.getElementById("nodes");

function createNode(value){
    let node = document.createElement("DIV");
    let text = document.createTextNode(value);

    /* Asignacion de clases */
    node.classList.add("nodes__node")
    node.appendChild(text);

    return node;
}


/* AÑADIR ELEMENTOS */
addButton.addEventListener("click", ()=>{


    const input = document.getElementById("add-input");

    if (input.value !== ""){

        cleanMessage();

        /* obtencion del combo box */
        const side = document.getElementById("add-comboBox");
        const newNode = createNode(input.value);



        /*ANIMATIONS */
        newNode.style.animation = "addNode .3s ease";

        let frangment = document.createDocumentFragment();
        frangment.appendChild(newNode);

        if ( side.value == "Frente" ){
            
            nodes.prepend(frangment);
        }
        else{
            /**INSERTA AL FINAL */
            nodes.appendChild(frangment);
        }
        
        /*Limpiar */

        input.value = ""
        setNullMessage();

    }else{
        /*Mandar mensaje de que el campo está vacío */
        inputError("Valor inválido");
    } 

});

/*ELMINAR ELEMENTOS */

deleteButton.addEventListener("click", ()=>{

    
const allNodes = document.getElementsByClassName("nodes__node");

if ( allNodes.length > 0 ){

    cleanMessage();

    /* obtencion del combo box */
    const side = document.getElementById("delete-comboBox");


    /*ANIMATIONS */

    if ( side.value == "Frente" ){
        allNodes[0].style.animation = "deleteNode .5s ease";
        setTimeout(function(){ 
            
            
        allNodes[0].remove();

         }, 500);
        

    }
    else{
        /**Elimina al final */
        finalIndex = allNodes.length - 1 ; 

        allNodes[finalIndex].style.animation = "deleteNode .5s ease";
        setTimeout(function(){ 
            
            
            allNodes[finalIndex].remove();

         }, 500);
    }


    setNullMessage();

}else{
    /*Mandar mensaje de que el campo está vacío */
    inputError("No hay elementos")
} 


});



addEventListener("load", ()=>{

    setNullMessage();

});
 


/* addNullElement */




/* ERRORES */

function inputError( message ){

    contentMessage.innerHTML = getErrorMessage( message );
    
}









/* getErrorMessage */

function getErrorMessage(message){

    return errorElement = `
    <p class="error-message">
        <i class="fas fa-exclamation-circle"></i>
            ${message}
    </p>
    `
}

function cleanMessage(){
    contentMessage.innerHTML = "";
}


function isEmpty(){
    let node = nodes.childNodes;
    return node.length === 0 ? true : false;
}


function setNullMessage(){

    if ( isEmpty() ){
        contentNullPtr.textContent = "NULL"
    }else{
        contentNullPtr.textContent = "";
        
    }

   
}