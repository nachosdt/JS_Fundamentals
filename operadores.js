// ACCESO A LAS PROPIEDADES DE LOS OBJETOS

let objeto ={"propiedad_1": 123, propiedad_2: "cadena"};
objeto.propiedad_1;
objeto["propiedad_2"];
// Si objeto===null || objeto===undefined, Javascript lanza un TypeError
// al intentar acceder a sus propiedades.
// Y si el objeto existe pero la propiedad no, devuelve undefined.
objeto.propiedad_3; // => undefined

//Acceso a los índices de un array
let array = [1,2,3];
array[0]; // => devuelve 1
array["0"]; // => devuelve 1


// ACCESO CONDICIONAL MEDIANTE ?. Y ?.[]

objeto?.propiedad_1;
objeto?.["propiedad_3"];
// En este caso, si objeto===null || objeto===undefined Javascript
// devuelve undefined. El acceso condicional es short-circuiting.
// Si lo que está a la izquierda de ?. es null o undefined, no se
// evalúa lo que esta a la derecha.
// TAMBIÉN SE PUEDE USAR AL INVOCAR FUNCIONES
let miFuncion = function() {
    return;
}
miFuncion?.(5);

// CREACIÓN DE OBJETOS

new Object();
// Si no se pasan parámetros al constructor se pueden omitir los paréntesis:
new Date; 


// OPERADORES
// ----------

// +
console.log("\nOPERADOR + :\n");
console.log("1 + 2 =", 1 + 2);
console.log("'1' + '2' =", '1'+'2');
console.log("'1' + 2 =", '1'+ 2);
console.log("1 + {} =", 1 + {});
console.log("true + true =", true + true);
console.log("1 + null =", 1 + null);
console.log("1 + undefined =", 1 + undefined);
console.log("+ '123' =", + "123");

// == Y ===
console.log("\nOPERADORES == Y ===\n");
// == evalúa los operandos, y si no son del mismo tipo intenta convertirlos a otro tipo para compararlos
// === evalua los operandos, pero no llleva a cabo ninguna conversión de tipos
console.log("undefined == null", undefined == null);
console.log("undefined === null", undefined === null);
console.log("1 == '1'", 1 == '1');
console.log("1 === '1'", 1 === '1');

// in
console.log("\nOPERADOR in\n");
// El operando de la izquierda debe ser string, symbol o un valor convertible a string
// El operando de la derecha debe ser un objeto
objeto.propiedad = 0;
console.log("'propiedad' in objeto", 'propiedad' in objeto);
console.log("'otra_propiedad in objeto'", "otra_propiedad" in objeto);
// También reconoce las propiedades y métodos heredados
console.log("'toString' in objeto", "toString" in objeto);
// Y funciona con los arrays
array = [1,2,3];
console.log("'0' in array", "0" in array);
console.log("1 in array", 1 in array);
console.log("5 in array", 5 in array);

// instanceof
console.log("\nOPERADOR instaceof\n");
// Comprueba si un objeto pertenece a una determinada clase
console.log("array instanceof Array", array instanceof Array);
// O si hereda de otras clases
console.log("array instanceof Object", array instanceof Object);

// OPERADORES LÓGICOS && Y ||
console.log("\nOPERADORES LÓGICOS &&, || Y !\n");

// Si el primer operando es falsy, devuelve el primer operando sin evaluar el segundo
console.log("null && 10 =", null && 10);
console.log("false && 10 =", false && 10);
// Y si el primer operando es truthy, devuelve el segundo operando
console.log("10 && 'cadena' =", 10 && "cadena");
// Ejemplo del mecanismo short-circuiting:
// if (condicion) {sentencia} equivale a (condicion) && sentencia
function funcion() {return "función ejecutada";}
console.log("{} && funcion() =", {} && funcion());
console.log("'' && funcion() =", "" && funcion() || "función no ejecutada\n");

// Con || ocurre algo similar. También es shor-circuiting.
// || devuelve el primer operando truthy. Si el primer operando es truthy, no evalúa el segundo
console.log("'' || 0 || null || undefined || [] =", '' || 0 || null || undefined || []);

// Antes de ES6, este mecanismo se empleaba para dar valores por defecto a los parámetros de una función
function f(objeto) {
    objeto = objeto || {};
}

// Con el operador ! se pueden convertir fácilmente todos los valores a boolean
console.log("\n!!null =", !!null);
console.log("!!undefined =", !!undefined);
console.log("!!0 =", !!0);
console.log("!!'' =", !!'');
console.log("!![] =", !![]);
console.log("!!{} =", !!{});
console.log("!!'cadena' =", !!"cadena");


// eval()
console.log("\nOPERADOR eval()\n");
// eval() evalúa el código JS que se le pasa como argumento (tipo string)
// Puede modificar variables locales o globales, según dónde y cómo se invoque
// Y si se invoca con otro nombre, actúa globalmente
const globalEval =eval;
let x =y ="global";
function f() {
    let x ="local";
    eval('x += "cambiada";');
    return x;
}
function g() {
    let y ="local";
    globalEval('y += "cambiada";');
    return y;
}
console.log(f(),x);
console.log(g(),y);

// OPERADOR TERNARIO
console.log("\nOPERADOR TERNARIO\n");

let condicion = true;
function condicionVerdadera() {
    console.log("Condicion === true");
}
function condicionFalsa() {
    console.log("Condicion === false");
}
condicion?condicionVerdadera():condicionFalsa();

// OPERADOR FIRST DEFINED
console.log("\nOPERADOR FIRST DEFINED\n");

// Devuelve el primer operando si es != null && != undefined
// Como && y ||, ?? es short-circuiting. Pero en este caso el 
// 2º operando sólo se evalúa si el 1º es null o undefined.
// a ?? b equivale a (a !== null && a !== undefined)? a : b;
// Es una alternativa a || cuando se quiere seleccionar el primer
// operando definido, en lugar del primer operador truthy.

console.log("0 ?? 1000 =",0 ?? 1000);
console.log("0 || 1000 =",0 || 1000);
console.log("'' ?? 'cadena' =","" ?? "cadena");
console.log("'' || 'cadena' =","" || "cadena");
console.log("false ?? true =",false ?? true);
console.log("false || true =",false || true);
console.log("undefined ?? false =",undefined ?? false);
console.log("null ?? false =",null ?? false);

// typeof
console.log("\nOPERADOR TYPEOF\n");
// Devuelve el tipo de dato del operando en formato string
// Sólo hay 8 posibles resultados, a pesar de que existen 9 tipos de dato
console.log("typeof undefined =",typeof undefined);
console.log("typeof null =",typeof null);
console.log("typeof true||false =",typeof true||false);
console.log("typeof NaN =",typeof NaN);
console.log("typeof 'cadena' =",typeof 'cadena');
console.log("typeof Symbol() =",typeof Symbol());
console.log("typeof function(x){return x;} =",typeof function(x){return x;});
console.log("typeof {} =",typeof {});

// delete
console.log("\nOPERADOR DELETE\n");

objeto = {propiedad1:"valor 1", popiedad2:"valor 2"};
variable = delete objeto.propiedad1; // => variable === true
// Si la propiedad se borra o el operando no es un lvalue, devuelve true
console.log("'propiedad1' in objeto =","propiedad1" in objeto);
console.log("typeof objeto.propiedad1 =",typeof objeto.propiedad1);
// Si la propiedad existe pero no puede borrarse, devuelve false
// Las propiedades no configurables no se pueden borrar (delete devuelve false)

array = [1,2,3];
delete array[0];
console.log("0 in array =",0 in array);
console.log("array.length =",array.length); // Sparse array