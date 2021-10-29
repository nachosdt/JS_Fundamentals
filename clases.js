// CLASES

// Una clase es un conjunto de objetos que heredan propiedades del mismo prototipo
// Si se define un objeto prototipo y usamos Object.create(prototipo), ya tenemos definida una clase
// Normalmente las clases tienen además un inicializador (constructor) que crea un nuevo objeto

// DEFINICIÓN DEL PROTOTIPO
rango.metodos = {
    incluye(x) {return this.desde <= x && this.hasta >= x;},
    toString() { return "(" + this.desde + "," + this.hasta + ")";},
    *[Symbol.iterator]() {
        for(let i = Math.ceil(this.desde); i<= this.hasta; i++) yield i;
    } // Función generator que hace iterables los objetos de esta clase (bucles for/of, operador spread ...)
};
// DEFINICIÓN DEL CONSTRUCTOR
function rango(desde, hasta) {
    let objeto = Object.create(rango.metodos); // Establecemos el prototipo
    objeto.desde = desde; // Propiedades no heredadas
    objeto.hasta = hasta;
    return objeto;
}
let r = rango(1,5);
r.incluye(2);
r.incluye(7);
r.toString();
[...r];
console.log("\nPrototipo del objeto r:", r.__proto__);
console.log("r instanceof rango:",r instanceof rango); // false
console.log("rango.metodos es prototipo de r:", rango.metodos.isPrototypeOf(r)); // true


// OTRA FORMA DE DEFINIR UNA CLASE, USANDO UN CONSTRUCTOR Y UN PROTOTIPO
function Rango(desde, hasta) {
    this.desde = desde;
    this.hasta = hasta;
}
// El constructor automáticamente devuelve al objeto, aunque no haya sentencia return
// El contructor usa Rango.prototipo como prototipo de los objetos que devuelve
// Los constructores y las clases se definen con letra mayúscula
Rango.prototype = {
    incluye: function(x) {return this.desde <= x && this.hasta >= x;},
    toString: function() { return "(" + this.desde + "," + this.hasta + ")";},
    [Symbol.iterator]: function*() {
        for(let i = Math.ceil(this.desde); i<= this.hasta; i++) yield i;
    } // Función generator que hace iterables los objetos de esta clase (bucles for/of, operador spread ...)
}

r = new Rango(2,6);
[...r];
console.log("\nr instanceof Rango:",r instanceof Rango); // true
console.log("Rango.prototype es prototipo de r:", Rango.prototype.isPrototypeOf(r)); // true
console.log("Propiedades de Rango:", Reflect.ownKeys(Rango)); 
console.log("Propiedades de r:", Reflect.ownKeys(r)); 
console.log("Prototipo de r:", Object.getPrototypeOf(r)); 

console.log("\n¿ Object.getPrototypeOf(r) === r.__proto__ ?", Object.getPrototypeOf(r)===r.__proto__);
console.log("¿ Object.getPrototypeOf(r) === Rango.prototype ?", Object.getPrototypeOf(r)===Rango.prototype);
// El constructor tiene una propiedad prototipo
let prototipo = Rango.prototype;
// El prototipo tiene una propiedad constructor
let constructor = prototipo.constructor;
console.log("¿ r.constructor === Rango.prototype.constructor ?", r.constructor === constructor);


// USANDO LA PALABRA RESERVADA class
class OtroRango {
    constructor(desde, hasta) {
        this.desde = desde; // Propiedades no heredadas
        this.hasta = hasta; // Todas las propiedades de las instancias de esta clase se definen en el constructor
    }
    incluye(x) {return this.desde <= x && this.hasta >= x;}
    toString() { return "(" + this.desde + "," + this.hasta + ")";}
    *[Symbol.iterator]() {
        for(let i = Math.ceil(this.desde); i<= this.hasta; i++) yield i;
    }
}
// Dentro de la clase, el código está en 'use strict'
// Las clases no están 'hoisted'. No se puede instanciar un objeto antes de definir su clase
// Para convertir un método en ESTÄTICO, hay que usar la palabra clave static
// Los métodos estáticos se definen como propiedades del constructor, no del objeto
// Se pueden definir métodos setter y getter en una clase, al igual que en los objetos

// CLASES QUE HEREDAN DE OTRA CLASE
class Heredera extends Rango {
    constructor(principio, longitud) {
        if (longitud>=0) {
            super(principio, principio+longitud);
        } else {
            super(principio+longitud,principio);
        }
    }
}

// SINTAXIS MODERNA
class Coordenadas {
    X = 0;
    Y = 0;
    #privada = "Propiedad privada";
    static propiedadEstatica = true;
}

// AÑADIR O MODIFICAR MÉTODOS A UNA CLASE EXISTENTE
Object.prototype.toString = function() {
    return JSON.stringify(this);
}
// En general, esto es mala idea, por posibles problemas de incompatibilidad 
// si en el futuro JS añade o modifica los métodos en cuestión
// Los métodos y propiedades añadidos a los prototipos de una clase son
// visibles en los bucles for/in. 
// Para evitar esto se puede usar Object.defineProperty()

// SUBCLASSES
// Implementación sin usar las palabras reservadas class y extends
function Lapso(principio, longitud) { // Definición del constructor de la subclase
    if (longitud>0) {
        this.desde = principio;
        this.hasta = principio + longitud;
    } else {
        this.desde = principio + longitud;
        this.hasta = principio;
    }
}
Lapso.prototype = Object.create(Rango.prototype); // El prototipo hereda del prototipo de Rango
Lapso.prototype.constructor = Lapso; // Definimos el constructor
Lapso.prototype.toString = function() { // Modificamos el método toString()
    return `(${this.desde}... ${this.hasta-this.desde})`;
};
let l = new Lapso(5,10);

console.log("\nl instanceof Lapso:",l instanceof Lapso); // true
console.log("l instanceof Rango:",l instanceof Rango); // true
console.log("Lapso.prototype es prototipo de l:", Lapso.prototype.isPrototypeOf(l)); // true
console.log("Rango.prototype es prototipo de l:", Rango.prototype.isPrototypeOf(l)); // true
console.log("Propiedades de l:", Reflect.ownKeys(l)); 
console.log("Prototipo de l:", Object.getPrototypeOf(l)); 

// Implementación con class, extendas y super
class OtroLapso extends Rango { 
    constructor(principio, longitud) {        
        if (longitud>0) {
            super(principio, principio + longitud); // Si se usa extends, hay que usar super() en el constructor    
            console.log("\nValor de new.target después de invocar super():", new.target.name);       
        } else {
            super(principio+ longitud, principio); // super() invoca el constructor de la superclase. Una vez invocado, se podría usar this 
            console.log("\nValor de new.target después de invocar super():",new.target.name);      
        }
    }
    toString() {
        return `toString() desde la subclase: ${super.toString()})`; // Desde super tenemos acceso a los métodos de la superclase, que aquí sobreescribimos
    }
}

l = new OtroLapso(5,10);
console.log("\nl instanceof OtroLapso:",l instanceof OtroLapso); // true
console.log("l instanceof Rango:",l instanceof Rango); // true

// DELEGACIÓN O COMOPSICIÓN EN LUGAR DE HERENCIA
// La composición consite en crear una clase que, en lugar de heredar de otra ya existente,
// use una instancia de dicha clase y recurra a los métodos de esa instancia
class miArray {
    constructor() {
        this.array = new Array();
    }
    get longitud() {
        return this.array.length;
    }
}