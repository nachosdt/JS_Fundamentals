// FUNCIONES

// Parametros: variables locales que se usan al declarar la función
// Argumentos: variables que se pasan a la función al invocarla
// Método: Función que es propiedad de un objeto
// Constructor: Función que inicializa objetos

// EN JS las funciones son un tipo especial de objetos.
// Por tanto pueden tener sus propias propiedades y métodos

// Todas las funciones que no tienen valor de retorno devuelven undefined.
// Una función definida dentro de un bloque sólo se puede invocar dentro de ese bloque.

// FORMAS DE DEFINIR LAS FUNCIONES
// 1) Declaración:
function nombre(parametros) {
    // Cuerpo
}
// Las funciones definidas de esta manera se pueden invocar antes de su definición
// Es como si JS las situara arriba de todo el código ("hoisted").

// 2) Expresión:
const miFuncion = function(parametros) {
    // Cuerpo
} 
// Aquí estamos asignando la función a una variable, pero no es necesario.
// El nombre es opcional en este tipo de definición de las funciones
const otroNombre = function funcion(parametros) {
    // Cuerpo
}
// De esta forma, las funciones anónimas se pueden pasar como argumentos a otra función
let array = [3,2,1];
array.sort(function(a,b) {return a-b;});

// Con este tipo de definición las funciones NO pueden invocarse antes del código que las define

// 3) Arrow functions:
const funcion = (parametros) => {
    // Cuerpo
};
// Si el cuerpo se reduce a una sentencia return, se puede omitir el return y las llaves
const otraFuncion = (parametros) => "valor";
// Y si sólo hay un prámetro, se pueden omitir los paréntesis
const yOtraFuncion = parametro => "valor";

// Las funciones arrow se diferencian del resto en 2 cosas: 
// - Heredan el valor de la palabra reservada this del contexto en el que se definen
// - No tienen propiedad prototype, por lo que no pueden usarse como constructores


// FORMAS DE INVOCAR LAS FUNCIONES
// Se puede usar el acceso condicional a las funciones con ?.
otraFuncion?.("valor"); // Se invoca a la función si ésta no es null o undefined

// 1) Como funciones
miFuncion("parametro");
// En modo no estricto, el valor de this en la función es el objeto global
// En modo estricto, this = undefined
// Excepto en las arrow functions, que heredan el valor de this del contexto en el que se definen
function f() {
    console.log(this);    
}
f();
// Para saber si estamos en modo estricto:
const strict = (function() { return !this;}());
console.log("\n¿Estamos en modo estricto?", strict);

// 2) Como métodos
// Un método es una funcion asignada como propiedad a un objeto
let objeto = {};
function g(x) {return x;};
objeto.propiedad = g;
objeto.propiedad("valor");
objeto["propiedad"](5);
// En los métodos, el valor de this es el objeto que invoca la función 
objeto = {propiedad: true};
function h() {
    this.otraPropiedad = !this.propiedad;
}
objeto.metodo = h;
objeto.metodo();
console.log(objeto);

// Sí el método devuelve un objeto, se pueden encadenar varias invocaciones
array.join("").split("");
// De manera que puede ser muy útil que un método devuelva this (return this;)

// Cuidado con las funciones anidadas dentro de los métodos de un objeto:
let obj = {
    metodo: function() {
        let self = this;
        console.log("\n¿ this === obj en obj.metodo ?", this === obj);
        funcion();
        function funcion() {
            console.log("¿ this === obj en funcion ?", this === obj);
            console.log("¿ self === obj en funcion ?", self === obj);
        }
        const otraFuncion = () => {
            console.log("¿ this === obj en la arrow function ?", this === obj);            
        }
        otraFuncion();
    }
}
obj.metodo();


// 3) Como constructores
// Funciones precedidas por la palabra clave new
let fecha = new Date();
let otraFecha = new Date; // Se pueden omitir los paréntesis si no hay parámetros
// Los constructores crean un nuevo objeto vacío que hereda las propiedades 
// de la prpiedad prototype del constructor.

// 4) Invocación indirecta
// Las funciones son objetos, que heredan algunos métodos
// Los métodos .call() y .apply() permiten determinar el valor de this dentro de las funciones
funcion.call(objeto, "parametro");
funcion.apply(objeto, ["parametros"]);
// Esto permite invocar cualquier función como si fuera un método de cualquier objeto

// PARÁMETROS Y ARGUMENTOS
// Si una función se invoca con menos argumentos que sus parámetros definidos,
// el valor de los argumentos que faltan es por defecto undefined
function nombresDePropiedades(objeto,array) {
    array = array || []; // if (array === undefined) array = [];
    for (let propiedad in objeto) array.push(propiedad);
    return array;
}
// Los valores por defecto se pueden establecer así:
function nombresDePropiedades(objeto,array=[]) {
    for (let propiedad in objeto) array.push(propiedad);
    return array;
}
// A la hora de definir el valor por defecto se puede usar el valor de los parámetros anteriores
function rectangulo(anchura,altura=2*altura) {
    return {altura,anchura};
}

