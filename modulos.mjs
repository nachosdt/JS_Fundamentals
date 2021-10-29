// MODULOS EN JS
// Atención a la extensión de los archivos que usan import y export: .msj

// Módulos con clases y objetos

const miModulo = (function() {
    let variable_privada = "Variable privada";
    function funcion1() {
        return "Funcion 1 " + variable_privada;
    }
    function funcion2(parametro) {
        return "Función 2 " + parametro;
    }
    return {funcion1, funcion2};
}());

console.log(miModulo.funcion1());
console.log(miModulo.funcion2(true));

class miClase {
    constructor() {
        this.atributo = 0;
    }
    incrementar() {
        return this.atributo++;
    }
}

// Implementacion de la importación y exportación de módulos

const modulos = {};
function require(nombreModulo) {return modulos[nombreModulo];}

modulos["miModulo.js"] = (function() {
    const exports = {};
    exports.miModulo = miModulo;
    return exports;
}());

modulos["miClase.js"] = (function() {
    const exports = {};
    exports.miClase = class miClase {
        constructor() {
            this.atributo = 0;
        }
        incrementar(numero) {
            this.atributo += numero;
            return this.atributo;
        }
    };
    return exports;
}());

const modulo = require("miModulo.js").miModulo;
const Clase = require("miClase.js").miClase;

console.log(modulo.funcion1());
console.log(modulo.funcion2("argumento"));

let c = new Clase();
for (let i = 0; i<5; console.log(c.incrementar(i++)));


// MÓDULOS EN NODE.JS
// Node define un objeto global (module.exports, o sencillamente exports) siempre disponible
// Para exportar varios valores, se pueden asignar como propiedades a exports:
let variable_exportada = 0;
const funcion = function() {
    return "Valor";
}

// exports.variable = variable_exportada;
// exports.miFuncion = funcion;
// exports.otraFuncion = function() { return "Otro valor";}

// Importaciones
// Para módulos ya construidos, basta con pasar el nombre a la función require()
const fs = require("fs");
const http = require("http");

// Para importar nuestros propios módulos, hay que pasar la ruta relativa
//const miMod = require("./ruta_relativa/archivo.js");

// Si el modulo requerido exporta un objeto con varias propiedades y funciones, 
// podemos inportar sólo las que necesitemos
//const {propiedad,función} = require("./mimodulo.js");

// ES6 introdujo los comandos import y export
// El código dentro de un módulo está por definición en strict mode, como ocurre con las clases
// Para exportar variables, funciones o clases, basta con usar la palabra export
// export let variable = "valor";
// export function unaFuncion() {}
// export class unaClase {}

// Otra posibilidad es añadir las exportaciones al final del código:
let otraVariable = 0;
function otraFuncion() {}
class otraClase {}
//export {otraVariable, otraFuncion, otraClase};

// Si únicamente se exporta un valor, se puede usar export default
//export default class unaClaseMas {};
// Con export default se pueden exportar funciones anónimas, clases anónimas y objetos literales

// Se pueden exportar valores con otro nombre
// export {
//     variable as otraVariable,
//     funcion as otraFuncion
// };

// A la hora de importar un export default, basta con usar la palabra import
import ClaseExportada from "./exportable.mjs";
let objeto = new ClaseExportada();
console.log(objeto.imprimir()); 
// El identificador al que se importa el módulo es una constante (const)
// Las declaraciones import, como las funciones, están "hoisted". No hace falta declararlas
// antes de usarlas.
// El módulo importado debe ser una ruta absoluta "/rutaAbsoluta/archivo.js"
// o una ruta relativa "./rutaRelativa/archivo.js" o "../rutaRelativa/archivo.js"

// Para importar módulos que exportan varios valores:
 import {variable, funcion as f} from "./exportable.mjs";
 console.log(variable);
 console.log(f());
// En este caso, el nombre de las variables debe coincidir con los valores exportados.
// Se puede exportar todo de una vez:
 import * as unModulo from "./exportable.mjs";
 console.log(unModulo.variable);
 console.log(unModulo.funcion());
// La variable modulo es un objeto cuyas prpopiedades son los valores exportados por el módulo

// Si un módulo contiene varios export y un export default, se puede importar así:
// import ClaseExportada, {variable, funcion} from "./exportable.js"
// import {default as Clase, variable, funcion} from "./miModulo.js"

// También se puede importar un módulo que no contiene exports
// import "./miModulo.js"
// Esto ejecuta directamente el archivo miModulo.js

// Se pueden importar módulos y cambiar el nombre de los valores que se exporta el módulo:
// import {nombreExportado as nombre} from "./miModulo.js"

// Para exportar un módulo contenido en un archivo diferente al nuestro:
// export {nombreExportado} from "./otroModulo.js"
// export {nombreExportado as nombre} from "./otroModulo.js"
// export * from "./otroModulo.js"


// MÓDULOS EN EL NAVEGADOR
// Para usar directivas import en un navegador hay que especificar al navegaror
// que nuestro código es un módulo:
// <script type="module">import "./main.js"</script>

// Los scripts de tipo módulo (type="module") se cargan y ejecutan como los
// scripts con el atributo defer: Se cargan en cuanto aparecen en el archivo HTML, 
// pero sólo se ejecutan una vez se ha leído todo el archivo .html

// Los scripts de tipo módulo sólo pueden cargarse desde el mismo origen que contiene 
// el archivo .html, al contrario que los scripts normales

// Para distinguir los archivos que son módulos del resto, algunos programadores usan la extensión .mjs

// Importaciones dinámicas
// Se usan para cargar archivos y módulos JS de manera progresiva en el navegador
// import("./miModulo.js").then(nombre=>{ ... });

// import.meta contiene metadatos acerca del módulo que está en ejecución
// import.meta.url contiene la URL desde la cual se ha cargado el módulo

