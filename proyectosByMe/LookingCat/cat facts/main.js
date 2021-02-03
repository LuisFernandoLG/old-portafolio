const $imgContainer = document.querySelector(".imgContainer__img");
const $searchBtn = document.querySelector(".searchBtn");

const url = "https://aws.random.cat/meow?ref=apilist.fun";


const factEndpoint = "/facts";
const userEndpoint = "/users";

const getFact = async ()=>{
    let response = await fetch( (url))
        .then( r => r.json() )
            .catch( r => console.log("Error :(") );

    // console.log(  );
    $imgContainer.src = response.file;

}


$searchBtn.addEventListener("click", ()=>{
    getFact();
})

