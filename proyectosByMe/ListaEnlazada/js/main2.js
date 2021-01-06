
/***
 * BOTTONS
 */
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");
const illuminationButton = document.querySelector(".option__btn-animation");

let contentMessage = document.querySelector(".message");
let contentNullPtr = document.querySelector(".nodes__null");

/**
 * COMBO-BOC
 */



/**
 * Container
 */

 nodes = document.getElementById("nodes");


/***
 * INPUTS
 */

 let addInput = document.getElementById("add-input");
 const addComboBox = document.getElementById("add-comboBox");


 /**
  * variables
  */
 const durationAnimationNodeStart = 700;
 const durationAnimationNodes = 1000;
 const timeErrorMessage = 4000;


 /**
  * Add node Events
  */
 addButton.addEventListener("click", ()=>{
    add();
})

 addInput.addEventListener("keydown", (keydown)=>{
    if ( keydown.key === "Enter" ) return add();
 })




deleteButton.addEventListener("click", ()=>{

});

illuminationButton.addEventListener("click", ()=>{
    startIllumiationNodes();
});


function illuminateNode( node ){
    return new Promise( (resolve, reject)=>{
        node.style.animation = "illuminateAllNode 1s ease alternate";

        setTimeout( ()=>{
            node.style.animation = "";

            resolve("Ok");
        }, 1000 );


    } )  
}


async function startIllumiationNodes(){
    allNodes = getAllNodes();

    for ( node of allNodes ){
        await illuminateNode( node );
    }

}



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
    let fragment = document.createDocumentFragment();
    
    node.classList.add("nodes__node");
    
    
    node.appendChild(content);
    fragment.appendChild(node);
    
    return fragment;
    
}

function createArrow(){
    let arrow = new Image(100, 100);
    let fragment = document.createDocumentFragment();
    arrow.classList.add("nodes__arrow")
    
    arrow.src = '../img/arrow.svg';
    
    fragment.appendChild(arrow);
    return fragment;

}

function insertNode( value, side ){
    const fragment = createNode(value)
    if ( side === "Final" ) nodes.prepend(fragment);
    else nodes.appendChild(fragment);

}

function insertArrow( side ){
    const fragment = createArrow();
    if ( side === "Final" ) nodes.prepend(fragment);
    else nodes.appendChild(fragment);

}

function startAnimationList( side ){
    return new Promise( (resolve, reject)=>{
        let animationName = side === "Frente" ? "moveToLeftNodes" : "moveToRightNodes";

        nodes.style.animation =  `${animationName} 2s ease alternate`

        setTimeout( ()=>{
            ////ANIMATION NODES LIST
            nodes.style.animation = "";
            resolve("Ok")


        }, 2000 );


    } );

}


function startAnimationArrow( side ){
    return new Promise( ( resolve )=>{

        let arrows = nodes.getElementsByClassName("nodes__arrow");
        let numOfArrows = arrows.length;

        let position = side === "Frente" ? ( numOfArrows - 1 ) : 0;

        arrows[ position ].style.animation = "addArrow .6s ease-in-out";
        
        setTimeout( ()=>{
            nodes.getElementsByClassName("nodes__arrow")[ position ].style.animation = "";
            resolve("ok");

        }, 600 );

        

    });

}


function startAnimationNode( side ){
    return new Promise( (resolve)=>{ 
        let node = side === "Frente" ? getLastNode() : getFirstNode();
        node.style.animation = "addNode 1s ease";    
        
        setTimeout( ()=>{
            node.style.animation = "";
            resolve("OK");
           
        }, 1000);
   
   
    })

}












const add = async ()=>{  
    try{


        const value = addInput.value;
        const side = addComboBox.value;

        await validateField( value );
        await startAnimationList( side );

        if (side === "Frente"){
            insertArrow( side );
            await startAnimationArrow( side );

            insertNode(value, side );
            await startAnimationNode( side );
        }else{
            insertArrow( side );
            await startAnimationNode( side );
            
            insertNode(value, side );
            await startAnimationArrow( side );
        }

        

        console.log("Congratulations, everything's' fine")

    }
    catch(e){
        console.log( `Erro: ` + e )
        showMessageError(e);
    }

};




/** Private functions */

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
        return allNodes[ allNodes.length - 1 ];
    }
    
}

function isEmpty() {
    const allNodes = document.getElementsByClassName("nodes__node");
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

// function disableAddbuttonToggle(){
//     addButton.toggleAttribute("disabled");
//     addButton.classList.toggle("disabled-btn");

//     addInput.classList.toggle("disabled-btn");
//     addInput.toggleAttribute("disabled");
// }