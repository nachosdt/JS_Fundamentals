// ARRAYS

// En JS los arrays sonun tipo especial de objetos
let array = [];
console.log("\nLos arrays pertenecen a la clase Array:", array instanceof Array);
console.log("Los arrays son objetos:", array instanceof Object);
console.log("typeof array:", typeof array);

// Los arrays heredan propiedades de Array.prototype
console.log("\nPropiedades heredadas por los arrays:", Reflect.ownKeys(Array.prototype));

// Hay 4 formas básicas de crear arrays:
// 1) Literales
let a = [1,2,3,"cuatro",false];
let vacío = [];
let sparse = [1,,,true];

// 2) Operador spread ...
let b = [6,7,8,...a];
// Se puede usar con cualquier objeto iterable
let string = "ABCDEFG";
b = [...string];
// Una forma fácil de eliminar elementos duplicados en un array:
let arr_duplicados = [1,1,2,2,3,3,4,4];
let arr_unicos = [...new Set(arr_duplicados)];

// 3) Constructor Array()
array = new Array(); // array = []
array = new Array(5); // array.length = 5
array = new Array(1,2,3,4,"texto",true); // array = [1,2,3,4,"texto",true]

// 4) Array.of() y Array.from()
array = Array.of(); // array = [];
array = Array.of(10); // array = [10];
array = Array.of(7,8,9); // array = [7,8,9];

let copia = Array.from(array);
// Array.from() acepta como argumento cualquier objeto iterable.
// Funciona como el operador spread ...
array = Array.from("un texto cualquiera");
// Acepta también una función como segundo argumento
array = Array.from("un texto cualquiera", (valor, indice)=>{return indice + valor.toUpperCase()});
console.log(array);

// Leer y escribir los elementos de un array
let elemento = array[0];
array[1] = "valor";
array["2"] = false;
// Los arrays son un tipo especial de objeto, por lo que pueden tener propiedades
array["propiedad"] = 10;
array[-50] = true;
// Si la propiedad es un número entero no negativo, se convierte en un íncice
array["1000"] = "valor";
console.log("\nLongitud del array:", array.length);

// Sparse arrays
// Arrays en los que el nº de elementos es menor que su longitud
sparse = [1,,,,,,,9];
console.log("Longitud del sparse array:", sparse.length);
console.log("Valor del elemento inexistente en el sparse array:", sparse[3]);
console.log("3 in sparse =", 3 in sparse); // No existe el elemento 3

// La propiedad .length
// Se puede usar para eliminar elementos de un array
let arr = [1,2,3,4,5];
arr.length = 3; // a = [1,2,3]
arr.length = 0; // a = []

// Añadir y eliminar elementos en los extremos
arr.push("Añadir al final");
arr.pop();
arr.unshift("Añadir al principio");
arr.shift();

// ELiminar elementos
delete arr[2]; // a[2] = undefined, pero no varía la longitud. El array ahora es sparse

// Iteracion sobre los elementos de un array
// 1) Bucle for tradicional
for (let i = 0; i<array.length; i++) {
    // Código
}
// En los casos en los que el array es largo y se quiere mejorar el rendimiento, 
// se puede evitar hacer llamadas constantes a la propiedad .length
for (let i = 0, longitud = array.length; i<longitud; i++) {
    // Código
}
// 2) Bucle for/of
for (let elemento of array) {
    // Código
}
for (let [indice,elemento] of array.entries()) {
    // Código
}
array = ["primero","segundo","tercero"];
let resultado = [...array.entries()]; // Hay que convertirlo a array, porque devuelve un objeto iterable
console.log("\nMétodo .entries():", resultado);
// 3) Método .forEach() --> IMPORTANTE: No itera sobre los elementos inexistentes de un sparse array
array.forEach((valor,indice,arr)=>{
    // Código
});

// MÉTODOS DE LOS ARRAYS
// 1) Métodos de iteración
// No iteran sobre los indices vacíos de los sparse arrays
// Algunos aceptan un 2º argumento, que se convierte en el valor de this dentro de la función del primer argumento
// Ninguno modifica el array original
array.forEach((valor,indice,arr)=>{});
array.map((valor,indice,arr)=>{return "valor"}); // Debe devolver un valor por cada elemento, y si el array es sparse, el resultado también
array.filter((valor,indice,arr)=>{return true||false;}); // Debe devolver un boolean y devuelve un array sin índices vacíos
// Forma sencilla de eliminar elementos vacíos de un sparse array:
let denso = sparse.filter(()=>true);

// Los 2 siguientes métodos dejan de iterar cuando hacen match
array.find((valor,indice,arr)=>{return true||false;}); // Devuelve el valor de la coincidencia
array.findIndex((valor,indice,arr)=>{return true||false;}); // Devuelve el índice de la coincidencia

array.every((valor,indice,arr)=>{return true||false;}); // Devuelve true si todos los elementos devuelven true
array.some((valor,indice,arr)=>{return true||false;}) // Devuelve true si algún elemento devuelve true
// Ambos dejan de iterar cuando saben qué resultado devolver

