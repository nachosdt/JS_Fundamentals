// ASINCRONÍA EN JS

// 1) CALLBACKS
function funcion(callback) {
    let inicio = new Date();
    for(let i = 0; i < Math.floor(Math.random()*100000000000000); i++) {
        // Introducimos un retraso aleatorio
    } 
    let tiempo = new Date() - inicio;
    callback(tiempo);    
}

function duracion(tiempo) {
    console.log(`\nLa función con callback ha tardado ${tiempo/1000} segundos en ejecutarse.\n`);
}

funcion(duracion);


// PROMESAS
function devuelvePromesa(resuelta) {
    let inicio = new Date();
    for(let i = 0; i < Math.floor(Math.random()*100000000000000); i++) {
        // Introducimos un retraso aleatorio
    }
    let tiempo = new Date() - inicio;
    return new Promise(function(cumplida, rechazada) {
        if (resuelta) {cumplida(tiempo);} // El argumento se convierte en parámetro del callback de .then()
        else {rechazada(new Error("El argumento de la función con promesa era false\n"))} // El argumento se convierte en parámetro del callback de .catch()
    });       
}

devuelvePromesa(true)
.then(resultado => console.log(`La primera invocación con promesa ha tardado ${resultado/1000} segundos en ejecutarse.`))
.catch(error => console.log(error))
.finally(()=>{console.log("Ejecución del bloque .finally() en la primera invocación\n")});

devuelvePromesa(false)
.then(resultado => (`La segunda invocación con promesa ha tardado ${resultado/1000} segundos en ejecutarse.\n`))
.catch(error => console.log(error.name + ": " + error.message))
.finally(()=>{console.log("Ejecución del bloque .finally() en la segunda invocación\n")});


// ASYNC / AWAIT
async function funcion2() {
    let inicio = new Date();
    for(let i = 0; i < Math.floor(Math.random()*100000000000000); i++) {
        // Introducimos un retraso aleatorio
    } 
    let tiempo = new Date() - inicio;    
    return tiempo; // Las funciones async devuelven una promesa.
}

async function asyncAwait() {
    let tiempo = await funcion2(); // Sólo se puede usar await dentro de una función async
    return tiempo;
}

asyncAwait() // Como la función devuelve una promesa, podemos usar los bloques .then(), .catch() y .finally()
.then((resultado) => {
    console.log(`La invocación con async/await ha tardado ${resultado/1000} segundos en ejecutarse.\n`);
});

// EVENTOS en NODE.js
const events = require("events");

let objetoEmisor = new events.EventEmitter();
function miEventHandler() {
    console.log("Evento emitido!!\n");
}
objetoEmisor.on("suceso",miEventHandler);
objetoEmisor.emit("suceso");

