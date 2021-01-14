import { isOnlyPositiveNumbers, isNumber } from "./utils/validations.js";

//Conainer
let header = document.querySelector(".header");
let main = document.querySelector(".main");
let footer = document.querySelector(".footer");

//Buttons
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");
const deleteAllButton = document.getElementById("deleteAllButton");
const iterationButton = document.getElementById("iterationButton");
const setButton = document.getElementById("set-button");
const settingsSavedButton = document.getElementById("settings-saved-button");

const openSettingsButton = document.getElementById("open-settings");
const closeSettingsButton = document.getElementById("close-settings");

//Combo Box
const addComboBox = document.getElementById("add-comboBox");
const deleteComboBox = document.getElementById("delete-comboBox");
const ThemeComboBox = document.getElementById("themes-comboBox");

//Inputs
const addInput = document.getElementById("add-input");
const setInputIndex = document.getElementById("set-input-index");
const setInput = document.getElementById("set-input");

const addInputSpeed = document.getElementById("input-add-speed");
const removeInputSpeed = document.getElementById("input-remove-speed");
const iterationInputSpeed = document.getElementById("input-iteration-speed");

//list
let list = document.getElementById("list");

//Messages
let messageContainer = document.getElementById("message");
let settingsMessageContainer = document.getElementById("settings-message");

//Aside
let settingsBar = document.querySelector(".settings");

// Animation speed
let addAnimationSpeed = 1000;
let removeAnimationSpeed = 500;
let iterationAnimationSpeed = 900;

addInputSpeed.value = addAnimationSpeed;
removeInputSpeed.value = removeAnimationSpeed;
iterationInputSpeed.value = iterationAnimationSpeed;

//Events
addButton.addEventListener("click", () => {
    insertNode();
});

addInput.addEventListener("keydown", (key) => {
    if (key.key === "Enter") insertNode();
});

deleteButton.addEventListener("click", () => {
    deleteNode();
});

deleteAllButton.addEventListener("click", () => {
    cleanList();
});

iterationButton.addEventListener("click", () => {
    iterationList();
});

ThemeComboBox.addEventListener("change", () => {
    changeThemeComboBox();
});

openSettingsButton.addEventListener("click", () => {
    openSettings();
});

closeSettingsButton.addEventListener("click", () => {
    closeSettings();
});

setButton.addEventListener("click", () => {
    setData();
});

settingsSavedButton.addEventListener("click", () => {
    changeConfiguration();
});

async function insertNode() {
    cleanMessage();
    try {
        let value = await isNumber(addInput.value);

        let objectNode = createNode(value);
        let objectArrow = createArrow();

        if (addComboBox.value === "Front") {
            list.appendChild(objectNode.nodeFragment);
            list.appendChild(objectArrow.arrowFragment);
        } else {
            list.prepend(objectArrow.arrowFragment);
            list.prepend(objectNode.nodeFragment);
        }

        startNodeAnimation(objectNode.node);
        startArrowAnimation(objectArrow.arrow);
    } catch (error) {
        showMessageError(error);
    }
}

async function deleteNode() {
    cleanMessage();
    try {
        await isEmpty("There's not nodes to remove");

        let node;
        let arrow;

        let allNodes = document.getElementsByClassName("node");

        if (deleteComboBox.value === "Back") {
            node = document.getElementsByClassName("node")[0];
            arrow = document.getElementsByClassName("arrow")[0];
        } else {
            node = document.getElementsByClassName("node")[allNodes.length - 1];
            arrow = document.getElementsByClassName("arrow")[allNodes.length - 1];
        }

        await startDeleteNodeAnimation(node, arrow);
        node.remove();
        arrow.remove();
    } catch (error) {
        showMessageError(error);
    }
}

