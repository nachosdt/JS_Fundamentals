// LIBRERÍA STANDARD DE JAVASCRIPT

// CLASE SET
console.log("\nCLASE SET:\n");
// Al contrario que los array, los Set no están ordenados ni indexados.
// Tampoco permiten duplicados en la colección de valores
let set = new Set();
// Al consttructor se le puede pasar por argumento cualquier objeto iterable
let array = [1, true, "cadena de texto"];
set = new Set(array);
set = new Set("Otra cadena de texto");

// Propiedad .size (como .length)
console.log("Tamaño del Set:", set.size);
console.log("Set:",set);
// Métodos .add(), .delete() y .clear()
set.add(true);
set.clear();
set.add(array);
set.add(1).add(0);
set.delete(array); // devuelve true si el elemento existe y se ha borrar del Set

// Método .has()
set.has(1); // devuelve true o false, dependiendo si el valor está presente en el Set
// Compara los elementos por identidad (referencia), no por igualdad (valor)

// Los Set son capaces de comprobar la existencia de elementos con .has() mucho más rápido que los arrays con .includes()
// Los Set son iterables y por tanto pueden convertirse fácilmente en arrays
for (let elemento of set) {
    console.log(elemento);
}
array = [...set];
console.log(array);

// Los Set también tienen un método .forEach(), cuyo callback sólo acepta un argumento (el valor)
console.log("Propiedades y métodos de los Set:",Reflect.ownKeys(Set.prototype));

// LA CLASE MAP
console.log("\nCLASE MAP:\n");
// Los objetos de la clase Map son un conjunto de pares clave-valor
let mapa = new Map();
mapa = new Map([["uno",1],["dos",2]]);
// El argumento debe ser un objeto iterable compuesto por pares [clave,valor]
let objeto = {x: 1, y: 2};
mapa = new Map(Object.entries(objeto));

// Propiedades y métodos:
mapa.size;
mapa.set("x",3); // Reescribimos un valor ya existente
mapa.set("z", 5); // Añadimos un nuevo par clave-valor
mapa.get("y"); // Devuelve el valor asociado a una clave. Si no existe la clave devuelve undefined
mapa.has("x"); // Devuelve true si existe la clave
// .has() compara los elementos por identidad (referencia), no por igualdad (valor)
mapa.delete("z"); // Borra del mapa el par clave-valor asociado a la clave
mapa.clear(); // Borra todos los valores del mapa

// Cualquier valor se puede usar como clave y valor de un mapa
mapa.set(undefined, null);
mapa.set(NaN, {});

// Como los Set, los Map son iterables
console.log(mapa);
console.log(...mapa)
for (let par of mapa) {
    [clave,valor] = par;
    console.log(clave + " ---> " + valor);
}

// Los Map también tienen un método .forEach(), cuyo callback acepta 2 parametros (valor,clave)
console.log("Propiedades y métodos de los Map:",Reflect.ownKeys(Map.prototype));