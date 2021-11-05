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

comprobar(5);

// JS define varias subclases de Error:
// EvalError, RangeError, ReferenceError, SyntaxError, TypeError y URIError


// JSON
