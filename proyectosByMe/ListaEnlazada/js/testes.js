async function showNames(){
    for ( let i = 0; i < 10;  i++){
        await sayAnyName();
        console.log(i)
    }
}

function sayAnyName(){
    return new Promise( (resolve)=>{
        setTimeout( ()=>{
            console.log("Luis");
            resolve("Ok!")
        }, 2000 );


    } );
}

showNames();

console.log("Fin del programa")