// Una forma de escribir comentarios en Javascript
/* Otra forma de escribir comentarios en Javascript */

// JAVASCRIPT ADMITE 9 TIPOS DE DATO
//
// A) TIPOS DE DATO PRIMITIVOS
//     1) undefined
//     2) null
//     3) Boolean
//     4) Number
//     5) BigInt
//     6) String
//     7) Symbol


// B) TIPOS DE DATO OBJETO
//     8) function
//     9) object


/* UNDEFINED */{
console.log("\n---UNDEFINED---\n");

let variable;
console.log("Valor de una variable no inicializada:", variable);
console.log("Valor de undefined en sí:", undefined);

let tipo = typeof variable;
console.log("La variable no inicializada es de tipo:", tipo);

tipo = typeof undefined;
console.log("typeof undefined =", tipo);

}/* NULL */{
console.log("\n---NULL---\n");

let variable = null;
console.log("Valor de una variable inicializada a null:", variable);
console.log("Valor de null en sí mismo:", null);

let tipo = typeof variable;
console.log("La variable ahora formalmente es de tipo:", tipo, "¡PERO null ES UN TIPO DE DATO PRIMITIVO!");
// AUNQUE typeof null = object, null NO ES UN OBJETO, SINO UN TIPO DE DATO PRIMITIVO
tipo = typeof null;
console.log("typeof null =", tipo);

let pregunta = (undefined == null);
console.log("¿ undefined == null ?", pregunta, "Ambos son falsy values");

pregunta = (undefined === null);
console.log("¿ undefined === null ?", pregunta, "Son distintos tipos de dato");

}/* BOOLEAN */{
console.log("\n---BOOLEAN---\n");

let variable = false || true;
let tipo = typeof variable;
console.log("La variable ahora es de tipo:", tipo);
console.log("¿ false instanceof Boolean ?", false instanceof Boolean);
console.log("¿ Boolean(false) instanceof Boolean ?", Boolean(false) instanceof Boolean);
console.log("¿ new Boolean(false) instanceof Boolean ?", new Boolean(false) instanceof Boolean);
console.log("¿ Boolean(new Boolean(false)) ?", Boolean(new Boolean(false)), "Todos los objetos son truthy values");

// FALSY VALUES: undefined, null, 0, -0, Nan, ""
// Allí donde Javascript espera un valor Boolean, los falsy values equivalen a false
// LOS OBJETOS VACÍOS SON TRUTHY VALUES: {}, []
console.log("\nBoolean(undefined) =", Boolean(undefined));
console.log("Boolean(null) =", Boolean(null));
console.log("Boolean(0) =", Boolean(0));
console.log("Boolean(NaN) =", Boolean(NaN));
console.log("Boolean('') =", Boolean(""));
console.log("Boolean([]) =", Boolean([]));
console.log("Boolean({}) =", Boolean({}));

}/* NUMBER */{
console.log("\n---NUMBER---\n");

let variable = 487687;
let tipo = typeof variable;
console.log("La variable ahora es de tipo", tipo);
console.log("¿ 56 instanceof Number ?", 56 instanceof Number);
console.log("¿ Number(56) instanceof Number ?", Number(56) instanceof Number);
console.log("¿ new Number(56) instanceof Number ?", new Number(56) instanceof Number);

let pregunta = (0 == false && -0 == false);
console.log("\n¿ (0 == false && -0 == false) ?", pregunta,"Ambos son falsy values"); // 0 y -0 son falsy values

// Números curiosos
variable = Infinity;
tipo = typeof variable;
console.log("Infinity también es de tipo", tipo);
Number.POSITIVE_INFINITY; // === Infinity, 1/0
Number.NEGATIVE_INFINITY; // === -Infinity, -1/0
Number.MAX_VALUE;         // === 1.7976931348623157e+308
Number.MIN_VALUE;         // === 5e-324
Number.MAX_SAFE_INTEGER;  // === 9007199254740991
Number.MIN_SAFE_INTEGER;  // === -9007199254740991
Number.NaN;               // Resultado de 0/0, Infinity/Infinity y conversiones erróneas

// Propiedades del objeto Number
Number.parseInt();
Number.parseFloat();
Number.isNaN();           // true <=> argumento NaN o valor no numérico que no se puede convertir a Number
Number.isFinite();        // true <=> argumento numérico distinto a NaN, Infinite, -Infinite
Number.isInteger();
Number.isSafeInteger();

variable = parseInt("3 cerditos");
console.log("\nparseInt('3 cerditos') =", variable);
variable = parseInt("123456");
console.log("parseInt('123456') =", variable);
variable = parseInt("Solo texto");
console.log("parseInt('Solo texto') =", variable);
pregunta = (NaN === NaN);
console.log("¿ NaN === NaN ?", pregunta, "¡SORPRESA! NaN es el único valor no idéntico a sí mismo");
//NaN es el único valor que no es idéntico a sí mismo (NaN != NaN)

tipo = typeof NaN;
console.log("El valor NaN también es de tipo", tipo);

//Cuidado con los números decimales (punto flotante)
pregunta = (0.2 - 0.1 == 0.3 - 0.2) 
console.log("¿ 1.5 - 1 == 2.5 - 2 ?", pregunta, "¡Cuidado con los números en punto flotante!");

}/* BIGINT */{
console.log("\n---BIGINT---\n");

let variable = 123n;
let tipo = typeof variable;
console.log("La variable ahora es de tipo:", tipo);

let conversion = BigInt(123);
console.log("BigInt(123) =", conversion);
conversion = BigInt("456");
console.log('BigInt("456") =', conversion);

}/* STRING */{
console.log("\n---STRING---\n");

let variable = "cadena de texto";
let tipo = typeof variable;
console.log("La variable ahora es de tipo:", tipo);
console.log("¿ 'cadena' instanceof String ?", 'cadena' instanceof String);
console.log("¿ String('cadena') instanceof String ?", String('cadena') instanceof String);
console.log("¿ new String('cadena') instanceof String ?", new String('cadena') instanceof String);

let saltoDeLinea = "\nUna frase en\ndos líneas con \\n";
console.log(saltoDeLinea);

saltoDeLinea = "\nUna frase larga \
escrita en varias lineas usando \\, \
pero impresa en una sola línea";
console.log(saltoDeLinea);

saltoDeLinea = `\nUna frase larga
que respeta los saltos de línea
usando backticks`;
console.log(saltoDeLinea);

}/* SYMBOL */{
console.log("\n---SYMBOL---\n");

let variable = Symbol("cadena");
let tipo = typeof variable;
console.log("La variable ahora es de tipo:", tipo);

// Los Symbol se usan para nombrar a las propiedades de un objeto
// sin recurrir a valores string

let nombre_string = "nombre_propiedad";
let nombre_simbolo = Symbol("nombre_propiedad");
let objeto = {};
objeto[nombre_string] = 1;
objeto[nombre_simbolo] = 2;
console.log("objeto[nombre_string] =", objeto[nombre_string]);
console.log("objeto[nombre_simbolo] =", objeto[nombre_simbolo]);
console.log("objeto['nombre_propiedad'] =", objeto["nombre_propiedad"]);

let pregunta = (nombre_string == nombre_simbolo);
console.log("¿ nombre_string == nombre_simbolo ?", pregunta);
pregunta = (nombre_string === nombre_simbolo.description);
console.log("¿ nombre_string === nombre_simbolo.description ?", pregunta);

}/* OBJECT */{
console.log("\n---OBJECT---\n");

let objeto = {};
let tipo = typeof objeto;
console.log("La variable {} es de tipo:",tipo);
console.log("{} instanceof Object =",{} instanceof Object);

let pregunta = ({} == true);
console.log("¿ {} == true ?", pregunta, "!!!!");  // ¡OJO CON ESTO! ¿POR QUÉ DEVUELVE FALSE?
pregunta = ({} == false);                 // ¿El objeto vacío también es truthy value?
console.log("¿ {} == false ?", pregunta, "!!!!"); // ¡OJO CON ESTO! ¿POR QUÉ DEVUELVE FALSE?
console.log("Boolean({}) =", Boolean({}));

// Se pueden añadir al objeto todas las propiedades que queramos
objeto.propiedad_1 = 0;
objeto["propiedad_2"] = "ABC";

console.log("\nLos arrays también son de tipo", typeof []);
console.log("[] instanceof Object =", [] instanceof Object);
console.log("Boolean([]) =", Boolean([]));
pregunta = ([] == true);                         // ¡OJO CON ESTO! ¿POR QUÉ DEVUELVE FALSE?
console.log("¿ [] == true ?", pregunta, "!!!!"); // ¿El array vacío también es truthy value?
pregunta = ([] == false);                        // ¡OJO CON ESTO! ¿POR QUÉ DEVUELVE FALSE?
console.log("¿ [] == false ?", pregunta, "!!!!");
if([]&&{}) {
    console.log("Definitivamente [] y {} son truthy");
} else {
    console.log("Definitivamente [] y {} son falsy");
}

}/* FUNCIONES */{
console.log("\n---FUNCTIONS---\n");

let nombreFuncion = function(param) {
    return;
};
console.log("Ahora la variable es de tipo:", typeof nombreFuncion);
console.log("typeof (()=>{}) =", typeof (()=>{}));
console.log("console.log(nombreFuncion) =",nombreFuncion);
console.log(nombreFuncion.toString());

}/* CURIOSIDADES */{
console.log("\n---CURIOSIDADES---\n");

console.log("typeof(typeof(undefined)) =", typeof(typeof(undefined)), "=> typeof devuelve un valor string");

console.log("\nLos valores de tipos de dato primitivos son INMUTABLES:\n");
let str = "Una cadena de texto para experimentar";
console.log(str)
str.replace(" ", "-");
str.toUpperCase();
console.log("Despues de llamar a varios métodos la cadena no se ha modificado...\n" + str);
// Los métodos devuelven la cadena modificada, no modifican la original

// Los tipos de dato primitivo se comparan por su valor
console.log("\n¿ 'cadena' == 'cadena' ?", 'cadena' == 'cadena');
// Los tipos de dato complejos se comparan por referencia
console.log("¿ {} == {} ?", {} == {});
console.log("¿ [] == [] ?", [] == []);
let obj1 = {"propiedad": "valor"};
let obj2 = obj1;
let obj3 = {};
for (let propiedad in obj1) {
    obj3[propiedad] = obj1[propiedad];
}
console.log("¿ obj1 == obj2 ?", obj1 == obj2, "Ambas variables se refieren al mismo objeto");
console.log("¿ obj3 == obj1 ?", obj3 == obj1, "obj3 es copia de obj1, luego son objetos distintos");

let arr1 = [1,2,3];
let arr2 = Array.from(arr1); // => Copia del arr1

console.log("\nUNA DUDA... ¿POR QUÉ SUCEDE ESTO?");
console.log("{}==false =>", {}==false);
console.log("{}==true =>", {}==true);
console.log("[]==false =>", []==false);
console.log("[]==true =>", []==true);

}/* CONVERSIONES */{
console.log("\n---CONVERSIONES---\n");

// Lo más sencillo es llamar a las funciones de cada tipo de dato
Boolean("valor_truthy");// => true
Number("cadena"); // => NaN
Number("123");   // => 123
String(true);    // => 'true'

// Para las conversiones a string, existe el método toString()
console.log("false.toString() =", false.toString())
let numero = 1000;
console.log("numero.toString() =", numero.toString());
console.log("numero.toString(2) =", numero.toString(2));
console.log("numero.toString(16) =", numero.toString(16));
console.log("{}.toString() =", {}.toString());
console.log("[1,'dos',false].toString() =", [1,'dos',false].toString());

// Otras formas de conversión de tipos de dato
let cadena = 1234 + "";
console.log("1234 + '' =",cadena);
numero = +"1000";
console.log("+'1000' =",numero);
numero = 1000 - 0;
console.log("'1000'-0 =",numero);
let booleano = !!numero && !!cadena;
console.log("!!1000 =",!!1000);
console.log("!!'cadena' =", !!"cadena"); 

// Métodos para convertir number a string
numero = 456.789; 
numero.toFixed(0); // => "457"
numero.toFixed(2); // => "456.79"
numero.toFixed(5); // => "456.78900"
numero.toExponential(2); // => "4.57e+2"
numero.toPrecision(7);   // => "456.7890" 

parseInt("123");         // => 123
parseInt("-123.456");    // => -123
parseFloat(".123");      // => 0.123
parseFloat("456.123");   // => 456.123

}/* VARIABLES */{
console.log("\n---VARIABLES---\n");

let variable_local;
var variable_global;
const CONSTANTE = 3.14159; 
// Las constantes hay que inicializarlas al declararlas
// Y es buena práctica nombrarlas en mayúsculas

// Se pueden declarar varias variables en la misma línea
let var1, var2;
// Y también se pueden inicializaar en la misma línea
let i = 0, j = 0, k = 0;
i = j = k = 1;

// Destructuring
let [cadena,numero] = ["texto",1000];
console.log("cadena = ",cadena);
console.log("numero = ",numero);
let objeto = {"propiedad_1": "otro texto", "propiedad_2":2000};
let {propiedad_1,propiedad_2} = objeto; // Las variables tienen que llamarse igual que las propiedades del objeto
console.log("propiedad_1 = ",propiedad_1);
console.log("propiedad_2 = ",propiedad_2);

}/* GLOBAL OBJECT */{
console.log("\n---GLOBAL OBJECT---\n");
// Las propiedades del objeto global son los identificadores disponibles en un programa Javascript
// El intérprete de Javascript, al inicializarse, crea un nuevo objeto global con una serie de propiedades y métodos

// Global object en el navegador: window
// window.undefined;
// window.NaN;
// window.Infinity;
// window.isNaN();
// window.String();

// Global object en Node: global
global.NaN;
global.Date();
global.Array();
global.parseInt();

// Tanto en el navegador como en Node se puede acceder al objeto global con globalThis
globalThis.Infinity;
}