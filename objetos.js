// Los objetos son valores compuestos, colecciones desordenadas
// de propiedades o claves que almacenan un valor.
// También se denominan arrays asociativos

// Además, los objetos heredan las propiedades de su prototipo

// Los nombres de las propiedades pueden ser de tipo String o Symbol

// Al contratio que los tipos de dato primitivos, los objetos se manipulan por referencia, no por valor.
// Los tipos de dato primitivos son inmutables, los objetos son mutables y modificables.

// Las propiedades de los objetos tienen 3 atributos: writeable, enumerable y configurable
// Por defecto, todas la propiedades de los objetos que creamos son writeables, enumerables y configurables

// CREACIÓN DE OBJETOS
// 1) Literales
let empty = {};
let objeto = {propiedad1: "valor 1", propiedad2: "valor 2"};
// Así, se crea un nuevo objeto cada vez que se evalúa la expresión literal

// 2) Con el operador new
let array = new Array();
let object = new Object();
let fecha = new Date();

// Los objetos heredan las propiedades de sus prototipos
// Los objetos creados literalmente heredan de Object.prototype
// Los objetos creados con el operador new heredan de Constructor.prototype
console.log("Prototipo de Array:", Array.prototype);
console.log("Prototipo de Object:", Object.prototype);
console.log("Prototipo de Date:", Date.prototype);

// 3) Con Object.create()
let otroObjeto = Object.create({x:1,y:2});
// De esta forma, el nuevo objeto tiene como prototipo el objeto que se pasa como argumento a Object.create()
// Para crear un objeto vacío:
let objVacio = Object.create(Object.prototype);
console.log("Objeto vacío con Object.create(Object.prototype):",objVacio);

// Para acceder a las propiedades de los objetos se pueden usar puntos o corchetes:
// objeto.propiedad u objeto["propiedad"]
otroObjeto.x;
otroObjeto["y"];

// GET y SET de las propiedades
objeto.propiedad1;
// JS busca la propiedad "propiedad1" en objeto. Si no existe, se busca en su prototipo, 
// y si no en el prototipo de su prototipo, etc... Si la propiedad no existe en ninguno, devuelve undefined.
objeto.propiedad3 = "tercer valor";
// Si "propiedad3" no existe y los prototipos no tienen ninguna "propiedad3" que sea readonly,
// se crea la "propiedad3" y se le asigna valor.

// 3 formas seguras de acceder a las propiedades de un objeto
let variable;
if (objeto && objeto.propiedad1) {
    variable = objeto.propiedad1.valor;
}
// ----
variable = objeto && objeto.propiedad1 && objeto.propiedad1.valor;
// ----
variable = objeto?.propiedad1?.valor;
// En estos 3 casos, la propiedad "valor" no existe, devuelve undefined, no salta error.
// Si "propiedad1" no existiera y no usamos estos métodos de acceso seguros, saltaría un error.

// Las propiedades se pueden borrar con el operador delete
// Este operador NO puede borrar las propiedades heredadas ni las no configurables
delete objeto.propiedad3;
// delete devuelve true tanto si se borra la propiedad como si la propiedad no existe
// Sólo devuelve false al trarar de eliminar una propiedad no configurable

// Operadores y métodos para comprobar propiedades
"propiedad1" in objeto; // Para propiedades propias y heredadas
objeto.propiedad1 !== undefined; // No sirve si objeto.propiedad1 === undefined
objeto.hasOwnProperty("propiedad1"); // Sólo propiedades propias
objeto.propertyIsEnumerable("propiedad1"); // Propiedades enumerables


// Formas de enumerar las propiedades propias, no heredadas, de un objeto
console.log("\nEnumerar las propiedades de un objeto:\n");
for (let propiedad in objeto) {
    console.log(propiedad);
}
let propiedades = Object.keys(objeto); // Devuelve un array de propiedades enumerables
console.log(propiedades);
let propNoEnumerables = Object.getOwnPropertyNames(objeto); // Enumerables y no enumerables
console.log(propNoEnumerables);
let simbolos = Object.getOwnPropertySymbols(objeto); // Símbolos, ya sean enumerables o no
console.log(simbolos);
let todas = Reflect.ownKeys(Object.prototype);  // Todas: enumerables, no enumerables, String y Symbol
console.log(todas);

// Copiar las propiedades de un objeto en otro
console.log("\nCopia de las propiedades de un objeto:\n");
let fuente1 = {x:0, y:1};
let fuente2 = {a:2, b:3};
let recipiente = {};
Object.assign(recipiente,fuente1,fuente2);
console.log(recipiente);
// Otra forma:
let recipiente2 = {...fuente2, ...fuente1};
console.log(recipiente2);

// Serialización de objetos (conversion a String)
console.log("\nSerialización de un objeto:\n");
let stringObjeto = JSON.stringify(recipiente);
console.log(stringObjeto);
let conversion = JSON.parse(stringObjeto);
console.log(conversion);

// Métodos de los objetos hechos para ser re-escritos para mejorarlos:
objeto.toString(); // Se llama cuando JS necesita convertir el objeto a String
objeto.toLocaleString();
objeto.valueOf(); // Se llama cuando JS tiene que convertir el objeto a un tipo primitivo
// objeto.toJSON() Se llama cuando JS tiene que serializar el objeto.
// Por defecto no existe, pero se puede implementar.
// Si no existe, JS usa JSON.stringify(objeto)

//Nuevas formas de declarar objetos literalmente
console.log("\nTrucos para la declaración literal de objetos:\n");
let x = "valor";
let y = false;
let o = {x,y};

let p = "propiedad";
function miFuncion() {return "otraPropiedad";}
o[p] = 1;
o[miFuncion()] = 2;

let simbolo = Symbol("simbolo");
let simbolo2 = Symbol("simbolo"); // Aún con el mismo argumento, el símbolo es diferente
o[simbolo] = null;
o[simbolo2] = undefined;

let o2 = {y: true, ...o}; // La propiedad "y" de o modifica la anterior
console.log(o2);
// El operador spread ... sólo añade las propiedades propias, no las heredadas
let o3 = Object.create(o);
let o4 = {...o3};
console.log(o4);

// Declaración de métodos en un objeto:
let objetoConMetodos = {
    propiedad: "valor",
    metodo: function() {return this.propiedad;}
};
let objetoConMetodos2 = {
    propiedad: "valor",
    metodo() {return this.propiedad;}
};

// Acceso properties (getters y setters)
let objSetGet = {
    propiedadNormal: 0,
    get propiedadConAccesor() {return this.propiedadNormal;},
    set propiedadConAccesor(valor) {this.propiedadNormal = valor;}
}
objSetGet.propiedadConAccesor(5);
let cinco = objSetGet.propiedadConAccesor();
// Los getters y setters permiten que una propiedad sea read/write, read-only o write-only
// Dentro de estos métodos se una la palabra reservada this para hacer referencia al objeto.