// También se pueden definir funciones que admiten más argumentos que parámetros
function f(parametro, ...rest) {
    for (let elemento of rest) {
    }
}
// Al invocar la función con más de un argumento, los restantes se almacenan en el array rest
// Si solo se proporciona un argumento, rest = [], nunca es undefined

// El parámetro rest se introdujo con ES6. Antes se usaba el objeto arguments
function f(parametros) {
    for (let i = 0; i<arguments.length; i++) {

    }
}
// El objeto arguments es semejante a un array (array-like), pero no es un array
// Indexa los argumentos que se pasan a una funcion
// No es conveniente usarlo. Mejor emplear ...rest

// FUNCIONES COMO VALORES
// Las funciones, al ser valores, se pueden asignar a variables, propiedades de objetos y elementos de un array
function f() {return "valor";}
let variable = f;
variable();

objeto = {metodo: f};
objeto.metodo();

array = [f];
array[0]();

// Y al ser objetos, pueden tener propiedades
uniqueInteger.counter = 0;
function uniqueInteger() {
    return uniqueInteger.counter++;
}
// Incluso pueden tener propiedades indexadas
function factorial(n) {
    if (Number.isInteger(n) && n>0) {
        if (!n in factorial) {
            factorial[n] = n * factorial[n-1];
        } else {
            return factorial[n];
        }
    } else {
        return NaN;
    }
}
factorial[1] = 1; // Inicializamos la cache y ya se puede usar la función

// Una función se puede declarar e invocar al mismo tiempo:
(function f() {
    return "valor";
})();

// Las variables definidas dentro de una función sólo son visibles dentro del cuerpo de la función
let scope = "global";
function comprobarScope() {
    let scope = "local";
    function f() {return scope;}
    return f();
}
console.log("\nScope =",comprobarScope());
function comprobarScope2() {
    let scope = "local";
    function f() {return scope;}
    return f;
}
let s = comprobarScope2()();
console.log("Scope =",s);

let uniqueInteger2 = (function() { // Definimos e invocamos para asignar a la variable la función de retorno
    let counter = 0; // Counter es ahora una variable privada de la función que se retorna abajo
    return function() {return counter++;};
}());

function counter() {
    let n = 0;
    return {
        count: function() {return n++;}, // Se devuelve un objeto con 2 métodos, que comparten acceso a la variable privada n
        reset: function() {n = 0;}
    };
}

// PROPIEDADES, MÉTODOS Y CONSTRUCTOR
function func(parametro) {
    return parametro;
}
func.length; // Read-only. Devuelve la aridez de la función (nº de parámetros)
func.name; // Read-only. Útil a la hora de escribir los mensajes de error.
func.prototype; // Las arrow functions no tienen esta propiedad (= undefined)
console.log("\nPrototipo de una función cualquiera:", func.prototype);
func.toString(); // Devuelve un string con el código de la función
console.log(func);
console.log(func.toString());
let array_argumentos = [1,"dos",true];
func.call(objeto,...array_argumentos); // Permite invocar a la función como si fuera un método del objeto (this = objeto).
func.apply(objeto,array_argumentos); // Permite invocar a la función como si fuera un método del objeto (this = objeto).
let j = func.bind(objeto); // Devuelve una función, que al invocarla a su vez invoca a la función original como método del objeto
// Además de enlazar función con objetos, también se pueden enlazar (fijar) argumentos de la función original
j = func.bind(objeto,"valor"); // Al invocar j(), se le pasa automáticamente el argumento a la función

const k = new Function("parametro1","parametro2","return parametro1+parametro2;");
// Si no se asigna a una variable, el constructor crea funciones anónimas

// EJEMPLOS DE "JAVASCRIPT. THE DEFINITIVE GUIDE"
// 1)
const map = function(a, ...args) { return a.map(...args); };
const reduce = function(a, ...args) { return a.reduce(...args); };
const sum = (x,y) => x+y;
const square = x => x*x;

let data = [1,1,3,5,5];
let mean = reduce(data, sum)/data.length;
let deviations = map(data, x => x-mean);
let stddev = Math.sqrt(reduce(map(deviations, square), sum)/(data.length-1));
stddev  // => 2

// 2)
// This higher-order function returns a new function that passes its
// arguments to f and returns the logical negation of f's return value;
function not(f) {
    return function(...args) {             // Return a new function
        let result = f.apply(this, args);  // that calls f
        return !result;                    // and negates its result.
    };
}

