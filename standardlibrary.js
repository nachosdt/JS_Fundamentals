// ERROR

let error = new Error();
error.message = "Mensaje de error";
console.log("\n" + error.toString());
error.name = "MiError"; // Por defecto name = Error. 
console.log("\n" + error.toString());
console.log("\n" + error.stack + "\n");

function comprobar(parametro) {
    if (typeof parametro === "number") {
        throw new TypeError("El parámetro es un número");
    }
}

//comprobar(5);

// JS define varias subclases de Error:
// EvalError, RangeError, ReferenceError, SyntaxError, TypeError y URIError


// JSON
// El formato JSON admite numbers, string, booleans y null, además de array y objetos construidos con estos valores
let objeto = {
    "propiedad1": "valor1",
    "propiedad2": 10,
    "propiedad3": true,
    "propiedad4": new Date()
};
let cadena = JSON.stringify(objeto); // Convierte el objeto en string
// Si un valor del objeto no es admitido en el formato JSON, JSON.stringify() invoca 
// al método .toJSON() de ese valor, si es que existe. 
// Los objetos Date, por ejemplo, tienen un método.toJSON()

JSON.parse(cadena); // Convierte el string en objeto

// Hacer una copia de un objeto
function copia(objeto) {
    return JSON.parse(JSON.stringify(objeto));
}

console.log(JSON.stringify(objeto));
console.log(JSON.stringify(objeto, null, 2)); // El tercer argumento determina los espacios de sangría
console.log(JSON.stringify(objeto, ["propiedad2","propiedad1"], "\t")); // El segundo argumento permite cambiar el orden de las propiedades
console.log(JSON.stringify(objeto, function(propiedad, valor) {
    if(typeof valor === "boolean") return undefined; // Eliminamos del JSON los valores booleanos
    else return valor;
}, 2)); // También admite una función como 2º argumento


// JSON.parse() admite un callback como segundo argumento, para convertir valores
objeto = JSON.parse(cadena, function(propiedad,valor) {
    if (propiedad === "propiedad1") return undefined; // Esto borra "propiedad1" del objeto
    if (typeof valor === "string" && 
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(valor)) {
            return new Date(valor);  // Esto convirte el valor string de una fecha en un objeto Date
    }
    return valor;
});
console.log(objeto);
