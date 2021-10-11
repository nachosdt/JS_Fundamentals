// CONDICIONALES, LOOPS Y SALTOS

// Los bloques de sentencias se escriben entre llaves {}
// La sentencia vacía se escribe con punto y coma ;

let array = [];
for (let i = 0; i<10 ; array[i] = i++);
console.log("Array inicializado con un buble for y sentencia vacía:");
console.log(array);

// 1) CONDICIONALES
//      a) if (expresion) sentencia
//      b) if (expresion) sentencia1
//         else sentencia2
//      c) if (expresion1) sentencia1
//         else if (expresion2) sentencia2

//      d) switch (expresion) {
//         case 1:
//          sentencia1
//          break;
//         case 2:
//          sentencia2
//          break;
//         default:
//          sentencia3
//         }


// 2) LOOPS
//      a) while (expresion) sentencia
//      b) do sentencia while (expresion)
//      c) for (inicializador ; test ; incremento) sentencia

// Otros bucles for
console.log("\nBucles FOR/OF\n");
// Los bucles for/of funcionan con objetos iterables: arrays, strings, sets y maps
console.log("Bucle for/of sobre el array:");
for (let elemento of array) {
    console.log(elemento);
}

// Los objetos no son iterables
// Para usar un bucle for/of con un objeto, hay que hacerlo sobre sus claves, valores, o pares clave/valor
console.log("\nIteración sobre las claves, valores, y pares clave/valor de un objeto:");
let objeto = {
    propiedad1: "valor1",
    propiedad2: "valor2"
};
console.log("objeto =",objeto);
console.log("1) Claves");
for (let clave of Object.keys(objeto)) {
    console.log(clave);
}
console.log("2) Valores");
for (let valor of Object.values(objeto)) {
    console.log(valor);
}
console.log("3) Par clave/valor");
for (let [clave,valor] of Object.entries(objeto)) {
    console.log(clave + ": " + valor);
}

console.log("\nBucles FOR/IN\n");
// Los bucles for/in se emplean para iterar sobre las propiedades ENUMERABLES de los objetos.
// No itera sobre propiedades no enumerables ni sobre propiedades cuyo nombre es un símbolo (Symbol).
// Los métodos y muchas propiedades de los objetos predefinidos en JS no son enumerables (p. ej: .toString())
// Por defecto, todas las propiedades y métodos que definamos en nuestro código serán enumerables
console.log("Iteración sobre los pares clave/valor de un objeto:");
for (let propiedad in objeto) {
    console.log(propiedad + " = " + objeto[propiedad]);
}

// Una forma rápida de copiar los nombres de las propiedades de un objeto en un array con una sentencia vacía:
console.log("Una forma rápida de copiar los nombres de las propiedades de un objeto en un array con una sentencia vacía:");
array = [];
let i = 0;
for (array[i++] in objeto);
console.log(array);

// 3) SALTOS
//      identificador : sentencia
//      continue : identificador;
// También se puede usar con break:
//      break identificador;

// Continue pasa a la siguiente iteración del bucle
// Break sale del bucle
for (let i = 0; i<50; i++) {
    if (i<25) continue;
    else break;
}

mibucle: for (let i = 0; i<50; i++) {
    if (i<25) continue mibucle;
    else break mibucle;
}