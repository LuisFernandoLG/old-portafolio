//Buttons
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");
const deleteAllButton = document.getElementById("deleteAllButton");
const danceButton = document.getElementById("danceButton");

//Combo Box
const addComboBox = document.getElementById("add-comboBox");
const deleteComboBox = document.getElementById("delete-comboBox");
const ThemeComboBox = document.getElementById("themes-comboBox");

//Inputs
const addInput = document.getElementById("add-input");

//list
let list = document.getElementById("list");

//Messages
let messageContainer = document.getElementById("message");






//Events
addButton.addEventListener("click", ()=>{
    insertNode();

});

addInput.addEventListener("keydown", (key)=>{
    if ( key.key === "Enter" ) insertNode();
});

deleteButton.addEventListener("click", ()=>{
    deleteNode();
});

deleteAllButton.addEventListener("click", ()=>{
    cleanList();
});

danceButton.addEventListener("click", ()=>{
    console.log("Click")
    danceList();
});

ThemeComboBox.addEventListener("change", ()=>{
    changeThemeComboBox();
})



async function insertNode(){
    cleanMessage();
    try {
        await validateAddInput();

        let objectNode = createNode( addInput.value );
        let objectArrow = createArrow();

        if ( addComboBox.value === "Front" ){
            list.appendChild( objectNode.nodeFragment );
            list.appendChild( objectArrow.arrowFragment );
        }else{
            
            list.prepend( objectArrow.arrowFragment );
            list.prepend( objectNode.nodeFragment );
        }

        

        startNodeAnimation( objectNode.node );
        startArrowAnimation( objectArrow.arrow );
        

    } catch (error) {
        showMessageError(error);
    }
    
}


async function deleteNode(){
    cleanMessage();
    try {        
        await isEmpty("There's not nodes to remove");

        let node;
        let arrow;

        let allNodes = document.getElementsByClassName("node");

        if ( deleteComboBox.value === "Back" ){
            node = document.getElementsByClassName("node")[0];
            arrow = document.getElementsByClassName("arrow")[0];

        }else{
            node = document.getElementsByClassName("node")[ allNodes.length - 1 ];
            arrow = document.getElementsByClassName("arrow")[ allNodes.length - 1 ];
        }

        await startDeleteNodeAnimation(node, arrow);
        node.remove();
        arrow.remove();
   
    } catch (error) {
        showMessageError(error);
    }
    
}

async function cleanList(){
    
    try {

        await isEmpty("There's nothing to remove");

        size = getSize();   
        for ( let i = 0; i < size ; i++ ){
            
            let node;
            let arrow;
            
            node = document.getElementsByClassName("node")[0];
            arrow = document.getElementsByClassName("arrow")[0];
    
            await startDeleteNodeAnimation(node, arrow);
            node.remove();
            arrow.remove();    
    
        }
        
    } catch (error) {
        showMessageError(error);
    }

}


async function danceList(){

    try{

        await isEmpty("There's not nodes to dance!");

        size = getSize();
    
        for ( let i = 0; i < size; i++ ){
            let node;
            let arrow;
    
            node = document.getElementsByClassName("node")[i];
            arrow = document.getElementsByClassName("arrow")[i];
            
    
            await startDanceNodeAnimation(node);
            await startDanceArrowAnimation(arrow);
            
        }

    }
    catch(error){
        showMessageError(error);
    }
}

/**
 * 
 * Private Functions
 * 
 */

function createNode(valueToAdd){

    //El uso de un fragment mejora el rendimiento
    let nodeFragment = document.createDocumentFragment();
    let content = document.createElement("P")
    let value = document.createTextNode(valueToAdd);
    let node = document.createElement("DIV");

    node.classList.add("node");
    content.classList.add("node__value", "weight-500");

    content.appendChild(value);
    node.appendChild(content);
    nodeFragment.appendChild(node);

    //retorna un diccionario


    return { node: node, nodeFragment: nodeFragment };
}

function createArrow(){
    let arrowFragment = document.createDocumentFragment();
    let arrowI = document.createElement("I");
    let arrowContainer = document.createElement("DIV");

    arrowI.classList.add("arrow__i","fas", "fa-long-arrow-alt-right");
    arrowContainer.classList.add("arrow");

    arrowContainer.appendChild(arrowI);
    arrowFragment.appendChild(arrowContainer);

    return {arrow : arrowContainer, arrowFragment : arrowFragment};

}



function startNodeAnimation(node){
    speed = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    node.style.animation = `addNodeAnimation 1.5s ${speed}  alternate`;

}

function startArrowAnimation(arrow){
    arrow.style.animation = "addArrowAnimation 1s ease alternate";

}



function startDeleteNodeAnimation(node, arrow){
    return new Promise((resolve)=>{
        node.style.animation = "DeleteNodeAnimation .8s ease";
        arrow.style.animation = "DeleteArrowAnimation .8s ease";

        setTimeout(()=>{
            resolve("Animation done!");
            node.style.animation = null;
        }, 800);

    });
}

function startDeleteArrowAnimation(arrow){
    return new Promise((resolve)=>{
        arrow.style.animation = "DeleteNodeAnimation .8s ease";

        setTimeout(()=>{
            resolve("Animation done!");
            arrow.style.animation = null;
        }, 800);

    });
    
}

function startDanceNodeAnimation(node){
    return new Promise( (resolve)=>{
            node.style.animation = "danceNodeAnimation 1s ease alternate infinite";
        setTimeout(()=>{
            node.style.animation = null;
            resolve("Ok!");

        }, 1000);

    });
}

function startDanceArrowAnimation(arrow){
    return new Promise( (resolve)=>{
        arrow.style.animation = "shakeArrow 1s ease alternate infinite";
        setTimeout(()=>{
            arrow.style.animation = null;
            resolve("Ok!")

        }, 1000);

    });
}


function validateAddInput(){
    return new Promise( (resolve, reject)=>{
        if ( addInput.value !== "" ) resolve("Ok!");
        else reject("Invalid input");

    } );

}


function showMessageError(message){
    messageContainer.innerHTML = `<p class="error-message">
    <i class="fas fa-exclamation-circle"></i>
        ${message}
    </p>`;
}

function cleanMessage(){
    messageContainer.innerHTML = null;
}

function getSize(){
    return document.getElementsByClassName("node").length;
}

function isEmpty( message ){
    return new Promise ((resolve, reject)=>{
        if ( getSize() !== 0 ) resolve("Ok!");
        else reject(message);
    });
}

function changeThemeComboBox(){
    let rootStyles = document.documentElement;
    const theme = ThemeComboBox.value;

    switch(theme){
        case "Scartlett Theme":
            rootStyles.style.setProperty("--primary-color", "#db6400");
            rootStyles.style.setProperty("--secundary-color", "#f8f1f1");
            rootStyles.style.setProperty("--colorOne", "rgb(166, 211, 226)");
            rootStyles.style.setProperty("--colorTwo", "#272727");
            rootStyles.style.setProperty("--colorThree", "#ffa62b");

        break;

        case "Dark Theme":
            rootStyles.style.setProperty("--primary-color", "#222831");
            rootStyles.style.setProperty("--secundary-color", "#eeeeee");
            rootStyles.style.setProperty("--colorOne", "rgb(166, 211, 226)");
            rootStyles.style.setProperty("--colorTwo", "#ffd369");
            rootStyles.style.setProperty("--colorThree", "#393e46");
       
        break;

    }


}


