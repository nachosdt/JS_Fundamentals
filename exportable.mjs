let variable = "Variable exportada";

function funcion() {
    return "Valor de la función exportada";
}

export default class ClaseExportada {
    constructor() {
        this.propiedad = "Valor de la propiedad exportada";
    }
    imprimir() {
        return this.propiedad;
    }
}

export {variable, funcion};

// ES6 introdujo los comandos import y export
// El código dentro de un módulo está por definición en strict mode, como ocurre con las clases
// Para exportar variables, funciones o clases, basta con usar la palabra export
// export let variable = "valor";
// export function unaFuncion() {}
// export class unaClase {}

// Otra posibilidad es añadir las exportaciones al final del código:

// Si únicamente se exporta un valor, se puede usar export default
//export default class unaClaseMas {};
// Con export default se pueden exportar funciones anónimas, clases anónimas y objetos literales

// Se pueden exportar valores con otro nombre
// export {
//     variable as otraVariable,
//     funcion as otraFuncion
// };