async function cleanList() {
    try {
        await isEmpty("There's nothing to remove");
        let size = getSize();

        disableAllButtons();

        for (let i = 0; i < size; i++) {
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
    }finally{
      enableAllButtons();
    }
}

async function iterationList() {
    try {
        await isEmpty("There's not nodes to iteration!");
        let size = getSize();

        disableAllButtons();

        for (let i = 0; i < size; i++) {
            let node;
            let arrow;

            node = document.getElementsByClassName("node")[i];
            arrow = document.getElementsByClassName("arrow")[i];

            await startiterationNodeAnimation(node);
            await startIterationArrowAnimation(arrow);
        }
    } catch (error) {
        showMessageError(error);
    }
    finally{
      enableAllButtons();
    }
}

function openSettings() {
    settingsBar.style.display = "flex";
    settingsBar.style.animation = "openSettingsAnimation .5s ease alternate";

    header.classList.toggle("opacity");
    main.classList.toggle("opacity");
    footer.classList.toggle("opacity");
}

async function closeSettings() {
    await startCloseSettingsAnimation();

    header.classList.toggle("opacity");
    main.classList.toggle("opacity");
    footer.classList.toggle("opacity");
}

async function setData() {
    try {
        cleanMessage();
        await isEmpty("There's not nodes");
        let size = getSize() - 1;
        let to = await isOnlyPositiveNumbers(setInputIndex.value);
        const newValue = await isNumber(setInput.value);

        if (to > size) return showMessageError("Invalid Index");

        ///DISABLE BTN
        disableAllButtons();

        let value;
        let node;
        let arrow;

        for (let i = 0; i <= to; i++) {
            node = document.getElementsByClassName("node")[i];
            arrow = document.getElementsByClassName("arrow")[i];

            await startiterationNodeAnimation(node);

            //Para que la última flecha no se mueva c:
            if (i !== to) await startIterationArrowAnimation(arrow);
        }

        console.log(node.children[0]);
        value = node.children[0];
        value.textContent = newValue;

        await changeNodeValueAnimation(value);
    } catch (error) {
        showMessageError(error);
    } finally {
        //Enable btn
        enableAllButtons();
    }
}

/**
 *
 * Private Functions
 *
 */

function createNode(valueToAdd) {
    //El uso de un fragment mejora el rendimiento
    let nodeFragment = document.createDocumentFragment();
    let content = document.createElement("P");
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

function createArrow() {
    let arrowFragment = document.createDocumentFragment();
    let arrowI = document.createElement("I");
    let arrowContainer = document.createElement("DIV");

    arrowI.classList.add("arrow__i", "fas", "fa-long-arrow-alt-right");
    arrowContainer.classList.add("arrow");

    arrowContainer.appendChild(arrowI);
    arrowFragment.appendChild(arrowContainer);

    return { arrow: arrowContainer, arrowFragment: arrowFragment };
}

function startNodeAnimation(node) {
    node.style.animation = `addNodeAnimation ${addAnimationSpeed / 1000}s alternate`;
}

function startArrowAnimation(arrow) {
    arrow.style.animation = `addArrowAnimation ${
        addAnimationSpeed / 1000
    }s ease alternate`;
}

function startDeleteNodeAnimation(node, arrow) {
    return new Promise((resolve) => {
        node.style.animation = `DeleteNodeAnimation ${removeAnimationSpeed / 1000}s ease`;
        arrow.style.animation = `DeleteArrowAnimation ${
            removeAnimationSpeed / 1000
        }s ease`;

        setTimeout(() => {
            resolve("Animation done!");
            node.style.animation = null;
        }, removeAnimationSpeed);
    });
}

function startDeleteArrowAnimation(arrow) {
    return new Promise((resolve) => {
        arrow.style.animation = `DeleteNodeAnimation ${
            deleteAllAnimationSpeed / 1000
        }s ease`;

        setTimeout(() => {
            resolve("Animation done!");
            arrow.style.animation = null;
        }, deleteAllAnimationSpeed);
    });
}

function startiterationNodeAnimation(node) {
    return new Promise((resolve) => {
        node.style.animation = null;
        node.style.animation = `iterationNodeAnimation ${
            iterationAnimationSpeed / 1000
        }s ease alternate infinite`;
        setTimeout(() => {
            node.style.animation = null;
            resolve("Ok!");
        }, iterationAnimationSpeed);
    });
}

function startIterationArrowAnimation(arrow) {
    return new Promise((resolve) => {
        arrow.style.animation = null;
        arrow.style.animation = `shakeArrow ${
            iterationAnimationSpeed / 1000
        }s ease alternate infinite`;
        setTimeout(() => {
            arrow.style.animation = null;
            resolve("Ok!");
        }, iterationAnimationSpeed);
    });
}

function showMessageError(message) {
    messageContainer.innerHTML = `<p class="error-message">
    <i class="fas fa-exclamation-circle"></i>
        ${message}
    </p>`;
}

function cleanMessage() {
    messageContainer.innerHTML = null;
}

function cleanSettingMessage() {
    settingsMessageContainer.innerHTML = null;
}

function getSize() {
    return document.getElementsByClassName("node").length;
}

function isEmpty(message) {
    return new Promise((resolve, reject) => {
        if (getSize() !== 0) resolve("Ok!");
        else reject(message);
    });
}

function changeThemeComboBox() {
    let rootStyles = document.documentElement;
    const theme = ThemeComboBox.value;

    switch (theme) {
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

function startCloseSettingsAnimation() {
    return new Promise((resolve) => {
        settingsBar.style.animation = "closeSettingsAnimation .5s ease alternate";

        setTimeout(() => {
            resolve("Ok!");
            settingsBar.style.display = "none";
        }, 500);
    });
}

function changeNodeValueAnimation(value) {
    value.style.animation = "startChangeNodeValue .7s ease alternate";
    return new Promise((resolve) => {
        setTimeout(() => {
            value.style.animation = null;
            resolve("Setted!");
        }, 700);
    });
}

/**
 *
 * Animations speed events
 *
 */

async function changeConfiguration() {
    try {
        addAnimationSpeed = await isOnlyPositiveNumbers(addInputSpeed.value);
        removeAnimationSpeed = await isOnlyPositiveNumbers(removeInputSpeed.value);
        iterationAnimationSpeed = await isOnlyPositiveNumbers(iterationInputSpeed.value);
        showMessageInConfiguration("Saved!");
    } catch (error) {
        showMessageInConfiguration(error);
    }
}

function showMessageInConfiguration(message) {
    cleanSettingMessage();
    settingsMessageContainer.innerHTML = `<p class="settings-message">
    <i class="fas fa-exclamation-circle"></i>
        ${message}
    </p>`;
}

// async function run(){

//   try {

//     let value = await isOnlyPositiveNumbers("-1");
//     console.log( value )

//   } catch (error) {
//     console.log(error)
//   }

// }

// run();


function disableAllButtons(){
  setButton.setAttribute("disabled", "");
  setButton.classList.add("disable-btn");
  
  iterationButton.setAttribute("disabled", "");
  iterationButton.classList.add("disable-btn");
  
  deleteAllButton.setAttribute("disabled", "");
  deleteAllButton.classList.add("disable-btn");

  addButton.setAttribute("disabled", "");
  addButton.classList.add("disable-btn");

  deleteButton.setAttribute("disabled", "");
  deleteButton.classList.add("disable-btn");

  
  
}

function enableAllButtons(){
  setButton.removeAttribute("disabled", "");
  setButton.classList.remove("disable-btn");
  
  iterationButton.removeAttribute("disabled", "");
  iterationButton.classList.remove("disable-btn");
  
  addButton.removeAttribute("disabled", "");
  addButton.classList.remove("disable-btn");
  
  deleteButton.removeAttribute("disabled", "");
  deleteButton.classList.remove("disable-btn");
  
  
  
}