const even = x => x % 2 === 0; // A function to determine if a number is even
const odd = not(even);         // A new function that does the opposite
[1,1,3,5,5].every(odd)         // => true: every element of the array is odd

// 3)
// Return a function that expects an array argument and applies f to
// each element, returning the array of return values.
// Contrast this with the map() function from earlier.
function mapper(f) {
    return a => map(a, f);
}

const increment = x => x+1;
const incrementAll = mapper(increment);
incrementAll([1,2,3])  // => [2,3,4]

// 4)
// Return a new function that computes f(g(...)).
// The returned function h passes all of its arguments to g, then passes
// the return value of g to f, then returns the return value of f.
// Both f and g are invoked with the same this value as h was invoked with.
function compose(f, g) {
    return function(...args) {
        // We use call for f because we're passing a single value and
        // apply for g because we're passing an array of values.
        return f.call(this, g.apply(this, args));
    };
}

const suma = (x,y) => x+y;
const cuadrado = x => x*x;
compose(cuadrado, suma)(2,3)  // => 25; the square of the sum

// 5)
// The arguments to this function are passed on the left
function partialLeft(f, ...outerArgs) {
    return function(...innerArgs) { // Return this function
        let args = [...outerArgs, ...innerArgs]; // Build the argument list
        return f.apply(this, args);              // Then invoke f with it
    };
}

// The arguments to this function are passed on the right
function partialRight(f, ...outerArgs) {
    return function(...innerArgs) {  // Return this function
        let args = [...innerArgs, ...outerArgs]; // Build the argument list
        return f.apply(this, args);              // Then invoke f with it
    };
}

// The arguments to this function serve as a template. Undefined values
// in the argument list are filled in with values from the inner set.
function partial(f, ...outerArgs) {
    return function(...innerArgs) {
        let args = [...outerArgs]; // local copy of outer args template
        let innerIndex=0;          // which inner arg is next
        // Loop through the args, filling in undefined values from inner args
        for(let i = 0; i < args.length; i++) {
            if (args[i] === undefined) args[i] = innerArgs[innerIndex++];
        }
        // Now append any remaining inner arguments
        args.push(...innerArgs.slice(innerIndex));
        return f.apply(this, args);
    };
}

// Here is a function with three arguments
const l = function(x,y,z) { return x * (y - z); };
// Notice how these three partial applications differ
partialLeft(l, 2)(3,4)         // => -2: Bind first argument: 2 * (3 - 4)
partialRight(l, 2)(3,4)        // =>  6: Bind last argument: 3 * (4 - 2)
partial(l, undefined, 2)(3,4)  // => -6: Bind middle argument: 3 * (2 - 4)

const incremento = partialLeft(sum, 1);
const cuberoot = partialRight(Math.pow, 1/3);
cuberoot(incremento(26))  // => 3

const no = partialLeft(compose, x => !x);
const par = x => x % 2 === 0;
const impar = no(par);
const isNumber = no(isNaN);
impar(3) && isNumber(2)  // => true

// sum() and square() functions are defined above. Here are some more:
const product = (x,y) => x*y;
const neg = partial(product, -1);
const sqrt = partial(Math.pow, undefined, .5);
const reciprocal = partial(Math.pow, undefined, neg(1));

// Now compute the mean and standard deviation.
data = [1,1,3,5,5];   // Our data
mean = product(reduce(data, sum), reciprocal(data.length));
stddev = sqrt(product(reduce(map(data,
                                     compose(square,
                                             partial(sum, neg(mean)))),
                                 sum),
                          reciprocal(sum(data.length,neg(1)))));
[mean, stddev]  // => [3, 2]

// 6)
// Return a memoized version of f.
// It only works if arguments to f all have distinct string representations.
function memoize(f) {
    const cache = new Map();  // Value cache stored in the closure.

    return function(...args) {
        // Create a string version of the arguments to use as a cache key.
        let key = args.length + args.join("+");
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            let result = f.apply(this, args);
            cache.set(key, result);
            return result;
        }
    };
}

// Return the Greatest Common Divisor of two integers using the Euclidian
// algorithm: http://en.wikipedia.org/wiki/Euclidean_algorithm
function gcd(a,b) {  // Type checking for a and b has been omitted
    if (a < b) {           // Ensure that a >= b when we start
        [a, b] = [b, a];   // Destructuring assignment to swap variables
    }
    while(b !== 0) {       // This is Euclid's algorithm for GCD
        [a, b] = [b, a%b];
    }
    return a;
}

const gcdmemo = memoize(gcd);
gcdmemo(85, 187)  // => 17

// Note that when we write a recursive function that we will be memoizing,
// we typically want to recurse to the memoized version, not the original.
factorial = memoize(function(n) {
    return (n <= 1) ? 1 : n * factorial(n-1);
});
factorial(5)      // => 120: also caches values for 4, 3, 2 and 1.
// 7)