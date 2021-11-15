// ITERADORES
console.log("\nITERADORES\n");

// Los arrays, strings, set y map son objetos iterables
// 1) Su contenido se puede iterar con un bucle for/of
// 2) Admiten el operador spread ...

// La iteración en JS tiene tres partes:
// !) EL objeto iterable (objeto con un método llamado Symbol.iterator iterador que devuelve un objeto iterador)
// 2) El objeto iterador (objeto con un método .next() que devuelve el bjeto resultado)
// 3) El objeto resultado de la iteración (objeto con propiedades .value y .done)

let iterable = [1,2,3,4,5];
let iterador = iterable[Symbol.iterator]();
for(let elemento = iterador.next(); !elemento.done; elemento = iterador.next()) {
    console.log(elemento.value);
}

/*
 * A Range object represents a range of numbers {x: from <= x <= to}
 * Range defines a has() method for testing whether a given number is a member
 * of the range. Range is iterable and iterates all integers within the range.
 */
class Range {
    constructor (from, to) {
        this.from = from;
        this.to = to;
    }

    // Make a Range act like a Set of numbers
    has(x) { return typeof x === "number" && this.from <= x && x <= this.to; }

    // Return string representation of the range using set notation
    toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }`; }

    // Make a Range iterable by returning an iterator object.
    // Note that the name of this method is a special symbol, not a string.
    [Symbol.iterator]() {
        // Each iterator instance must iterate the range independently of
        // others. So we need a state variable to track our location in the
        // iteration. We start at the first integer >= from.
        let next = Math.ceil(this.from);  // This is the next value we return
        let last = this.to;               // We won't return anything > this
        return {                          // This is the iterator object
            // This next() method is what makes this an iterator object.
            // It must return an iterator result object.
            next() {
                return (next <= last)   // If we haven't returned last value yet
                    ? { value: next++ } // return next value and increment it
                    : { done: true };   // otherwise indicate that we're done.
            },

            // As a convenience, we make the iterator itself iterable.
            [Symbol.iterator]() { return this; }
        };
    }
}

for(let x of new Range(1,5)) console.log(x); // Logs numbers 1 to 5
[...new Range(-2,2)]                          // => [-2, -1, 0, 1, 2]


// Los objetos iteradores pueden incluir un método .return(), además del .next(), que devuelve un objeto resultado de la iteración
// Si la iteración se detiene antes de llegar al final, se ejecutará este método, sin argumentos. 


// GENERADORES
console.log("\nGENERADORES\n");


// Un generador es un iterador definido con sintaxis moderna
// Para crear un generador, hay que definir una función generadora con function*
// Al invocar a esta función, no se ejecuta el código, sino que se devuelve un objeto generador (un iterador)
// Al invocar el método .next() del onjeto generador, se ejecuta la funcion generadora hasta la primera sentencia yield que se encuentra
// El valor devuelto es el que indica esta sentencia yield

function* primerosPrimos() {
    yield 2;
    yield 3;
    yield 5;
    yield 7;
}

let primos = primerosPrimos();
console.log(primos.next().value);
console.log(primos.next().value);
console.log(primos.next().value);
console.log(primos.next().value);
console.log(primos.next().done);

// Los generadores tienen un método Symbol.iterator, que les hace iterables
primos[Symbol.iterator]();
// Los generadores se pueden usar como el resto de objetos iterables
console.log([...primerosPrimos()]);

// A la hora de definir métodos generadores en un objeto o clase, se omite la palabra function
let objeto = {
    x:1,
    y:2,
    z:3,
    *generador() {
        for(let propiedad of Object.keys(this)) {
            yield propiedad;
        }
    }
};

console.log([...objeto.generador()]);

// El valor que devuelve una función generadora
function* unoYya() {
    yield 1;
    return "done";
}
console.log([...unoYya()]);
let generador = unoYya();
console.log(generador.next());
console.log(generador.next());
console.log(generador.next());

// El valor de la expresión yield es igual al argumento que se le pasa al método .next()
function* numerosPequeños() {
    console.log("next() es invocado por primera vez, el argumento se descarta");
    let y1 = yield 1; // y1 == "b"
    console.log("next() es invocado por segunda vez, con argumento", y1);
    let y2 = yield 2; // y2 == "c"
    console.log("next() es invocado por tercera vez, con argumento", y2);
    let y3 = yield 3; // y2 == "d"
    console.log("next() es invocado por cuarta vez, con argumento", y3);
    return 4; 
}
let g = numerosPequeños();
console.log("Se ha creado el generador sin ejecutarse nada aún");
let n1 = g.next("a"); // n1.value == 1;
console.log("El generador devuelve el yield", n1.value);
let n2 = g.next("b"); // n2.value == 2;
console.log("El generador devuelve el yield", n2.value);
let n3 = g.next("c"); // n3.value == 3;
console.log("El generador devuelve el yield", n3.value);
let n4 = g.next("d"); // n4.value == {value: 4, done: true};
console.log("El generador devuelve el return", n4.value);

// Ejemplos:
function* fibonacciSequence() {
    let x = 0, y = 1;
    for(;;) {
        yield y;
        [x, y] = [y, x+y];  // Note: destructuring assignment
    }
}

// Yield the first n elements of the specified iterable object
function* take(n, iterable) {
    let it = iterable[Symbol.iterator](); // Get iterator for iterable object
    while(n-- > 0) {           // Loop n times:
        let next = it.next();  // Get the next item from the iterator.
        if (next.done) return; // If there are no more values, return early
        else yield next.value; // otherwise, yield the value
    }
}

// An array of the first 5 Fibonacci numbers
[...take(5, fibonacciSequence())]  // => [1, 1, 2, 3, 5]