array.reduce((resultado,valor,indice,arr)=>{return "valor";},0); // El segundo argumento es el valor inicial del parámetro resultado
array.reduceRight((resultado,valor,indice,arr)=>{return "valor";}); // Si no se especifica, inicialmemte resultado = array[0]

// Para reducir los niveles de anidamiento de los arrays multidimentsionales
array = [[1,2,3],[[4,5],[6,7]],[[[8]]]];
console.log("\nEjemplos de desanidamiento con .flat():");
console.log(array);
console.log(array.flat());
console.log(array.flat(1));
console.log(array.flat(2));
console.log(array.flat(3));
array.flatMap((valor,indice,arr)=>{return "valor";}); // Funciona como .map(), pero al resultado le aplica .flat()

array = [1,2,3,4,5];
array = array.concat(6,7); // El array original no se modifica con .concat(), hay que guardar el valor
array = array.concat([8,9],[10,[11]]); // Se desanida un nivel automáticamente
console.log("\nArray concatenado con .concat():",array);

// Los métodos push(), pop(), unshift() y shift() sí que modifican el array que los invoca
array = [];
array.push(3,4);
array.unshift(1,2);
// push() y pop() son más eficientes que unshift() y shift() porque no modifican todos los indices del array

// Métodos para trabajar con subarrays
array = [1,2,3,4,5];
let inicio = 0;
let final = 3;
array.slice(inicio,final); // = [1,2,3] 
// No se incluye el índice final ni se modifica el array original
array.slice(0); // Todo el array
array.slice(0,-1); // Todo el array

inicio = 1;
let nro_elementos_eliminados = 3;
let eliminados = array.splice(inicio, nro_elementos_eliminados);
// splice() sí que modifica el array original, y devuelve un array con los elementos eliminados
// También se pueden insertar elementos sustituyendo a los que se eliminan
array.splice(inicio, nro_elementos_eliminados,3,false,"valor",[1,5]);

array = new Array(4);
array.fill(0); // array = [0,0,0,0]
array.fill(true,1); // array = [0,true,true,true] El segundo argumento puede especificar el índice inicial
array.fill("A",2,3); // El tercer argumento puede especificar el índice final (puede ser negativo)

array = [1,2,3,4,5];
array.copyWithin(1); // El primer argumento especifica el índice de destino
array.copyWithin(2,3,5); // El 2º especifica el índice del primer elemento a copiar (= 0 por defecto)
// El tercer argumento especifica el índice del último elemento, que no se incluye en la copia (por defecto = length)
// El método .copyWithin() modifica el array original, pero no su longitud, que permanece constante

// Otros métodos:
array.indexOf(1);
array.lastIndexOf(1);
// Devuelven el índice del primer match o -1 si no hay match
// Un segundo argumento puede especificar el inicio de la búsqueda

// Función para hallar todos los índices de una búsqueda en un array:
function hallarCoincidencias(array,valor) {
    let resultados = [];
    let longitud = array.length;
    let indice = 0;
    while (indice<longitud) {
        indice = array.indexOf(valor,indice);
        if (indice === -1) break;
        resultados.push(indice);
        indice++;
    }
    return resultados;
}

array.includes("valor"); // Devuelve true o false
array.sort(); // Ordena los elementos alfabéticamente, convirtiéndolos a string si es necesario. Modifica el array original.
// Admite una función como argumento
// Para ordenar números en un array:
array.sort((a,b)=>{return a-b;})
// Si el primer argumento de la función debe ir primero, el valor de retorno debe ser < 0
array.reverse(); // Invierte el orden de los elementos, modificando el array original 

// Conversion de arrays en string
let string = JSON.stringify(array);
string = array.join();
string = array.join(", ");
string = array.toString(); // = array.join()

Array.isArray([]); // Devuelve true o false
Array.isArray({});

// OBJETOS PARECIDOS AL ARRAY (ARRAY-LIKE OBJECTS)
// Los arrays son objetos especiales, como se ha dicho.
// ¿Qué les diferencia principalmente de los objetos?
// - La propiedad length
// - Los métodos que heredan de Array.prototype

// Existen objetos parecidos al array (propiedad length y propiedades con números enteros no negativos).
// Con ellos no se pueden usar los métodos de los arrays, pero son iterables

// Función para saber si un objeto es semejante a un array e iterable
function isArrayLike(objeto) {
    if (objeto &&
        typeof objeto === "object" &&
        Number.isFinite(objeto.length) &&
        objeto.length >= 0 &&
        Number.isInteger(objeto.length) &&
        objeto.length < 4294967295) {
        return true;
    } else {
        return false;
    }
}

// Con este tipo de objetos se pueden usar los métodos de los arrays mediante el método call()
let objeto_iterable = {"0":1, "1": "valor", "2":false, "length":2};
Array.prototype.join.call(objeto_iterable,"+");
// Conversión de un objeto iterable en un array:
Array.prototype.slice.call(objeto_iterable,0);
Array.from(objeto_iterable);

// Los string se comportan como arrays read-only
// También podemos usar los métodos de los arrays con call()
Array.prototype.join.call("Cadena de texto", " ");
// Intentar modificar un string directamente mediante un método de los Arrays no provoca un error,
// simplemente falla en silencio 