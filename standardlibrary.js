// ERROR
console.log("\nCLASE ERROR\n");

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
// El formato JSON admite numbers, string, booleans y null, además de arrays y objetos construidos con estos valores
console.log("\nCLASE JSON\n");

let objeto = {
    "propiedad1": "valor1",
    "propiedad2": 10,
    "propiedad3": true,
    "propiedad4": new Date()
};
let cadena = JSON.stringify(objeto); // Convierte el objeto en string
// Si un valor del objeto no es admitido en el formato JSON, JSON.stringify() invoca 
// al método .toJSON() de ese valor, si es que existe. 
// Los objetos Date, por ejemplo, tienen un método .toJSON()

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


// JSON.parse() admite un callback como segundo argumento, para convertir los valores si es necesario
objeto = JSON.parse(cadena, function(propiedad,valor) {
    if (propiedad === "propiedad1") return undefined; // Esto borra "propiedad1" del objeto
    if (typeof valor === "string" && 
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(valor)) {
            return new Date(valor);  // Esto convirte el valor string de una fecha en un objeto Date
    }
    return valor;
});
console.log(objeto);


// INTERNATIONALIZATION API
// Se usa para formatear localmente numeros, fechas y horas
console.log("\nINTERNATIONALIZATION API\n");

// a) Numeros:
let euros = Intl.NumberFormat("es", {style: "currency", currency: "EUR"});
// Si el primer argumento se opmite o es undefined, se usa el valor por defecto del sistema
// El segundo argumento es un objeto que puede tener las siguiente propiedades:
// style (decimal, percent, currency)
// currency 
// currencyDisplay (symbol, code , name)
// useGrouping (true, false)
// minimumIntegerDigits
// minimumFractionDigits, maximumFractionDigits
// minimunSignificantDigits, maximumSignificantDigits

console.log(euros.format(100));

let libras = Intl.NumberFormat("en", {style: "currency", currency: "GBP"}).format;
console.log(libras(100));

// b) Fechas y horas
let fecha = Intl.DateTimeFormat("es", {weekday:"long", month: "long", year:"numeric"});
// El 2º argumento es un objeto que puede tener las siguientes propiedades
// year (numeric, 2-digit)
// month (numeric, 2-digit, long, short, narrow)
// day (numeric, 2-digit)
// weekday (long, short, narrow)
// era (long, short, narrow)
// hour, minute, second (numeric, 2-digit)
// timeZone 
// timeZoneName (long, short)
// hour12 (true, false)
// hourCycle (h11, h12, h23, h24)

let d = new Date();
console.log(fecha.format(d));

// Se pueden usar calendarios que no sean el juliano
console.log(Intl.DateTimeFormat("en-u-ca-japanese", {year:"numeric", era:"short"}).format(new Date()));

// c) Cadenas de texto

let patronDeCompaaracion = Intl.Collator("es", {});
// EL 2º argumento es un objeto que admite las siguientes propiedades
// usage (sort, search)
// sensitivity (base, accent, case, variant)
// ignoraPunctuation (true, false)
// numeric (true, false)
// caseFirst (upper, lower)

console.log(patronDeCompaaracion.compare("N","ñ"));
// El método .compare() devuelve -1, 0 o 1, según el orden de la comparación
// De este forma, podemos usar el método .sort() así:
let comparar = patronDeCompaaracion.compare;
let resultado = ["b", "A", "a", "Z", "z"].sort(comparar);
console.log(resultado);


// CONSOLE API
console.log("\CONSOLE API\n");
console.log("Cadena 1", "Cadena 2");
console.debug("Debug");
console.info("Información"); // En los browsers, el mensaje aparece con un icono coloreado
console.warn("Aviso"); // En los browsers, el mensaje aparece con un icono coloreado
console.error("Error. El output va a stderr y no a stdout"); // En los browsers, el mensaje aparece con un icono coloreado
console.assert(true, "Esto se imprime");
console.assert(false, "Esto no se imprime");
//console.clear(); // Limpia la consola
console.table([{nombre:"Juan", apellido:"Pérez"},{nombre:"Ana", apellido:"López"}]);
console.trace("El output va a stderr y no a stdout");
console.count("Uno");
console.count("Uno");
console.countReset("Uno");
console.count("Uno");
console.group("Cabecera"); // Los siguientes mensajes aparecen con sangría. En los navegadores, se pueden colapsar y expandir
console.log("Explicación del mensaje");
console.log("Y continuación de la explicación");
console.groupEnd();
// console.groupCollapsed() // Como console.group(), per en los navegadores los mensajes se colapsan por defecto
console.time("Cronometro"); // No output
setTimeout(()=>{console.timeLog("Cronometro");},1000);
setTimeout(()=>{console.timeEnd("Cronometro");},2000);

// Formatear el output
setTimeout(()=>{
    console.log("Conversión a string %s", new Date()); 
    console.log("Conversión a entero %i", "100.15");
    console.log("Conversión a number %d", "100.15");
    console.log("Conversión a number %f", "100.15");
    console.log("Conversión a objeto %o", {"propiedad": 'valor'});
    console.log("Conversión a estilo CSS (sólo en navegadores) %c", "p {color: blue;}");
    api_url();
},2010);


function api_url() {
    // API URL
    console.log("\nURL API\n");

    let url = new URL("https://pokeapi.co:8000/api/v2/ability/?limit=20&offset=20#fragment");
    console.log("url.href =", url.href);
    console.log("url.origin =", url.origin); // Read-only
    console.log("url.protocol =", url.protocol);
    console.log("url.host =", url.host);
    console.log("url.hostname =", url.hostname);
    console.log("url.port =", url.port);
    console.log("url.pathname =", url.pathname);
    console.log("url.search =", url.search);
    console.log("url.hash =", url.hash);

    url.searchParams.append("otro_parametro","valor"); // Añadir otra query
    url.searchParams.set("otro_parametro", 2); // Cambia el valor del parámetro
    url.searchParams.get("limit"); // Devuelve el valor del parámetro, si existe
    url.searchParams.has("limit"); // Devuelve true o false
    url.searchParams.sort(); // Ordena los parámetros
    url.searchParams.delete("otro_parametro");
}

// TIMERS
let delay = 1000;
let id = setTimeout(()=>{},delay);
clearTimeout(id); // Cancela la ejecución de la función

let intervalo = 2000;
id = setInterval(()=>{},intervalo);
clearInterval(id); // Cancela la repetición de la función