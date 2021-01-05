
/***
 * BOTTONS
 */
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");

let contentMessage = document.querySelector(".message");
let contentNullPtr = document.querySelector(".nodes__null");

/**
 * Container
 */

 nodes = document.getElementById("nodes");


/***
 * INPUTS
 */

 let addInput = document.getElementById("add-input");


 /**
  * variables
  */
 const durationAnimationNodeStart = 700;
 const durationAnimationNodes = 1000;
 const timeErrorMessage = 4000;


addButton.addEventListener("click", ()=>{
    add();
})

deleteButton.addEventListener("click", ()=>{

});





function validateField( value ) {
    return new Promise( (resolve, reject)=>{
        if ( value !== "" ){
            resolve("Ok");

        }else{
            reject( "Invalid input" );

        }

    });

};



function createNode(value) {
        let node = document.createElement("DIV");
        let content = document.createTextNode(value);
        node.classList.add("nodes__node")
        node.appendChild(content);

        return node;
    
}

function insertNode(node){

    let fragment = document.createDocumentFragment();
    fragment.appendChild(node);
    nodes.prepend(fragment);

}


function startAnimationNode( node ){
    return new Promise( (resolve)=>{
        
        setTimeout( ()=>{
            getFirstNode().style.animation = "addNode 1s ease";
            console.log("Deberia hacer una animacion . . .")
            resolve("OK")
            
   
        }, 0);
   
   
    })

}


function startAnimationNodes(){
    nodes.style.animation = "moveToLeftNodes .7s ease";
    return new Promise( (resolve)=>{

        setTimeout( ()=>{
            resolve("OK")

        },700 );


    } )  
}

const add = async ()=>{  
    try{
        value = addInput.value;

        await validateField( value );
        let node = createNode( value );
        insertNode( node );
        await startAnimationNode();

        console.log("Congratulations, everything's' fine")

    }
    catch(e){
        console.log( `Erro: ` + e )
        showMessageError(e);
    }

};



function showMessageError(message) {
    contentMessage.innerHTML = `<p class="error-message">
    <i class="fas fa-exclamation-circle"></i>
        ${message}
    </p>
        `

    setTimeout( ()=>{
        contentMessage.textContent = "";
    }, timeErrorMessage );   

}

function getLastNode() {
    if ( !isEmpty() ){
        let allNodes = document.getElementsByClassName("nodes__node");
        return allNodes[-1];
    }
    
}

function isEmpty() {
    const allNodes = document.getElementsByClassName("nodes__node");
    console.log( allNodes[ allNodes.length -1 ] );
    return allNodes.length === true ? true : false; 
}

function getFirstNode() {
    if ( !isEmpty() ){
        let allNodes = document.getElementsByClassName("nodes__node");
        return allNodes[0];

    }
}

function getAllNodes() {
    if ( !isEmpty() ){
        return document.getElementsByClassName("nodes__node");
    }
}