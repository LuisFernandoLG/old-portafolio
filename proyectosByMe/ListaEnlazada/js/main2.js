
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
 const deleteComboBox = document.getElementById("delete-comboBox");
 


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
    deleteNode();
});

illuminationButton.addEventListener("click", ()=>{
    startIllumiationNodes();
});


function illuminateNode( node ){
    return new Promise( (resolve, reject)=>{

        setTimeout( ()=>{
            node.style.animation = "illuminateAllNode 1s ease alternate";
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
    let arrow = new Image(100, 100);

    node.classList.add("nodes__node", "hidden")
    arrow.classList.add("nodes__arrow", "hidden")
    
    arrow.src = '../img/arrow.svg';
    
    node.appendChild(content);
    fragment.appendChild(node);
    fragment.appendChild(arrow);

    return fragment;

}

function insertNodeAndArrow( fragment, side ){
    if ( side === "Final" ) nodes.prepend(fragment);
    else nodes.appendChild(fragment);

}

function startAnimationList( side ){
    return new Promise( (resolve, reject)=>{

        
        setTimeout( ()=>{
            ////ANIMATION NODES LIST
            let animationName = side === "Frente" ? "moveToLeftNodes" : "moveToRightNodes";
    
            nodes.style.animation =  `${animationName} 1s ease alternate`
            
            resolve("Ok")


        }, 0 );


    } );

}


function startAnimationArrow( side ){
    return new Promise( ( resolve )=>{
        
        setTimeout( ()=>{
            let arrows = nodes.getElementsByClassName("nodes__arrow");
            let numOfArrows = arrows.length;
    
            let position = side === "Frente" ? ( numOfArrows - 1 ) : 0;
    
            arrows[ position ].classList.remove("hidden");
            arrows[ position ].style.animation = "addArrow .6s ease-in-out";

            resolve("ok");

        }, 600 );

        

    });

}


function startAnimationNode( side ){
    return new Promise( (resolve)=>{   
        setTimeout( ()=>{
            let node = side === "Frente" ? getLastNode() : getFirstNode();
            node.classList.remove("hidden");
          
            node.style.animation = `addNode 1s ease alternate`
            
            resolve("OK");
           
        }, 600);
   
   
    })

}



const add = async ()=>{  
    try{
        disableAddbuttonToggle();

        const value = addInput.value;
        const side = addComboBox.value;

        await validateField( value );
        let node = createNode( value );
        insertNodeAndArrow( node, side );
        await startAnimationList( side );

        if (side === "Frente"){
            await startAnimationNode( side );
            await startAnimationArrow( side );
        }else{
            await startAnimationArrow( side );
            await startAnimationNode( side );
        }

        

        console.log("Congratulations, everything's' fine")

    }
    catch(e){
        console.log( `Erro: ` + e )
        showMessageError(e);
    }
    finally{
        disableAddbuttonToggle();
    }

};



async function deleteNode(){
    const side = addComboBox.value;
    let node = side === "Frente" ? getLastNode() : getFirstNode();

    await startAnimationNode(node);
    node.remove();



}


function startDeleteNodeAnimation( node ){
    return new Promise( ()=>{
        setTimeout( ()=>{
            node.style.animation = "deleteNodeAnimation 1s ease"

        },1000 );


    } );
}



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

function disableAddbuttonToggle(){
    addButton.toggleAttribute("disabled");
    addButton.classList.toggle("disabled-btn");

    addInput.classList.toggle("disabled-btn");
    addInput.toggleAttribute("disabled");
}